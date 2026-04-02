#!/usr/bin/env python3
"""
Script to set up MongoDB Atlas Vector Search index for chunks collection
"""

import os
import sys
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

def setup_vector_search_index():
    """Create Vector Search index for chunks collection"""
    
    # Get MongoDB URL from environment
    mongodb_url = os.getenv("MONGODB_URL")
    if not mongodb_url:
        print("Error: MONGODB_URL not found in environment variables")
        print("Please set up your .env file with MONGODB_URL")
        sys.exit(1)
    
    print(f"Connecting to MongoDB...")
    client = MongoClient(mongodb_url)
    
    try:
        # Test connection
        client.admin.command('ping')
        print("✅ Connected to MongoDB successfully")
        
        # Get database and collection
        db = client["talker"]
        chunks_collection = db["chunks"]
        
        # Check if index already exists
        existing_indexes = chunks_collection.list_search_indexes()
        for index in existing_indexes:
            if index.get('name') == 'default':
                print("⚠️  Vector Search index 'default' already exists")
                print("Index details:")
                print(f"  - Name: {index.get('name')}")
                print(f"  - Status: {index.get('status')}")
                print(f"  - Type: {index.get('type')}")
                return
        
        # Create Vector Search index definition
        search_index_model = SearchIndexModel(
            definition={
                "mappings": {
                    "dynamic": True,
                    "fields": {
                        "embedding": {
                            "dimensions": 1536,  # Updated to match embedding model dimensions
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
            name="default"
        )
        
        print("Creating Vector Search index...")
        result = chunks_collection.create_search_index(search_index_model)
        print(f"✅ Vector Search index created with name: {result}")
        
        print("\n⏳ Vector Search index is being created...")
        print("It may take a few minutes to become active.")
        print("You can check the status in MongoDB Atlas UI.")
        
    except Exception as e:
        print(f"❌ Error setting up Vector Search index: {e}")
        print("\nPossible solutions:")
        print("1. Ensure your MongoDB Atlas cluster supports Vector Search")
        print("2. Check that your user has adequate permissions")
        print("3. Verify the MONGODB_URL is correct")
        sys.exit(1)
    
    finally:
        client.close()

if __name__ == "__main__":
    setup_vector_search_index()
