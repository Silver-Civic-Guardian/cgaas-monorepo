const { processMessage } = require('../services/aiService');
const { saveInteraction } = require('../repositories/interaction.repository');

const handleChat = async (req, res) => {
  const { message, region = 'TW', ward = 'taipei-daan' } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  try {
    const result = await processMessage(message);
    
    const db = req.app.locals.db;
    if (db) {
      await saveInteraction(db, { intent: result.intent, region, ward, metadata: result });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  handleChat
};
