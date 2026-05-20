require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// Контроллер
const LoginController = require('./controllers/LoginController');

// Маршруты
app.post('/api/auth/register', (req, res) => LoginController.register(req, res));
app.post('/api/auth/login', (req, res) => LoginController.login(req, res));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Server запущен: http://localhost:${port}`);
  console.log(`📋 POST /api/auth/register`);
  console.log(`📋 POST /api/auth/login`);
});