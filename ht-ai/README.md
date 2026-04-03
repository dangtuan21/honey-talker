# Honey Talker AI (ht-ai)

A FastAPI-based AI chatbot service with RAG (Retrieval-Augmented Generation) capabilities for multi-organization educational support.

## Features

- **🤖 AI Chatbot**: Multi-organization conversational AI with contextual responses
- **🔍 RAG System**: Retrieves relevant knowledge chunks for context-aware responses
- **📚 Knowledge Management**: Dual ingestion - full documents and pre-chunked content
- **🏢 Organization Isolation**: Organization-specific knowledge bases and routing
- **🔗 Vector Search**: MongoDB Atlas Vector Search with semantic matching
- **📊 Embeddings**: 1536-dimensional vectors for accurate semantic search
- **🗄️ MongoDB Integration**: Persistent storage in talkerdb database
- **🛡️ Hallucination Prevention**: Improved system prompts to reduce AI hallucination
- **🔄 Fallback Search**: Text-based search when vector search fails
- **⚡ High Performance**: Optimized retrieval with top-k=10 for better coverage

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.13
- **Database**: MongoDB with Atlas Vector Search
- **AI/ML**: OpenRouter API, OpenAI embeddings
- **Search**: Vector similarity search with 1536 dimensions
- **Development**: uvicorn with auto-reload

## API Endpoints

### Chat
- `POST /chat` - Send messages and get AI responses with RAG context
- `GET /health` - Health check endpoint

**Base URL**: `http://localhost:8020`

### Admin (Knowledge Management)
- `POST /admin/ingest/knowledge` - Ingest knowledge documents (auto-embedded)
- `POST /admin/ingest/chunk` - Ingest pre-chunked knowledge pieces

## Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run the service**:
   ```bash
   ./start.sh
   ```

   Or manually:
   ```bash
   cd src && uvicorn main:app --reload --port 8000
   ```

## Configuration

The service uses the following environment variables (see `.env.example`):

- `OPENROUTER_API_KEY`: OpenRouter API key for chat completions
- `OPENAI_MODEL`: OpenAI model to use (default: stepfun/step-3.5-flash:free)
- `MONGODB_URL`: MongoDB Atlas connection string
- `SYSTEM_PROMPT`: System prompt for AI behavior (updated to reduce hallucination)

## System Prompt

The default system prompt has been optimized to reduce hallucination:

```python
UNIVERSITY_SYSTEM_PROMPT = (
    "You are a helpful and professional university receptionist AI. "
    "Your role is to assist students with general university information, campus services, academic policies, office hours, and frequently asked questions. "
    "Be concise, polite, and clear. If you don't know the answer, please say: I don't have the answer for that right now. "
    "Do not provide personal opinions or unofficial advice. Always maintain a friendly and professional tone."
)
```

This ensures the AI:
- Provides accurate information when available
- Clearly states when information is not available
- Does not hallucinate or make up answers
- Maintains a professional, helpful tone

## Sample Questions

Based on the sample documents available in the `data/` folder, you can ask questions like:

### 📚 University Handbook
- "What are the tuition fees?"
- "What is the attendance policy?"
- "How do I contact career services?"
- "Where is the health center located?"
- "What are the dining options on campus?"

### 🏢 Campus Facilities (PDF)
- "What are the recreation center hours?"
- "How do I access the swimming pool?"
- "Where is the main library located?"
- "What dining options are available?"
- "What athletic facilities are available?"

### 👥 Student Organizations (DOCX)
- "How do I join the engineering club?"
- "What cultural organizations are available?"
- "When is the drama club meeting?"
- "How can I start a new student organization?"
- "What sports clubs are available?"

### 🔬 Research Guidelines
- "What are the IRB requirements?"
- "How do I report research misconduct?"
- "What are the authorship guidelines?"
- "What expenses are not allowed in grants?"
- "What is the research ethics policy?"

### 💻 IT Services
- "How do I connect to campus Wi-Fi?"
- "What software is available for free?"
- "How much does printing cost?"
- "When is the IT Help Desk open?"
- "How do I reset my password?"

## Usage Example

```python
import requests

# Chat request with RAG
response = requests.post("http://localhost:8020/chat", json={
    "message": "What are the library hours?",
    "org_id": "69ce68f2a749764b8e5f9b42",  # Use organization ID, not name
    "history": []
})

result = response.json()
print(f"Reply: {result['reply']}")
print(f"Retrieved chunks: {result['retrieved_chunks']}")
```

## Knowledge Ingestion

