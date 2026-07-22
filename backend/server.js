const express = require('express');
const cors = require('cors');
const { initDb } = require('./database');
const chatRoutes = require('./routes/chat.routes');
const threatRoutes = require('./routes/threat.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/chat', chatRoutes);
app.use('/api/threats', threatRoutes);

initDb().then((db) => {
  app.locals.db = db;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
