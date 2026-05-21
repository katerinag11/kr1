const path = require('path');
const axios = require('axios');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

function normalizeMwsResponse(body) {
  if (!body || typeof body !== 'object') {
    return { records: [], raw: body };
  }

  if (body.success === false) {
    const msg =
      body.message ||
      body.msg ||
      (typeof body.data === 'string' ? body.data : null) ||
      'Ошибка MWS Tables';
    const err = new Error(msg);
    err.mwsResponse = body;
    throw err;
  }

  const records =
    body.data?.records ??
    body.records ??
    (Array.isArray(body.data) ? body.data : []);

  return {
    records,
    total: body.data?.total ?? records.length,
    raw: body,
  };
}

function firstRecordId(result) {
  const record = result.records?.[0];
  return record?.recordId || result.raw?.data?.records?.[0]?.recordId;
}

class TablesService {
  _client() {
    const apiKey = (process.env.TOKEN || '').trim();
    const baseURL = (process.env.TABLES_API_URL || '').trim().replace(/\/$/, '');

    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  _ensureConfig(tableId) {
    const apiKey = (process.env.TOKEN || '').trim();
    const baseURL = (process.env.TABLES_API_URL || '').trim().replace(/\/$/, '');

    if (!baseURL || !apiKey) {
      throw new Error('MWS Tables: не заданы TABLES_API_URL или TOKEN в .env');
    }

    const id = String(tableId || '').trim();
    if (!id) {
      throw new Error('MWS Tables: не указан ID таблицы');
    }

    return { id, client: this._client() };
  }

  async _get(tableId, url = '') {
    const { id, client } = this._ensureConfig(tableId);
    try {
      console.log(`📡 GET ${id}/records${url}`);
      const response = await client.get(`/${id}/records${url}`);
      return normalizeMwsResponse(response.data);
    } catch (error) {
      if (error.mwsResponse) throw error;
      const detail = error.response?.data?.message || error.response?.data || error.message;
      console.error('Ошибка GET MWS Tables:', detail);
      throw new Error(
        typeof detail === 'string' ? detail : 'Не удалось подключиться к MWS Tables'
      );
    }
  }

  async _post(tableId, data) {
    const { id, client } = this._ensureConfig(tableId);
    try {
      console.log(`📝 POST ${id}/records`);
      const response = await client.post(`/${id}/records`, data);
      const result = normalizeMwsResponse(response.data);
      if (!result.records.length) {
        throw new Error('MWS Tables: запись не создана');
      }
      return result;
    } catch (error) {
      if (error.mwsResponse) throw error;
      const detail = error.response?.data?.message || error.response?.data || error.message;
      console.error('Ошибка POST MWS Tables:', detail);
      throw new Error(
        typeof detail === 'string' ? detail : 'Не удалось записать данные в MWS Tables'
      );
    }
  }

  async _patch(tableId, data) {
    const { id, client } = this._ensureConfig(tableId);
    try {
      console.log(`✏️ PATCH ${id}/records`);
      const response = await client.patch(`/${id}/records`, data);
      return normalizeMwsResponse(response.data);
    } catch (error) {
      if (error.mwsResponse) throw error;
      const detail = error.response?.data?.message || error.response?.data || error.message;
      console.error('Ошибка PATCH MWS Tables:', detail);
      throw new Error(
        typeof detail === 'string' ? detail : 'Не удалось обновить запись в MWS Tables'
      );
    }
  }

  async _delete(tableId, recordIds) {
    const { id, client } = this._ensureConfig(tableId);
    const ids = (Array.isArray(recordIds) ? recordIds : [recordIds])
      .filter(Boolean)
      .map((recordId) => String(recordId).trim());

    if (!ids.length) {
      throw new Error('MWS Tables: не указаны recordId для удаления');
    }

    try {
      console.log(`🗑️ DELETE ${id}/records`, ids.join(', '));
      const response = await client.delete(`/${id}/records`, {
        data: { recordIds: ids },
      });
      return normalizeMwsResponse(response.data);
    } catch (error) {
      if (error.mwsResponse) throw error;
      const detail = error.response?.data?.message || error.response?.data || error.message;
      console.error('Ошибка DELETE MWS Tables:', detail);
      throw new Error(
        typeof detail === 'string' ? detail : 'Не удалось удалить запись в MWS Tables'
      );
    }
  }
}

module.exports = new TablesService();
module.exports.firstRecordId = firstRecordId;