### Document Ingestion (Recommended)
```bash
curl -X POST "http://localhost:8020/admin/ingest/knowledge" \
  -H "Content-Type: application/json" \
  -d '{
    "org_id": "69ce68f2a749764b8e5f9b42",
    "title": "Library Hours",
    "source": {"type": "manual"},
    "content": "The library is open Monday-Friday 9 AM to 8 PM..."
  }'
```

### Chunk Ingestion
```bash
curl -X POST "http://localhost:8020/admin/ingest/chunk" \
  -H "Content-Type: application/json" \
  -d '{
    "org_id": "69ce68f2a749764b8e5f9b42",
    "document_id": "doc_123",
    "content": "Specific chunk of content",
    "metadata": {"type": "hours", "section": "library"}
  }'
```

### File Upload
```bash
curl -X POST "http://localhost:8020/admin/ingest/file" \
  -F "file=@document.pdf" \
  -F "org_id=69ce68f2a749764b8e5f9b42" \
  -F "title=My Document"
```

## Architecture

### RAG Pipeline
1. **User Query** → Generate embedding (1536 dimensions)
2. **Vector Search** → Search both knowledge and chunks collections
3. **Context Retrieval** → Get top-k relevant documents (increased to 10)
4. **Prompt Building** → Combine context with system prompt
5. **LLM Response** → Generate contextual answer

### Database Structure (talkerdb)
- `knowledge` - Full documents with embeddings
- `chunks` - Pre-chunked content with embeddings  
- `organizations` - Organization data
- `chat_sessions` - User session tracking
- `chat_messages` - Conversation history

### Vector Search Configuration
- **Index Name**: `vector_index_v3`
- **Dimensions**: 1536 (matches embedding model)
- **Similarity**: Cosine
- **Fields**: `embedding` (vector), `org_id` (filter), `content` (text)

### Fallback Mechanism
When vector search fails or returns no results:
- Falls back to text-based search on `content` field
- Returns up to 10 documents for better coverage
- Maintains organization isolation
- Provides debug logging for troubleshooting

## Development

### Testing
```bash
# Test vector search functionality
python src/test/test_vector_search.py

# Verify database connection
python src/test/verify_mongodb_connection.py

# Check collections
python src/test/check_collections.py
```

### Vector Search Setup
```bash
# Create/recreate vector search index
python src/test/recreate_vector_search.py

# Force create index (if needed)
python src/test/force_create_index.py
```

## Integration

The ht-ai service is designed to work with:
- **ht-backend**: User management, session handling, organization CRUD
- **ht-web**: React frontend with organization switching
- **MongoDB Atlas**: Vector search and data persistence
- **OpenRouter API**: LLM completions with multiple models

## RAG Performance

- **Retrieval Speed**: Sub-second vector search
- **Context Relevance**: Semantic matching with 1536-dimensional embeddings
- **Organization Isolation**: Queries only retrieve from organization-specific data
- **Knowledge Freshness**: New documents become searchable within minutes
- **Coverage**: Top-k=10 provides better context for responses
- **Reliability**: Fallback search ensures responses even when vector search fails

## Recent Improvements

### System Prompt Optimization
- **Reduced Hallucination**: Updated prompt to prevent AI from making up answers
- **Clear Fallback**: Specific instruction to say "I don't have the answer for that right now"
- **Professional Tone**: Maintained helpful, professional demeanor
- **Consistent Behavior**: More predictable and reliable responses

### Search Enhancements
- **Increased Top-K**: From 5 to 10 chunks for better coverage
- **Fallback Search**: Text-based search when vector search fails
- **Debug Logging**: Better troubleshooting information
- **Error Handling**: Graceful degradation when search fails

### Integration Improvements
- **Organization ID Handling**: Fixed frontend to use `_id` instead of `id`
- **API Consistency**: Standardized response formats
- **Error Messages**: More informative error responses

## Troubleshooting

### Vector Search Issues
1. Check index status: `python src/test/check_index_status.py`
2. Recreate index: `python src/test/force_create_index.py`
3. Verify embeddings: `python src/test/check_knowledge_embeddings.py`

### Database Connection
1. Verify MongoDB URL in `.env`
2. Check database: should be `talkerdb`
3. Test connection: `python src/test/verify_mongodb_connection.py`

### Organization Issues
1. Verify organization ID format (should be `_id` from organizations collection)
2. Check organization exists: `curl http://localhost:3020/organizations`
3. Test with correct org_id: Use `_id` field, not organization name

### No Knowledge Retrieved
1. Check if organization has knowledge: `curl http://localhost:3020/knowledge/by-org/:orgId`
2. Verify vector search is working: Check logs for fallback activation
3. Ensure knowledge is properly embedded: Check embeddings in database
