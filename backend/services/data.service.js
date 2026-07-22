const MOCK_SCAMS = [
  { url: 'http://free-crypto-giveaway.com', threatType: 'Phishing', description: 'Known crypto scam URL.' },
  { url: 'https://irs-tax-refund-urgent.net', threatType: 'Impersonation', description: 'Fake IRS tax refund portal.' },
  { url: 'http://win-free-iphone-now.org', threatType: 'Malware', description: 'Malicious site distributing malware.' }
];

const MOCK_RUMORS = [
  { text: 'garlic cures the virus', correction: 'Garlic does not cure viruses. Please consult a doctor.' },
  { text: 'drinking bleach prevents covid', correction: 'Drinking bleach is extremely dangerous and does not prevent COVID-19.' },
  { text: '5g towers cause coronavirus', correction: 'There is no scientific evidence linking 5G networks to COVID-19.' }
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!url) return resolve({ isScam: false });
      
      const lowerUrl = url.toLowerCase();
      const match = MOCK_SCAMS.find(scam => lowerUrl.includes(scam.url.toLowerCase()) || (lowerUrl.includes('crypto') && scam.url.includes('crypto')));
      
      if (match) {
        return resolve({ 
          isScam: true, 
          threatType: match.threatType, 
          description: match.description 
        });
      }
      
      return resolve({ isScam: false });
    }, 800);
  });
}

async function checkFact(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!text) return resolve({ isRumor: false });
      
      const lowerText = text.toLowerCase();
      const match = MOCK_RUMORS.find(rumor => lowerText.includes(rumor.text.toLowerCase()));
      
      if (match) {
        return resolve({ 
          isRumor: true, 
          correction: match.correction 
        });
      }
      
      return resolve({ isRumor: false });
    }, 800);
  });
}

module.exports = {
  checkUrl,
  checkFact
};
