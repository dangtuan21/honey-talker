#!/usr/bin/env python3
"""
Script to drop and recreate MongoDB Atlas Vector Search index with correct dimensions
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def recreate_vector_search_index():
    """Drop existing index and recreate with correct dimensions"""
    
    try:
        from pymongo import MongoClient
        
        # Get MongoDB URL from environment
        mongodb_url = os.getenv("MONGODB_URL")
        if not mongodb_url:
            print("Error: MONGODB_URL not found in environment variables")
            sys.exit(1)
        
        print(f"Connecting to MongoDB...")
        client = MongoClient(mongodb_url)
        db = client["talker"]
        chunks_collection = db["chunks"]
        
        # Drop existing index
        print("Dropping existing Vector Search index...")
        try:
            chunks_collection.drop_search_index("default")
            print("✅ Dropped existing index")
        except Exception as e:
            print(f"⚠️  Could not drop index (may not exist): {e}")
        
        # Create new index with correct dimensions
        from pymongo.operations import SearchIndexModel
        
        search_index_model = SearchIndexModel(
            definition={
                "mappings": {
                    "dynamic": True,
                    "fields": {
                        "embedding": {
                            "dimensions": 1536,  # Correct dimensions for embedding model
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
            name="vector_index_v2"
        )
        
        print("Creating new Vector Search index with 1536 dimensions...")
        result = chunks_collection.create_search_index(search_index_model)
        print(f"✅ Vector Search index created with name: {result}")
        
        print("\n⏳ Vector Search index is being created...")
        print("It may take a few minutes to become active.")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    recreate_vector_search_index()
