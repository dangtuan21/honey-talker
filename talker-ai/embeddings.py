from __future__ import annotations

from typing import Any

from openai import OpenAI

from config import get_settings

settings = get_settings()
_openai_client: OpenAI | None = None


def get_openai_client() -> OpenAI:
    global _openai_client
    if _openai_client is None:
        _openai_client = OpenAI(
            api_key=settings.openrouter_api_key,
            base_url=settings.openai_base_url,
        )
    return _openai_client


def embed_text(text: str, model: str = "text-embedding-3-small") -> list[float]:
    client = get_openai_client()
    resp = client.embeddings.create(input=text, model=model)
    return resp.data[0].embedding
