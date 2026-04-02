#!/usr/bin/env python3
"""
Check if knowledge documents have embeddings
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def check_knowledge_embeddings():
    """Check if knowledge documents have embeddings"""
    
    try:
        from pymongo import MongoClient
        
        print("🔍 Checking Knowledge Document Embeddings...")
        
        # Get MongoDB connection
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        db = client["talker"]
        
        # Check knowledge collection
        knowledge_collection = db["knowledge"]
        knowledge_docs = list(knowledge_collection.find({"org_id": "test_org"}))
        
        print(f"\n📚 Knowledge Documents for test_org:")
        for doc in knowledge_docs:
            print(f"\n📄 Document: {doc.get('title', 'No title')}")
            print(f"   Fields: {list(doc.keys())}")
            print(f"   Has embedding: {'embedding' in doc}")
            if 'embedding' in doc:
                print(f"   Embedding dimensions: {len(doc['embedding'])}")
            print(f"   Content: {doc.get('content', 'No content')[:100]}...")
        
        # Check chunks collection for comparison
        chunks_collection = db["chunks"]
        chunk_docs = list(chunks_collection.find({"org_id": "test_org"}))
        
        print(f"\n🧩 Chunks for test_org:")
        for chunk in chunk_docs:
            print(f"\n📄 Chunk:")
            print(f"   Fields: {list(chunk.keys())}")
            print(f"   Has embedding: {'embedding' in chunk}")
            if 'embedding' in chunk:
                print(f"   Embedding dimensions: {len(chunk['embedding'])}")
            print(f"   Content: {chunk.get('content', 'No content')[:100]}...")
        
        print(f"\n💡 Conclusion:")
        print(f"   - Knowledge documents: {'HAVE embeddings' if any('embedding' in doc for doc in knowledge_docs) else 'NO embeddings'}")
        print(f"   - Chunks: {'HAVE embeddings' if any('embedding' in chunk for chunk in chunk_docs) else 'NO embeddings'}")
        print(f"   - Vector search only works on documents WITH embeddings")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_knowledge_embeddings()
