require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// Контроллеры
const LoginController = require('./controllers/LoginController');
const BookingsController = require('./controllers/BookingsController');

// Маршруты
app.post('/api/auth/register', (req, res) => LoginController.register(req, res));
app.post('/api/auth/login', (req, res) => LoginController.login(req, res));

// Маршруты для заявок
app.get('/api/bookings', (req, res) => BookingsController.get(req, res));
app.post('/api/bookings', (req, res) => BookingsController.post(req, res));
app.put('/api/bookings/:id', (req, res) => BookingsController.put(req, res));
app.delete('/api/bookings/:id', (req, res) => BookingsController.delete(req, res));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(` Server запущен: http://localhost:${port}`);
  console.log(` POST /api/auth/register`);
  console.log(` POST /api/auth/login`);
  console.log(` GET /api/bookings`);
  console.log(` POST /api/bookings`);
});