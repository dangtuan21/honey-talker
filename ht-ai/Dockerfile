FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    lsof \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create virtual environment
RUN python -m venv .venv
RUN .venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Make start scripts executable with proper permissions
RUN chmod +x start.sh start-docker.sh

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Expose port
EXPOSE 8020

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8020/health || exit 1

# Start the application using docker-specific start script
CMD ["./start-docker.sh"]
