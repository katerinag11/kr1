const db = require('../config/database');

class TableService {
  async getAllUsers() {
    return db.getAll(process.env.USER_TABLE_ID);
  }

  async getUserById(recordId) {
    return db.getById(process.env.USER_TABLE_ID, recordId);
  }

  async createUser(userData) {
    return db.create(process.env.USER_TABLE_ID, userData);
  }

  async updateUser(recordId, userData) {
    return db.update(process.env.USER_TABLE_ID, recordId, userData);
  }

  async deleteUser(recordId) {
    return db.delete(process.env.USER_TABLE_ID, recordId);
  }

  async getAllLogins() {
    return db.getAll(process.env.LOGIN_TABLE_ID);
  }

  async getLoginById(recordId) {
    return db.getById(process.env.LOGIN_TABLE_ID, recordId);
  }

  async createLogin(loginData) {
    return db.create(process.env.LOGIN_TABLE_ID, loginData);
  }

  async updateLogin(recordId, loginData) {
    return db.update(process.env.LOGIN_TABLE_ID, recordId, loginData);
  }

  async deleteLogin(recordId) {
    return db.delete(process.env.LOGIN_TABLE_ID, recordId);
  }

  async findUserByEmail(email) {
    const logins = await this.getAllLogins();
    if (logins && logins.records) {
      return logins.records.find(record => record.fields.Email === email);
    }
    return null;
  }

  async getUserByLoginId(loginId) {
    const login = await this.getLoginById(loginId);
    if (login && login.fields && login.fields.UserId) {
      return this.getUserById(login.fields.UserId);
    }
    return null;
  }
}

module.exports = new TableService();