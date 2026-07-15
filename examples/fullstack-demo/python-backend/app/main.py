import json
import os
from typing import Any
from urllib.parse import quote

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

load_dotenv()

IZTRO_API_BASE_URL = os.getenv("IZTRO_API_BASE_URL", "https://chat-api.iztro.com").rstrip("/")
IZTRO_API_KEY = os.getenv("IZTRO_API_KEY", "")

app = FastAPI(title="Iztro API Full-Stack Demo Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class SessionRequest(BaseModel):
    external_user_id: str | None = None


class StreamChatRequest(BaseModel):
    session_id: str
    message: str


class StreamEditRequest(BaseModel):
    session_id: str
    message_id: str
    message: str


class StreamResendRequest(BaseModel):
    session_id: str
    message_id: str


def require_api_key() -> None:
    if not IZTRO_API_KEY or IZTRO_API_KEY == "sk_ziwei_replace_me":
        raise HTTPException(
            status_code=500,
            detail="Set IZTRO_API_KEY in python-backend/.env before calling Iztro API.",
        )


def iztro_headers() -> dict[str, str]:
    return {
        "Authorization": f"Bearer {IZTRO_API_KEY}",
        "Content-Type": "application/json",
    }


def sse_event(event: str, data: dict[str, Any]) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


async def parse_iztro_response(response: httpx.Response) -> Any:
    if not response.content:
        return None
    try:
        return response.json()
    except ValueError:
        return {"raw": response.text}


async def call_iztro(path: str, payload: dict[str, Any]) -> Any:
    require_api_key()
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{IZTRO_API_BASE_URL}{path}",
            headers=iztro_headers(),
            json=payload,
        )
    data = await parse_iztro_response(response)
    if response.status_code >= 400:
        detail = data.get("detail") if isinstance(data, dict) else None
        raise HTTPException(status_code=response.status_code, detail=detail or data or response.reason_phrase)
    return data


@app.get("/api/health")
async def health() -> dict[str, Any]:
    return {"ok": True, "iztro_api_base_url": IZTRO_API_BASE_URL}


@app.post("/api/session")
async def create_session(request: SessionRequest) -> dict[str, Any]:
    external_user_id = request.external_user_id or "demo-user"
    data = await call_iztro(
        "/v2/platform/sessions",
        {
            "external_user_id": external_user_id,
            "system_prompt_override": (
                "Answer as a concise consumer astrology assistant. Users may provide "
                "birthday, birth hour, gender, and questions in natural chat text. "
                "Ask for missing birth details when needed."
            ),
        },
    )
    return {"session_id": data.get("session_id")}


@app.post("/api/chat/stream")
async def stream_chat(request: StreamChatRequest) -> StreamingResponse:
    session_id = request.session_id.strip()
    message = request.message.strip()
    if not session_id or not message:
        raise HTTPException(status_code=400, detail="session_id and message are required.")

    return stream_iztro(
        f"/v2/platform/sessions/{quote(session_id, safe='')}/messages/stream",
        {
            "title": "Demo chat",
            "message": message,
            "language": "en",
            "enable_iztro_call": True,
        },
    )


@app.post("/api/chat/edit/stream")
async def stream_edit(request: StreamEditRequest) -> StreamingResponse:
    session_id = request.session_id.strip()
    message_id = request.message_id.strip()
    message = request.message.strip()
    if not session_id or not message_id or not message:
        raise HTTPException(status_code=400, detail="session_id, message_id, and message are required.")

    return stream_iztro(
        f"/v2/platform/sessions/{quote(session_id, safe='')}/messages/{quote(message_id, safe='')}/edit/stream",
        {
            "title": "Edited demo chat",
            "message": message,
            "language": "en",
            "enable_iztro_call": True,
        },
    )


@app.post("/api/chat/resend/stream")
async def stream_resend(request: StreamResendRequest) -> StreamingResponse:
    session_id = request.session_id.strip()
    message_id = request.message_id.strip()
    if not session_id or not message_id:
        raise HTTPException(status_code=400, detail="session_id and message_id are required.")

    return stream_iztro(
        f"/v2/platform/sessions/{quote(session_id, safe='')}/messages/{quote(message_id, safe='')}/resend/stream",
        {
            "title": "Regenerated demo chat",
            "language": "en",
            "enable_iztro_call": True,
        },
    )


def stream_iztro(path: str, payload: dict[str, Any]) -> StreamingResponse:
    require_api_key()

    async def stream_upstream():
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream(
                "POST",
                f"{IZTRO_API_BASE_URL}{path}",
                headers=iztro_headers(),
                json=payload,
            ) as upstream:
                if upstream.status_code >= 400:
                    body = await upstream.aread()
                    text = body.decode("utf-8", errors="replace")
                    message: Any = text or upstream.reason_phrase
                    try:
                        error_data = json.loads(text)
                        if isinstance(error_data, dict):
                            nested_error = error_data.get("error")
                            message = (
                                error_data.get("detail")
                                or (nested_error.get("message") if isinstance(nested_error, dict) else None)
                                or error_data.get("message")
                                or message
                            )
                    except ValueError:
                        pass
                    if not isinstance(message, str):
                        message = json.dumps(message, ensure_ascii=False)
                    yield sse_event(
                        "error",
                        {"message": message, "status": upstream.status_code},
                    )
                    return
                async for chunk in upstream.aiter_bytes():
                    yield chunk

    return StreamingResponse(
        stream_upstream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
