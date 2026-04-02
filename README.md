# Honey Talker

A multi-organization AI chatbot system with RAG (Retrieval-Augmented Generation) capabilities.

## 🏗️ Architecture

```
honey-talker/
├── ht-ai/              # Python FastAPI AI service with RAG
├── ht-backend/         # Node.js TypeScript backend API
└── README.md           # This file
```

## 🚀 Features

- **🤖 AI Chatbot**: Multi-organization conversational AI with RAG
- **🔍 Vector Search**: MongoDB Atlas Vector Search for semantic retrieval
- **📚 Knowledge Management**: Document ingestion and chunk processing
- **🏢 Organization Support**: Multi-tenant with data isolation
- **⚡ High Performance**: FastAPI and Fastify frameworks
- **🔒 Type Safety**: Full TypeScript and Pydantic validation

## 🛠️ Tech Stack

- **Backend**: Python FastAPI + Node.js TypeScript
- **Database**: MongoDB with Atlas Vector Search
- **AI**: OpenRouter API, OpenAI embeddings
- **Search**: Vector similarity search with RAG

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/dangtuan21/honey-talker.git
cd honey-talker

# Start AI service
cd ht-ai
cp .env.example .env  # Configure API keys
pip install -r requirements.txt
./start.sh

# Start backend service
cd ../ht-backend
npm install
npm run dev
```

## � API Endpoints

### ht-ai (Port 8000)
- `GET /health` - Service health
- `POST /chat` - AI chat with RAG
- `POST /admin/ingest/*` - Knowledge ingestion

### ht-backend (Port 3020)
- `GET /health` - Service health
- `GET /organizations` - Organization CRUD
- `GET /sessions` - Session management
- `GET /messages` - Message persistence

## 🔍 Vector Search

- **Index**: 1536-dimensional embeddings
- **Database**: MongoDB Atlas Vector Search
- **Organization Isolation**: Data separated by org_id

## 🏢 Multi-Organization Support

- Hierarchical organization structure
- Separate knowledge bases per organization
- RAG context respects organization boundaries

## 📊 Data Flow

1. **Ingestion**: Documents → Chunks → Embeddings → Vector Store
2. **Query**: User message → Embedding → Vector Search → Context
3. **Response**: Context + Query → LLM → Enhanced AI response

---

**Built with ❤️ for multi-organization AI assistance**
