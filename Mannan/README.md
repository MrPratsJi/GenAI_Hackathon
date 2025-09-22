# MannMitra — AI Companion for Youth Mental Wellness

**Stack:** Node.js/Express (backend) + React (Vite) PWA (frontend)  
**Runs locally without cloud credentials** using a safe mock. You can later plug in Vertex AI.

## Quickstart (Local Dev)
1) **Install dependencies**
```bash
cd server && npm install
cd ../web && npm install
```
2) **Run backend** (mock mode by default)
```bash
cd server
# Optional: create .env from example (only if you want Vertex AI)
# cp .env.example .env  # then fill values and set USE_MOCK=0
npm start
```
This starts the API at `http://localhost:8080`.

3) **Run frontend**
```bash
cd ../web
npm run dev
```
Open the printed local URL (usually `http://localhost:5173`).

> If you want everything on one port, you can also run `npm run dev` in web which proxies API to 8080.

## Optional: Enable Vertex AI (live LLM responses)
- Requires a GCP project, service account with Vertex permissions, and `GOOGLE_APPLICATION_CREDENTIALS` set.
- Set in `server/.env`:
```
USE_MOCK=0
GCLOUD_PROJECT=your-project-id
GCP_LOCATION=us-central1
VERTEX_MODEL=gemini-1.5-pro
```
- Install gcloud auth or use a key file. Restart server.

## What’s inside
- **server/** Express API: `/api/chat`, `/api/mood`, `/api/helplines`, `/api/exercises`
- **web/** Vite + React app with
  - **Attractive landing page** (glassmorphism, gradients, subtle animations)
  - **Chat** (empathetic, bilingual-ready)
  - **Mood tracker** (1–5)
  - **Self-help micro-exercises**
  - PWA manifest + basic service worker

## Security & Privacy
- No PII by default. Session IDs on client only.
- Mock mode keeps data in memory; production should use Firestore/DB.
- This is **not** a medical device. Includes crisis helplines panel.

## Scripts
- `server`: `npm start` to run on 8080
- `web`: `npm run dev` for dev, `npm run build` then `npm run preview`

---

Built to be extended easily for hackathons and demos.


## One-command run (root workspace)
From the project root after unzipping:
```bash
cd mannmitra
npm install       # installs root + server + web
npm run dev       # starts API on :8080 and Vite on :5173 together
```
Then open http://localhost:5173
