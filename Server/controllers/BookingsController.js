class BookingsController {
  // GET /api/bookings - получить все заявки
  async get(req, res) {
    try {
      console.log('📋 Запрос на получение заявок');
      
      if (!global.bookings) {
        global.bookings = [];
      }
      
      res.json({ 
        success: true, 
        data: global.bookings 
      });
    } catch (error) {
      console.error('Ошибка получения заявок:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /api/bookings - создать новую заявку
  async post(req, res) {
    try {
      const { name, phone, training } = req.body;
      
      console.log('📝 Новая заявка:', { name, phone, training });
      
      if (!name || !phone) {
        return res.status(400).json({ 
          success: false, 
          message: 'Имя и телефон обязательны' 
        });
      }
      
      const newBooking = {
        id: Date.now(),
        name,
        phone,
        training: training || 'Не указана',
        status: 'new',
        createdAt: new Date().toISOString()
      };
      
      if (!global.bookings) {
        global.bookings = [];
      }
      
      global.bookings.push(newBooking);
      
      console.log('✅ Заявка сохранена, всего заявок:', global.bookings.length);
      
      res.json({ 
        success: true, 
        data: newBooking,
        message: 'Заявка успешно отправлена'
      });
    } catch (error) {
      console.error('Ошибка создания заявки:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /api/bookings/:id - обновить статус заявки
  async put(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const booking = global.bookings?.find(b => b.id == id);
      if (booking) {
        booking.status = status;
        console.log('✏️ Статус заявки обновлён:', id, status);
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // DELETE /api/bookings/:id - удалить заявку
  async delete(req, res) {
    try {
      const { id } = req.params;
      global.bookings = global.bookings?.filter(b => b.id != id) || [];
      console.log('🗑️ Заявка удалена:', id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new BookingsController();