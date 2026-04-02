#!/usr/bin/env python3
"""
Verify MongoDB connection and show exact connection details
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def verify_mongodb_connection():
    """Show exact MongoDB connection details and collections"""
    
    try:
        from pymongo import MongoClient
        
        print("🔍 MongoDB Connection Verification")
        print("=" * 50)
        
        # Show connection details
        mongodb_url = os.getenv("MONGODB_URL")
        print(f"📡 MongoDB URL: {mongodb_url}")
        
        # Parse connection string to show details
        if "mongodb+srv://" in mongodb_url:
            print("🔐 Connection Type: MongoDB Atlas (SRV)")
        elif "mongodb://" in mongodb_url:
            print("🔐 Connection Type: MongoDB Direct")
        
        # Connect and show database info
        client = MongoClient(mongodb_url)
        
        # Test connection
        try:
            client.admin.command('ping')
            print("✅ Connection: SUCCESS")
        except Exception as e:
            print(f"❌ Connection: FAILED - {e}")
            return
        
        # Show all databases
        print(f"\n📊 Available Databases:")
        databases = client.list_database_names()
        for db_name in databases:
            print(f"   - {db_name}")
        
        # Focus on talker database
        if "talker" in databases:
            db = client["talker"]
            print(f"\n📚 Collections in 'talker' database:")
            
            collections = db.list_collection_names()
            for collection in collections:
                count = db[collection].count_documents({})
                print(f"   📄 {collection}: {count} documents")
                
                # Show sample document structure
                if count > 0:
                    sample = db[collection].find_one()
                    print(f"      Fields: {list(sample.keys())}")
                    
                    # Check for knowledge collection specifically
                    if collection == "knowledge":
                        print(f"      ✅ FOUND KNOWLEDGE COLLECTION!")
                        print(f"      Sample document:")
                        for key, value in list(sample.items())[:3]:  # Show first 3 items
                            if key != 'embedding':  # Skip embedding for readability
                                print(f"         {key}: {str(value)[:50]}...")
                        if 'embedding' in sample:
                            print(f"         embedding: [{len(sample['embedding'])} dimensions]")
        else:
            print(f"\n❌ 'talker' database not found!")
            print(f"   Available databases: {databases}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    verify_mongodb_connection()
