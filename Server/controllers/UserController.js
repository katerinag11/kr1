const tablesService = require('../services/TableService');

class UserController {
  async get(req, res) {
    try {
      const users = await tablesService._get(process.env.USER_TABLE_ID);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const userController = new UserController();
module.exports = (req, res) => {
  if (req.method === 'GET') {
    return userController.get(req, res);
  }
  res.status(404).json({ message: 'Not found' });
};