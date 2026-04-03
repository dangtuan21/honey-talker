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
    
    # Add knowledge entries from the sports_university data folder
    data_folder = os.path.join(os.path.dirname(__file__), 'data', 'sports_university')
    
    org_id = '69cff9af13ff4df382ad11ff'  # DH TD TT TP HCM
    
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
    
    print(f"\nSports University knowledge setup complete!")
    print(f"Org ID: {org_id}")
    print(f"Knowledge entries added from: {data_folder}")
    
    client.close()
    
except Exception as e:
    print(f"Error: {e}")
