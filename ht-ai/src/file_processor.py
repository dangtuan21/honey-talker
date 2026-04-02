"""
File processing utilities for document text extraction
"""

import os
import tempfile
from typing import Optional
import PyPDF2
from docx import Document


def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from PDF file"""
    text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error processing PDF: {str(e)}")


def extract_text_from_docx(file_path: str) -> str:
    """Extract text from DOCX file"""
    try:
        doc = Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error processing DOCX: {str(e)}")


def extract_text_from_txt(file_path: str) -> str:
    """Extract text from TXT file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read().strip()
    except UnicodeDecodeError:
        # Try with different encoding
        try:
            with open(file_path, 'r', encoding='latin-1') as file:
                return file.read().strip()
        except Exception as e:
            raise ValueError(f"Error processing TXT file: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error processing TXT file: {str(e)}")


def extract_text_from_file(file_path: str) -> str:
    """
    Extract text from various file types
    
    Supported formats:
    - PDF (.pdf)
    - Word Document (.docx)
    - Text file (.txt)
    """
    if not os.path.exists(file_path):
        raise ValueError("File does not exist")
    
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == '.pdf':
        return extract_text_from_pdf(file_path)
    elif file_extension == '.docx':
        return extract_text_from_docx(file_path)
    elif file_extension == '.txt':
        return extract_text_from_txt(file_path)
    else:
        raise ValueError(f"Unsupported file format: {file_extension}. Supported formats: .pdf, .docx, .txt")


def get_file_metadata(file_path: str) -> dict:
    """Get basic file metadata"""
    if not os.path.exists(file_path):
        raise ValueError("File does not exist")
    
    stat = os.stat(file_path)
    return {
        "filename": os.path.basename(file_path),
        "size": stat.st_size,
        "extension": os.path.splitext(file_path)[1].lower(),
        "created": stat.st_ctime,
        "modified": stat.st_mtime
    }


def validate_file_size(file_size: int, max_size_mb: int = 10) -> bool:
    """Validate file size is within limits"""
    max_size_bytes = max_size_mb * 1024 * 1024
    return file_size <= max_size_bytes


def validate_file_type(filename: str) -> bool:
    """Validate file type is supported"""
    supported_extensions = {'.pdf', '.docx', '.txt'}
    extension = os.path.splitext(filename)[1].lower()
    return extension in supported_extensions
