const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tableService = require('../services/TableService');

class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const loginRecord = await tableService.findUserByEmail(email);
      
      if (!loginRecord) {
        return res.status(401).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      
      const isValid = await bcrypt.compare(password, loginRecord.fields.Password);
      
      if (!isValid) {
        return res.status(401).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      
      const user = await tableService.getUserById(loginRecord.fields.UserId);
      const token = jwt.sign(
        { 
          recordId: loginRecord.recordId,
          userId: loginRecord.fields.UserId,
          email: email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        recordId: loginRecord.recordId,
        token,
        user: {
          id: loginRecord.fields.UserId,
          name: user?.fields?.Name || '',
          surname: user?.fields?.Surname || '',
          email: email
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async register(req, res) {
    try {
      const { email, password, name, surname, patronymic } = req.body;
      
      const existingUser = await tableService.findUserByEmail(email);
      
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Пользователь уже существует' 
        });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        fields: {
          Name: name,
          Surname: surname,
          Patronymic: patronymic || '',
          DateRegistraction: new Date().toISOString()
        }
      };
      
      const userResult = await tableService.createUser(newUser);
      
      const newLogin = {
        fields: {
          Email: email,
          Password: hashedPassword,
          UserId: userResult.recordId
        }
      };
      
      const loginResult = await tableService.createLogin(newLogin);
      
      const token = jwt.sign(
        {
          recordId: loginResult.recordId,
          userId: userResult.recordId,
          email: email
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        recordId: loginResult.recordId,
        token,
        user: {
          id: userResult.recordId,
          name: name,
          surname: surname,
          email: email
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const { recordId } = req.user;
      const user = await tableService.getUserByLoginId(recordId);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new LoginController();