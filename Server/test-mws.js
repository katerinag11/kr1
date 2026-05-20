require('dotenv').config({ path: '../.env' });
const axios = require('axios');

async function test() {
  console.log('🔍 Проверка подключения к MWS Tables...');
  console.log('USER_TABLE_ID:', process.env.USER_TABLE_ID);
  console.log('TOKEN (первые 20 символов):', process.env.TOKEN?.substring(0, 20));
  
  try {
    const response = await axios.get(
      `${process.env.TABLES_API_URL}/${process.env.USER_TABLE_ID}/records`,
      { headers: { 'Authorization': `Bearer ${process.env.TOKEN}` } }
    );
    console.log('✅ УСПЕХ! Статус:', response.status);
    console.log('Данные:', response.data);
  } catch (error) {
    console.log('❌ ОШИБКА!');
    if (error.response) {
      console.log('Статус:', error.response.status);
      if (error.response.status === 403) console.log('👉 ПРОБЛЕМА: Неверный TOKEN');
      if (error.response.status === 404) console.log('👉 ПРОБЛЕМА: Неверный ID таблицы');
    } else {
      console.log('Сообщение:', error.message);
      console.log('👉 ПРОБЛЕМА: Нет соединения с сервером MWS Tables');
    }
  }
}

test();