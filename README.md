# Twin AI — Box Signal

**One to think. One to check.**

An experimental two-stage AI critique website from Box Signal. The first model answers, the second critiques, and a final pass synthesises a considered answer. **Model agreement is not fact verification**: no live browsing or independent source verification is implemented in v0.1.

## Local development

```bash
npm install
npm run dev
```

The frontend can run locally, but the `/api/twin` endpoint requires Vercel's serverless environment or an equivalent Node API server.

## Deployment

1. Import this repository into Vercel as a Vite project.
2. Set a server-side environment variable named `OPENAI_API_KEY` in Vercel (never commit an API key or expose it as `VITE_*`).
3. Optionally set `TWIN_AI_MODEL` (defaults to `gpt-4.1-mini`).
4. Redeploy after setting environment variables.

Each request can trigger **three model calls**, so API charges apply. Before opening to public traffic, add appropriate user authentication, rate limits, budgets and abuse prevention. The same-origin check in the API is not a replacement for authentication or rate limiting.

© 2026 Box Signal.
