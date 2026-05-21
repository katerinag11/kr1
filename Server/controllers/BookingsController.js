const tablesService = require('../services/TableService');

const STATUS_LABELS = {
  new: 'Новая',
  confirmed: 'Подтверждена',
  completed: 'Завершена',
  cancelled: 'Отменена',
};

function bookingsTableId() {
  return (process.env.BOOKINGS_TABLE_ID || '').trim();
}

function mapRecordToBooking(record) {
  const fields = record.fields || {};
  return {
    id: record.recordId,
    recordId: record.recordId,
    name: fields.Name || fields.Имя || fields.name || '',
    phone: fields.Phone || fields.Телефон || fields.phone || '',
    training: fields.Training || fields.Тренировка || fields.training || 'Не указана',
    status: fields.Status || fields.Статус || fields.status || 'new',
    createdAt: record.createdAt
      ? new Date(record.createdAt).toISOString()
      : new Date().toISOString(),
  };
}

function bookingFieldsFromBody({ name, phone, training, status }) {
  return {
    Name: name,
    Phone: phone,
    Training: training || 'Не указана',
    Status: STATUS_LABELS[status] || status || STATUS_LABELS.new,
  };
}

class BookingsController {
  async get(req, res) {
    try {
      const tableId = bookingsTableId();
      if (!tableId) {
        if (!global.bookings) global.bookings = [];
        return res.json({ success: true, data: global.bookings });
      }

      const data = await tablesService._get(tableId);
      res.json({
        success: true,
        data: data.records.map(mapRecordToBooking),
      });
    } catch (error) {
      console.error('Ошибка получения заявок:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async post(req, res) {
    try {
      const { name, phone, training } = req.body;

      console.log('📝 Новая заявка:', { name, phone, training });

      if (!name || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Имя и телефон обязательны',
        });
      }

      const tableId = bookingsTableId();
      if (!tableId) {
        const newBooking = {
          id: Date.now(),
          name,
          phone,
          training: training || 'Не указана',
          status: 'new',
          createdAt: new Date().toISOString(),
        };
        if (!global.bookings) global.bookings = [];
        global.bookings.push(newBooking);
        return res.json({
          success: true,
          data: newBooking,
          message: 'Заявка сохранена локально (BOOKINGS_TABLE_ID не задан)',
        });
      }

      const result = await tablesService._post(tableId, {
        records: [
          {
            fields: bookingFieldsFromBody({
              name,
              phone,
              training,
              status: 'new',
            }),
          },
        ],
      });

      const record = result.records[0];
      const newBooking = mapRecordToBooking(record);

      res.json({
        success: true,
        data: newBooking,
        message: 'Заявка успешно отправлена',
      });
    } catch (error) {
      console.error('Ошибка создания заявки:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async put(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const tableId = bookingsTableId();

      if (!tableId) {
        const booking = global.bookings?.find((b) => b.id == id);
        if (booking) booking.status = status;
        return res.json({ success: true });
      }

      await tablesService._patch(tableId, {
        records: [
          {
            recordId: id,
            fields: {
              Status: STATUS_LABELS[status] || status,
            },
          },
        ],
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const tableId = bookingsTableId();

      if (!tableId) {
        global.bookings = global.bookings?.filter((b) => b.id != id) || [];
        return res.json({ success: true });
      }

      await tablesService._delete(tableId, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new BookingsController();
