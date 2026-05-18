const tableService = require('../services/TableService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await tableService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await tableService.getUserById(id);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { name, surname, patronymic } = req.body;
      const newUser = {
        fields: {
          Name: name,
          Surname: surname,
          Patronymic: patronymic || '',
          DateRegistraction: new Date().toISOString()
        }
      };
      const result = await tableService.createUser(newUser);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, surname, patronymic } = req.body;
      const updateData = {
        fields: {
          Name: name,
          Surname: surname,
          Patronymic: patronymic || ''
        }
      };
      const result = await tableService.updateUser(id, updateData);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await tableService.deleteUser(id);
      res.json({ success: true, message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UserController();