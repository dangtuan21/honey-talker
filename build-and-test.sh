#!/bin/bash

echo "🐳 Honey Talker Docker Build & Test Script"
echo "=========================================="

# Check if Docker is running
if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Docker is running!"

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down --remove-orphans 2>/dev/null || true

# Build all services
echo "🔨 Building all Docker images..."
docker-compose build --parallel

# Start all services
echo "🚀 Starting all services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🏥 Checking service health..."
docker-compose ps

# Test endpoints
echo "🧪 Testing service endpoints..."

echo "Testing ht-ai (port 8020)..."
if curl -f http://localhost:8020/health > /dev/null 2>&1; then
    echo "✅ ht-ai is healthy"
else
    echo "❌ ht-ai is not responding"
fi

echo "Testing ht-backend (port 3020)..."
if curl -f http://localhost:3020/health > /dev/null 2>&1; then
    echo "✅ ht-backend is healthy"
else
    echo "❌ ht-backend is not responding"
fi

echo "Testing ht-web (port 4020)..."
if curl -f http://localhost:4020 > /dev/null 2>&1; then
    echo "✅ ht-web is healthy"
else
    echo "❌ ht-web is not responding"
fi

echo "Testing ht-site-example (port 5020)..."
if curl -f http://localhost:5020 > /dev/null 2>&1; then
    echo "✅ ht-site-example is healthy"
else
    echo "❌ ht-site-example is not responding"
fi

echo ""
echo "📊 Service Logs:"
docker-compose logs --tail=5

echo ""
echo "🎉 Build & Test Complete!"
echo "Access your services:"
echo "- ht-ai: http://localhost:8020"
echo "- ht-backend: http://localhost:3020" 
echo "- ht-web: http://localhost:4020"
echo "- ht-site-example: http://localhost:5020"
echo ""
echo "View logs with: docker-compose logs -f"
echo "Stop services with: docker-compose down"
