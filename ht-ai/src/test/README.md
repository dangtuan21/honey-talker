# Test Scripts for ht-ai

This directory contains test scripts for debugging and testing the ht-ai RAG functionality.

## Test Files

### 1. `setup_vector_search.py`
Creates the initial MongoDB Atlas Vector Search index for the chunks collection.
```bash
python setup_vector_search.py
```

### 2. `recreate_vector_search.py`
Drops existing index and recreates it with correct dimensions (1536).
```bash
python recreate_vector_search.py
```

### 3. `test_vector_search.py`
Comprehensive test of the vector search functionality including:
- Embedding generation
- Database connection
- Chunk existence check
- Vector search with org_id filtering
```bash
python test_vector_search.py
```

### 4. `test_simple_search.py`
Simple vector search test without org_id filtering to debug issues.
```bash
python test_simple_search.py
```

## Usage

1. **From the ht-ai root directory**:
   ```bash
   cd src/test
   python test_vector_search.py
   ```

2. **From anywhere** (adds src to path automatically):
   ```bash
   python src/test/test_vector_search.py
   ```

## Prerequisites

- MongoDB Atlas cluster with Vector Search capability
- Proper `.env` file with `MONGODB_URL` configured
- Required Python packages installed

## Index Configuration

- **Index Name**: `vector_index_v2`
- **Dimensions**: 1536 (matches embedding model)
- **Similarity**: Cosine
- **Fields**: `embedding` (vector), `org_id` (filter), `content` (text)

## Troubleshooting

If vector search returns 0 results:
1. Check if the index is fully provisioned in MongoDB Atlas
2. Verify embedding dimensions match (1536)
3. Ensure chunks exist for the specified org_id
4. Check MongoDB connection and permissions
