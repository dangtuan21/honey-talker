from __future__ import annotations

from typing import Any

from openai import OpenAI

from config import Settings


def build_client(settings: Settings) -> OpenAI:
    default_headers: dict[str, str] = {}
    if settings.openrouter_site_url:
        default_headers["HTTP-Referer"] = settings.openrouter_site_url
    if settings.openrouter_app_name:
        default_headers["X-Title"] = settings.openrouter_app_name

    return OpenAI(
        api_key=settings.openrouter_api_key,
        base_url=settings.openai_base_url,
        default_headers=default_headers or None,
    )


def chat_completion(
    *,
    client: OpenAI,
    model: str,
    messages: list[dict[str, Any]],
) -> tuple[str, dict[str, Any] | None]:
    resp = client.chat.completions.create(
        model=model,
        messages=messages,
    )

    content = resp.choices[0].message.content or ""
    usage = resp.usage.model_dump() if resp.usage else None
    return content, usage
