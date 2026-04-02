from __future__ import annotations

from typing import Any

from pymongo import MongoClient
from pymongo.collection import Collection

from config import get_settings

settings = get_settings()
_client: MongoClient | None = None
_db: Any = None


def get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(settings.mongodb_url)
    return _client


def get_db() -> Any:
    global _db
    if _db is None:
        _db = get_client()["talker"]
    return _db


# Collections
def knowledge() -> Collection:
    return get_db()["knowledge"]


def chunks() -> Collection:
    return get_db()["chunks"]


# Vector search helper (requires Atlas Vector Search index)
def vector_search(school_id: str, query_vector: list[float], limit: int = 5) -> list[dict[str, Any]]:
    pipeline = [
        {
            "$vectorSearch": {
                "queryVector": query_vector,
                "path": "embedding",
                "numCandidates": 100,
                "limit": limit,
                "index": "default",  # make sure you have a Vector Search index named "default"
                "filter": {"school_id": school_id},
            }
        },
        {
            "$project": {
                "content": 1,
                "metadata": 1,
                "score": {"$meta": "vectorSearchScore"},
            }
        },
    ]
    return list(chunks().aggregate(pipeline))
