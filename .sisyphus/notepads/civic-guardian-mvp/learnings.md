- Initialized monorepo structure with Vite/React/Tailwind frontend and Express backend.
- Used `concurrently` in root package.json to run both dev servers simultaneously.

## Database Setup
- SQLite database is initialized on server startup and creates `database.sqlite` in the `/backend` directory.
- The `interactions` table is created automatically if it doesn't exist.

## Task 2.1: Mock API Providers
- Created simple mock functions for 165 Anti-Fraud and Cofacts to simulate external API responses.
- Used basic string matching (`includes`) for mock logic to keep it lightweight.

## AI Integration
- The `@google/genai` SDK is straightforward to use for text generation.
- Prompt engineering is crucial for reliable intent classification. We explicitly instruct the model to return ONLY the category name.
- The `teachableMoment` flag provides a clean way for the backend to signal the frontend about educational opportunities without coupling the logic.

### Task 2.3: Interaction Logger & Dashboard API
- Successfully implemented interaction logging in the `/api/chat` endpoint.
- The `interactions` table stores `intent`, `region`, `ward`, and `metadata` (JSON stringified result).
- Created `GET /api/threats/ward/:ward` endpoint to aggregate the top 3 trending intents (scams/rumors) over the last 24 hours.
- SQLite's `datetime('now', '-1 day')` is useful for filtering recent records.

## Task 3.1: Chat UI Skeleton
- Created a mobile-first Chat UI component using Tailwind CSS.
- Emulated LINE's aesthetic with specific colors: Header (#00B900), Background (#7494C0), and User Bubbles (#85E249).
- Used a flexbox layout with `h-screen` and `flex-col` to ensure the header and input area stay fixed while the message area scrolls.
- Integrated ChatUI with backend `/api/chat` endpoint.
- Added `isLoading` state and typing indicator.
- Stored `intent` and `teachableMoment` in message objects for future use.

## Teachable Moment UI
- Added a rich UI card that renders below the chat bubble when `msg.teachableMoment` is true.
- The card uses Tailwind CSS for styling, matching the LINE-like aesthetic with a distinct red warning header and a "Learn more" button.
- Verified that the backend correctly sets the `teachableMoment` flag for SCAM intents, and the frontend successfully renders the card.

## Task 4.1: Ward Chief Dashboard UI
- Created a simple state-based routing in `App.jsx` to switch between the Chat UI and the Dashboard. This avoids adding `react-router-dom` for now, keeping the MVP simple.
- Built the `Dashboard.jsx` component using Tailwind CSS for styling. It includes a header with a ward selector, a stats row, and a placeholder for the "Top Threats" list.
- The dashboard uses a clean, professional aesthetic (white/gray background, data cards) distinct from the chat interface.

## Task 4.2: Integrate Dashboard with Backend Analytics API
- Successfully integrated the frontend Dashboard with the backend `/api/threats/ward/:ward` endpoint.
- Used `useEffect` to fetch data on ward change and added a manual refresh button.
- Handled loading and error states gracefully in the UI.

## End-to-End Test: The Scam Lifecycle
- Successfully verified the end-to-end flow using Playwright.
- The chat UI correctly handles user input and displays the bot's response.
- The Empathy Layer successfully identifies the "SCAM" intent and returns an empathetic response along with the "Protect Yourself!" teachable moment card.
- The backend correctly records the interaction in the SQLite database.
- The dashboard successfully fetches and displays the aggregated threat counts, showing the incremented "SCAM" count.
- Note on Playwright testing with React: To trigger React's `onChange` event when filling a textarea, Playwright's `fill` method (via `browser_type` tool) works perfectly, whereas manually setting the value via DOM requires bypassing React's value setter and dispatching events.

## End-to-End Test: The Rumor Lifecycle
- Successfully verified the rumor lifecycle using Playwright.
- The frontend correctly sends the chat message to the backend.
- The backend correctly classifies the intent as `RUMOR` using Gemini.
- The backend correctly fetches the mock API result (`isRumor: true`, `correction: 'Garlic does not cure viruses. Please consult a doctor.'`).
- The backend correctly generates an empathetic response using Gemini.
- The frontend correctly displays the "Protect Yourself!" teachable moment card when `teachableMoment` is true.
- The dashboard correctly updates the "Top Threats & Issues" list with the `RUMOR` intent count after clicking "Refresh".
- Note: The refresh button text is "Refresh", not "Refresh Data".
- Refactored `backend/services/aiService.js` to use externalized prompt builder functions from `backend/config/prompts.js`.
- Verified the `/api/chat` endpoint works correctly with the refactored AI service.

