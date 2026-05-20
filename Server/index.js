require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

// Настройка CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Контроллеры
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const BookingsController = require('./controllers/BookingsController');

// Маршруты
app.use('/api/users', UserController);
app.use('/api/auth', LoginController);
app.use('/api/bookings', BookingsController);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Server запущен: http://localhost:${port}`);
  console.log(`📋 API: /api/auth/login, /api/auth/register, /api/bookings`);
});