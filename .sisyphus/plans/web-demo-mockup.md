# Work Plan: Civic Guardian Web Demo (Frontend Mockup)

## 🎯 Objective
Create a standalone, frontend-only "web demo" of Civic Guardian in a new directory (`web-demo`). This application will serve as a presentation tool, featuring a split-screen layout: the left side displays the interactive app UIs (LINE Chat / Admin Dashboard) using pre-rendered mock data, while the right side features a "Guided Tour Sidebar" explaining the underlying system architecture (AI Routing, Empathy Layer, DB Logging) step-by-step.

## 🏗️ Target Architecture Overview
```text
web-demo/
├── src/
│   ├── config/
│   │   └── scenarios.js          # The script/steps for the guided tours
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DemoLayout.jsx    # Split-screen wrapper
│   │   │   └── ExplainerSidebar.jsx # The guided tour text & controls
│   │   ├── chat/                 # Copied & adapted from main frontend
│   │   └── dashboard/            # Copied & adapted from main frontend
│   ├── hooks/
│   │   └── useDemoOrchestrator.js # Engine to advance steps and trigger UI changes
│   └── App.jsx
└── package.json
```

## 📋 Execution Plan

### Phase 1: Setup & Layout Scaffolding
- [x] **Task 1.1: Initialize `web-demo` Project**
  - **Action**: Run `npm create vite@latest web-demo -- --template react` in the root.
  - **Details**: Install Tailwind CSS, copy the `tailwind.config.js` colors (`line-green`, `line-bg`, `line-bubble`) and `index.css` from the main `frontend`, and configure PostCSS/Autoprefixer.
  - **QA Scenario**: Write a quick Playwright script to load `http://localhost:5174` (or whatever port Vite uses) and verify the `<title>` or a basic `<h1>` is present.
- [x] **Task 1.2: Build the Split-Screen Layout**
  - **Action**: Create `src/components/layout/DemoLayout.jsx` and `ExplainerSidebar.jsx`.
  - **Details**: The layout should have a responsive grid: 2/3 width for the App Stage (centered mobile UI for chat, full width for dashboard) and 1/3 width for the dark-mode Explainer Sidebar. Add `data-testid="app-stage"` and `data-testid="explainer-sidebar"`.
  - **QA Scenario**: Use Playwright to verify both `data-testid` elements exist in the DOM and are visible.

### Phase 2: The Demo Orchestrator (State Engine)
- [x] **Task 2.1: Define Scenario Scripts**
  - **Action**: Create `src/config/scenarios.js`.
  - **Details**: Define JSON structures for 3 scenarios: "The Scam Link", "The Health Rumor", and "The Admin Dashboard". Each scenario has an array of `steps` (e.g., title, description of what AI is doing, and the resulting UI state payload).
  - **QA Scenario**: Verify `lsp_diagnostics` is clean.
- [x] **Task 2.2: Implement `useDemoOrchestrator` Hook**
  - **Action**: Create `src/hooks/useDemoOrchestrator.js`.
  - **Details**: Manage state for `activeScenario`, `currentStepIndex`, and `appState` (which messages to show or what dashboard data to display). Provide `nextStep()` and `resetScenario()` functions.
  - **QA Scenario**: Verify hook logic is syntactically valid and imports cleanly.

### Phase 3: Porting & Adapting the UIs
- [x] **Task 3.1: Adapt the Chat UI**
  - **Action**: Copy the `ChatUI`, `MessageBubble`, and `MessageInput` components from `frontend` into `web-demo`.
  - **Details**: Remove all `fetch` logic and specifically strip out imports to the old `useChat` hook. Instead, make the components strictly "dumb" (controlled components). They should receive `messages`, `isTyping`, and `inputValue` directly via props from the `DemoOrchestrator`. Add `data-testid="chat-ui"`.
  - **QA Scenario**: Use Playwright to verify `data-testid="chat-ui"` renders without crashing when provided mock props.
- [x] **Task 3.2: Adapt the Dashboard UI**
  - **Action**: Copy `Dashboard.jsx` from `frontend` into `web-demo`.
  - **Details**: Strip all `fetch` logic and imports to `useThreats`. Have it receive `stats` and `threats` via props from the `DemoOrchestrator`. Add `data-testid="dashboard-ui"`.
  - **QA Scenario**: Use Playwright to verify `data-testid="dashboard-ui"` renders correctly with dummy data props.

### Phase 4: Wiring the Guided Tour
- [x] **Task 4.1: Wire Scenarios to UIs**
  - **Action**: Update `App.jsx` and `DemoLayout.jsx`.
  - **Details**: Use the `ExplainerSidebar` to display the current step's explanation. Add "Next Step" buttons. When "Next Step" is clicked, update the `appState` (e.g., step 1: show user typing; step 2: show user message; step 3: show AI loading; step 4: show Empathy + Teachable Moment).
  - **QA Scenario**: Use Playwright to click the "Next Step" button and verify the text in `ExplainerSidebar` updates to the next step's content.
- [x] **Task 4.2: Final Polish & Navigation**
  - **Action**: Add a landing view to select which scenario to play and a "Back to Menu" button at the end of scenarios.
  - **Details**: Provide a clean "Start Demo" screen with buttons for "Scam Lifecycle", "Rumor Lifecycle", and "Dashboard Tour". Ensure users can return to the menu when a scenario finishes.
  - **QA Scenario**: Use Playwright to click "Scam Lifecycle", verify the layout loads, then click "Back to Menu" and verify the landing view returns.

## Final Verification Wave
- [x] **Full Presentation Run-through**
  - Run `npm run dev --prefix web-demo`.
  - Create `test-presentation.js` (Playwright script).
  - Verify "The Scam Link" scenario steps through user input -> AI classification -> Empathy response -> Teachable Moment by clicking "Next Step" programmatically.
  - Verify "The Admin Dashboard" scenario loads and displays aggregate stats.
  - Confirm no dependencies exist on the actual `backend` or database (fully standalone).