#!/usr/bin/env python3
"""
Check what's in the talkerdb database
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def check_talkerdb():
    """Check talkerdb database"""
    
    try:
        from pymongo import MongoClient
        
        print("🔍 Checking talkerdb Database...")
        
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        
        # Check talkerdb database
        talkerdb = client["talkerdb"]
        collections = talkerdb.list_collection_names()
        
        print(f"\n📊 Collections in 'talkerdb' database:")
        if collections:
            for collection in collections:
                count = talkerdb[collection].count_documents({})
                print(f"   📄 {collection}: {count} documents")
        else:
            print("   ❌ No collections found")
        
        # Compare with talker database
        talker = client["talker"]
        talker_collections = talker.list_collection_names()
        
        print(f"\n📊 Collections in 'talker' database:")
        for collection in talker_collections:
            count = talker[collection].count_documents({})
            print(f"   📄 {collection}: {count} documents")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_talkerdb()
