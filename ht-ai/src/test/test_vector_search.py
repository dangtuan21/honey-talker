#!/usr/bin/env python3
"""
Test script to debug vector search functionality
"""

import os
import sys
from dotenv import load_dotenv

# Add src to path
sys.path.append('src')

load_dotenv()

def test_vector_search():
    """Test vector search functionality"""
    
    try:
        from db import get_db, chunks
        from embeddings import embed_text
        
        print("🔍 Testing Vector Search...")
        
        # Test embedding generation
        print("\n1. Testing embedding generation...")
        query = "test knowledge content"
        embedding = embed_text(query)
        print(f"   ✅ Generated embedding with {len(embedding)} dimensions")
        
        # Test database connection
        print("\n2. Testing database connection...")
        db = get_db()
        print("   ✅ Connected to database")
        
        # Check if chunks exist
        print("\n3. Checking chunks in database...")
        chunks_collection = chunks()
        total_chunks = chunks_collection.count_documents({})
        org_chunks = chunks_collection.count_documents({"org_id": "test_org"})
        print(f"   📊 Total chunks: {total_chunks}")
        print(f"   📊 Chunks for test_org: {org_chunks}")
        
        if org_chunks == 0:
            print("   ⚠️  No chunks found for test_org")
            print("   💡 Run the ingestion first:")
            print("       curl -X POST 'http://localhost:8000/admin/ingest/chunk' ...")
            return
        
        # Show sample chunk
        sample_chunk = chunks_collection.find_one({"org_id": "test_org"})
        if sample_chunk:
            print(f"   📄 Sample chunk found with embedding: {type(sample_chunk.get('embedding'))}")
            if 'embedding' in sample_chunk:
                print(f"   📏 Embedding dimensions: {len(sample_chunk['embedding'])}")
        
        # Test vector search
        print("\n4. Testing vector search...")
        from db import vector_search
        
        try:
            results = vector_search("test_org", embedding, limit=3)
            print(f"   ✅ Vector search returned {len(results)} results")
            
            for i, result in enumerate(results):
                print(f"   📄 Result {i+1}: {result.get('content', 'No content')[:50]}...")
                if 'score' in result:
                    print(f"   📊 Score: {result['score']}")
                    
        except Exception as e:
            print(f"   ❌ Vector search failed: {e}")
            print("   💡 This might be due to:")
            print("      - Vector Search index still provisioning")
            print("      - Index definition mismatch")
            print("      - Permission issues")
            
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("💡 Make sure you're running this from the ht-ai directory")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_vector_search()
