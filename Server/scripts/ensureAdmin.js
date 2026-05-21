/**
 * Создаёт единственный админ-аккаунт в MWS Tables (если ещё нет).
 * Запуск: node scripts/ensureAdmin.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const tablesService = require('../services/TableService');
const { firstRecordId } = require('../services/TableService');
const { getAdminEmail, isAdminEmail } = require('../lib/admin');

async function main() {
  const email = getAdminEmail();
  const password = (process.env.ADMIN_PASSWORD || 'Admin2026!').trim();
  const username = (process.env.ADMIN_USERNAME || 'Администратор').trim();

  console.log('Проверка админа:', email);

  const existing = await tablesService._get(
    process.env.LOGIN_TABLE_ID,
    `?filterByFormula={Email}="${email}"`
  );

  if (existing.records.length > 0) {
    console.log('Админ уже есть в таблице Login.');
    return;
  }

  const userResult = await tablesService._post(process.env.USER_TABLE_ID, {
    records: [{ fields: { Username: username } }],
  });
  const userRecordId = firstRecordId(userResult);

  await tablesService._post(process.env.LOGIN_TABLE_ID, {
    records: [
      {
        fields: {
          Email: email,
          Password: password,
          Login: username,
          UserId: [userRecordId],
        },
      },
    ],
  });

  console.log('Админ создан.');
  console.log('Email:', email);
  console.log('Пароль:', password);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
