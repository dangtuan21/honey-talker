#!/usr/bin/env python3
"""
Check Vector Search index status
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def check_index_status():
    """Check Vector Search index status"""
    
    try:
        from pymongo import MongoClient
        
        print("🔍 Checking Vector Search Index Status...")
        
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        db = client["talkerdb"]
        chunks_collection = db["chunks"]
        
        # List all search indexes
        print(f"\n📊 Search Indexes on chunks collection:")
        try:
            indexes = chunks_collection.list_search_indexes()
            for index in indexes:
                print(f"   📄 Index: {index.get('name')}")
                print(f"      Status: {index.get('status')}")
                print(f"      Type: {index.get('type')}")
                print(f"      Queryable: {index.get('queryable')}")
        except Exception as e:
            print(f"   ❌ Error listing indexes: {e}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_index_status()
