const tableService = require('../services/TableService');

class LoginController {
  // POST /api/auth/login - авторизация
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const logins = await tableService.getAll(process.env.LOGIN_TABLE_ID);
      
      const loginRecord = logins.records?.find(
        record => record.fields.Email === email && record.fields.Password === password
      );
      
      if (!loginRecord) {
        return res.status(401).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      
      const userId = loginRecord.fields.UserId;
      const users = await tableService.getAll(process.env.USER_TABLE_ID);
      const user = users.records?.find(u => u.recordId === userId);
      
      console.log('✅ Авторизация:', email);
      
      res.json({
        success: true,
        recordId: loginRecord.recordId,
        user: {
          recordId: userId,
          username: user?.fields?.Username,
          email: email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
  }

  // POST /api/auth/register - регистрация
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      const logins = await tableService.getAll(process.env.LOGIN_TABLE_ID);
      const existingUser = logins.records?.find(
        record => record.fields.Email === email
      );
      
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Пользователь уже существует' 
        });
      }
      
      // Создаём запись в Users
      const newUser = {
        fields: {
          Username: username,
          DateRegistraction: new Date().toISOString()
        }
      };
      
      const userResult = await tableService.create(process.env.USER_TABLE_ID, newUser);
      const userId = userResult.recordId;
      
      // Создаём запись в Login
      const newLogin = {
        fields: {
          Email: email,
          Password: password,
          UserId: userId
        }
      };
      
      const loginResult = await tableService.create(process.env.LOGIN_TABLE_ID, newLogin);
      
      console.log('✅ Регистрация:', email);
      
      res.json({
        success: true,
        recordId: loginResult.recordId,
        user: {
          recordId: userId,
          username: username,
          email: email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
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
      
      const login = await tableService.getById(process.env.LOGIN_TABLE_ID, recordId);
      
      if (!login) {
        return res.status(404).json({ success: false, message: 'Пользователь не найден' });
      }
      
      const userId = login.fields.UserId;
      const user = await tableService.getById(process.env.USER_TABLE_ID, userId);
      
      res.json({
        success: true,
        user: {
          recordId: userId,
          username: user?.fields?.Username,
          email: login?.fields?.Email
        }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
  }
}

module.exports = new LoginController();