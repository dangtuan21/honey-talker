#!/usr/bin/env python3
"""
Simple test without org_id filter
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def test_simple_search():
    """Test vector search without org_id filter"""
    
    try:
        from pymongo import MongoClient
        from embeddings import embed_text
        
        print("🔍 Testing Simple Vector Search (no filter)...")
        
        # Get MongoDB connection
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        db = client["talker"]
        chunks_collection = db["chunks"]
        
        # Test embedding
        query = "test knowledge content"
        embedding = embed_text(query)
        print(f"   ✅ Generated embedding with {len(embedding)} dimensions")
        
        # Test simple vector search without filter
        pipeline = [
            {
                "$search": {
                    "index": "vector_index_v2",
                    "knnBeta": {
                        "vector": embedding,
                        "path": "embedding",
                        "k": 3
                    }
                }
            },
            {
                "$project": {
                    "content": 1,
                    "org_id": 1,
                    "score": {"$meta": "searchScore"},
                }
            }
        ]
        
        print("\n🔍 Testing vector search without org_id filter...")
        results = list(chunks_collection.aggregate(pipeline))
        print(f"   ✅ Found {len(results)} results")
        
        for i, result in enumerate(results):
            print(f"   📄 Result {i+1}:")
            print(f"      Content: {result.get('content', 'No content')[:50]}...")
            print(f"      Org ID: {result.get('org_id', 'No org_id')}")
            print(f"      Score: {result.get('score', 'No score')}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_simple_search()
