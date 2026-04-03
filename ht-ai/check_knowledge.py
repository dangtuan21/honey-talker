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
    organizations_collection = db['organizations']
    
    print("All Organizations:")
    print("=" * 50)
    
    # Show all organizations
    orgs = list(organizations_collection.find({}))
    for org in orgs:
        org_id = str(org.get('_id'))
        org_name = org.get('name')
        print(f"ID: {org_id}")
        print(f"Name: {org_name}")
        
        # Count knowledge for this org
        knowledge_count = knowledge_collection.count_documents({"org_id": org_id})
        print(f"Knowledge entries: {knowledge_count}")
        print()
    
    # University of Law organization ID
    law_org_id = "69cebe3e552a46abd02c92ab"
    
    print(f"Detailed search for University of Law ({law_org_id}):")
    print("=" * 50)
    
    # Find all knowledge for University of Law
    knowledge_docs = list(knowledge_collection.find({"org_id": law_org_id}))
    
    print(f"Found {len(knowledge_docs)} knowledge entries:")
    print()
    
    for i, doc in enumerate(knowledge_docs, 1):
        print(f"Entry {i}:")
        print(f"  ID: {doc.get('_id')}")
        print(f"  Title: {doc.get('title')}")
        print(f"  Content: {doc.get('content')[:100]}..." if len(doc.get('content', '')) > 100 else f"  Content: {doc.get('content')}")
        print(f"  Source: {doc.get('source')}")
        print(f"  Created: {doc.get('created_at')}")
        print()
    
    # Also check chunks collection
    chunks_collection = db['chunks']
    chunk_docs = list(chunks_collection.find({"org_id": law_org_id}))
    
    print(f"Found {len(chunk_docs)} chunk entries:")
    print()
    
    for i, doc in enumerate(chunk_docs, 1):
        print(f"Chunk {i}:")
        print(f"  ID: {doc.get('_id')}")
        print(f"  Content: {doc.get('content')[:100]}..." if len(doc.get('content', '')) > 100 else f"  Content: {doc.get('content')}")
        print(f"  Metadata: {doc.get('metadata')}")
        print()
    
    client.close()
    
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
