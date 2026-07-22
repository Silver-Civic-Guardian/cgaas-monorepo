const getThreatsByWard = async (req, res) => {
  const { ward } = req.params;
  const db = req.app.locals.db;
  
  if (!db) {
    return res.status(500).json({ error: 'Database not initialized' });
  }

  try {
    const threats = await db.all(`
      SELECT intent, COUNT(*) as count
      FROM interactions
      WHERE ward = ? AND timestamp >= datetime('now', '-1 day')
      GROUP BY intent
      ORDER BY count DESC
      LIMIT 3
    `, [ward]);
    
    res.json(threats);
  } catch (error) {
    console.error('Error fetching threats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getThreatsByWard
};
