export const SCENARIOS = {
  SCAM: {
    titleKey: "scam.title",
    descKey: "scam.desc",
    steps: [
      {
        titleKey: "scam.step1.title",
        expKey: "scam.step1.exp",
        uiState: {
          messages: [
            { sender: 'user', text: 'Hey, I just got this message: "Win a free iPhone! Click here: http://suspicious-link.com"' }
          ],
          isTyping: false
        }
      },
      {
        titleKey: "scam.step2.title",
        expKey: "scam.step2.exp",
        uiState: {
          messages: [
            { sender: 'user', text: 'Hey, I just got this message: "Win a free iPhone! Click here: http://suspicious-link.com"' }
          ],
          isTyping: true
        }
      },
      {
        titleKey: "scam.step3.title",
        expKey: "scam.step3.exp",
        uiState: {
          messages: [
            { sender: 'user', text: 'Hey, I just got this message: "Win a free iPhone! Click here: http://suspicious-link.com"' },
            { sender: 'bot', text: 'Thanks for sharing this with me. I know it can be exciting to see offers like this, but this looks like a phishing scam. The link is trying to trick you into giving away personal information. It\'s always best to avoid clicking on unexpected links, even if they seem to come from someone you know.', teachableMoment: true }
          ],
          isTyping: false
        }
      }
    ]
  },
  RUMOR: {
    titleKey: "rumor.title",
    descKey: "rumor.desc",
    steps: [
      {
        titleKey: "rumor.step1.title",
        expKey: "rumor.step1.exp",
        uiState: {
          messages: [
            { sender: 'user', text: 'Is it true that drinking garlic water cures the flu? I saw it on Facebook.' }
          ],
          isTyping: false
        }
      },
      {
        titleKey: "rumor.step2.title",
        expKey: "rumor.step2.exp",
        uiState: {
          messages: [
            { sender: 'user', text: 'Is it true that drinking garlic water cures the flu? I saw it on Facebook.' }
          ],
          isTyping: true
        }
      },
      {
        titleKey: "rumor.step3.title",
        expKey: "rumor.step3.exp",
        uiState: {
          messages: [
            { sender: 'user', text: 'Is it true that drinking garlic water cures the flu? I saw it on Facebook.' },
            { sender: 'bot', text: 'I understand you\'re looking for ways to stay healthy. While garlic has some health benefits, there is no scientific evidence that drinking garlic water cures the flu. The best ways to prevent the flu are getting vaccinated, washing your hands, and avoiding contact with sick people.' }
          ],
          isTyping: false
        }
      }
    ]
  },
  DASHBOARD: {
    titleKey: "dashboard.title",
    descKey: "dashboard.desc",
    steps: [
      {
        titleKey: "dashboard.step1.title",
        expKey: "dashboard.step1.exp",
        uiState: {
          stats: {
            totalReports: 1245,
            activeThreats: 42,
            resolvedIssues: 1103
          },
          recentActivity: [
            { id: 1, type: 'scam', description: 'Phishing link reported in Ward 3', time: '2 mins ago' },
            { id: 2, type: 'rumor', description: 'Health misinformation trending', time: '15 mins ago' }
          ]
        }
      },
      {
        titleKey: "dashboard.step2.title",
        expKey: "dashboard.step2.exp",
        uiState: {
          stats: {
            totalReports: 1246,
            activeThreats: 43,
            resolvedIssues: 1103
          },
          recentActivity: [
            { id: 3, type: 'critical', description: 'Coordinated scam attack detected', time: 'Just now' },
            { id: 1, type: 'scam', description: 'Phishing link reported in Ward 3', time: '2 mins ago' },
            { id: 2, type: 'rumor', description: 'Health misinformation trending', time: '15 mins ago' }
          ]
        }
      }
    ]
  }
};
