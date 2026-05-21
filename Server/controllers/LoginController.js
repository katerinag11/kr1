const tablesService = require('../services/TableService');
const { firstRecordId } = require('../services/TableService');
const { isAdminEmail, resolveRole } = require('../lib/admin');
const { signAuthToken } = require('../middleware/auth');

class LoginController {
  // POST /api/auth/register
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      console.log('📝 Регистрация:', { username, email });

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Все поля обязательны',
        });
      }

      const existing = await tablesService._get(
        process.env.LOGIN_TABLE_ID,
        `?filterByFormula={Email}="${email}"`
      );

      if (isAdminEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Этот email зарезервирован для администратора',
        });
      }

      if (existing.records.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Пользователь уже существует',
        });
      }

      // DateRegistraction заполняется автоматически в MWS — не передаём вручную
      const userResult = await tablesService._post(process.env.USER_TABLE_ID, {
        records: [
          {
            fields: {
              Username: username,
            },
          },
        ],
      });

      const userRecordId = firstRecordId(userResult);
      if (!userRecordId) {
        throw new Error('Не удалось создать пользователя в MWS Tables');
      }

      await tablesService._post(process.env.LOGIN_TABLE_ID, {
        records: [
          {
            fields: {
              Email: email,
              Password: password,
              Login: username,
              UserId: [userRecordId],
            },
          },
        ],
      });

      const user = {
        id: userRecordId,
        username,
        email,
        role: 'user',
      };

      res.json({
        success: true,
        message: 'Регистрация успешна',
        token: signAuthToken(user),
        user,
      });
    } catch (error) {
      console.error('❌ Ошибка регистрации:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Ошибка сервера',
      });
    }
  }

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log('🔑 Вход:', email);

      const data = await tablesService._get(
        process.env.LOGIN_TABLE_ID,
        `?filterByFormula=AND({Email}="${email}", {Password}="${password}")`
      );

      const records = data.records || [];

      if (!records.length) {
        return res.status(401).json({
          success: false,
          message: 'Неверный email или пароль',
        });
      }

      const userId = records[0]?.fields?.UserId?.[0] || records[0]?.fields?.UserId;
      const user = {
        id: userId,
        username:
          records[0]?.fields?.Login ||
          records[0]?.fields?.Username ||
          email.split('@')[0],
        email,
        role: resolveRole(email),
      };

      res.json({
        success: true,
        token: signAuthToken(user),
        user,
      });
    } catch (error) {
      console.error('❌ Ошибка входа:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Ошибка сервера',
      });
    }
  }
}

module.exports = new LoginController();
