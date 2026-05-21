<template>
    <div class="auth-page">
      <div class="auth-card">
        <h2>Регистрация</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <input v-model="username" type="text" placeholder="Имя пользователя" required />
          </div>
          <div class="form-group">
            <input v-model="email" type="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input v-model="password" type="password" placeholder="Пароль (мин. 6 символов)" required />
          </div>
          <div class="form-group">
            <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" required />
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </form>
        <p class="auth-footer">
          Уже есть аккаунт? <router-link to="/login">Войти</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api'
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        loading: false,
        error: ''
      }
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Пароли не совпадают'
          return
        }
        if (this.password.length < 6) {
          this.error = 'Пароль должен быть минимум 6 символов'
          return
        }
        this.loading = true
        this.error = ''
        try {
          const response = await api.post('/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password
          })
          const data = response.data
          if (!data?.success) {
            this.error = data?.message || 'Ошибка регистрации'
            return
          }
          if (!data.user?.id) {
            this.error =
              'Сервер ответил без ID пользователя. Перезапустите API: node Server/index.js'
            return
          }
          localStorage.setItem('token', data.token || 'token-' + Date.now())
          localStorage.setItem('user', JSON.stringify(data.user))
          window.dispatchEvent(new Event('storage'))
          this.$router.push('/')
        } catch (err) {
          const msg = err.response?.data?.message || err.message
          this.error =
            msg === 'Network Error'
              ? 'Не удалось связаться с сервером. Запустите: node Server/index.js'
              : msg || 'Ошибка регистрации'
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding-top: 60px;
  }
  
  .auth-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 35px rgba(0,0,0,0.1);
  }
  
  .auth-card h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .btn-primary {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
  }
  
  .error-message {
    color: #ef4444;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .auth-footer {
    text-align: center;
    margin-top: 1rem;
  }
  </style>