# Honey Talker Backend (ht-backend)

A Fastify-based TypeScript backend service for managing multi-school chatbot operations, user sessions, and message persistence.

## Features

- **Multi-School Management**: Support for multiple educational organizations
- **User Session Management**: Handle user sessions and authentication
- **Message Persistence**: Store and retrieve chat messages
- **Organization Management**: Manage schools and organizational data
- **RESTful API**: Clean, typed API endpoints
- **MongoDB Integration**: Scalable data persistence
- **CORS Support**: Cross-origin resource sharing

## Tech Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Zod schemas
- **Development**: tsx for hot reloading

## Collections

- **orgs**: Organization metadata, names, aliases
- **chat_sessions**: Per-user/organization session tracking
- **chat_messages**: Full Q&A logs with routing/retrieval/LLM metadata

## API Endpoints

### Health
- `GET /health` - Service health check

### Organizations
- `GET /orgs` - List all organizations
- `POST /orgs` - Create new organization
- `GET /orgs/:id` - Get organization details
- `PUT /orgs/:id` - Update organization
- `DELETE /orgs/:id` - Delete organization

### Schools
- `GET /schools` - List all schools
- `POST /schools` - Create new school
- `GET /schools/:id` - Get school details
- `PUT /schools/:id` - Update school
- `DELETE /schools/:id` - Delete school

### Sessions
- `GET /sessions` - List user sessions
- `POST /sessions` - Create new session
- `GET /sessions/:id` - Get session details
- `PUT /sessions/:id` - Update session
- `DELETE /sessions/:id` - Delete session

### Messages
- `GET /messages` - List messages
- `POST /messages` - Send message
- `GET /messages/:id` - Get message details
- `GET /messages/by-session/:sessionId` - Get messages by session

## Setup

```bash
# Install deps
npm install

# Copy .env and configure
cp .env.example .env
# Edit .env with your MongoDB URL and settings

# Run in dev
npm run dev

# Build and run prod
npm run build
npm start
```

## Configuration

Environment variables:

- `MONGODB_URL`: Full MongoDB connection string
- `DATABASE_NAME`: Database name (default: talker)
- `PORT`: Server port (default: 3000)
- `HOST`: Bind host (default: 0.0.0.0)
- `CORS_ORIGIN`: Allowed origins (default: *)

## Data Models

### Organization
- id: string
- name: string
- description: string
- createdAt: Date
- updatedAt: Date

### School
- id: string
- organizationId: string
- name: string
- settings: object
- createdAt: Date
- updatedAt: Date

### Session
- id: string
- userId: string
- schoolId: string
- createdAt: Date
- updatedAt: Date
- isActive: boolean

### Message
- id: string
- sessionId: string
- role: 'user' | 'assistant'
- content: string
- metadata: object
- createdAt: Date

## Architecture

- **Service Layer**: Business logic separation
- **Data Access**: MongoDB with typed schemas
- **Validation**: Zod for request/response validation
- **Error Handling**: Centralized error management
- **Logging**: Structured logging with Fastify

## Development

The backend works in conjunction with:
- **ht-ai**: AI chatbot service with RAG capabilities
- **Frontend**: Web interface for user interactions

## Scripts

- `npm run dev`: Start with tsx watch
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Run compiled `dist/index.js`
- `npm run clean`: Remove `dist/`
