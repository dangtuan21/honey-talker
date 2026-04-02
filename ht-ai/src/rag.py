from __future__ import annotations

from typing import Any

from db import vector_search
from embeddings import embed_text
from schemas import RetrievedChunk


def retrieve_chunks(org_id: str, query: str, top_k: int = 5) -> list[RetrievedChunk]:
    """Retrieve top-k chunks for an organization and query."""
    q_emb = embed_text(query)
    results = vector_search(org_id, q_emb, limit=top_k)
    return [RetrievedChunk(**r) for r in results]


def build_contextual_prompt(system_prompt: str, chunks: list[RetrievedChunk], user_message: str) -> str:
    """Build a prompt with system prompt, retrieved chunks, and user message."""
    context = "\n".join(f"- {c.content}" for c in chunks)
    prompt = (
        f"{system_prompt}\n\n"
        "Context:\n"
        f"{context}\n\n"
        f"User: {user_message}\n"
        "Assistant:"
    )
    return prompt
