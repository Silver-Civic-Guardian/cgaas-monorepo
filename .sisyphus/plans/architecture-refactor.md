# Work Plan: Architecture Refactoring (Separation of Concerns)

## 🎯 Objective
Refactor the backend architecture to enforce strict separation of concerns. This includes decoupling routes and controllers, extracting LLM prompt chains into isolated files, implementing a database seeding mechanism, and externalizing Mock APIs to simulate real-world network latency and HTTP integration.

## 🏗️ Target Architecture Overview
```text
backend/
├── config/
│   └── prompts.js          # Isolated LLM prompt templates
├── controllers/
│   ├── chat.controller.js  # Chat logic
│   └── threat.controller.js# Dashboard logic
├── routes/
│   ├── chat.routes.js
│   ├── threat.routes.js
│   └── mock.routes.js      # Externalized mock API endpoints
├── scripts/
│   └── seed.js             # Database seeder
├── services/
│   ├── ai.service.js       # LLM orchestrator (using config/prompts)
│   └── data.service.js     # External API HTTP client
├── database.js
└── server.js               # Entry point (clean)
```

## 📋 Execution Plan

### Phase 1: Prompt Chain Isolation
- [x] **Task 1.1: Extract Prompt Templates**
  - Create `backend/config/prompts.js`.
  - Move the `intentPrompt` and `empathyPrompt` string templates out of `aiService.js`.
  - Refactor them into functions that accept dynamic variables (e.g., `buildIntentPrompt(message)`, `buildEmpathyPrompt(message, intent, apiResult)`).
  - **QA Scenario**: Run a quick Node script testing the prompt builder functions output valid strings.
- [x] **Task 1.2: Refactor AI Service**
  - Update `backend/services/aiService.js` to import and utilize the functions from `config/prompts.js`.
  - **QA Scenario**: Send a POST request using `curl` to `/api/chat` with a scam URL; verify a valid response is returned as before.

### Phase 2: Async Data Service (Mock Latency)
- [x] **Task 2.1: Create Async Data Service**
  - Rename `backend/services/mockApi.js` to `backend/services/data.service.js`.
  - Refactor `checkUrl` and `checkFact` into `async` functions.
  - Wrap their return values in a `setTimeout` (e.g., 600-800ms) wrapped in a Promise to simulate real-world network latency.
  - **QA Scenario**: Verify file renamed and syntax is valid.
- [x] **Task 2.2: Update AI Service**
  - Update `backend/services/aiService.js` to `await` the calls to `checkUrl` and `checkFact` from the new `data.service.js`.
  - **QA Scenario**: Send a POST request using `curl` to `/api/chat`. Use a stopwatch or visual check to confirm the response takes ~1 second longer than before due to the added mock latency.

### Phase 3: Route & Controller Breakdown
- [x] **Task 3.1: Extract Chat Routing**
  - Create `backend/controllers/chat.controller.js` and move the `POST /api/chat` logic from `server.js` into it.
  - Create `backend/routes/chat.routes.js` to wire the endpoint to the controller.
  - **QA Scenario**: Send a POST request to `/api/chat` via `curl`; verify it still functions and writes to the DB.
- [x] **Task 3.2: Extract Threat Routing**
  - Create `backend/controllers/threat.controller.js` and move the `GET /api/threats/ward/:ward` logic from `server.js` into it.
  - Create `backend/routes/threat.routes.js`.
  - **QA Scenario**: Send a GET request to `/api/threats/ward/taipei-daan` via `curl`; verify it returns JSON data.
- [x] **Task 3.3: Clean Server Entrypoint**
  - Refactor `backend/server.js` to `app.use('/api/chat', chatRoutes)` and `app.use('/api/threats', threatRoutes)`. Remove old mock testing endpoints.
  - **QA Scenario**: Verify `server.js` starts without errors and both endpoints are still reachable via `curl`.

### Phase 4: Database Seeding
- [x] **Task 4.1: Create Seed Script**
  - Create `backend/scripts/seed.js`.
  - Write a script that connects to SQLite and inserts 20-30 varied interaction records (mix of SCAM, RUMOR, HELP across different wards) from the past 24 hours.
  - **QA Scenario**: Run `node scripts/seed.js`. Verify data exists in SQLite using a DB viewer or via the threats endpoint.
- [x] **Task 4.2: Update Package Scripts**
  - Add a `"seed": "node scripts/seed.js"` command to `backend/package.json`.
  - **QA Scenario**: Run `npm run seed` and verify successful execution.

## Final Verification Wave
- [x] **System Test**
  - Run `npm run seed` in backend.
  - Run `npm run dev` in the root.
  - Open browser to `http://localhost:5173`.
  - Send message: "Is this free crypto safe?". Wait ~800ms for response. Verify AI response and Teachable Moment UI appears.
  - Navigate to `/dashboard` and click refresh. Verify threat counts reflect the seed data.