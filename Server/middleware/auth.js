const jwt = require('jsonwebtoken');
const { resolveRole } = require('../lib/admin');

function getJwtSecret() {
  const secret = (process.env.JWT_SECRET || '').trim();
  if (!secret) {
    throw new Error('JWT_SECRET не задан в .env');
  }
  return secret;
}

function signAuthToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role || resolveRole(user.email),
  };
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Требуется авторизация',
    });
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Сессия истекла, войдите снова',
    });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Доступ только для администратора',
    });
  }
  next();
}

module.exports = { signAuthToken, authenticate, requireAdmin };
