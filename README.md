# Civic Guardian MVP (CGaaS)

Civic Guardian is an **Open Protocol for Vulnerable Demographics** designed to combat digital fear, scams, and misinformation through real-time empathy and micro-learning. 

This repository contains the Minimum Viable Product (MVP) built for the hackathon. It demonstrates the core architecture of **Civic Guardian as a Service (CGaaS)**: a platform-agnostic backend, a conversational AI router, an "Empathy Layer" for fact-checking, and a global threat dashboard for community administrators.

## 🌟 Key Features

1.  **Platform-Agnostic AI Router**: An Express backend that accepts text input (simulating a messaging app webhook) and uses **Google Gemini (gemini-3.1-pro-preview)** to classify the user's intent into `SCAM`, `RUMOR`, or `HELP`.
2.  **The Empathy Layer**: Instead of returning cold, clinical fact-check data, the AI Router processes mock API responses (simulating 165 Anti-Fraud or Cofacts) and generates culturally sensitive, face-saving replies (e.g., using "Auntie/Uncle").
3.  **Teachable Moments**: When a threat is detected, the UI pushes interactive rich-menu elements to deliver bite-sized educational content, turning a blocked scam into a continuous literacy opportunity.
4.  **Global Threat Heatmap (Ward Chief Dashboard)**: A React-based admin dashboard that aggregates anonymized interaction metadata in real-time, allowing community leaders to see which scams are currently trending in their specific jurisdictions.

## 🏗️ Architecture

The project is structured as a decoupled monorepo:

*   **`/frontend`**: A mobile-first React application built with Vite and styled with Tailwind CSS. It serves two application views and a static landing-page collection:
    *   **LINE Chat Emulator (`/`)**: A mock messaging interface for end-users to interact with the bot.
    *   **Ward Chief Dashboard (`/dashboard`)**: An admin interface for community leaders to monitor threats.
    *   **Landing-page concepts (`/civic-guardian/`)**: A static chooser for five multilingual narratives, including the Safety Net concept at `/civic-guardian/05-safety-net/`.
*   **`/backend`**: A Node.js and Express server that handles AI routing, mock data integration, and database interactions.
*   **Database**: SQLite (`database.sqlite`) is used for lightweight, zero-configuration metadata logging.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   A Google Vertex AI API Key (`VERTEX_KEY`)

### Installation

1.  Clone the repository and install dependencies in the root, frontend, and backend:

```bash
# Install root dependencies (concurrently)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### Running the Application

This project uses `concurrently` to run both the frontend and backend servers simultaneously from the root directory.

1.  Export your Google Vertex AI API Key as an environment variable:

```bash
export VERTEX_KEY="your-google-vertex-ai-key-here"
```

2.  Start the development servers:

```bash
npm run dev
```

*   The **Frontend** (Chat UI & Dashboard) will be available at `http://localhost:5173`.
*   The **Landing-page chooser** will be available at `http://localhost:5173/civic-guardian/`.
*   The **Backend** API will be running on `http://localhost:3000`.

## 🧪 Usage & Testing Scenarios

Once the application is running, open your browser to `http://localhost:5173` and try the following scenarios in the Chat Emulator:

**Scenario 1: The Scam Lifecycle**
1. Type: *"Is this free crypto link safe?"*
2. The AI will classify this as a `SCAM`, query the mock 165 Anti-Fraud API, and return an empathetic warning along with a "Protect Yourself!" teachable moment card.
3. Switch to the Admin Dashboard (top navigation) and click "Refresh". You will see the `SCAM` count increment for the default ward.

**Scenario 2: The Rumor Lifecycle**
1. Type: *"I heard garlic cures the virus, is that true?"*
2. The AI will classify this as a `RUMOR`, query the mock Cofacts API, and return a gentle, culturally appropriate correction.
3. Switch to the Admin Dashboard and click "Refresh". You will see the `RUMOR` count increment.

## 🛠️ Tech Stack

*   **AI**: Google GenAI SDK (`@google/genai`) with the `gemini-3.1-pro-preview` model.
*   **Frontend**: React 19, Vite, Tailwind CSS v3.
*   **Backend**: Node.js, Express.js.
*   **Database**: SQLite (`sqlite3`, `sqlite`).
