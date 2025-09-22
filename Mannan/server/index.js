import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Optional Vertex AI
let vertexModel = null;
async function initVertex() {
  const useMock = process.env.USE_MOCK !== '0';
  if (useMock) return null;
  const project = process.env.GCLOUD_PROJECT;
  const location = process.env.GCP_LOCATION || 'us-central1';
  const modelName = process.env.VERTEX_MODEL || 'gemini-1.5-pro';
  const { VertexAI } = await import('@google-cloud/vertexai');
  const vertex = new VertexAI({ project, location });
  return vertex.getGenerativeModel({ model: modelName });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const USE_MOCK = process.env.USE_MOCK !== '0';

const HELPLINES = JSON.parse(fs.readFileSync(path.join(__dirname, 'helplines.json'), 'utf-8'));
const EXERCISES = JSON.parse(fs.readFileSync(path.join(__dirname, 'exercises.json'), 'utf-8'));

const SYSTEM_PROMPT = `You are “Mannan,” an empathetic, culturally aware companion for Indian youth.
Be warm, concise, and non-judgmental. Avoid clinical labels.
Offer one small, practical next step. Mirror the user’s language (English/Hindi).
If the user expresses self-harm or harm to others, add the token [SAFETY_HINT] at the end.`;

function quickRiskScreen(text) {
  const s = (text || '').toLowerCase();
  const dangerTerms = [
    'suicide','kill myself','end my life','self harm','cutting','no reason to live','want to die','hurt myself'
  ];
  return dangerTerms.some(t => s.includes(t)) ? 'severe' : 'none';
}

async function generateReply({ text, lang }) {
  const risk = quickRiskScreen(text);
  if (USE_MOCK) {
    // Simple, safe, local template for demo
    const empathy = lang === 'hi'
      ? 'मैं समझ रहा/रही हूँ कि यह आपके लिए कठिन हो सकता है।'
      : "I hear you. That sounds really tough.";
    const nudge = lang === 'hi'
      ? 'एक छोटा कदम: अपनी साँस पर 4-4-4-4 की गिनती के साथ 1 मिनट ध्यान दें।'
      : "One small step: try a 1‑minute box-breathing cycle (4‑4‑4‑4).";
    const add = risk === 'severe'
      ? ' [SAFETY_HINT]'
      : '';
    return `${empathy} ${nudge}${add}`;
  }
  // Live LLM
  if (!vertexModel) vertexModel = await initVertex();
  const userLang = lang === 'hi' ? 'Hindi' : 'English';
  const contents = [
    { role: 'user', parts: [{ text: `Language: ${userLang}` }]},
    { role: 'user', parts: [{ text: `SYSTEM:\n${SYSTEM_PROMPT}` }]},
    { role: 'user', parts: [{ text }]}
  ];
  const gen = await vertexModel.generateContent({ contents });
  const reply = gen?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'I am here with you.';
  return reply;
}

// Routes
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/chat', async (req, res) => {
  try {
    const { sessionId = uuidv4(), text = '', lang = 'en' } = req.body || {};
    const reply = await generateReply({ text, lang });
    const risk = quickRiskScreen(text) || (reply.includes('[SAFETY_HINT]') ? 'severe' : 'none');
    res.json({ sessionId, reply, risk });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'chat_failed' });
  }
});

app.post('/api/mood', async (req, res) => {
  try {
    // In-memory no-op; front-end stores locally. Endpoint present for future DB.
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'mood_failed' });
  }
});

app.get('/api/helplines', (req, res) => {
  const lang = (req.query.lang || 'en').toLowerCase();
  const items = HELPLINES.filter(h => h.langs.includes(lang));
  res.json({ items });
});

app.get('/api/exercises', (req, res) => {
  const lang = (req.query.lang || 'en').toLowerCase();
  const pack = EXERCISES[lang] || EXERCISES['en'];
  res.json({ items: pack });
});

module.exports = app;
