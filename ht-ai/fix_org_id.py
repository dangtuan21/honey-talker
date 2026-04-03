#!/usr/bin/env python3

import os
from pymongo import MongoClient
from dotenv import load_dotenv

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
    knowledge_collection = db['knowledge']
    
    # Update the University Library Hours entry
    result = knowledge_collection.update_one(
        {"org_id": "University of Law"},
        {"$set": {"org_id": "69cebe3e552a46abd02c92ab"}}
    )
    
    print(f"Updated {result.modified_count} documents")
    
    if result.modified_count > 0:
        print("Successfully updated org_id from 'University of Law' to '69cebe3e552a46abd02c92ab'")
    else:
        print("No documents found with org_id 'University of Law'")
    
    client.close()
    
except Exception as e:
    print(f"Error: {e}")
