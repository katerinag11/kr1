// Server/controllers/LoginController.js
const jwt = require('jsonwebtoken');
const tablesService = require('../services/TableService');

class LoginController {
  // POST /api/auth/login - авторизация
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      console.log('🔍 Поиск пользователя:', email);
      
      // Ищем пользователя по email и паролю
      const records = await tablesService.findByEmailAndPassword(email, password);
      
      if (!records || records.length === 0) {
        return res.status(401).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      
      const loginRecord = records[0];
      const userId = loginRecord.fields.UserId?.[0] || loginRecord.fields.UserId;
      
      // Получаем данные пользователя из таблицы Users
      const user = await tablesService.getUserById(userId);
      
      // Генерация JWT токена
      const token = jwt.sign(
        { 
          recordId: loginRecord.recordId,
          userId: userId,
          email: email,
          role: email === 'admin@fitcomplex.ru' ? 'admin' : 'user'
        },
        process.env.JWT_SECRET || 'fitcomplex-secret-key',
        { expiresIn: '24h' }
      );
      
      console.log('✅ Авторизация успешна:', email);
      
      res.json({
        success: true,
        token,
        recordId: loginRecord.recordId,
        user: {
          recordId: userId,
          username: user?.fields?.Username || 'Пользователь',
          email: email,
          role: email === 'admin@fitcomplex.ru' ? 'admin' : 'user'
        }
      });
    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
  }

  // POST /api/auth/register - регистрация
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      console.log('📝 Регистрация:', { username, email });
      
      // Проверяем, существует ли пользователь
      const existing = await tablesService.findByEmail(email);
      
      if (existing && existing.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Пользователь с таким email уже существует' 
        });
      }
      
      // Создаём пользователя в таблице Users
      const newUser = await tablesService.createUser(username);
      
      if (!newUser) {
        throw new Error('Не удалось создать пользователя');
      }
      
      // Создаём запись в таблице Login
      const newLogin = await tablesService.createLogin(email, password, newUser.recordId);
      
      // Генерация JWT токена
      const token = jwt.sign(
        { 
          recordId: newLogin.recordId,
          userId: newUser.recordId,
          email: email,
          role: 'user'
        },
        process.env.JWT_SECRET || 'fitcomplex-secret-key',
        { expiresIn: '24h' }
      );
      
      console.log('✅ Регистрация успешна:', email);
      
      res.json({
        success: true,
        token,
        recordId: newLogin.recordId,
        user: {
          recordId: newUser.recordId,
          username: username,
          email: email,
          role: 'user'
        }
      });
    } catch (error) {
      console.error('❌ Register error:', error);
      res.status(500).json({ success: false, message: 'Ошибка регистрации' });
    }
  }

  // GET /api/auth/current-user - получение текущего пользователя
  async getCurrentUser(req, res) {
    try {
      const { recordId } = req.query;
      
      if (!recordId) {
        return res.status(400).json({ success: false, message: 'recordId не указан' });
      }
      
      const login = await tablesService._get(process.env.LOGIN_TABLE_ID);
      const loginRecord = login?.records?.find(r => r.recordId === recordId);
      
      if (!loginRecord) {
        return res.status(404).json({ success: false, message: 'Пользователь не найден' });
      }
      
      const userId = loginRecord.fields.UserId?.[0] || loginRecord.fields.UserId;
      const user = await tablesService.getUserById(userId);
      
      res.json({
        success: true,
        user: {
          recordId: userId,
          username: user?.fields?.Username,
          email: loginRecord?.fields?.Email
        }
      });
    } catch (error) {
      console.error('❌ Get current user error:', error);
      res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
  }
}

module.exports = new LoginController();