function buildIntentPrompt(message) {
  return `
      Analyze the following message and classify its intent into exactly one of these categories:
      - SCAM: The message contains a suspicious link, asks about a potential scam, or mentions crypto/free money schemes.
      - RUMOR: The message asks about a health claim, news, or potential misinformation (e.g., garlic cures).
      - HELP: The message is a general request for help or doesn't fit the other categories.
      
      Message: "${message}"
      
      Respond with ONLY the category name (SCAM, RUMOR, or HELP).
    `;
}

function buildEmpathyPrompt(message, intent, apiResult) {
  let empathyPrompt = `
      The user sent this message: "${message}"
      The intent was classified as: ${intent}
    `;
    
  if (apiResult) {
    empathyPrompt += `\nHere is the analysis result: ${JSON.stringify(apiResult)}`;
  }
  
  empathyPrompt += `
      Write a warm, empathetic response to the user. 
      If it's a scam or rumor, gently warn them and explain why in simple terms.
      If it's a general help request, offer assistance warmly.
      Keep the response concise (2-3 sentences).
    `;
    
  return empathyPrompt;
}

module.exports = {
  buildIntentPrompt,
  buildEmpathyPrompt
};
