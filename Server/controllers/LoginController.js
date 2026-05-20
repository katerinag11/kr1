const tablesService = require('../services/TableService');

class LoginController {
  // POST /api/auth/register
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      console.log('📝 Регистрация:', { username, email });
      
      if (!username || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Все поля обязательны' 
        });
      }
      
      // Проверка существования пользователя в MWS
      const existing = await tablesService._get(
        process.env.LOGIN_TABLE_ID,
        `?filterByFormula={Email}="${email}"`
      );
      
      if (existing.records && existing.records.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Пользователь уже существует' 
        });
      }
      
      // Создаём пользователя в таблице Users
      const newUser = {
        records: [{
          fields: {
            Username: username,
            DateRegistraction: new Date().toISOString()
          }
        }]
      };
      
      const userResult = await tablesService._post(process.env.USER_TABLE_ID, newUser);
      const userId = userResult.records?.[0]?.recordId;
      
      // Создаём запись в таблице Login
      const newLogin = {
        records: [{
          fields: {
            Email: email,
            Password: password,
            UserId: [userId]
          }
        }]
      };
      
      await tablesService._post(process.env.LOGIN_TABLE_ID, newLogin);
      
      res.json({
        success: true,
        message: 'Регистрация успешна',
        user: {
          id: userId,
          username: username,
          email: email
        }
      });
    } catch (error) {
      console.error('❌ Ошибка регистрации:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Ошибка сервера' 
      });
    }
  }

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      console.log('🔑 Вход:', email);
      
      // Поиск в MWS Tables
      const data = await tablesService._get(
        process.env.LOGIN_TABLE_ID,
        `?filterByFormula=AND({Email}="${email}", {Password}="${password}")`
      );
      
      const records = data.records || [];
      
      if (!records || records.length === 0) {
        return res.status(401).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      
      const userId = records[0]?.fields?.UserId?.[0] || records[0]?.fields?.UserId;
      const isAdmin = email === 'admin@fitcomplex.ru';
      
      res.json({
        success: true,
        token: 'token-' + Date.now(),
        user: {
          id: userId,
          username: records[0]?.fields?.Username || email.split('@')[0],
          email: email,
          role: isAdmin ? 'admin' : 'user'
        }
      });
    } catch (error) {
      console.error('❌ Ошибка входа:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Ошибка сервера' 
      });
    }
  }
}

module.exports = new LoginController();