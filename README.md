
# GenAI Hackathon — Mannan: AI Mental Wellness Companion

## Overview
Mannan is an AI-powered web application designed to support youth mental wellness. It provides confidential, empathetic chat, mood tracking, self-help exercises, and crisis helplines, all in a modern, bilingual interface.

## Features
- Confidential, empathetic AI chat (English & Hindi)
- Mood tracker (1–5 scale)
- Self-help micro-exercises
- Crisis helplines panel
- Beautiful glassmorphism UI with gradients and subtle animations
- PWA support (installable, offline-ready)
- Easy local development and cloud-ready (Vertex AI integration)

## Tech Stack
- **Frontend:** React (Vite), CSS (glassmorphism, gradients)
- **Backend:** Node.js, Express
- **AI:** Vertex AI (optional, mock mode by default)
- **Auth:** Firebase Authentication (email/password)
- **Other:** Service Worker, PWA manifest

## Workflow
1. **Install dependencies**
  ```bash
  cd server && npm install
  cd ../web && npm install
  ```
2. **Run backend** (mock mode by default)
  ```bash
  cd server
  npm start
  ```
  API runs at `http://localhost:8080`.
3. **Run frontend**
  ```bash
  cd ../web
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.

> For all-in-one dev, use `npm run dev` in web to proxy API to 8080.




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


## Project Structure
- **server/** — Express API: `/api/chat`, `/api/mood`, `/api/helplines`, `/api/exercises`
- **web/** — Vite + React app
    - Landing page (glassmorphism, gradients, animations)
    - Chat (empathetic, bilingual)
    - Mood tracker
    - Self-help exercises
    - PWA manifest & service worker


## Security & Privacy
- No PII by default. Session IDs on client only.
- Mock mode keeps data in memory; production should use Firestore/DB.
- This is **not** a medical device. Includes crisis helplines panel.


## Scripts
- `server`: `npm start` to run on 8080
- `web`: `npm run dev` for dev, `npm run build` then `npm run preview`


---
Built for GenAI Hackathon. Easily extendable for demos and real-world use.


## One-command run (root workspace)
From the project root after unzipping:
```bash
cd mannmitra
npm install       # installs root + server + web
npm run dev       # starts API on :8080 and Vite on :5173 together
```
Then open http://localhost:5173
