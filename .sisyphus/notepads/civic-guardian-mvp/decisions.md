- Used Tailwind CSS v3 for the frontend to match the requested setup commands (`npx tailwindcss init -p`).
- Configured backend to run on port 3000 and frontend on Vite's default port (5173).

## Database Setup
- Used `sqlite` and `sqlite3` for the backend database.
- Created `database.js` to handle connection and migrations on startup.
- Stored the database instance in `app.locals.db` in `server.js` to make it accessible to routes.

## Task 2.1: Mock API Providers
- Placed mock API logic in `backend/services/mockApi.js` to separate it from route handlers.
- Added a temporary `/api/test-mock` endpoint in `server.js` for easy verification.

## AI Router & Empathy Layer
- Used `@google/genai` SDK to interact with Gemini.
- Implemented a two-step AI process:
  1. Intent classification (SCAM, RUMOR, HELP).
  2. Empathy generation based on intent and mock API results.
- Added a `teachableMoment` boolean flag to the response to indicate when the UI should display educational content.

### Task 2.3: Interaction Logger & Dashboard API
- **Decision**: Default `region` to 'TW' and `ward` to 'taipei-daan' in the `/api/chat` endpoint if not provided in the request body.
- **Rationale**: Ensures that interactions are always logged with a location, even if the client doesn't provide one, which is useful for the MVP dashboard.
- **Decision**: Store the entire `result` object as a JSON string in the `metadata` column of the `interactions` table.
- **Rationale**: Provides flexibility for future analysis or debugging without needing to alter the database schema.
