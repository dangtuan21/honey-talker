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
- `SYSTEM_PROMPT`: System prompt for AI behavior

## Usage Example

```python
import requests

# Chat request with RAG
response = requests.post("http://localhost:8000/chat", json={
    "message": "What are the library hours?",
    "org_id": "test_org",
    "history": []
})

result = response.json()
print(f"Reply: {result['reply']}")
print(f"Retrieved chunks: {result['retrieved_chunks']}")
```

## Knowledge Ingestion

### Document Ingestion (Recommended)
```bash
curl -X POST "http://localhost:8000/admin/ingest/knowledge" \
  -H "Content-Type: application/json" \
  -d '{
    "org_id": "test_org",
    "title": "Library Hours",
    "source": {"type": "manual"},
    "content": "The library is open Monday-Friday 9 AM to 8 PM..."
  }'
```

### Chunk Ingestion
```bash
curl -X POST "http://localhost:8000/admin/ingest/chunk" \
  -H "Content-Type: application/json" \
  -d '{
    "org_id": "test_org",
    "document_id": "doc_123",
    "content": "Specific chunk of content",
    "metadata": {"type": "hours", "section": "library"}
  }'
```

## Architecture

### RAG Pipeline
1. **User Query** → Generate embedding (1536 dimensions)
2. **Vector Search** → Search both knowledge and chunks collections
3. **Context Retrieval** → Get top-k relevant documents
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
- **MongoDB Atlas**: Vector search and data persistence
- **OpenRouter API**: LLM completions with multiple models

## RAG Performance

- **Retrieval Speed**: Sub-second vector search
- **Context Relevance**: Semantic matching with 1536-dimensional embeddings
- **Organization Isolation**: Queries only retrieve from organization-specific data
- **Knowledge Freshness**: New documents become searchable within minutes

## Troubleshooting

### Vector Search Issues
1. Check index status: `python src/test/check_index_status.py`
2. Recreate index: `python src/test/force_create_index.py`
3. Verify embeddings: `python src/test/check_knowledge_embeddings.py`

### Database Connection
1. Verify MongoDB URL in `.env`
2. Check database: should be `talkerdb`
3. Test connection: `python src/test/verify_mongodb_connection.py`
