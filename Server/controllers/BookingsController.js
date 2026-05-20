class BookingsController {
    async get(req, res) {
      try {
        res.json({ 
          success: true, 
          data: global.bookings || [] 
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    async post(req, res) {
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
        
        if (!global.bookings) global.bookings = [];
        global.bookings.push(newBooking);
        
        console.log('📝 Новая заявка:', newBooking.name, newBooking.phone);
        res.json({ success: true, data: newBooking });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
  
  const bookingsController = new BookingsController();
  module.exports = (req, res) => {
    if (req.method === 'GET') {
      return bookingsController.get(req, res);
    }
    if (req.method === 'POST') {
      return bookingsController.post(req, res);
    }
    res.status(404).json({ message: 'Not found' });
  };