## Task 2.1: Async Data Service
- Renamed `mockApi.js` to `data.service.js` to better reflect its role.
- Refactored `checkUrl` and `checkFact` to be `async` and return Promises with a `setTimeout` (800ms) to simulate network latency.
- This prepares the service for integration with `aiService.js` in the next task.
- Updated `backend/services/aiService.js` and `backend/server.js` to use the new async `data.service.js` instead of `mockApi.js`.
- Verified that the `/api/chat` endpoint correctly awaits the mock data service functions and includes the artificial delay.

## Task 3.1: Extract Chat Routing
- Successfully extracted the `/api/chat` endpoint logic from `server.js` into `controllers/chat.controller.js` and `routes/chat.routes.js`.
- The Express app now uses `app.use('/api/chat', chatRoutes)` to mount the router.
- Verified the endpoint functionality using `curl`, confirming it still processes messages and interacts with the database correctly.

## Task 3.2: Extract Threat Routing
- Successfully extracted the threat routing logic from `backend/server.js` into `backend/controllers/threat.controller.js` and `backend/routes/threat.routes.js`.
- The endpoint `/api/threats/ward/:ward` functions exactly as before, returning the top 3 intents for a given ward.

## Task 3.3: Clean Server Entrypoint
- Refactored `backend/server.js` to use `chatRoutes` and `threatRoutes`.
- Removed old mock testing endpoints (`/api/test-mock`) and unused imports (`checkUrl`, `checkFact`).
- Verified server starts successfully and endpoints (`/api/chat`, `/api/threats/ward/:ward`) are reachable via `curl`.

## Seed Script
- Created `backend/scripts/seed.js` to populate the SQLite database with mock interaction data.
- The script successfully clears the `interactions` table and inserts 20-30 random records with intents (SCAM, RUMOR, HELP) and wards (taipei-daan, taipei-xinyi, taipei-zhongshan) within the last 24 hours.
- Verified that the `/api/threats/ward/:ward` endpoint correctly aggregates and returns the seeded data.
- Added seed script to backend/package.json and verified it runs successfully.

## System Test Findings
- The end-to-end flow works correctly.
- The AI service correctly identifies the intent and generates an empathetic response.
- The Teachable Moment UI appears when a scam is detected.
- The dashboard correctly fetches and displays the aggregated threat counts from the seeded data.
- The AI generation takes around 10-11 seconds, which is longer than the 800ms delay from the mock data service, but the system handles it gracefully with a loading indicator.

### GenAI Integration Upgrade
- Upgraded the Gemini integration to use native structured outputs for intent classification.
- Used `responseMimeType: "application/json"` and `responseSchema` with `Type.STRING` and `enum` to enforce the intent to be one of `["SCAM", "RUMOR", "HELP"]`.
- Moved role-playing instructions (e.g., "Auntie" or "Uncle" persona) into `config.systemInstruction` for the empathy generation step, which is the recommended way to set system-level instructions in the new `@google/genai` SDK.
- Note: When using `responseMimeType: "application/json"` with a string schema, the response text includes quotes (e.g., `"SCAM"`). It's necessary to strip these quotes or parse the JSON before using the value.

## Task 1.2: Enrich Mock Data Service
- Replaced simple string matching with hardcoded arrays of realistic mock objects (`MOCK_SCAMS` and `MOCK_RUMORS`) in `backend/services/data.service.js`.
- Used `.find()` to match user input against the mock data arrays.
- This improves the realism of the mock data service for the MVP.

### Task 1.3: Enrich Seed Data
- Updated `backend/scripts/seed.js` to inject realistic mock URLs and rumor text into the `metadata` JSON blob during seeding.
- Used arrays of mock data for scams, rumors, and help requests.
- Verified the script works by running `npm run seed --prefix backend` and checking the database.

## Task 2.2: Decouple Controllers
- Successfully refactored `chat.controller.js` and `threat.controller.js` to use the repository pattern.
- Replaced raw SQL queries with calls to `saveInteraction` and `getTopThreatsByWard` from `interaction.repository.js`.
- Verified that the endpoints still function correctly and interact with the database as expected.

## Centralize Tailwind Theme
- Added custom colors (`line-green`, `line-bg`, `line-bubble`) to `tailwind.config.js` to replace arbitrary hex codes in the UI.
- This improves maintainability and ensures consistency across the application.

## Custom Hooks Extraction
- Successfully extracted `useChat` and `useThreats` hooks.
- The UI components (`ChatUI` and `Dashboard`) are now cleaner and focused solely on rendering.
- Refactored ChatUI.jsx into smaller components (MessageBubble, MessageInput) to improve maintainability.

## System Test & Verification
- Created a Playwright script (`test-refactor.js`) to perform end-to-end testing of the chat and dashboard flows.
- Verified that the loading indicator appears during the AI processing delay.
- Verified that the "Protect Yourself!" teachable moment card is correctly displayed when a scam is detected.
- Verified that the dashboard correctly fetches and displays aggregated threat data from the seeded database.
- The architecture refactoring (separating routes, controllers, services, and repositories) works seamlessly end-to-end.
