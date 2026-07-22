const { GoogleGenAI, Type } = require('@google/genai');
const { checkUrl, checkFact } = require('./data.service');
const { buildIntentPrompt, buildEmpathyPrompt } = require('../config/prompts');

const ai = new GoogleGenAI({ apiKey: process.env.VERTEX_KEY });
const MODEL_NAME = 'gemini-3.1-pro-preview';

async function processMessage(message) {
  console.log('processMessage called with:', message);
  try {
    const intentPrompt = buildIntentPrompt(message);
    console.log('Calling generateContent for intent...');
    
    const intentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: intentPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.STRING,
          enum: ["SCAM", "RUMOR", "HELP"]
        }
      }
    });
    console.log('Intent response received:', intentResponse.text);
    
    let intentText = intentResponse.text.trim();
    if (intentText.startsWith('"') && intentText.endsWith('"')) {
      intentText = intentText.slice(1, -1);
    }
    const intent = intentText.toUpperCase();
    let finalIntent = ['SCAM', 'RUMOR', 'HELP'].includes(intent) ? intent : 'HELP';
    
    let apiResult = null;
    if (finalIntent === 'SCAM') {
      apiResult = await checkUrl(message);
      console.log('checkUrl result:', apiResult);
    } else if (finalIntent === 'RUMOR') {
      apiResult = await checkFact(message);
      console.log('checkFact result:', apiResult);
    }
    
    const empathyPrompt = buildEmpathyPrompt(message, finalIntent, apiResult);
    console.log('Calling generateContent for empathy...');
    
    const empathyResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: empathyPrompt,
      config: {
        systemInstruction: "You are a helpful, culturally sensitive assistant acting like a caring 'Auntie' or 'Uncle'."
      }
    });
    console.log('Empathy response received');
    
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
