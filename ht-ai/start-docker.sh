#!/usr/bin/env bash
set -e

# Activate virtual environment
source .venv/bin/activate

# Start FastAPI server on port 8020
echo "Starting FastAPI server on port 8020..."
cd src && uvicorn main:app --host 0.0.0.0 --port 8020
