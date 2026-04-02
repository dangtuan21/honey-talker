import os
from dataclasses import dataclass

from dotenv import load_dotenv


UNIVERSITY_SYSTEM_PROMPT = (
    "You are a helpful and professional university receptionist AI. "
    "Your role is to assist students with general university information, campus services, academic policies, office hours, and frequently asked questions. "
    "Be concise, polite, and clear. If you don't know the answer, guide students to the appropriate office, website, or contact. "
    "Do not provide personal opinions or unofficial advice. Always maintain a friendly and professional tone."
)


@dataclass(frozen=True)
class Settings:
    openrouter_api_key: str
    openai_base_url: str
    openai_model: str
    system_prompt: str
    openrouter_site_url: str | None
    openrouter_app_name: str | None


def get_settings() -> Settings:
    load_dotenv()

    openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
    if not openrouter_api_key:
        raise RuntimeError("Missing OPENROUTER_API_KEY in environment")

    openai_base_url = os.getenv("OPENAI_BASE_URL", "https://openrouter.ai/api/v1")
    openai_model = os.getenv("OPENAI_MODEL", "stepfun/step-3.5-flash:free")
    system_prompt = os.getenv("SYSTEM_PROMPT", "You are a helpful assistant.")

    openrouter_site_url = os.getenv("OPENROUTER_SITE_URL") or None
    openrouter_app_name = os.getenv("OPENROUTER_APP_NAME") or None

    return Settings(
        openrouter_api_key=openrouter_api_key,
        openai_base_url=openai_base_url,
        openai_model=openai_model,
        system_prompt=system_prompt,
        openrouter_site_url=openrouter_site_url,
        openrouter_app_name=openrouter_app_name,
    )
