#!/usr/bin/env bash
set -e

# Activate virtual environment
source .venv/bin/activate

# Find an available port: try 8000 first, then 8001
PORT=8000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    PORT=8001
fi

echo "Starting FastAPI server on port $PORT..."
uvicorn main:app --reload --port $PORT
