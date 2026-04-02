#!/usr/bin/env bash
set -e

# Activate virtual environment
source .venv/bin/activate

# Function to kill processes on a specific port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port)
    if [ -n "$pid" ]; then
        echo "Killing process $pid on port $port..."
        kill -9 $pid 2>/dev/null || true
        sleep 1
    fi
}

# Kill existing processes on ports 8000 and 8001
echo "Checking for existing processes..."
kill_port 8000
kill_port 8001

# Find an available port: try 8000 first, then 8001
PORT=8000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    PORT=8001
fi

echo "Starting FastAPI server on port $PORT..."
cd src && uvicorn main:app --reload --port $PORT
