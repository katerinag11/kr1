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

  async _get(tableId, url = '') {
    try {
      console.log(`📡 GET запрос к таблице: ${tableId}`);
      const response = await this.client.get(`/${tableId}/records${url}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении записей:', error.response?.data || error.message);
      throw error;
    }
  }

  async _post(tableId, data) {
    try {
      console.log(`📝 POST запрос к таблице: ${tableId}`);
      const response = await this.client.post(`/${tableId}/records`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании записи:', error.response?.data || error.message);
      throw error;
    }
  }

  async _put(tableId, recordId, data) {
    try {
      console.log(`✏️ PUT запрос к таблице: ${tableId}/${recordId}`);
      const response = await this.client.put(`/${tableId}/records/${recordId}`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении записи:', error.response?.data || error.message);
      throw error;
    }
  }

  async _delete(tableId, recordId) {
    try {
      console.log(`🗑️ DELETE запрос к таблице: ${tableId}/${recordId}`);
      const response = await this.client.delete(`/${tableId}/records/${recordId}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении записи:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new TablesService();