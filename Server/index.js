const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// Контроллеры
const LoginController = require('./controllers/LoginController');
const BookingsController = require('./controllers/BookingsController');
const UserController = require('./controllers/UserController');
const { authenticate, requireAdmin } = require('./middleware/auth');
const { getAdminEmail } = require('./lib/admin');

// Маршруты
app.post('/api/auth/register', (req, res) => LoginController.register(req, res));
app.post('/api/auth/login', (req, res) => LoginController.login(req, res));

app.get('/api/users', authenticate, requireAdmin, (req, res) =>
  UserController.getAllUsers(req, res)
);

// Заявки: создать может любой, управлять — только админ
app.post('/api/bookings', (req, res) => BookingsController.post(req, res));
app.get('/api/bookings', authenticate, requireAdmin, (req, res) =>
  BookingsController.get(req, res)
);
app.put('/api/bookings/:id', authenticate, requireAdmin, (req, res) =>
  BookingsController.put(req, res)
);
app.delete('/api/bookings/:id', authenticate, requireAdmin, (req, res) =>
  BookingsController.delete(req, res)
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(` Server запущен: http://localhost:${port}`);
  console.log(` MWS Users:  ${(process.env.USER_TABLE_ID || '').trim() || 'не задан'}`);
  console.log(` MWS Login:  ${(process.env.LOGIN_TABLE_ID || '').trim() || 'не задан'}`);
  console.log(` Admin:      ${getAdminEmail()}`);
  console.log(` POST /api/auth/register`);
  console.log(` POST /api/auth/login`);
  console.log(` GET /api/bookings`);
  console.log(` POST /api/bookings`);
});