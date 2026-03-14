# UI Debugger

Paste UI code or describe a UI problem → get accessibility, design, responsiveness, and performance suggestions from Claude.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and enter your Anthropic API key.

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo — Netlify auto-detects `netlify.toml`
4. Click **Deploy site**

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Stack

- React 18 + Vite
- Anthropic Claude API (client-side)
- No CSS frameworks — hand-written styles
