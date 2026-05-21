<template>
    <div class="auth-page">
      <div class="auth-card">
        <h2>Вход в аккаунт</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <input v-model="email" type="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input v-model="password" type="password" placeholder="Пароль" required />
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </form>
        <p class="auth-footer">
          Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api'
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        error: ''
      }
    },
    methods: {
      async login() {
        this.loading = true
        this.error = ''
        try {
          const response = await api.post('/auth/login', {
            email: this.email,
            password: this.password
          })
          if (response.data.success) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            window.dispatchEvent(new Event('storage'))
            const redirect = this.$route.query.redirect
            if (response.data.user?.role === 'admin') {
              this.$router.push(redirect && String(redirect).startsWith('/admin') ? redirect : '/admin')
            } else if (redirect) {
              this.$router.push(redirect)
            } else {
              this.$router.push('/')
            }
          }
        } catch (err) {
          this.error = err.response?.data?.message || 'Ошибка входа'
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
  
  .form-group input:focus {
    outline: none;
    border-color: #667eea;
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
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #ef4444;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 14px;
  }
  
  .auth-footer {
    text-align: center;
    margin-top: 1rem;
    color: #666;
  }
  
  .auth-footer a {
    color: #667eea;
    text-decoration: none;
  }
  </style>