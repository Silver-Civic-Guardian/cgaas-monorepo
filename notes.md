## The Pitch: "Civic Guardian as a Service" (CGaaS)

You are not just building a LINE bot; you are building an **Open Protocol for Vulnerable Demographics**. The LINE bot is just the _Taiwanese implementation_ of that protocol.

To make it exportable, you architect the backend so the "AI Router" and the "Data Integration Layer" are decoupled from the frontend messaging app.

### 1. Platform-Agnostic Frontend Integration

Not every country uses LINE. The solution must easily plug into whatever messaging platform the local vulnerable population already trusts.

- **WhatsApp in India/Brazil:** WhatsApp has a massive footprint globally and is the primary vector for misinformation in many emerging markets. By exposing your backend via a standard REST API, a partner in India can plug the Civic Guardian logic directly into a WhatsApp Business API.
    
- **Viber in Eastern Europe:** Similar to WhatsApp, Viber is dominant in many regions.
    
- **SMS/USSD in Low-Bandwidth Regions:** For regions with low smartphone penetration (e.g., parts of Sub-Saharan Africa), the backend could be adapted to receive basic SMS text messages, run the intent routing, and reply with text-based fact-checks.
    

### 2. Plug-and-Play Data Sources

Currently, the prototype relies on Taiwan's 165 Anti-Fraud database and Cofacts. To make it exportable, the architecture must allow local governments or NGOs to plug in their own datasets.

- **The "Bring Your Own Data" (BYOD) Model:** You build the system so that an international partner only needs to supply an API endpoint for their local police database or fact-checking NGO (like _Snopes_ in the US, or _Alt News_ in India). The AI Router doesn't care where the data comes from; it just knows how to ask the database, "Is this true/safe?" and translate the answer into empathetic language.
    

### 3. Expanding the "Teachable Moment" Library

The micro-learning aspect is universally valuable, but the content must be localized.

- **Open-Source Content Repository:** The project could include a framework for local health ministries or NGOs to upload their own short, culturally relevant educational videos. When the bot intervenes in a scam in the Philippines, it serves a localized Tagalog video produced by a local partner, rather than a generic animation.
    

## Maximizing Value: The Global "Threat Heatmap"

The Ward Chief Dashboard is your local "Smarter Services" play. If you scale this internationally, that dashboard becomes a global threat intelligence network.

If the Civic Guardian protocol is deployed in multiple countries, you can aggregate the anonymized meta-data to see how digital threats migrate. For example, if a specific type of crypto-scam starts trending on the WhatsApp integration in Southeast Asia, the global system can automatically elevate the risk score for similar URLs hitting the LINE integration in Taiwan.

**1.Decouple the Webhook:**

Instead of hardcoding LINE-specific payload parsing in the main router, create an abstraction layer. Create separate middleware functions that normalize incoming messages (from LINE, WhatsApp, or SMS) into a standard JSON format before hitting the Vertex AI router.

**2.Abstract the Data Providers:**

Build a configuration file (or database table) where "Data Sources" are defined by region. If the incoming request is tagged `region: TW`, query Cofacts. If `region: IN`, query the local Indian fact-checking API.

**3.Standardize the Response Format:**

The Vertex AI should output its empathetic response as plain text. The frontend adapter (the LINE or WhatsApp specific code) handles translating that text into the platform's specific UI elements (like buttons or carousels).



## 1. Project Overview & Core Purpose

**Project Title:** Civic Guardian (Civic Guardian as a Service - CGaaS)

**Hackathon Alignment:** Digital Inclusion in the AI Era & Building Smarter Services

### The Core Purpose

The core purpose of Civic Guardian is to build an open, platform-agnostic civic infrastructure layer that transforms digital _fear_ into digital _confidence_ for vulnerable populations globally.

While the MVP is implemented as a LINE bot for Taiwanese seniors, the underlying protocol—CGaaS—is designed to integrate with whatever messaging platform a local population already trusts (LINE, WhatsApp, Viber, or SMS). By providing real-time, empathetic scam intervention, gentle fact-checking, and proactive micro-learning, Civic Guardian serves as an intelligent safety net that empowers marginalized groups to safely participate in the digital era.

