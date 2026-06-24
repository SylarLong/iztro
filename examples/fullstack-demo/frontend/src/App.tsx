import { FormEvent, useMemo, useState } from 'react';
import { Clock3, MessageSquareText, Pencil, RefreshCcw, Send, ShieldCheck, Sparkles, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_DEMO_API_BASE_URL || 'http://localhost:8787';

type Sender = 'user' | 'assistant' | 'system';

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  apiMessageId?: string;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error?.message || response.statusText || 'Request failed');
  }
  return data as T;
}

function parseSse(buffer: string, onEvent: (event: string, data: string) => void) {
  const blocks = buffer.split(/\r?\n\r?\n/);
  const tail = blocks.pop() || '';
  for (const block of blocks) {
    let event = 'message';
    const dataLines: string[] = [];
    for (const line of block.split(/\r?\n/)) {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart());
    }
    if (dataLines.length > 0) onEvent(event, dataLines.join('\n'));
  }
  return tail;
}

function extractUserMessageId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined;
  const value = payload as Record<string, unknown>;
  const candidates = [
    value.user_message_id,
    value.message_id,
    value.userMessageId,
    value.messageId,
    value.id,
    (value.user_message as Record<string, unknown> | undefined)?.id,
    (value.message as Record<string, unknown> | undefined)?.id,
  ];
  const match = candidates.find((item) => typeof item === 'string' && item.trim());
  return typeof match === 'string' ? match : undefined;
}

