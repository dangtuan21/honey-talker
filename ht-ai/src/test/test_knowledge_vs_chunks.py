#!/usr/bin/env python3
"""
Test to understand the difference between knowledge and chunks collections
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def test_knowledge_vs_chunks():
    """Test knowledge vs chunks collections"""
    
    try:
        from pymongo import MongoClient
        from embeddings import embed_text
        
        print("🔍 Testing Knowledge vs Chunks Collections...")
        
        # Get MongoDB connection
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        db = client["talker"]
        
        # Check knowledge collection
        knowledge_collection = db["knowledge"]
        knowledge_docs = list(knowledge_collection.find({"org_id": "test_org"}))
        
        print(f"\n📚 Knowledge Collection:")
        print(f"   Total documents: {len(knowledge_docs)}")
        for doc in knowledge_docs:
            print(f"   - {doc.get('title', 'No title')}: {doc.get('content', 'No content')[:50]}...")
        
        # Check chunks collection
        chunks_collection = db["chunks"]
        chunk_docs = list(chunks_collection.find({"org_id": "test_org"}))
        
        print(f"\n🧩 Chunks Collection:")
        print(f"   Total chunks: {len(chunk_docs)}")
        for chunk in chunk_docs:
            print(f"   - {chunk.get('content', 'No content')[:50]}...")
        
        # Test vector search on chunks
        print(f"\n🔍 Vector Search Test:")
        query = "library hours"
        embedding = embed_text(query)
        
        from db import vector_search
        results = vector_search("test_org", embedding, limit=5)
        
        print(f"   Retrieved {len(results)} chunks:")
        for i, result in enumerate(results):
            print(f"   {i+1}. {result.get('content', 'No content')[:80]}...")
            print(f"      Score: {result.get('score', 'No score')}")
        
        # Check if knowledge docs are being chunked/embedded
        print(f"\n❓ Issue Analysis:")
        print(f"   - Knowledge documents are stored in 'knowledge' collection")
        print(f"   - Vector search only searches 'chunks' collection")
        print(f"   - Knowledge documents need to be chunked to be searchable")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_knowledge_vs_chunks()