### The Strategic Objectives (Alignment with Hackathon Themes)

To maximize scoring for **Social Impact**, **Feasibility**, and **Innovation**, the project is driven by three strategic objectives that directly answer the hackathon's mandate:

#### Objective 1: Advance True Digital Inclusion via an "Empathy Layer"

- **The Problem:** The greatest barrier to digital inclusion for the elderly isn't access to hardware; it is the paralyzing fear of scams and the social friction caused by health misinformation. Existing fact-checkers deliver clinical, cold data that can induce shame or defensiveness.
    
- **The Solution:** Civic Guardian uses Vertex AI to create an "Empathy Layer." It doesn't just check facts against databases like Cofacts or 165 Anti-Fraud; it uses LLMs to rewrite those facts into culturally sensitive, face-saving language (e.g., using respectful terms like "Auntie/Uncle" or local dialects).
    
- **The Outcome:** By meeting users on the platforms they already use and communicating with warmth, we remove the friction of adopting new technology and keep them safely engaged in the digital world.
    

#### Objective 2: Foster Continuous Literacy via "Teachable Moments"

- **The Problem:** Current anti-fraud and fact-checking bots are entirely reactive. They block a threat, but they do not upskill the citizen.
    
- **The Solution:** Civic Guardian shifts from reactive defense to proactive education. Whenever the AI intercepts a scam link or rumor, it automatically serves a "Teachable Moment"—a localized, 30-second micro-learning asset (video or interactive quiz) explaining _how_ the scam works.
    
- **The Outcome:** We are actively narrowing the digital divide by building long-term digital literacy directly within the context of the user's daily life.
    

#### Objective 3: Build Smarter Governance via B2B2C Threat Intelligence

