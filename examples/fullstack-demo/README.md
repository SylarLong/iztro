# Iztro API Full-Stack Demo

This example shows the recommended integration shape for a customer app:

- A frontend renders a normal chatbot.
- A backend owns the Iztro API key.
- The backend creates a managed Iztro API session and streams chat messages.
- The UI can edit a prior user message or resend it to test regenerated answers.
- The frontend never receives or stores the API key.

## Run locally

Start one backend. Both backend implementations expose the same local API, so the frontend can use either one.

### Option A: Node backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set IZTRO_API_KEY
npm run dev
```

### Option B: Python backend

```bash
cd python-backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# edit .env and set IZTRO_API_KEY
uvicorn app.main:app --reload --host 0.0.0.0 --port 8787
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL printed by Vite. By default it calls the backend at `http://localhost:8787`.
Run only one backend on port `8787` at a time.

## Environment

Backend, Node or Python:

- `IZTRO_API_KEY`: required, your `sk_ziwei_...` API key.
- `IZTRO_API_BASE_URL`: optional, defaults to `https://chat-api.iztro.com`.
- `PORT`: optional, defaults to `8787`.

Frontend:

- `VITE_DEMO_API_BASE_URL`: optional, defaults to `http://localhost:8787`.

## API flow

1. Frontend calls `POST /api/session` on the demo backend.
2. Demo backend calls `POST /v2/platform/sessions` on Iztro API.
3. Frontend calls `POST /api/chat/stream` on the demo backend with natural chat text.
4. Demo backend calls `POST /v2/platform/sessions/{session_id}/messages/stream` on Iztro API.
5. For edits, frontend calls `POST /api/chat/edit/stream`, and the backend calls `POST /v2/platform/sessions/{session_id}/messages/{message_id}/edit/stream`.
6. For resends, frontend calls `POST /api/chat/resend/stream`, and the backend calls `POST /v2/platform/sessions/{session_id}/messages/{message_id}/resend/stream`.
7. Demo backend relays Iztro Server-Sent Events to the frontend.

Users can type birth details directly in the chat box, for example:

```text
My birthday is 1995-02-23, birth hour 17, female. Analyze my 2026 career.
```
