export const SCENARIOS = {
  SCAM: {
    title: "The Scam Link",
    description: "A user receives a suspicious link and forwards it to the Civic Guardian bot.",
    steps: [
      {
        title: "User sends link",
        explanation: "The user forwards a suspicious WhatsApp message containing a phishing link.",
        uiState: {
          messages: [
            { role: 'user', content: 'Hey, I just got this message: "Win a free iPhone! Click here: http://suspicious-link.com"' }
          ],
          isTyping: false
        }
      },
      {
        title: "AI Routing",
        explanation: "The system receives the message and routes it to the appropriate analysis agent.",
        uiState: {
          messages: [
            { role: 'user', content: 'Hey, I just got this message: "Win a free iPhone! Click here: http://suspicious-link.com"' }
          ],
          isTyping: true
        }
      },
      {
        title: "Empathy Layer & Teachable Moment",
        explanation: "The bot responds with empathy, explains why the link is dangerous, and provides a teachable moment.",
        uiState: {
          messages: [
            { role: 'user', content: 'Hey, I just got this message: "Win a free iPhone! Click here: http://suspicious-link.com"' },
            { role: 'bot', content: 'Thanks for sharing this with me. I know it can be exciting to see offers like this, but this looks like a phishing scam. The link is trying to trick you into giving away personal information. It\'s always best to avoid clicking on unexpected links, even if they seem to come from someone you know.' }
          ],
          isTyping: false
        }
      }
    ]
  },
  RUMOR: {
    title: "The Health Rumor",
    description: "A user asks about a trending health rumor they saw online.",
    steps: [
      {
        title: "User asks about rumor",
        explanation: "The user asks the bot to verify a health claim they saw on social media.",
        uiState: {
          messages: [
            { role: 'user', content: 'Is it true that drinking garlic water cures the flu? I saw it on Facebook.' }
          ],
          isTyping: false
        }
      },
      {
        title: "Fact-Checking",
        explanation: "The bot cross-references the claim with trusted health databases.",
        uiState: {
          messages: [
            { role: 'user', content: 'Is it true that drinking garlic water cures the flu? I saw it on Facebook.' }
          ],
          isTyping: true
        }
      },
      {
        title: "Providing Context",
        explanation: "The bot provides accurate information and debunks the rumor gently.",
        uiState: {
          messages: [
            { role: 'user', content: 'Is it true that drinking garlic water cures the flu? I saw it on Facebook.' },
            { role: 'bot', content: 'While garlic has some health benefits, there is no scientific evidence that drinking garlic water cures the flu. The best ways to prevent and treat the flu are getting vaccinated, resting, and staying hydrated. It\'s always a good idea to check with a healthcare professional for medical advice.' }
          ],
          isTyping: false
        }
      }
    ]
  },
  DASHBOARD: {
    title: "The Admin Dashboard",
    description: "An administrator monitors real-time threats and system activity.",
    steps: [
      {
        title: "Initial Load",
        explanation: "The dashboard loads with current threat statistics and recent activity.",
        uiState: {
          threats: [
            { id: 1, type: 'Phishing', severity: 'High', status: 'Active' },
            { id: 2, type: 'Misinformation', severity: 'Medium', status: 'Resolved' }
          ],
          activeUsers: 150,
          alerts: []
        }
      },
      {
        title: "Real-time Update",
        explanation: "A new high-severity threat is detected and pushed to the dashboard in real-time.",
        uiState: {
          threats: [
            { id: 3, type: 'Scam Campaign', severity: 'Critical', status: 'Active' },
            { id: 1, type: 'Phishing', severity: 'High', status: 'Active' },
            { id: 2, type: 'Misinformation', severity: 'Medium', status: 'Resolved' }
          ],
          activeUsers: 152,
          alerts: ['New critical threat detected: Scam Campaign']
        }
      }
    ]
  }
};
