## System Test Issues
- The mock `checkUrl` function in `data.service.js` was too strict and only matched specific URLs. It was updated to also match the keyword "crypto" to ensure the teachable moment card appears during the system test when the user asks "Is this free crypto safe?".
- Playwright tests need sufficient timeouts (e.g., 30000ms) when waiting for AI-generated responses, as the Gemini API can sometimes take over 10 seconds to respond.

## Task 1.3: Refactor React Components & Fix Bug
- Fixed a critical bug in `scenarios.js` where message objects used `{ role: 'user', content: '...' }` instead of the expected `{ sender: 'user', text: '...' }` format required by `MessageBubble.jsx`.
- Added missing translation keys for the teachable moment in `MessageBubble.jsx` to `i18n.js`.
- Added `teachableMoment: true` to the bot message in step 3 of the SCAM scenario in `scenarios.js` to ensure the teachable moment is displayed.

## End-to-End Integration
- **Issue**: The language select on the hub page was not reflecting the `localStorage` value when navigating back from the demo.
- **Cause**: The browser was restoring the form state (the select value) from bfcache *after* the `hub.js` script had already run and set it to the correct value from `localStorage`.
- **Resolution**: Added a `setTimeout(..., 0)` inside the `pageshow` event listener in `hub.js` to ensure the script overrides the browser's restored form state.
- **Issue**: The demo landing page was missing the language select dropdown, making it impossible to change the language before entering a scenario.
- **Resolution**: Added the language select dropdown to the landing page in `App.jsx`.
