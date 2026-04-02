# Honey Talker AI (ht-ai)

A FastAPI-based AI chatbot service with RAG (Retrieval-Augmented Generation) capabilities for multi-organization educational support.

## Features

- **Chat Interface**: RESTful API for conversational AI interactions
- **RAG Integration**: Retrieves relevant knowledge chunks for context-aware responses
- **Multi-Organization Support**: Organization-specific knowledge bases and routing
- **Knowledge Ingestion**: Admin endpoints for knowledge base management
- **Vector Embeddings**: Semantic search using sentence transformers
- **MongoDB Integration**: Persistent storage for knowledge and conversations

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Database**: MongoDB
- **AI/ML**: OpenAI API, Sentence Transformers
- **Embeddings**: Sentence-transformers for semantic search

## API Endpoints

### Chat
- `POST /chat` - Send messages and get AI responses
- `GET /health` - Health check endpoint

### Admin (Knowledge Management)
- `POST /admin/ingest/knowledge` - Ingest knowledge documents
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

- `OPENAI_API_KEY`: OpenAI API key for chat completions
- `OPENAI_MODEL`: OpenAI model to use (default: gpt-3.5-turbo)
- `MONGODB_URI`: MongoDB connection string
- `SYSTEM_PROMPT`: System prompt for AI behavior

## Usage Example

```python
import requests

# Chat request
response = requests.post("http://localhost:8000/chat", json={
    "message": "What are the organization hours?",
    "org_id": "org_123",
    "history": []
})

print(response.json())
```

## Architecture

- **RAG Pipeline**: Retrieves relevant chunks before generating responses
- **Organization Isolation**: Each organization has separate knowledge bases
- **Embedding Search**: Uses vector similarity for knowledge retrieval
- **Contextual Prompts**: Combines retrieved context with system prompts

## Development

The service is designed to work with the Honey Talker backend for user management, session handling, and message persistence.
