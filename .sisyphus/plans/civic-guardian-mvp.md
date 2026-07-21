# Work Plan: Civic Guardian MVP

## 🎯 Objective
Build the Civic Guardian as a Service (CGaaS) MVP, focusing on a decoupled architecture that provides an Empathy Layer for vulnerable demographics. The MVP includes a web-based LINE chat emulator, a Node.js backend with AI routing, and a React-based Global Threat Dashboard.

## 🏗️ Architecture & Tech Stack
- **Repository Structure**: Monorepo with `/frontend` (Vite + React) and `/backend` (Express).
- **Backend Framework**: Node.js + Express.js.
- **Frontend Framework**: Vite + React.js.
- **Styling**: Tailwind CSS.
- **Database**: SQLite (using `sqlite3` and `sqlite` packages).
- **AI Integration**: `@google/genai` library, model `gemini-3.1-pro-preview`.
- **Authentication**: `VERTEX_KEY` loaded directly from `process.env` (No `.env` files).

## 🚫 Out of Scope (Guardrails)
- **STT (Voice-to-Text)**: Excluded from MVP to save time. Mock voice messages as text input if needed.
- **Real LINE Bot Integration**: We are building a Web UI emulator, not connecting to the actual LINE Developer Console.
- **Family Co-pilot Notifications**: Excluded to prevent scope creep.
- **MongoDB / MERN**: Overridden by SQLite constraint.

## 📋 Execution Plan

### Phase 1: Scaffolding & Database Setup

- [x] **Task 1.1: Initialize Monorepo and Frontend/Backend Sub-projects**
  - **Action**: Create `/frontend` using Vite + React + Tailwind CSS. Create `/backend` using Node.js + Express.
  - **Details**: Configure `package.json` scripts in the root to run both concurrently (e.g., using `concurrently`). Ensure Tailwind is properly configured in the frontend.
  - **QA Scenario**: Running `npm run dev` in the root starts both servers. The frontend displays a default Tailwind-styled text.

- [x] **Task 1.2: Set up SQLite Database**
  - **Action**: Inside `/backend`, initialize SQLite setup using `sqlite` and `sqlite3` packages.
  - **Details**: Create a `database.js` file to establish the connection and run migrations on startup. Create an `interactions` table with columns: `id`, `intent` (TEXT), `region` (TEXT), `ward` (TEXT), `timestamp` (DATETIME), and `metadata` (TEXT/JSON).
  - **QA Scenario**: Starting the backend creates a `database.sqlite` file. Querying the table via a CLI or test endpoint confirms the table structure exists.

### Phase 2: Backend Core (AI Router & Mock APIs)

- [x] **Task 2.1: Implement Mock API Providers**
  - **Action**: Create mock functions for 165 Anti-Fraud (Scams) and Cofacts (Rumors) in `/backend/services/mockApi.js`.
  - **Details**: 
    - `checkUrl(url)`: Returns a mock response indicating if a URL is a scam.
    - `checkFact(text)`: Returns a mock health/news fact check.
  - **QA Scenario**: A simple REST endpoint or unit test correctly returns the mock JSON payloads.

- [x] **Task 2.2: Implement the AI Router & Empathy Layer**
  - **Action**: Integrate `@google/genai` using `process.env.VERTEX_KEY` and the `gemini-3.1-pro-preview` model.
  - **Details**: 
    - Create a router function that takes user text and uses Gemini to classify the intent (`SCAM`, `RUMOR`, `HELP`).
    - Based on the intent, call the appropriate Mock API.
    - Pass the Mock API result back to Gemini to generate the "Empathy Layer" response (e.g., culturally sensitive, "Auntie/Uncle" framing).
  - **QA Scenario**: Sending a POST request to `/api/chat` with a scam link returns a JSON response containing the empathetic warning text and `intent: "SCAM"`.

- [x] **Task 2.3: Implement the Interaction Logger & Dashboard API**
  - **Action**: Log interactions to SQLite and expose the dashboard endpoint.
  - **Details**: 
    - Inside the `/api/chat` endpoint, after generating a response, insert a record into the `interactions` table.
    - Create a `GET /api/threats/ward/:ward` endpoint that aggregates the top 3 trending scams/rumors from the SQLite DB over the last 24 hours.
  - **QA Scenario**: Hitting the `/api/threats/ward/taipei-daan` endpoint returns an array of the top 3 threats based on mock data inserted during chat interactions.

### Phase 3: Frontend LINE Chat Emulator

- [x] **Task 3.1: Build the Chat UI Skeleton**
  - **Action**: In `/frontend`, build a mobile-first view emulating a LINE chat screen using Tailwind CSS.
  - **Details**: Include a message history list, a text input area, and a send button. Use appropriate LINE-like colors (e.g., green headers, chat bubbles).
  - **QA Scenario**: The UI looks like a mobile messaging app and scales correctly on desktop browsers.

- [x] **Task 3.2: Integrate Chat UI with Backend AI API**
  - **Action**: Wire up the chat input to send POST requests to the backend `/api/chat` endpoint.
  - **Details**: 
    - Display user messages as outgoing bubbles.
    - Show a loading indicator while waiting for the Gemini response.
    - Display the AI's empathetic response as an incoming bubble.
  - **QA Scenario**: User types a rumor -> sees loading state -> AI responds with a localized fact-check bubble.

- [x] **Task 3.3: Implement the "Teachable Moment" UI**
  - **Action**: Add logic to render interactive/rich UI elements when the backend returns a `SCAM` intent.
  - **Details**: If the API response includes a `teachable_moment` flag or specific intent, render a "rich-menu carousel" (a set of Tailwind cards) below the chat bubble explaining how to identify the scam.
  - **QA Scenario**: Submitting a known scam link triggers both the warning text and the educational carousel UI element in the chat history.

### Phase 4: Global Threat Dashboard

- [x] **Task 4.1: Build the Ward Chief Dashboard UI**
  - **Action**: Create a new route/view in the React app (e.g., `/dashboard`) for the community administrator.
  - **Details**: Build a clean, professional dashboard using Tailwind. It should have a header, a selector for the "Ward" (e.g., Da'an District), and a main content area for the "Threat Heatmap" (a list or simple bar chart).
  - **QA Scenario**: Navigating to `/dashboard` renders the administrator layout, visually distinct from the chat interface.

- [x] **Task 4.2: Integrate Dashboard with Backend Analytics API**
  - **Action**: Fetch data from `/api/threats/ward/:ward` and display it in the dashboard.
  - **Details**: Show the top 3 trending threats in real-time or via a refresh button. Display the intent type and count.
  - **QA Scenario**: The dashboard successfully displays aggregated stats matching the interactions previously executed in the chat emulator.

## Final Verification Wave

- [x] **End-to-End Test: The Scam Lifecycle**
  - Use the Chat UI to submit a URL. Verify the Empathy Layer responds correctly and the Teachable Moment carousel appears.
  - Navigate to the Dashboard. Verify the threat count for the corresponding ward has incremented.
- [x] **End-to-End Test: The Rumor Lifecycle**
  - Submit a health rumor. Verify the Chat UI responds with a gentle, culturally appropriate correction based on Mock Cofacts data.
- [x] **User Sign-off**
  - Present the completed MVP for final review.
