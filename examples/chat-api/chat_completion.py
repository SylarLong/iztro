import json
import os

import requests


api_key = os.environ.get("IZTRO_API_KEY")
if not api_key:
    raise RuntimeError("Set IZTRO_API_KEY before running this example.")

response = requests.post(
    "https://api.iztro.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
    json={
        "model": "ziwei-agent",
        "messages": [
            {
                "role": "user",
                "content": "分析我的 2026 年事业趋势。生日是 1995-02-23，出生时辰 17 点，性别女。",
            }
        ],
        "enable_iztro_call": True,
    },
    timeout=60,
)

response.raise_for_status()
print(json.dumps(response.json(), indent=2, ensure_ascii=False))
