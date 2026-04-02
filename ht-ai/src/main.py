from __future__ import annotations

from typing import Any, Literal
import tempfile
import os
import hashlib

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from pydantic import BaseModel, Field

from config import get_settings
from llm import build_client, chat_completion
from rag import retrieve_chunks, build_contextual_prompt
from schemas import IngestKnowledgeRequest, IngestChunkRequest, Knowledge, Chunk, FileIngestResponse
from file_processor import extract_text_from_file, validate_file_size, validate_file_type

app = FastAPI(title="talker-ai")

settings = get_settings()
client = build_client(settings)


class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    history: list[ChatMessage] = Field(default_factory=list)
    org_id: str | None = Field(default=None)


class ChatResponse(BaseModel):
    reply: str
    model: str
    usage: dict[str, Any] | None = None
    retrieved_chunks: int = 0


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    # Detect org_id (fallback to "default" if not provided)
    org_id = req.org_id or "default"

    # Retrieve relevant chunks
    retrieved = retrieve_chunks(org_id, req.message, top_k=5)

    # Build prompt with context
    prompt = build_contextual_prompt(settings.system_prompt, retrieved, req.message)

    # Compose messages for LLM (include history if any)
    messages: list[dict[str, Any]] = [{"role": "system", "content": prompt}]
    messages.extend([m.model_dump() for m in req.history])
    messages.append({"role": "user", "content": req.message})

    reply, usage = chat_completion(
        client=client,
        model=settings.openai_model,
        messages=messages,
    )

    return ChatResponse(
        reply=reply,
        model=settings.openai_model,
        usage=usage,
        retrieved_chunks=len(retrieved),
    )


# Admin ingestion endpoints
@app.post("/admin/ingest/knowledge", response_model=Knowledge)
def ingest_knowledge(req: IngestKnowledgeRequest) -> Knowledge:
    from datetime import datetime
    import uuid
    from embeddings import embed_text

    # Generate embedding for the knowledge content
    embedding = embed_text(req.content)

    doc = Knowledge(
        _id=f"doc_{uuid.uuid4().hex}",
        org_id=req.org_id,
        title=req.title,
        source=req.source,
        content=req.content,
        status="processed",
        created_at=datetime.utcnow(),
    )
    
    # Add embedding to the document before storing
    doc_dict = doc.model_dump(by_alias=True)
    doc_dict["embedding"] = embedding
    doc_dict["content_hash"] = hashlib.sha256(req.content.encode('utf-8')).hexdigest()
    
    from db import knowledge
    knowledge().insert_one(doc_dict)
    return doc


@app.post("/admin/ingest/chunk", response_model=Chunk)
def ingest_chunk(req: IngestChunkRequest) -> Chunk:
    from datetime import datetime
    import uuid
    from embeddings import embed_text

    embedding = embed_text(req.content)

    chunk = Chunk(
        _id=f"chunk_{uuid.uuid4().hex}",
        org_id=req.org_id,
        document_id=req.document_id,
        content=req.content,
        embedding=embedding,
        metadata=req.metadata,
        created_at=datetime.utcnow(),
    )
    from db import chunks
    chunks().insert_one(chunk.model_dump(by_alias=True))
    return chunk


@app.post("/admin/ingest/file", response_model=FileIngestResponse)
def ingest_file(
    file: UploadFile = File(...),
    org_id: str = Form(...),
    title: str | None = Form(None)
) -> FileIngestResponse:
    """Ingest knowledge from uploaded file (PDF, DOCX, TXT)"""
    from datetime import datetime
    import uuid
    from embeddings import embed_text
    
    # Validate file
    if not validate_file_type(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Supported formats: .pdf, .docx, .txt"
        )
    
    if not validate_file_size(file.size):
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 10MB"
        )
    
    # Create temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
        # Write uploaded content to temp file
        content = file.file.read()
        temp_file.write(content)
        temp_file_path = temp_file.name
    
    try:
        # Extract text from file
        extracted_text = extract_text_from_file(temp_file_path)
        
        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="No text could be extracted from the file"
            )
        
        # Generate content hash for duplicate detection
        content_hash = hashlib.sha256(extracted_text.encode('utf-8')).hexdigest()
        
        # Generate title if not provided
        if not title:
            title = os.path.splitext(file.filename)[0]
        
        # Check for existing content with same hash for this organization
        from db import knowledge
        existing_doc = knowledge().find_one({
            "org_id": org_id,
            "content_hash": content_hash
        })
        
        if existing_doc:
            # Update existing document
            embedding = embed_text(extracted_text)
            
            updated_doc = Knowledge(
                _id=existing_doc["_id"],
                org_id=org_id,
                title=title,
                source={"type": "file_upload", "filename": file.filename},
                content=extracted_text,
                status="processed",
                created_at=existing_doc["created_at"]
            )
            
            # Add embedding and update
            doc_dict = updated_doc.model_dump(by_alias=True)
            doc_dict["embedding"] = embedding
            doc_dict["content_hash"] = content_hash
            
            knowledge().replace_one(
                {"_id": existing_doc["_id"]},
                doc_dict
            )
            
            return FileIngestResponse(
                success=True,
                knowledge_id=str(existing_doc["_id"]),
                filename=file.filename,
                extracted_length=len(extracted_text),
                title=title,
                message=f"Successfully updated existing document: {file.filename}",
                overwritten=True
            )
        
        # Create new knowledge document
        knowledge_id = f"doc_{uuid.uuid4().hex}"
        embedding = embed_text(extracted_text)
        
        doc = Knowledge(
            _id=knowledge_id,
            org_id=org_id,
            title=title,
            source={"type": "file_upload", "filename": file.filename},
            content=extracted_text,
            status="processed",
            created_at=datetime.utcnow(),
        )
        
        # Add embedding and store
        doc_dict = doc.model_dump(by_alias=True)
        doc_dict["embedding"] = embedding
        doc_dict["content_hash"] = content_hash
        
        knowledge().insert_one(doc_dict)
        
        return FileIngestResponse(
            success=True,
            knowledge_id=str(knowledge_id),
            filename=file.filename,
            extracted_length=len(extracted_text),
            title=title,
            message=f"Successfully processed {file.filename}",
            overwritten=False
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
    finally:
        # Clean up temporary file
        try:
            os.unlink(temp_file_path)
        except:
            pass
