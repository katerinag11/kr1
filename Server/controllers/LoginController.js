const tablesService = require('../services/TableService');

class LoginController {
  // GET /api/auth/auth?email=...&password=...
  async auth(req, res) {
    try {
      const { email, password } = req.query;
      
      console.log('Запрос на авторизацию:', { email, password });
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Не заполнены обязательные поля' });
      }
      
      const data = await tablesService._get(
        process.env.LOGIN_TABLE_ID,
        `?filterByFormula=AND({Email}="${email}", {Password}="${password}")`
      );
      
      const records = data.records || [];
      
      if (!records || records.length === 0) {
        return res.status(400).json({ 
          message: 'Пользователь не найден', 
          recordId: 0 
        });
      }
      
      const userId = records[0]?.fields?.UserId?.[0] || records[0]?.fields?.UserId;
      
      res.status(200).json({
        message: 'Успешная авторизация',
        recordId: userId,
        user: {
          id: userId,
          username: records[0]?.fields?.Username || 'Пользователь',
          email: email
        }
      });
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // POST /api/auth/register
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      console.log('Регистрация:', { username, email });
      
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

  // POST /api/auth/login
  async login(req, res) {
    const { email, password } = req.body;
    return this.auth({ query: { email, password } }, res);
  }
}

// Важно: экспортируем не сам класс, а его методы для роутера
const loginController = new LoginController();
module.exports = (req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    return loginController.login(req, res);
  }
  if (req.method === 'POST' && req.url === '/register') {
    return loginController.register(req, res);
  }
  if (req.method === 'GET' && req.url === '/auth') {
    return loginController.auth(req, res);
  }
  res.status(404).json({ message: 'Not found' });
};