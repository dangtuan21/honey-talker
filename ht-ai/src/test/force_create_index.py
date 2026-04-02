#!/usr/bin/env python3
"""
Force create Vector Search index for talkerdb
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def force_create_index():
    """Force create Vector Search index"""
    
    try:
        from pymongo import MongoClient
        from pymongo.operations import SearchIndexModel
        
        print("🔧 Force Creating Vector Search Index...")
        
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        db = client["talkerdb"]
        chunks_collection = db["chunks"]
        
        # Drop any existing indexes first
        print("🗑️  Dropping existing indexes...")
        try:
            indexes = chunks_collection.list_search_indexes()
            for index in indexes:
                index_name = index.get('name')
                if index_name:
                    chunks_collection.drop_search_index(index_name)
                    print(f"   Dropped: {index_name}")
        except Exception as e:
            print(f"   No existing indexes to drop: {e}")
        
        # Create new index
        print("📝 Creating new Vector Search index...")
        search_index_model = SearchIndexModel(
            definition={
                "mappings": {
                    "dynamic": True,
                    "fields": {
                        "embedding": {
                            "dimensions": 1536,
                            "similarity": "cosine",
                            "type": "knnVector"
                        },
                        "org_id": {
                            "type": "token"
                        },
                        "content": {
                            "type": "string"
                        }
                    }
                }
            },
            name="vector_index_v3"
        )
        
        result = chunks_collection.create_search_index(search_index_model)
        print(f"✅ Index created: {result}")
        
        # Wait and check status
        import time
        print("⏳ Waiting 30 seconds for index to become active...")
        time.sleep(30)
        
        # Check index status
        print("\n🔍 Checking index status...")
        try:
            indexes = chunks_collection.list_search_indexes()
            for index in indexes:
                print(f"   📄 {index.get('name')}: {index.get('status')} (queryable: {index.get('queryable')})")
        except Exception as e:
            print(f"   ❌ Error checking status: {e}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    force_create_index()
