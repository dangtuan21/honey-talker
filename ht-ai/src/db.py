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
        _db = get_client()["talkerdb"]
    return _db


# Collections
def knowledge() -> Collection:
    return get_db()["knowledge"]


def chunks() -> Collection:
    return get_db()["chunks"]


# Vector search helper (requires Atlas Vector Search index)
def vector_search(org_id: str, query_vector: list[float], limit: int = 5) -> list[dict[str, Any]]:
    # Search chunks collection
    chunks_pipeline = [
        {
            "$search": {
                "index": "vector_index_v3",
                "knnBeta": {
                    "vector": query_vector,
                    "path": "embedding",
                    "k": limit,
                    "filter": {
                        "equals": {
                            "value": org_id,
                            "path": "org_id"
                        }
                    }
                }
            }
        },
        {
            "$project": {
                "content": 1,
                "metadata": 1,
                "score": {"$meta": "searchScore"},
                "source": "chunks"
            }
        },
    ]
    
    # Search knowledge collection
    knowledge_pipeline = [
        {
            "$search": {
                "index": "vector_index_v3",
                "knnBeta": {
                    "vector": query_vector,
                    "path": "embedding",
                    "k": limit,
                    "filter": {
                        "equals": {
                            "value": org_id,
                            "path": "org_id"
                        }
                    }
                }
            }
        },
        {
            "$project": {
                "content": 1,
                "title": 1,
                "score": {"$meta": "searchScore"},
                "source": "knowledge"
            }
        },
    ]
    
    # Get results from both collections
    chunks_results = list(chunks().aggregate(chunks_pipeline))
    knowledge_results = list(knowledge().aggregate(knowledge_pipeline))
    
    # Combine and sort by score
    all_results = chunks_results + knowledge_results
    all_results.sort(key=lambda x: x.get('score', 0), reverse=True)
    
    return all_results[:limit]
