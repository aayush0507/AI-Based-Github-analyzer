# AI GitHub Analyzer

AI GitHub Analyzer is a full‑stack application that analyzes GitHub repositories using AI to surface insights about code quality, hotspots, contributors, and potential risks.

## Project structure
- Frontend (Vite + React + TypeScript): project root `src/` (key files: `App.tsx`, `components/`, `services/`).
- Backend (Node + TypeScript): `Backend/src/` (server, routes, AI services).

## Features
- Firebase authentication
- Submit a GitHub repo or URL for AI-driven analysis
- Summaries, metrics, and actionable recommendations
- Loading/error states and a responsive UI

## Tech stack
- Frontend: Vite, React, TypeScript, Tailwind CSS
- Backend: Node.js, TypeScript
- Integrations: OpenRouter (or other AI provider), GitHub API, Firebase Auth

## Prerequisites
- Node.js (>= 16) and npm
- GitHub personal access token (recommended for higher rate limits)
- AI provider API key (OpenRouter or equivalent)
- Firebase project (for authentication)

## Environment variables
Frontend (example .env / Vite):
- VITE_API_URL — backend base URL (e.g. http://localhost:4000)
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID

Backend (`Backend/.env`):
- OPENROUTER_API_KEY — AI provider key
- GITHUB_TOKEN — GitHub token (optional)
- FIREBASE_SERVICE_ACCOUNT — service account JSON or path
- PORT — backend port (default: 4000)

Adjust names if your code uses different keys (see `src/config` and `Backend/src`).

## Quick start (Windows PowerShell)
1. Open a PowerShell terminal at the repo root:
   cd "C:\Users\Aayush\Desktop\AI-based-Github-Analyzer-main"
2. Install and run the frontend:
   npm install
   npm run dev
3. In a new terminal, run the backend:
   cd Backend
   npm install
   npm run dev
4. Visit the frontend URL shown by Vite (usually http://localhost:5173) and configure `VITE_API_URL` if required.

## Usage
- Sign up / sign in via the app UI (Firebase)
- Enter a GitHub repo URL or owner/repo to analyze
- Review AI-generated analysis in the AnalysisResults UI

## Development notes
- Frontend code: `src/` (services for AI and GitHub are in `src/services/`)
- Backend code: `Backend/src/` (routes and AI integration in `Backend/src/services`)
- TypeScript and lint configs are at the repo root (`tsconfig.*`, `eslint.config.js`)

## Deployment
- Build frontend: `npm run build`
- Deploy backend to any Node-capable host; secure environment variables in your host provider

## Contributing
- Fork, create a feature branch, open a PR with clear scope and rationale
- Keep changes focused and include tests where applicable

## Troubleshooting
- GitHub 401/403: ensure `GITHUB_TOKEN` has needed scopes
- AI errors: verify `OPENROUTER_API_KEY` and rate limits
- Firebase issues: confirm config in `src/config/firebase.ts` and Vite env vars

## License
Add a `LICENSE` file (e.g., MIT) to clarify project licensing.

## Contact
Open an issue in this repository with steps to reproduce and relevant logs for bugs or feature requests.
