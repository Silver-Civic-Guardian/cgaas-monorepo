const { getTopThreatsByWard } = require('../repositories/interaction.repository');

const getThreatsByWard = async (req, res) => {
  const { ward } = req.params;
  const db = req.app.locals.db;
  
  if (!db) {
    return res.status(500).json({ error: 'Database not initialized' });
  }

  try {
    const threats = await getTopThreatsByWard(db, ward);
    
    res.json(threats);
  } catch (error) {
    console.error('Error fetching threats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getThreatsByWard
};
