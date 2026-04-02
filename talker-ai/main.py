from __future__ import annotations

from typing import Any, Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

from config import get_settings
from llm import build_client, chat_completion

app = FastAPI(title="talker-ai")

settings = get_settings()
client = build_client(settings)


class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    history: list[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
    model: str
    usage: dict[str, Any] | None = None


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    messages: list[dict[str, Any]] = [{"role": "system", "content": settings.system_prompt}]
    messages.extend([m.model_dump() for m in req.history])
    messages.append({"role": "user", "content": req.message})

    reply, usage = chat_completion(
        client=client,
        model=settings.openai_model,
        messages=messages,
    )

    return ChatResponse(reply=reply, model=settings.openai_model, usage=usage)
