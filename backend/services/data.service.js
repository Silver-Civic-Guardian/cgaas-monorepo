async function checkUrl(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!url) return resolve({ isScam: false });
      
      const lowerUrl = url.toLowerCase();
      if (lowerUrl.includes('crypto') || lowerUrl.includes('free')) {
        return resolve({ 
          isScam: true, 
          threatType: 'Phishing', 
          description: 'Known crypto scam URL.' 
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
      if (lowerText.includes('garlic') || lowerText.includes('cure')) {
        return resolve({ 
          isRumor: true, 
          correction: 'Garlic does not cure viruses. Please consult a doctor.' 
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
