from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class Source(BaseModel):
    type: str
    url: str | None = None


class Knowledge(BaseModel):
    _id: str
    org_id: str
    title: str
    source: Source
    content: str
    status: str  # e.g., "processed", "pending"
    created_at: datetime


class ChunkMetadata(BaseModel):
    type: str | None = None
    section: str | None = None
    language: str | None = None


class Chunk(BaseModel):
    _id: str
    org_id: str
    document_id: str
    content: str
    embedding: list[float]
    metadata: ChunkMetadata
    created_at: datetime


class RetrievedChunk(BaseModel):
    content: str
    metadata: ChunkMetadata
    score: float | None = None


# Request DTOs
class IngestKnowledgeRequest(BaseModel):
    org_id: str
    title: str
    source: Source
    content: str


class IngestChunkRequest(BaseModel):
    org_id: str
    document_id: str
    content: str
    metadata: ChunkMetadata
