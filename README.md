# Honey Talker

A multi-organization AI chatbot system with RAG (Retrieval-Augmented Generation) capabilities.

## � Sample Questions

The system comes with pre-loaded sample documents. Try these questions:

### 📚 University Services
- "What are the library hours?"
- "How much is tuition?"
- "What is the attendance policy?"
- "How do I contact career services?"

### 🏢 Campus Facilities  
- "What are the recreation center hours?"
- "How do I access the swimming pool?"
- "What athletic facilities are available?"

### 👥 Student Organizations
- "How do I join the engineering club?"
- "What cultural organizations are available?"
- "How can I start a new student organization?"

### 🔬 Research & Academics
- "What are the IRB requirements?"
- "How do I report research misconduct?"
- "What are the authorship guidelines?"

### 💻 IT Services
- "How do I connect to campus Wi-Fi?"
- "What software is available for free?"
- "How much does printing cost?"

**Access the web interface at http://localhost:4020 and use organization ID `test_org` to test!**

## �🏗️ Architecture

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

# Start web service
cd ../ht-web
npm install
npm run start
```

## 📊 API Endpoints

### ht-ai (Port 8020)
- `POST /chat` - Send messages and get AI responses
- `GET /health` - Health check endpoint
- `POST /admin/ingest/*` - Knowledge ingestion

### ht-backend (Port 3020)
- `GET /health` - Service health
- `GET /organizations` - Organization CRUD
- `GET /sessions` - Session management
- `GET /messages` - Message persistence

### ht-web (Port 4020)
- React frontend for AI chat interface
- Real-time messaging with RAG
- Organization switching support

## 🔍 Vector Search

- **Index**: `vector_index_v3` with 1536-dimensional embeddings
- **Database**: MongoDB Atlas Vector Search in talkerdb
- **Organization Isolation**: Data separated by org_id
- **Dual Collection Search**: Searches both knowledge and chunks collections

## 🏢 Multi-Organization Support

- Hierarchical organization structure
- Separate knowledge bases per organization
- RAG context respects organization boundaries

## 📊 Data Flow

1. **Ingestion**: Documents/Chunks → Embeddings → Vector Store (talkerdb)
2. **Query**: User message → Embedding → Vector Search → Context
3. **Response**: Context + Query → LLM → Enhanced AI response

## 🎯 Current Status

✅ **Fully Functional RAG System**
- Vector search with MongoDB Atlas
- Knowledge ingestion with automatic embedding
- Multi-organization data isolation
- Real-time contextual responses

✅ **Complete Backend Integration**
- ht-ai: Python FastAPI with RAG
- ht-backend: Node.js TypeScript API
- Unified talkerdb database
- Comprehensive test suite

---

**Built with ❤️ for multi-organization AI assistance**
