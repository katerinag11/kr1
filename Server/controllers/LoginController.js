class LoginController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      console.log('📝 Регистрация:', { username, email });
      
      // Временно возвращаем успех для теста
      res.json({
        success: true,
        message: 'Регистрация успешна',
        user: {
          id: Date.now(),
          username: username,
          email: email
        }
      });
    } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      console.log('🔑 Вход:', email);
      
      // Временная проверка
      if (email === 'admin@fitcomplex.ru' && password === 'admin123') {
        return res.json({
          success: true,
          token: 'test-token',
          user: { email, role: 'admin' }
        });
      }
      
      res.status(401).json({ success: false, message: 'Неверный email или пароль' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new LoginController();