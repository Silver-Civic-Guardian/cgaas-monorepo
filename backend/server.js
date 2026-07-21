const express = require('express');
const cors = require('cors');
const { initDb } = require('./database');
const { checkUrl, checkFact } = require('./services/mockApi');
const { processMessage } = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/test-mock', (req, res) => {
  const urlResult = checkUrl(req.query.url);
  const factResult = checkFact(req.query.text);
  res.json({ urlResult, factResult });
});

app.post('/api/chat', async (req, res) => {
  const { message, region = 'TW', ward = 'taipei-daan' } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  try {
    const result = await processMessage(message);
    
    const db = req.app.locals.db;
    if (db) {
      await db.run(
        'INSERT INTO interactions (intent, region, ward, metadata) VALUES (?, ?, ?, ?)',
        [result.intent, region, ward, JSON.stringify(result)]
      );
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/threats/ward/:ward', async (req, res) => {
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
});

initDb().then((db) => {
  app.locals.db = db;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
