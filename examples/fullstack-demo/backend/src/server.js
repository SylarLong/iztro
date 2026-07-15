import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8787);
const iztroApiBaseUrl = (process.env.IZTRO_API_BASE_URL || 'https://chat-api.iztro.com').replace(/\/+$/, '');
const iztroApiKey = process.env.IZTRO_API_KEY || '';

app.use(cors({ origin: true }));
app.use(express.json({ limit: '128kb' }));

function requireApiKey() {
  if (!iztroApiKey || iztroApiKey === 'sk_ziwei_replace_me') {
    const error = new Error('Set IZTRO_API_KEY in backend/.env before calling Iztro API.');
    error.statusCode = 500;
    throw error;
  }
}

async function readIztroResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function callIztro(path, init = {}) {
  requireApiKey();
  const response = await fetch(`${iztroApiBaseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${iztroApiKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const data = await readIztroResponse(response);
  if (!response.ok) {
    const error = new Error(data?.detail || data?.error?.message || `Iztro API returned ${response.status}`);
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, iztro_api_base_url: iztroApiBaseUrl });
});

app.post('/api/session', async (request, response, next) => {
  try {
    const externalUserId = request.body?.external_user_id || `demo-user-${new Date().toISOString().slice(0, 10)}`;
    const data = await callIztro('/v2/platform/sessions', {
      method: 'POST',
      body: JSON.stringify({
        external_user_id: externalUserId,
        system_prompt_override: 'Answer as a concise consumer astrology assistant. Users may provide birthday, birth hour, gender, and questions in natural chat text. Ask for missing birth details when needed.',
      }),
    });
    response.json({ session_id: data.session_id });
  } catch (error) {
    next(error);
  }
});

async function streamIztro(path, payload, response) {
  requireApiKey();
  const upstream = await fetch(`${iztroApiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${iztroApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok || !upstream.body) {
    const data = await readIztroResponse(upstream);
    const error = new Error(data?.detail || data?.error?.message || `Iztro API returned ${upstream.status}`);
    error.statusCode = upstream.status;
    error.details = data;
    throw error;
  }

  response.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  response.flushHeaders?.();

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      response.write(decoder.decode(value, { stream: true }));
      response.flush?.();
    }
    response.write(decoder.decode());
  } catch (error) {
    if (!response.destroyed) {
      response.write(`event: error\ndata: ${JSON.stringify({ message: error.message || 'Upstream stream failed' })}\n\n`);
    }
  } finally {
    if (!response.destroyed && !response.writableEnded) response.end();
  }
}

app.post('/api/chat/stream', async (request, response, next) => {
  try {
    const sessionId = String(request.body?.session_id || '');
    const message = String(request.body?.message || '').trim();
    if (!sessionId || !message) {
      const error = new Error('session_id and message are required.');
      error.statusCode = 400;
      throw error;
    }

    await streamIztro(
      `/v2/platform/sessions/${encodeURIComponent(sessionId)}/messages/stream`,
      {
        title: 'Demo chat',
        message,
        language: 'en',
        enable_iztro_call: true,
      },
      response,
    );
  } catch (error) {
    next(error);
  }
});

app.post('/api/chat/edit/stream', async (request, response, next) => {
  try {
    const sessionId = String(request.body?.session_id || '');
    const messageId = String(request.body?.message_id || '');
    const message = String(request.body?.message || '').trim();
    if (!sessionId || !messageId || !message) {
      const error = new Error('session_id, message_id, and message are required.');
      error.statusCode = 400;
      throw error;
    }

    await streamIztro(
      `/v2/platform/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}/edit/stream`,
      {
        title: 'Edited demo chat',
        message,
        language: 'en',
        enable_iztro_call: true,
      },
      response,
    );
  } catch (error) {
    next(error);
  }
});

app.post('/api/chat/resend/stream', async (request, response, next) => {
  try {
    const sessionId = String(request.body?.session_id || '');
    const messageId = String(request.body?.message_id || '');
    if (!sessionId || !messageId) {
      const error = new Error('session_id and message_id are required.');
      error.statusCode = 400;
      throw error;
    }

    await streamIztro(
      `/v2/platform/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}/resend/stream`,
      {
        title: 'Regenerated demo chat',
        language: 'en',
        enable_iztro_call: true,
      },
      response,
    );
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  if (response.headersSent) {
    if (!response.writableEnded) response.end();
    return;
  }
  const statusCode = Number(error.statusCode || 500);
  response.status(statusCode >= 400 && statusCode < 600 ? statusCode : 500).json({
    error: {
      message: error.message || 'Request failed',
      details: error.details || null,
    },
  });
});

app.listen(port, () => {
  console.log(`Iztro API demo backend listening on http://localhost:${port}`);
});
