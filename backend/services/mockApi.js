function checkUrl(url) {
  if (!url) return { isScam: false };
  
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('crypto') || lowerUrl.includes('free')) {
    return { 
      isScam: true, 
      threatType: 'Phishing', 
      description: 'Known crypto scam URL.' 
    };
  }
  
  return { isScam: false };
}

function checkFact(text) {
  if (!text) return { isRumor: false };
  
  const lowerText = text.toLowerCase();
  if (lowerText.includes('garlic') || lowerText.includes('cure')) {
    return { 
      isRumor: true, 
      correction: 'Garlic does not cure viruses. Please consult a doctor.' 
    };
  }
  
  return { isRumor: false };
}

module.exports = {
  checkUrl,
  checkFact
};