- **The Problem:** Scams and misinformation are localized, but community leaders (like Taiwan's Ward Chiefs / Li-zhang) lack real-time visibility into the specific digital threats targeting their neighborhoods until after damage is done.
    
- **The Solution:** Civic Guardian operates on a B2B2C (Business-to-Business-to-Consumer) model. As the AI router protects individual citizens, it simultaneously aggregates and anonymizes the intent data. This feeds a live "Threat Heatmap" web dashboard for local administrators.
    
- **The Outcome:** We deliver "Smarter Services" by transforming fragmented, individual interactions into actionable, predictive intelligence for public safety officials. Furthermore, the "Bring Your Own Data" (BYOD) architecture allows governments worldwide to plug their own local databases into this exact same dashboard.


## Detailed Target Personas & Stakeholders

To score highly on the "Social Impact" criterion, the judges need to see that we truly understand our users. We are designing for three distinct layers of interaction: the end-user (Citizen), the support network (Co-Pilot), and the governance layer (Administrator).

### Persona A: The Vulnerable Citizen (End-User)

- **Name:** Auntie Chen (72, retired teacher, lives in Kaohsiung).
    
- **Context:** Uses a smartphone exclusively for messaging family and watching YouTube. She speaks Taigi and Mandarin.
    
- **Pain Point:** She frequently receives SMS messages claiming her NHI card is suspended or she has unpaid toll fees. She is terrified of clicking links because a friend recently lost money to a phishing scam.
    
- **System Requirement:** Zero-friction entry. She does not need to install an app or create an account. She simply interacts with the Civic Guardian bot on LINE just as she would with a human relative.
    

### Persona B: The Family Co-Pilot (Support Layer)

- **Name:** Wei (35, IT professional, lives in Taipei).
    
- **Context:** Auntie Chen’s son. He acts as the unofficial IT support for his parents.
    
- **Pain Point:** He is frustrated by the constant need to verify whether health rumors his mother sends him are true. He worries about her financial safety but cannot monitor her phone 24/7.
    
- **System Requirement:** Asynchronous notifications. The system must automatically alert Wei _only_ when his mother attempts a high-risk action (like forwarding a known malicious crypto-scam link to the bot), allowing him to intervene when it matters most.
    

### Persona C: The Community Administrator (Governance Layer)

- **Name:** Li-zhang Lin (55, Ward Chief).
    
- **Context:** Responsible for the daily well-being and safety of his local neighborhood.
    
- **Pain Point:** When a new scam wave hits, he only finds out _after_ several seniors have been victimized and report it to the local police. He lacks real-time, localized threat intelligence.
    
- **System Requirement:** A clear, visual web dashboard (the "Threat Heatmap") that aggregates anonymized bot interactions, showing him exactly which scams are trending in his specific ward today.
    

## Key User Stories & Acceptance Criteria (For Development)

These user stories explicitly outline the MVP (Minimum Viable Product) requirements for the hackathon submission. By defining clear acceptance criteria, we ensure the prototype demonstrates **Feasibility and Implementation**.

### Epic 1: Multichannel Intent Routing

- **Story:** As an end-user, I can send a text, a forwarded link, or a voice memo to the bot, and the AI will correctly understand my intent regardless of the format.
    
- **Acceptance Criteria:**
    
    - The webhook successfully receives the LINE payload.
        
    - If the input is voice, standard STT (Speech-to-Text) translates it to text.
        
    - The Vertex AI (Gemini) router reliably outputs a JSON intent tag (`SCAM`, `RUMOR`, `HELP`) and a `confidence_score` > 0.85.
        

### Epic 2: The Empathy Layer (Fact-Checking)

- **Story:** As an end-user, when I ask about a popular health rumor, I receive a gentle, culturally appropriate correction rather than a clinical database dump.
    
- **Acceptance Criteria:**
    
    - The backend successfully queries the mock Cofacts API using the user's text.
        
    - The Vertex AI prompt reformats the raw API data into a conversational response starting with terms like "Uncle/Auntie."
        
    - The bot returns the localized text to the user within 3 seconds.
        

### Epic 3: The "Teachable Moment" (Micro-learning)

- **Story:** As an end-user, after the bot blocks a scam link, I am presented with a short educational asset so I can learn to identify the threat myself.
    
- **Acceptance Criteria:**
    
    - Upon a `SCAM` intent classification, the bot replies with the warning text.
        
    - Immediately following the text, the bot pushes a rich-menu carousel or embedded 30-second video explaining the specific scam type (e.g., "Phishing 101").
        

### Epic 4: Global Threat Dashboard

- **Story:** As a community administrator, I can log into a web portal and see a visual representation of active threats in my jurisdiction.
    
- **Acceptance Criteria:**
    
    - The MERN backend provides a REST API endpoint (`/api/threats/ward/X`).
        
    - The React frontend fetches and displays a list of the top 3 trending scams over the last 24 hours.
        

## Technical Architecture Flow (The "CGaaS" Model)

To prove the solution's maturity and future development plan (hitting the 30% **Feasibility** and 30% **Implementation** criteria for the finals), the architecture is abstracted to support the "Civic Guardian as a Service" (CGaaS) model.

**1.The Frontend Adapter:**Ingestion & Normalization.

A payload arrives from LINE (or WhatsApp/SMS in international deployments). An adapter normalizes this into a standard JSON format: `{ userId, messageType, content, regionCode }` before sending it to the core engine.

**2.The AI Router:**Vertex AI Engine.

The normalized content is sent to Vertex AI (`gemini-3.5-flash`). The LLM prompt acts as a decision engine, outputting structured JSON dictating which local API to hit based on the `regionCode` and intent.

**3.Data Integration (Bring Your Own Data):**BYOD Layer.

The backend queries the appropriate regional database (e.g., 165 Anti-Fraud in Taiwan, or a mock NGO database for international contexts) based on the AI's routing decision.

**4.The Empathy Generator:**LLM Formatting.

The raw database result is fed back into Vertex AI with a "Persona Prompt" (e.g., "Translate this fact-check into empathetic Taiwanese Hokkien phrasing").

**5.The Dashboard Analytics:**React/Vite.

Asynchronously, the interaction metadata (intent type, location, timestamp) is logged in MongoDB. The Ward Chief Dashboard continuously polls this database to update the localized threat heatmap.