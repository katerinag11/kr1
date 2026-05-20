const tablesService = require('../services/TableService');

class LoginController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      console.log('Регистрация:', { username, email });
      
      // Проверка существования пользователя
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
      
      // Создаём пользователя в Users
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
      
      // Создаём запись в Login
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
      console.error('Ошибка регистрации:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const data = await tablesService._get(
        process.env.LOGIN_TABLE_ID,
        `?filterByFormula=AND({Email}="${email}", {Password}="${password}")`
      );
      
      const records = data.records || [];
      
      if (!records || records.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      
      const userId = records[0]?.fields?.UserId?.[0] || records[0]?.fields?.UserId;
      
      res.json({
        success: true,
        message: 'Успешный вход',
        user: {
          id: userId,
          email: email
        }
      });
    } catch (error) {
      console.error('Ошибка входа:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new LoginController();