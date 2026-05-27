const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

class LoginController {

  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      console.log('Регистрация:', { username, email });
      
      if (!username || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Все поля обязательны' 
        });
      }
      
      const usersFile = await fs.readFile(usersFilePath, 'utf-8');
      const usersData = JSON.parse(usersFile);
      const existing = usersData.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ 
          success: false, 
          message: 'Пользователь уже существует' 
        });
      }
      
      // Создаём пользователя в таблице Users
      const newUser = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        role: 'user',
        subscription: 'Старт',
        date: new Date().toLocaleDateString('ru-RU'),
        phone: '+7 (900) 000-00-00',
        city: 'Не указан',
        goal: 'Поддерживать форму',
        height: 175,
        weight: 70,
        birthday: '01.01.1990',
        gender: 'Не указан'
      };
      usersData.users.push(newUser);
      await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf-8');
      
      res.json({
        success: true,
        message: 'Регистрация успешна',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          subscription: newUser.subscription,
          date: newUser.date,
          phone: newUser.phone,
          city: newUser.city,
          goal: newUser.goal,
          height: newUser.height,
          weight: newUser.weight,
          birthday: newUser.birthday,
          gender: newUser.gender
        }
      });
    } catch (error) {
      console.error('Ошибка регистрации:', error);
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
      
      console.log('Вход:', email);
      
      const usersFile = await fs.readFile(usersFilePath, 'utf-8');
      const usersData = JSON.parse(usersFile);
      const user = usersData.users.find((candidate) => {
        return (
          candidate.email.toLowerCase() === email.toLowerCase() &&
          candidate.password === password
        )
      });
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Неверный email или пароль' 
        });
      }
      const isAdmin = user.role === 'admin';
      
      res.json({
        success: true,
        token: 'token-' + Date.now(),
        user: {
          id: user.id,
          username: user.username,
          email: email,
           role: isAdmin ? 'admin' : 'user',
           subscription: user.subscription,
           date: user.date,
           phone: user.phone,
           city: user.city,
           goal: user.goal,
           height: user.height,
           weight: user.weight,
           birthday: user.birthday,
           gender: user.gender
        }
      });
    } catch (error) {
      console.error(' Ошибка входа:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Ошибка сервера' 
      });
    }
  }
}

module.exports = new LoginController();