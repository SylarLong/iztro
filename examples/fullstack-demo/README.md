# Iztro API Full-Stack Demo

This example shows the safe integration shape for an app that uses the HTTP Session API:

- A frontend renders a normal chatbot.
- A backend owns the Iztro API key.
- The backend creates a managed Iztro API session and streams chat messages.
- The UI can edit a prior user message or resend it to test regenerated answers.
- The frontend never receives or stores the API key.

## Run locally

Start one backend. Both backend implementations expose the same local API, so the frontend can use either one.

Prerequisites:

- Node.js 20.19+ (required by Vite 8)
- Python 3.10+ when using the Python backend

### Option A: Node backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set IZTRO_API_KEY
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

### Option B: Python backend

```bash
cd python-backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env and set IZTRO_API_KEY
uvicorn app.main:app --reload --host 0.0.0.0 --port 8787
```

On Windows PowerShell, activate with `.venv\Scripts\Activate.ps1` and copy the environment file with `Copy-Item .env.example .env`.

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL printed by Vite. By default it calls port `8787` on the same hostname used to open the frontend, so both `localhost` and LAN URLs work.
Run only one backend on port `8787` at a time.

## Environment

Backend, Node or Python:

- `IZTRO_API_KEY`: required, your `sk_ziwei_...` API key.
- `IZTRO_API_BASE_URL`: optional, defaults to `https://chat-api.iztro.com`.
- `PORT`: optional for the Node backend, defaults to `8787`. The Python command above sets its port explicitly.

Frontend:

- `VITE_DEMO_API_BASE_URL`: optional. When omitted, the frontend uses its current hostname with port `8787`.

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
