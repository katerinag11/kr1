// Server/services/TableService.js
const axios = require('axios');

class TablesService {
  constructor() {
    this.apiKey = process.env.TOKEN;
    this.baseURL = process.env.TABLES_API_URL;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Получить все записи с возможностью фильтрации
  async _get(tableId, url = '') {
    try {
      const response = await this.client.get(`/${tableId}/records${url}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении записей:', error.response?.data || error.message);
      throw error;
    }
  }

  // Создать новую запись
  async _post(tableId, data) {
    try {
      const response = await this.client.post(`/${tableId}/records`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании записи:', error.response?.data || error.message);
      throw error;
    }
  }

  // Обновить запись
  async _put(tableId, recordId, data) {
    try {
      const response = await this.client.put(`/${tableId}/records/${recordId}`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении записи:', error.response?.data || error.message);
      throw error;
    }
  }

  // Удалить запись
  async _delete(tableId, recordId) {
    try {
      const response = await this.client.delete(`/${tableId}/records/${recordId}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении записи:', error.response?.data || error.message);
      throw error;
    }
  }

  // Поиск по фильтру (для авторизации)
  async findByEmailAndPassword(email, password) {
    const filter = `?filterByFormula=AND({Email}="${email}", {Password}="${password}")`;
    const data = await this._get(process.env.LOGIN_TABLE_ID, filter);
    return data?.records || [];
  }

  // Поиск пользователя по email
  async findByEmail(email) {
    const filter = `?filterByFormula={Email}="${email}"`;
    const data = await this._get(process.env.LOGIN_TABLE_ID, filter);
    return data?.records || [];
  }

  // Получить пользователя по ID из таблицы Users
  async getUserById(userId) {
    const data = await this._get(process.env.USER_TABLE_ID);
    return data?.records?.find(record => record.recordId === userId) || null;
  }

  // Создать пользователя в Users
  async createUser(username) {
    const data = {
      records: [{
        fields: {
          Username: username,
          DateRegistraction: new Date().toISOString()
        }
      }]
    };
    const result = await this._post(process.env.USER_TABLE_ID, data);
    return result.records?.[0] || null;
  }

  // Создать запись в Login
  async createLogin(email, password, userId) {
    const data = {
      records: [{
        fields: {
          Email: email,
          Password: password,
          UserId: [userId]
        }
      }]
    };
    const result = await this._post(process.env.LOGIN_TABLE_ID, data);
    return result.records?.[0] || null;
  }
}

module.exports = new TablesService();