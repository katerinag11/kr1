function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || 'admin@fitcomplex.ru').trim().toLowerCase();
}

function isAdminEmail(email) {
  return String(email || '').trim().toLowerCase() === getAdminEmail();
}

function resolveRole(email) {
  return isAdminEmail(email) ? 'admin' : 'user';
}

module.exports = { getAdminEmail, isAdminEmail, resolveRole };
