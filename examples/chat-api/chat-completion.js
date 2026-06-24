const apiKey = process.env.IZTRO_API_KEY;

if (!apiKey) {
  throw new Error('Set IZTRO_API_KEY before running this example.');
}

const response = await fetch('https://chat-api.iztro.com/v2/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'ziwei-agent',
    messages: [
      {
        role: 'user',
        content:
          '分析我的 2026 年事业趋势。生日是 1995-02-23，出生时辰 17 点，性别女。',
      },
    ],
    enable_iztro_call: true,
  }),
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status} ${await response.text()}`);
}

console.log(JSON.stringify(await response.json(), null, 2));
