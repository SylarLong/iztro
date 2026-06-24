const apiKey = process.env.IZTRO_API_KEY;

if (!apiKey) {
  throw new Error('Set IZTRO_API_KEY before running this example.');
}

async function api(path, body) {
  const response = await fetch(`https://chat-api.iztro.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

const session = await api('/v2/platform/sessions', {
  external_user_id: 'user_123',
  system_prompt_override: '用简洁中文回答，避免过度术语，并在最后给出可继续追问的方向。',
});

const reply = await api(`/v2/platform/sessions/${session.session_id}/messages`, {
  message: '分析我的 2026 年事业趋势。生日是 1995-02-23，出生时辰 17 点，性别女。',
  title: '2026 事业解读',
  language: 'zh',
  enable_iztro_call: true,
});

console.log(JSON.stringify(reply, null, 2));
