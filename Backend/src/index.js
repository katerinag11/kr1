require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend запущен: http://localhost:${PORT}`);
  console.log(`📋 API: /api/users, /api/auth/login, /api/auth/register`);
});