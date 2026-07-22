const saveInteraction = async (db, { intent, region, ward, metadata }) => {
  return await db.run(
    'INSERT INTO interactions (intent, region, ward, metadata) VALUES (?, ?, ?, ?)',
    [intent, region, ward, JSON.stringify(metadata)]
  );
};

const getTopThreatsByWard = async (db, ward) => {
  return await db.all(`
    SELECT intent, COUNT(*) as count
    FROM interactions
    WHERE ward = ? AND timestamp >= datetime('now', '-1 day')
    GROUP BY intent
    ORDER BY count DESC
    LIMIT 3
  `, [ward]);
};

module.exports = {
  saveInteraction,
  getTopThreatsByWard
};
