# Sample Data Files

This folder contains sample documents to test the file upload knowledge ingestion functionality.

## Files Available

### 1. `sample_campus_facilities.pdf` (NEW)
- **Content**: Comprehensive guide to athletic facilities, library, dining, and health services
- **Size**: ~3,000 characters
- **Format**: PDF document with proper formatting
- **Use Case**: Test PDF file upload and extraction

### 2. `sample_student_organizations.docx` (NEW)
- **Content**: Complete guide to student organizations including academic, cultural, sports, and arts groups
- **Size**: ~2,500 characters
- **Format**: Word document with headings and formatting
- **Use Case**: Test DOCX file upload and extraction

### 3. `sample_university_handbook.txt`
- **Content**: Complete student handbook with academic policies, student services, campus life, safety procedures, and financial information
- **Size**: ~4,000 characters
- **Use Case**: Test comprehensive document ingestion and Q&A about university policies

### 4. `sample_research_guidelines.txt`
- **Content**: Research procedures, ethics guidelines, data management, publication policies, and compliance requirements
- **Size**: ~3,500 characters  
- **Use Case**: Test academic research-related queries and compliance questions

### 5. `sample_it_services.txt`
- **Content**: IT services guide covering accounts, Wi-Fi, software, VPN, printing, security, and support procedures
- **Size**: ~4,500 characters
- **Use Case**: Test technical support queries and IT-related questions

## Usage Examples

### Upload via curl:
```bash
# Upload PDF file (campus facilities)
curl -X POST "http://localhost:8000/admin/ingest/file" \
  -F "file=@data/sample_campus_facilities.pdf" \
  -F "org_id=test_org" \
  -F "title=Campus Facilities Guide"

# Upload DOCX file (student organizations)
curl -X POST "http://localhost:8000/admin/ingest/file" \
  -F "file=@data/sample_student_organizations.docx" \
  -F "org_id=test_org" \
  -F "title=Student Organizations Guide"

# Upload university handbook
curl -X POST "http://localhost:8000/admin/ingest/file" \
  -F "file=@data/sample_university_handbook.txt" \
  -F "org_id=test_org" \
  -F "title=University Student Handbook"

# Upload research guidelines  
curl -X POST "http://localhost:8000/admin/ingest/file" \
  -F "file=@data/sample_research_guidelines.txt" \
  -F "org_id=test_org" \
  -F "title=Research Guidelines"

# Upload IT services guide
curl -X POST "http://localhost:8000/admin/ingest/file" \
  -F "file=@data/sample_it_services.txt" \
  -F "org_id=test_org" \
  -F "title=IT Services Guide"
```

### Test Questions:
After uploading, you can ask questions like:

**Campus Facilities (PDF):**
- "What are the recreation center hours?"
- "How do I access the swimming pool?"
- "Where is the main library located?"
- "What dining options are available?"

**Student Organizations (DOCX):**
- "How do I join the engineering club?"
- "What cultural organizations are available?"
- "When is the drama club meeting?"
- "How can I start a new student organization?"

## File Formats

Sample files are available in all supported formats:
- PDF files (.pdf) - sample_campus_facilities.pdf
- Word documents (.docx) - sample_student_organizations.docx
- Text files (.txt) - sample_university_handbook.txt, sample_research_guidelines.txt, sample_it_services.txt

## Testing RAG Functionality

1. Upload one or more sample files
2. Wait 1-2 minutes for vector search indexing
3. Ask questions related to the content
4. Verify that the AI uses information from the uploaded documents

## Expected Results

- Files should be successfully processed and stored with embeddings
- Vector search should retrieve relevant content from uploaded documents
- Chat responses should incorporate information from the uploaded knowledge
- Organization isolation should work (documents only available to specified org_id)
