#!/usr/bin/env python3

import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()

# Get MongoDB URL
mongodb_url = os.getenv("MONGODB_URL")
if not mongodb_url:
    print("Error: MONGODB_URL not found in environment")
    exit(1)

try:
    # Connect to MongoDB
    client = MongoClient(mongodb_url)
    db = client['talkerdb']
    org_collection = db['organizations']
    knowledge_collection = db['knowledge']
    
    # Check if economics_university org already exists
    existing_org = org_collection.find_one({"name": "economics_university"})
    if existing_org:
        print(f"Organization 'economics_university' already exists with ID: {existing_org['_id']}")
        org_id = existing_org['_id']
    else:
        # Create economics_university organization
        org_data = {
            "name": "economics_university",
            "aliases": ["Đại học Kinh tế Quốc dân", "NEU", "National Economics University"],
            "description": "Đại học Kinh tế Quốc dân - Trường hàng đầu về kinh tế tại Việt Nam",
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        result = org_collection.insert_one(org_data)
        org_id = str(result.inserted_id)
        print(f"Created economics_university organization with ID: {org_id}")
    
    # Add knowledge entries from the economics_university data folder
    data_folder = os.path.join(os.path.dirname(__file__), 'data', 'economics_university')
    
    if os.path.exists(data_folder):
        for filename in os.listdir(data_folder):
            if filename.endswith('.txt'):
                file_path = os.path.join(data_folder, filename)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if this knowledge already exists
                existing_knowledge = knowledge_collection.find_one({
                    "org_id": org_id,
                    "title": filename
                })
                
                if not existing_knowledge:
                    knowledge_data = {
                        "org_id": org_id,
                        "title": filename,
                        "content": content,
                        "source": {"type": "file_upload", "url": None},
                        "created_at": datetime.utcnow().isoformat(),
                        "updated_at": datetime.utcnow().isoformat()
                    }
                    
                    knowledge_collection.insert_one(knowledge_data)
                    print(f"Added knowledge entry: {filename}")
                else:
                    print(f"Knowledge entry already exists: {filename}")
    
    print(f"\nEconomics University setup complete!")
    print(f"Org ID: {org_id}")
    print(f"Knowledge entries added from: {data_folder}")
    
    client.close()
    
except Exception as e:
    print(f"Error: {e}")
