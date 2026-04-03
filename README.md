# Honey Talker

A multi-organization AI chatbot system with RAG (Retrieval-Augmented Generation) capabilities and modern web interface.

## 🎯 Sample Questions

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

**Access the web interface at http://localhost:3020 and select an organization to test!**

## 🏗️ Architecture

```
honey-talker/
├── ht-ai/              # Python FastAPI AI service with RAG
├── ht-backend/         # Node.js TypeScript backend API
├── ht-web/             # React TypeScript frontend
└── README.md           # This file
```

## 🚀 Features

### Core Features
- **🤖 AI Chatbot**: Multi-organization conversational AI with RAG
- **🔍 Vector Search**: MongoDB Atlas Vector Search for semantic retrieval
- **📚 Knowledge Management**: Document ingestion and chunk processing
- **🏢 Organization Support**: Multi-tenant with data isolation
- **⚡ High Performance**: FastAPI and Fastify frameworks
- **🔒 Type Safety**: Full TypeScript and Pydantic validation

### Frontend Features
- **🎨 Modern UI**: Clean, responsive React interface
- **� Responsive Design**: Works on desktop and mobile devices
- **🔄 Dynamic Sidebar**: Collapsible sidebar with icon-only mode
- **🏢 Organization Switching**: Easy organization selection
- **💬 Real-time Chat**: Smooth chat experience with typing indicators
- **🆕 New Chat Sessions**: Quick chat session management
- **📊 Knowledge Management**: Admin interface for knowledge CRUD

### User Experience
- **🎯 Smart Filtering**: Organization-based knowledge filtering
- **📝 Knowledge Dialog**: Intuitive knowledge creation/editing
- **🔄 Auto-scaling Layout**: Dynamic content width based on sidebar state
- **🎨 Consistent Design**: Unified UI across all pages

## �🛠️ Tech Stack

### Backend
- **AI Service**: Python FastAPI + RAG
- **API Service**: Node.js TypeScript + Fastify
- **Database**: MongoDB with Atlas Vector Search
- **AI/ML**: OpenRouter API, OpenAI embeddings

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context
- **Build**: Vite for fast development

### Search
- **Vector Search**: Semantic similarity with 1536 dimensions
- **Fallback**: Text-based search when vector search fails
- **Organization Isolation**: Data separated by org_id

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

# Start web frontend
cd ../ht-web
npm install
npm run dev
```

## 🌐 Web Interface

### Access Points
- **Main Application**: http://localhost:3020
- **Chat Interface**: Built into main application
- **Knowledge Management**: Admin interface for knowledge CRUD
- **Organization Management**: Admin interface for organization management

### Features
- **Organization Selection**: Dropdown to switch between organizations
- **Responsive Sidebar**: Collapsible with smooth animations
- **Knowledge Filtering**: Filter knowledge by organization
- **New Chat Button**: Start fresh conversations
- **Modern UI**: Clean, professional interface

## 📊 API Endpoints

### ht-ai (Port 8020)
- `POST /chat` - Send messages and get AI responses
- `GET /health` - Health check endpoint
- `POST /admin/ingest/knowledge` - Knowledge ingestion
- `POST /admin/ingest/chunk` - Chunk ingestion

### ht-backend (Port 3020)
- `GET /health` - Service health
- `GET /organizations` - Organization CRUD
- `GET /sessions` - Session management
- `GET /messages` - Message persistence
- `GET /knowledge` - Knowledge management
- `GET /knowledge/by-org/:orgId` - Filter knowledge by organization

### ht-web (Port 3020)
- React frontend with integrated chat interface
- Knowledge management interface
- Organization management interface
- Real-time messaging with RAG

## 🔍 Vector Search

- **Index**: `vector_index_v3` with 1536-dimensional embeddings
- **Database**: MongoDB Atlas Vector Search in talkerdb
- **Organization Isolation**: Data separated by org_id
- **Dual Collection Search**: Searches both knowledge and chunks collections
- **Fallback Mechanism**: Text-based search when vector search fails

## 🏢 Multi-Organization Support

- **Hierarchical Structure**: Parent and child organizations
- **Data Isolation**: Separate knowledge bases per organization
- **RAG Context**: Respects organization boundaries
- **UI Organization Switching**: Easy organization selection in frontend

## 📊 Data Flow

1. **Ingestion**: Documents/Chunks → Embeddings → Vector Store (talkerdb)
2. **Query**: User message → Embedding → Vector Search → Context
3. **Response**: Context + Query → LLM → Enhanced AI response
4. **UI Update**: Real-time chat interface updates

## 🎯 Recent Improvements

### UI/UX Enhancements
- **Responsive Sidebar**: Collapsible with icon-only mode (64px ↔ 16px)
- **Dynamic Content Scaling**: Main content adjusts based on sidebar state
- **Smart Icons**: Context-aware toggle buttons (X ↔ ☰)
- **Clean Headers**: Consistent header design across all pages
- **Organization Filtering**: Filter knowledge by organization in Knowledge page

### Functionality Improvements
- **New Chat Button**: Quick chat session management
- **Organization ID Fix**: Corrected org_id handling in knowledge creation
- **System Prompt Update**: Reduced hallucination with better fallback responses
- **Knowledge Dialog**: Moved organization field to top for better UX

### Code Quality
- **Type Safety**: Fixed TypeScript interfaces across all components
- **Consistent Naming**: Standardized on `_id` field for MongoDB documents
- **Error Handling**: Improved error messages and user feedback

## 🎯 Current Status

✅ **Fully Functional RAG System**
- Vector search with MongoDB Atlas
- Knowledge ingestion with automatic embedding
- Multi-organization data isolation
- Real-time contextual responses

✅ **Complete Web Interface**
- Modern React frontend with TypeScript
- Responsive design with Tailwind CSS
- Dynamic sidebar with smooth animations
- Knowledge and organization management interfaces

✅ **Complete Backend Integration**
- ht-ai: Python FastAPI with RAG
- ht-backend: Node.js TypeScript API
- ht-web: React frontend
- Unified talkerdb database
- Comprehensive API coverage

---

**Built with ❤️ for multi-organization AI assistance**
