# Work Plan: Deep Refactoring & Modernization (Phase 2)

## 🎯 Objective
Address technical debt identified in the MVP. Modernize the LLM integration using native structured outputs and system instructions. Refactor the backend data layer to use the Repository pattern. Componentize the frontend and extract business logic into custom React hooks.

## 📋 Execution Plan

### Phase 1: Modernize LLM & Mock Data
- [x] **Task 1.1: Upgrade GenAI Integration**
  - **Action**: Update `backend/services/aiService.js` and `backend/config/prompts.js`.
  - **Details**: 
    - Move role-playing instructions into `config.systemInstruction`.
    - Import `Type` from `@google/genai`.
    - Inside `generateContent`, wrap options in a `config` object. Use `responseMimeType: "application/json"` and `responseSchema: { type: Type.STRING, enum: ["SCAM", "RUMOR", "HELP"] }` for the intent classification.
  - **QA Scenario**: Run `curl` against `/api/chat`. Verify response is still valid JSON with correct intent.
- [x] **Task 1.2: Enrich Mock Data Service**
  - **Action**: Update `backend/services/data.service.js`.
  - **Details**: Replace simple `.includes()` with a hardcoded array of exactly 3 realistic mock objects (e.g., 3 specific scam URLs, 3 specific rumors). Match against these arrays.
  - **QA Scenario**: Verify `lsp_diagnostics` is clean.
- [x] **Task 1.3: Enrich Seed Data**
  - **Action**: Update `backend/scripts/seed.js`.
  - **Details**: Instead of generic notes, inject realistic mock URLs and rumor text into the `metadata` JSON blob during seeding.
  - **QA Scenario**: Run `npm run seed --prefix backend` and verify success.

### Phase 2: Backend Repository Pattern
- [x] **Task 2.1: Implement Interaction Repository**
  - **Action**: Create `backend/repositories/interaction.repository.js`.
  - **Details**: Export functions `saveInteraction(db, data)` and `getTopThreatsByWard(db, ward)`. Move the raw SQL strings from the controllers into these functions.
  - **QA Scenario**: Verify `lsp_diagnostics` is clean.
- [x] **Task 2.2: Decouple Controllers**
  - **Action**: Update `chat.controller.js` and `threat.controller.js`.
  - **Details**: Remove raw SQL. Import and call the new repository functions, passing the `req.app.locals.db` instance to them.
  - **QA Scenario**: Run `curl` against both `/api/chat` and `/api/threats/ward/taipei-daan` to ensure they still hit the DB without crashing.

### Phase 3: Frontend Componentization & Hooks
- [x] **Task 3.1: Centralize Tailwind Theme**
  - **Action**: Update `frontend/tailwind.config.js`.
  - **Details**: Add custom colors: `line-green: '#00B900'`, `line-bg: '#7494C0'`, `line-bubble: '#85E249'`. Update `ChatUI.jsx` to use these semantic classes instead of arbitrary hex codes.
  - **QA Scenario**: Build the frontend (`npm run build --prefix frontend`).
- [x] **Task 3.2: Extract Custom Hooks**
  - **Action**: Create `frontend/src/hooks/useChat.js` and `frontend/src/hooks/useThreats.js`.
  - **Details**: Move all `useState` and `fetch` logic out of the UI components and into these hooks. They should return the state and handler functions.
  - **QA Scenario**: Verify `lsp_diagnostics` is clean.
- [x] **Task 3.3: Break Down ChatUI**
  - **Action**: Create `frontend/src/components/chat/MessageBubble.jsx` and `frontend/src/components/chat/MessageInput.jsx`.
  - **Details**: Refactor `ChatUI.jsx` to use the `useChat` hook and render these smaller sub-components instead of a massive monolithic file.
  - **QA Scenario**: Build the frontend (`npm run build --prefix frontend`).

## Final Verification Wave
- [x] **System Test**
  - Run `npm run seed --prefix backend`.
  - Start servers with `npm run dev`.
  - Create and run a Playwright script `test-refactor.js` that navigates to `http://localhost:5173`, sends a message, and verifies the response and dashboard update.