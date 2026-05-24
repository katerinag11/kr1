import usersData from '../data/users.json'

const normalizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  subscription: user.subscription || 'none'
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
