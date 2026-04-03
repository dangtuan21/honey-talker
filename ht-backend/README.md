# Honey Talker Backend (ht-backend)

A Fastify-based TypeScript backend service for managing multi-organization chatbot operations, user sessions, message persistence, and knowledge management.

## Features

- **Multi-Organization Management**: Support for multiple educational organizations
- **User Session Management**: Handle user sessions and authentication
- **Message Persistence**: Store and retrieve chat messages
- **Knowledge Management**: Full CRUD operations for knowledge items
- **Organization Management**: Manage organizations and organizational data
- **RESTful API**: Clean, typed API endpoints
- **MongoDB Integration**: Scalable data persistence
- **CORS Support**: Cross-origin resource sharing
- **Type Safety**: Full TypeScript validation

## Tech Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Zod schemas
- **Development**: tsx for hot reloading

## Collections

- **organizations**: Organization metadata, names, aliases
- **knowledge**: Knowledge documents with organization association
- **chat_sessions**: Per-user/organization session tracking
- **chat_messages**: Full Q&A logs with routing/retrieval/LLM metadata

## API Endpoints

### Health
- `GET /health` - Service health check

### Organizations
- `GET /organizations` - List all organizations (both parent and child)
- `POST /organizations` - Create new organization (parent or child)
- `GET /organizations/:id` - Get organization details
- `PUT /organizations/:id` - Update organization
- `DELETE /organizations/:id` - Delete organization

### Knowledge Management
- `GET /knowledge` - List all knowledge items
- `GET /knowledge/:id` - Get specific knowledge item
- `GET /knowledge/by-org/:orgId` - Filter knowledge by organization
- `POST /knowledge` - Create new knowledge item
- `PUT /knowledge/:id` - Update existing knowledge item
- `DELETE /knowledge/:id` - Delete knowledge item
- `DELETE /knowledge/by-org/:orgId` - Delete all knowledge for an organization

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
```typescript
interface Organization {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  knowledgeCount: number;
}
```

### Knowledge
```typescript
interface Knowledge {
  _id: string;
  title: string;
  content: string;
  org_id: string;
  source: {
    type: string;
    url?: string;
  };
  status: 'active' | 'processed';
  created_at: string;
  updated_at: string;
}
```

### Session
```typescript
interface Session {
  id: string;
  userId: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### Message
```typescript
interface Message {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  metadata: object;
  createdAt: Date;
}
```

## Knowledge Management API

### Get All Knowledge
```bash
curl http://localhost:3020/knowledge
```

### Get Knowledge by Organization
```bash
curl http://localhost:3020/knowledge/by-org/69ce68f2a749764b8e5f9b42
```

### Create Knowledge
```bash
curl -X POST http://localhost:3020/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Library Hours",
    "content": "The library is open Monday-Friday 9 AM to 8 PM",
    "org_id": "69ce68f2a749764b8e5f9b42",
    "source": { "type": "manual" }
  }'
```

### Update Knowledge
```bash
curl -X PUT http://localhost:3020/knowledge/69ced12063bd62a61fba69c7 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Library Hours",
    "content": "The library is open Monday-Friday 9 AM to 9 PM",
    "org_id": "69ce68f2a749764b8e5f9b42",
    "source": { "type": "manual" }
  }'
```

### Delete Knowledge
```bash
curl -X DELETE http://localhost:3020/knowledge/69ced12063bd62a61fba69c7
```

### Delete All Knowledge for Organization
```bash
curl -X DELETE http://localhost:3020/knowledge/by-org/69ce68f2a749764b8e5f9b42
```

## Architecture

- **Service Layer**: Business logic separation
- **Data Access**: MongoDB with typed schemas
- **Validation**: Zod for request/response validation
- **Error Handling**: Centralized error management
- **Logging**: Structured logging with Fastify

## Integration

The backend works in conjunction with:
- **ht-ai**: AI chatbot service with RAG capabilities
- **ht-web**: React frontend with organization switching
- **MongoDB**: Data persistence and knowledge storage

## Recent Improvements

### Knowledge Management
- **Full CRUD Operations**: Complete knowledge lifecycle management
- **Organization Filtering**: Filter knowledge by organization ID
- **Bulk Operations**: Delete all knowledge for an organization
- **Type Safety**: Strongly typed interfaces for all models

### API Enhancements
- **Consistent ID Format**: Standardized on `_id` field from MongoDB
- **Better Error Handling**: Improved error messages and status codes
- **Validation**: Enhanced request validation with Zod schemas
- **Documentation**: Clearer API documentation and examples

### Frontend Integration
- **React Components**: Designed to work with React frontend
- **Real-time Updates**: Immediate UI updates after CRUD operations
- **Organization Context**: Proper organization isolation in all operations

## Scripts

- `npm run dev`: Start with tsx watch
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Run compiled `dist/index.js`
- `npm run clean`: Remove `dist/`

## Usage Examples

### Frontend Integration
```typescript
// Fetch knowledge for specific organization
const response = await fetch(`/knowledge/by-org/${orgId}`);
const knowledge = await response.json();

// Create new knowledge item
const newKnowledge = await fetch('/knowledge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Knowledge',
    content: 'Knowledge content',
    org_id: orgId,
    source: { type: 'manual' }
  })
});
```

### Organization Management
```typescript
// Get all organizations
const orgs = await fetch('/organizations').then(r => r.json());

// Create new organization
const newOrg = await fetch('/organizations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Organization',
    description: 'Organization description'
  })
});
```

## Error Handling

The API provides consistent error responses:

```json
{
  "error": "Knowledge not found",
  "statusCode": 404
}
```

Common error codes:
- `400`: Bad Request (validation errors)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error (database or server issues)