export function App() {
  const [message, setMessage] = useState('My birthday is 1995-02-23, birth hour 17, female. Analyze my 2026 career and wealth trend.');
  const [sessionId, setSessionId] = useState('');
  const [editingMessageId, setEditingMessageId] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      sender: 'system',
      text: 'Type birthday, birth hour, gender, and your question in the chat box. The frontend calls this demo backend, and the backend streams Iztro API back to the browser.',
    },
  ]);

  const canSend = useMemo(() => Boolean(message.trim() && !busy), [message, busy]);
  const editingMessage = messages.find((item) => item.id === editingMessageId);

  const ensureSession = async () => {
    if (sessionId) return sessionId;
    const data = await postJson<{ session_id: string }>('/api/session', {
      external_user_id: `demo-user-${new Date().toISOString().slice(0, 10)}`,
    });
    setSessionId(data.session_id);
    return data.session_id;
  };

  const streamChat = async (
    path: string,
    body: unknown,
    assistantId: string,
    linkedUserMessageId?: string,
  ) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok || !response.body) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.error?.message || response.statusText || 'Stream failed');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer = parseSse(buffer + decoder.decode(value, { stream: true }), (eventName, data) => {
        if (eventName === 'message.delta') {
          let delta = data;
          try {
            delta = String(JSON.parse(data).delta || '');
          } catch {
            delta = data;
          }
          setMessages((items) => items.map((item) => (
            item.id === assistantId ? { ...item, text: `${item.text}${delta}` } : item
          )));
        }
        if (eventName === 'message.completed') {
          try {
            const apiMessageId = extractUserMessageId(JSON.parse(data));
            if (apiMessageId && linkedUserMessageId) {
              setMessages((items) => items.map((item) => (
                item.id === linkedUserMessageId ? { ...item, apiMessageId } : item
              )));
            }
          } catch {
            // Ignore metadata parse failures; the streamed text is still useful for testing.
          }
        }
        if (eventName === 'error') {
          setMessages((items) => items.map((item) => (
            item.id === assistantId ? { ...item, text: data } : item
          )));
        }
      });
    }
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSend) return;

    const userText = message.trim();
    const editApiMessageId = editingMessage?.apiMessageId;
    const isEdit = Boolean(editApiMessageId);
    const userId = isEdit && editingMessage ? editingMessage.id : makeId();
    const assistantId = makeId();
    setBusy(true);
    setMessage('');
    setEditingMessageId('');
    setStatus(isEdit ? 'Editing message...' : 'Streaming from Iztro API...');
    setMessages((items) => {
      if (!isEdit) {
        return [
          ...items,
          { id: userId, sender: 'user', text: userText },
          { id: assistantId, sender: 'assistant', text: '' },
        ];
      }
      return [
        ...items.map((item) => (item.id === userId ? { ...item, text: userText } : item)),
        { id: assistantId, sender: 'assistant', text: '' },
      ];
    });

    try {
      const nextSessionId = await ensureSession();
      await streamChat(
        isEdit ? '/api/chat/edit/stream' : '/api/chat/stream',
        isEdit
          ? { session_id: nextSessionId, message_id: editApiMessageId, message: userText }
          : { session_id: nextSessionId, message: userText },
        assistantId,
        userId,
      );
      setStatus('Ready');
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Request failed';
      setMessages((items) => items.map((item) => (
        item.id === assistantId ? { ...item, sender: 'system', text } : item
      )));
      setStatus('Error');
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (item: ChatMessage) => {
    if (!item.apiMessageId || busy) return;
    setEditingMessageId(item.id);
    setMessage(item.text);
    setStatus(`Editing ${item.apiMessageId}`);
  };

  const resendMessage = async (item: ChatMessage) => {
    if (!item.apiMessageId || busy) return;
    const assistantId = makeId();
    setBusy(true);
    setEditingMessageId('');
    setStatus('Resending message...');
    setMessages((items) => [...items, { id: assistantId, sender: 'assistant', text: '' }]);
    try {
      const nextSessionId = await ensureSession();
      await streamChat(
        '/api/chat/resend/stream',
        { session_id: nextSessionId, message_id: item.apiMessageId },
        assistantId,
        item.id,
      );
      setStatus('Ready');
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Request failed';
      setMessages((items) => items.map((chatItem) => (
        chatItem.id === assistantId ? { ...chatItem, sender: 'system', text } : chatItem
      )));
      setStatus('Error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="app">
      <section className="intro">
        <div>
          <p className="eyebrow">Iztro API example</p>
          <h1>Full-stack Ziwei chat demo</h1>
          <p>
            A minimal customer-style chatbot: frontend to backend, backend to Iztro API streaming.
            The API key stays on the server.
          </p>
        </div>
        <div className="security-note">
          <ShieldCheck size={19} />
          <span>Server-side API key</span>
        </div>
      </section>

      <section className="layout">
        <section className="chat">
          <header>
            <div>
              <p className="eyebrow">Demo conversation</p>
              <h2>Streaming chatbot</h2>
            </div>
            <span>{status}</span>
          </header>

          <div className="messages" aria-live="polite">
            {messages.map((item) => (
              <article key={item.id} className={`message ${item.sender}`}>
                <div className="message-header">
                  <b>{item.sender}</b>
                  {item.apiMessageId ? <code>{item.apiMessageId}</code> : null}
                </div>
                <p>{item.text || '...'}</p>
                {item.sender === 'user' && item.apiMessageId ? (
                  <div className="message-actions">
                    <button type="button" onClick={() => startEdit(item)} disabled={busy}>
                      <Pencil size={15} />
                      Edit
                    </button>
                    <button type="button" onClick={() => resendMessage(item)} disabled={busy}>
                      <RefreshCcw size={15} />
                      Resend
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <form className="composer" onSubmit={sendMessage}>
            {editingMessage ? (
              <div className="edit-banner">
                <span>Editing message {editingMessage.apiMessageId}</span>
                <button type="button" onClick={() => { setEditingMessageId(''); setMessage(''); }} disabled={busy}>
                  <X size={15} />
                  Cancel
                </button>
              </div>
            ) : null}
            <textarea
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Example: My birthday is 1995-02-23, birth hour 17, female. Analyze my 2026 career."
            />
            <button className="primary" type="submit" disabled={!canSend}>
              {busy ? <Clock3 size={16} /> : <Send size={16} />}
              {busy ? 'Streaming' : editingMessage ? 'Save edit' : 'Send'}
            </button>
          </form>
        </section>

        <aside className="flow">
          <div className="panel-title">
            <Sparkles size={18} />
            <h2>Integration flow</h2>
          </div>
          <ol>
            <li>Frontend sends natural chat text to the demo backend.</li>
            <li>Backend creates an Iztro managed session when needed.</li>
            <li>Backend calls Iztro stream endpoint with the server API key.</li>
            <li>Backend relays SSE chunks to the frontend.</li>
            <li>Edit and Resend call the matching v2 message endpoints.</li>
          </ol>
          <div className="endpoint">
            <MessageSquareText size={16} />
            <code>POST /api/chat/stream</code>
          </div>
        </aside>
      </section>
    </main>
  );
}
