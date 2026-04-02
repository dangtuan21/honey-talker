from __future__ import annotations

from typing import Any, Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

from config import get_settings
from llm import build_client, chat_completion
from rag import retrieve_chunks, build_contextual_prompt
from schemas import IngestKnowledgeRequest, IngestChunkRequest, Knowledge, Chunk

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

    doc = Knowledge(
        _id=f"doc_{uuid.uuid4().hex}",
        org_id=req.org_id,
        title=req.title,
        source=req.source,
        content=req.content,
        status="processed",
        created_at=datetime.utcnow(),
    )
    from db import knowledge
    knowledge().insert_one(doc.model_dump(by_alias=True))
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
