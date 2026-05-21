const tablesService = require('../services/TableService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const [usersData, loginsData] = await Promise.all([
        tablesService._get(process.env.USER_TABLE_ID),
        tablesService._get(process.env.LOGIN_TABLE_ID),
      ]);

      const loginByUserRecordId = new Map();
      for (const login of loginsData.records) {
        const linkedIds = login.fields?.UserId;
        const ids = Array.isArray(linkedIds) ? linkedIds : linkedIds ? [linkedIds] : [];
        for (const userRecordId of ids) {
          loginByUserRecordId.set(userRecordId, login);
        }
      }

      const users = usersData.records.map((record) => {
        const login = loginByUserRecordId.get(record.recordId);
        return {
          id: record.recordId,
          username: record.fields?.Username || login?.fields?.Login || '—',
          email: login?.fields?.Email || '—',
          subscription: record.fields?.Subscription || record.fields?.Абонемент || 'none',
        };
      });

      res.json({ success: true, data: users });
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UserController();
