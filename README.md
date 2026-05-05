# UPSC CAPF Mock Test Platform (Full Stack)

A complete mock test application for UPSC CAPF Paper-1 preparation.

## Features
- Authentication (signup/login with JWT)
- User dashboard with attempts + analytics
- Mock tests with 100 MCQs, timer, mark-for-review, save & next, auto-submit
- Evaluation with score, correct/incorrect/skipped, negative marking (-1/3), detailed solutions
- Subject tagging: General Ability, Current Affairs, Reasoning, Quantitative Aptitude
- Admin tools: AI-style question generation, import/export JSON
- Daily mini-quiz / PYQ / leaderboard extensible endpoints
- Responsive interface and exam-like navigation panel

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- DB: MongoDB + Mongoose
- Auth: JWT

## Folder Structure
```
.
├── client/        # React frontend
├── server/        # Express backend
└── package.json   # Monorepo scripts
```

## Run Locally
1. Install MongoDB and start it on `mongodb://127.0.0.1:27017`.
2. Backend env:
   ```bash
   cp server/.env.example server/.env
   ```
3. Install dependencies:
   ```bash
   npm install
   npm run install:all
   ```
4. Seed sample 100 questions:
   ```bash
   npm run seed
   ```
5. Start both frontend and backend:
   ```bash
   npm run dev
   ```
6. Open frontend at `http://localhost:5173`.

## Key API Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/tests`
- `GET /api/tests/:id`
- `POST /api/tests` (100 question IDs required)
- `POST /api/tests/submit`
- `GET /api/tests/me/attempts`
- `GET /api/tests/me/analytics`
- `POST /api/questions/ai-generate`
- `POST /api/questions/import`
- `GET /api/questions/export`

## Notes
- AI generation currently uses a local generator service stub and can be swapped for OpenAI/Gemini integration.
- Dark/light mode token styles are included; add a toggle by setting `data-theme='dark'` on `<html>`.
