#!/usr/bin/env python3
"""
Migrate data from talker to talkerdb database
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def migrate_to_talkerdb():
    """Migrate RAG data from talker to talkerdb"""
    
    try:
        from pymongo import MongoClient
        
        print("🔄 Migrating Data from 'talker' to 'talkerdb'...")
        
        mongodb_url = os.getenv("MONGODB_URL")
        client = MongoClient(mongodb_url)
        
        source_db = client["talker"]
        target_db = client["talkerdb"]
        
        # Collections to migrate
        collections_to_migrate = ["knowledge", "chunks", "knowledge_docs"]
        
        for collection_name in collections_to_migrate:
            print(f"\n📦 Migrating {collection_name}...")
            
            source_collection = source_db[collection_name]
            target_collection = target_db[collection_name]
            
            # Get all documents from source
            documents = list(source_collection.find({}))
            
            if documents:
                # Clear target collection first
                target_collection.delete_many({})
                
                # Insert documents into target
                target_collection.insert_many(documents)
                
                print(f"   ✅ Migrated {len(documents)} documents")
            else:
                print(f"   ⚠️  No documents found in {collection_name}")
        
        # Verify migration
        print(f"\n🔍 Verification - talkerdb collections:")
        for collection_name in collections_to_migrate:
            count = target_db[collection_name].count_documents({})
            print(f"   📄 {collection_name}: {count} documents")
        
        client.close()
        print(f"\n✅ Migration complete!")
        
    except Exception as e:
        print(f"❌ Migration error: {e}")

if __name__ == "__main__":
    migrate_to_talkerdb()
