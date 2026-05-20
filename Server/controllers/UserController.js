const tableService = require('../services/TableService');

class UserController {
  // GET /api/users - получить всех пользователей
  async getAllUsers(req, res) {
    try {
      const users = await tableService.getAll(process.env.USER_TABLE_ID);
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /api/users/:id - получить пользователя по ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await tableService.getById(process.env.USER_TABLE_ID, id);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /api/users - создать пользователя
  async createUser(req, res) {
    try {
      const { username } = req.body;
      const newUser = {
        fields: {
          Username: username,
          DateRegistraction: new Date().toISOString()
        }
      };
      const result = await tableService.create(process.env.USER_TABLE_ID, newUser);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /api/users/:id - обновить пользователя
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const updateData = {
        fields: { Username: username }
      };
      const result = await tableService.update(process.env.USER_TABLE_ID, id, updateData);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await tableService.delete(process.env.USER_TABLE_ID, id);
      res.json({ success: true, message: 'Пользователь удалён' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UserController();