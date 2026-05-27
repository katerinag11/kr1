import usersData from '../data/users.json'

const normalizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  subscription: user.subscription || 'none',
  date: user.date || '20.05.2026',
  phone: user.phone || '+7 (900) 000-00-00',
  city: user.city || 'Москва',
  goal: user.goal || 'Поддерживать форму',
  height: user.height || 175,
  weight: user.weight || 70,
  birthday: user.birthday || '01.01.1990',
  gender: user.gender || 'Не указан'
})

export async function loginWithJson(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedPassword = password.trim()

  const user = usersData.users.find((candidate) => {
    return (
      candidate.email.toLowerCase() === normalizedEmail &&
      candidate.password === normalizedPassword
    )
  })

  if (!user) {
    const error = new Error('Неверный email или пароль')
    error.code = 'INVALID_CREDENTIALS'
    throw error
  }

  return {
    success: true,
    token: `json-${Date.now()}`,
    user: normalizeUser(user)
  }
}
