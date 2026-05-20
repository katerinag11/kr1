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
      console.error('Ошибка GET:', error.response?.data || error.message);
      throw error;
    }
  }

  async _post(tableId, data) {
    try {
      console.log(`📝 POST запрос к таблице: ${tableId}`);
      const response = await this.client.post(`/${tableId}/records`, data);
      return response.data;
    } catch (error) {
      console.error('Ошибка POST:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new TablesService();