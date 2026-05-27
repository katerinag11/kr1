const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

class UserController {
  async getAllUsers(req, res) {
    try {
      const usersFile = await fs.readFile(usersFilePath, 'utf-8');
      const usersData = JSON.parse(usersFile);
      res.json({ success: true, data: usersData.users || [] });
    } catch (error) {
      console.error('Ошибка получения пользователей:', error);
      res.status(500).json({ success: false, message: error.message || 'Ошибка сервера' });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const usersFile = await fs.readFile(usersFilePath, 'utf-8');
      const usersData = JSON.parse(usersFile);
      const userIndex = usersData.users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'Пользователь не найден' });
      }

      const existingUser = usersData.users[userIndex];
      const allowedFields = ['username', 'email', 'subscription', 'phone', 'city', 'goal', 'height', 'weight', 'birthday', 'gender'];

      allowedFields.forEach((field) => {
        if (updates[field] !== undefined) {
          existingUser[field] = updates[field];
        }
      });

      usersData.users[userIndex] = existingUser;
      await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf-8');

      res.json({ success: true, data: existingUser });
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
      res.status(500).json({ success: false, message: error.message || 'Ошибка сервера' });
    }
  }
}

module.exports = new UserController();
