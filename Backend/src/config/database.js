const axios = require('axios');

class Database {
  constructor() {
    this.baseUrl = process.env.TABLES_API_URL;
    this.token = process.env.TOKEN;
  }

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async getAll(tableId) {
    try {
      const response = await axios.get(`${this.baseUrl}/${tableId}/records`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('GET error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getById(tableId, recordId) {
    try {
      const response = await axios.get(`${this.baseUrl}/${tableId}/records/${recordId}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('GET by ID error:', error.response?.data || error.message);
      throw error;
    }
  }

  async create(tableId, data) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${tableId}/records`,
        { records: [data] },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('POST error:', error.response?.data || error.message);
      throw error;
    }
  }

  async update(tableId, recordId, data) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/${tableId}/records/${recordId}`,
        data,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('PUT error:', error.response?.data || error.message);
      throw error;
    }
  }

  async delete(tableId, recordId) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/${tableId}/records/${recordId}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('DELETE error:', error.response?.data || error.message);
      throw error;
    }
  }

  async findByField(tableId, fieldName, value) {
    const data = await this.getAll(tableId);
    if (data && data.records) {
      return data.records.find(record => record.fields[fieldName] === value);
    }
    return null;
  }
}

module.exports = new Database();