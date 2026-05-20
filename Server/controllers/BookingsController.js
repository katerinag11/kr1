// Server/controllers/BookingsController.js
const tablesService = require('../services/TableService');

class BookingsController {
  // GET /api/bookings - получить все заявки (только для админа)
  async getAllBookings(req, res) {
    try {
      // Проверяем, что пользователь админ
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Доступ запрещён' });
      }
      
      // Если есть таблица Bookings в MWS Tables
      if (process.env.BOOKINGS_TABLE_ID) {
        const bookings = await tablesService._get(process.env.BOOKINGS_TABLE_ID);
        return res.json({ success: true, data: bookings.records || [] });
      }
      
      // Или возвращаем из памяти (временное решение)
      return res.json({ success: true, data: global.bookings || [] });
    } catch (error) {
      console.error('Ошибка получения заявок:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /api/bookings - создать новую заявку
  async createBooking(req, res) {
    try {
      const { name, phone, training } = req.body;
      
      if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Имя и телефон обязательны' });
      }
      
      const newBooking = {
        id: Date.now(),
        name,
        phone,
        training: training || 'Не выбрана',
        status: 'new',
        createdAt: new Date().toISOString()
      };
      
      // Если есть таблица Bookings в MWS Tables
      if (process.env.BOOKINGS_TABLE_ID) {
        const result = await tablesService._post(process.env.BOOKINGS_TABLE_ID, {
          records: [{
            fields: {
              Name: name,
              Phone: phone,
              Training: training || 'Не выбрана',
              Status: 'new',
              CreatedAt: new Date().toISOString()
            }
          }]
        });
        return res.json({ success: true, data: result });
      }
      
      // Или сохраняем в памяти (временное решение)
      if (!global.bookings) global.bookings = [];
      global.bookings.push(newBooking);
      
      console.log('📝 Новая заявка:', newBooking);
      
      res.json({ success: true, data: newBooking });
    } catch (error) {
      console.error('Ошибка создания заявки:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /api/bookings/:id - обновить статус заявки
  async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (process.env.BOOKINGS_TABLE_ID) {
        await tablesService._put(process.env.BOOKINGS_TABLE_ID, id, {
          fields: { Status: status }
        });
      } else {
        const booking = global.bookings?.find(b => b.id == id);
        if (booking) booking.status = status;
      }
      
      res.json({ success: true, message: 'Статус обновлён' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // DELETE /api/bookings/:id - удалить заявку
  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      
      if (process.env.BOOKINGS_TABLE_ID) {
        await tablesService._delete(process.env.BOOKINGS_TABLE_ID, id);
      } else {
        global.bookings = global.bookings?.filter(b => b.id != id) || [];
      }
      
      res.json({ success: true, message: 'Заявка удалена' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new BookingsController();