#!/usr/bin/env python3
"""
Check what collections actually exist in the database
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def check_collections():
    """Check all collections in the database"""
    
    try:
        from pymongo import MongoClient
        
        print("🔍 Checking Database Collections...")
        
        # Get MongoDB connection
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        db = client["talker"]
        
        # List all collections
        collections = db.list_collection_names()
        
        print(f"\n📊 Collections in 'talker' database:")
        for collection in collections:
            count = db[collection].count_documents({})
            print(f"   - {collection}: {count} documents")
            
            # Show sample document if collection has data
            if count > 0:
                sample = db[collection].find_one()
                print(f"     Sample fields: {list(sample.keys())}")
        
        # Specifically check for knowledge collection
        if "knowledge" in collections:
            print(f"\n📚 Knowledge Collection Details:")
            knowledge_docs = list(db["knowledge"].find({"org_id": "test_org"}))
            print(f"   Documents for test_org: {len(knowledge_docs)}")
            for doc in knowledge_docs:
                print(f"   - {doc.get('title', 'No title')}")
        else:
            print(f"\n❌ 'knowledge' collection does not exist!")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_collections()
