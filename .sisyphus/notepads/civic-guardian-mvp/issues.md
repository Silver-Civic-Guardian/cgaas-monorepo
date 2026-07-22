## System Test Issues
- The mock `checkUrl` function in `data.service.js` was too strict and only matched specific URLs. It was updated to also match the keyword "crypto" to ensure the teachable moment card appears during the system test when the user asks "Is this free crypto safe?".
- Playwright tests need sufficient timeouts (e.g., 30000ms) when waiting for AI-generated responses, as the Gemini API can sometimes take over 10 seconds to respond.
