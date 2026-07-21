const { GoogleGenAI } = require('@google/genai');
const { checkUrl, checkFact } = require('./mockApi');

const ai = new GoogleGenAI({ apiKey: process.env.VERTEX_KEY });
const MODEL_NAME = 'gemini-3.1-pro-preview';

async function processMessage(message) {
  try {
    const intentPrompt = `
      Analyze the following message and classify its intent into exactly one of these categories:
      - SCAM: The message contains a suspicious link, asks about a potential scam, or mentions crypto/free money schemes.
      - RUMOR: The message asks about a health claim, news, or potential misinformation (e.g., garlic cures).
      - HELP: The message is a general request for help or doesn't fit the other categories.
      
      Message: "${message}"
      
      Respond with ONLY the category name (SCAM, RUMOR, or HELP).
    `;
    
    const intentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: intentPrompt,
    });
    
    const intent = intentResponse.text.trim().toUpperCase();
    let finalIntent = ['SCAM', 'RUMOR', 'HELP'].includes(intent) ? intent : 'HELP';
    
    let apiResult = null;
    if (finalIntent === 'SCAM') {
      apiResult = checkUrl(message);
    } else if (finalIntent === 'RUMOR') {
      apiResult = checkFact(message);
    }
    
    let empathyPrompt = `
      You are a helpful, culturally sensitive assistant acting like a caring "Auntie" or "Uncle".
      The user sent this message: "${message}"
      The intent was classified as: ${finalIntent}
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
    
    const empathyResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: empathyPrompt,
    });
    
    const responseText = empathyResponse.text.trim();
    
    let teachableMoment = false;
    if (finalIntent === 'SCAM' && apiResult?.isScam) {
      teachableMoment = true;
    } else if (finalIntent === 'RUMOR' && apiResult?.isRumor) {
      teachableMoment = true;
    }
    
    return {
      intent: finalIntent,
      responseText,
      teachableMoment
    };
  } catch (error) {
    console.error('Error processing message with AI:', error);
    return {
      intent: 'HELP',
      responseText: "Oh dear, I'm having a little trouble understanding right now. Could you try asking again later?",
      teachableMoment: false
    };
  }
}

module.exports = {
  processMessage
};
