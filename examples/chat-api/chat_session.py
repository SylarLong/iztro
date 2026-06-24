import json
import os

import requests


api_key = os.environ.get("IZTRO_API_KEY")
if not api_key:
    raise RuntimeError("Set IZTRO_API_KEY before running this example.")


def post(path, payload):
    response = requests.post(
        f"https://chat-api.iztro.com{path}",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=60,
    )
    response.raise_for_status()
    return response.json()


session = post(
    "/v2/platform/sessions",
    {
        "external_user_id": "user_123",
        "system_prompt_override": "用简洁中文回答，避免过度术语，并在最后给出可继续追问的方向。",
    },
)

reply = post(
    f"/v2/platform/sessions/{session['session_id']}/messages",
    {
        "message": "分析我的 2026 年事业趋势。生日是 1995-02-23，出生时辰 17 点，性别女。",
        "title": "2026 事业解读",
        "language": "zh",
        "enable_iztro_call": True,
    },
)

print(json.dumps(reply, indent=2, ensure_ascii=False))
