# talker-backend

Multi-school chatbot backend with MongoDB, built with Node.js + TypeScript + Fastify.

## Collections

- **schools**: School metadata, names, aliases
- **chat_sessions**: Per-user/school session tracking
- **chat_messages**: Full Q&A logs with routing/retrieval/LLM metadata

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

## API Routes

- `GET /health`
- `GET/POST/PUT/DELETE /schools`
- `GET/POST/DELETE /sessions`
- `GET/POST/DELETE /messages`
- `GET /messages/by-session/:sessionId`

## Environment

- `MONGODB_URL`: Full MongoDB connection string
- `DATABASE_NAME`: Database name (default: talker)
- `PORT`: Server port (default: 3000)
- `HOST`: Bind host (default: 0.0.0.0)
- `CORS_ORIGIN`: Allowed origins (default: *)

## Scripts

- `npm run dev`: Start with tsx watch
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Run compiled `dist/index.js`
- `npm run clean`: Remove `dist/`
