<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">
      🏋️ FitComplex
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Главная</v-btn>
    <v-btn text to="/raspisanie">Расписание</v-btn>
    <v-btn text v-if="!isAuth" to="/login">Вход</v-btn>
    <v-btn text v-if="!isAuth" to="/register">Регистрация</v-btn>
    <template v-else>
      <v-btn text to="/profile">Профиль</v-btn>
      <v-btn text v-if="isAdmin" to="/admin">Админ</v-btn>
      <v-btn text @click="logout" color="error">Выйти</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isAuth: false,
      user: null
    }
  },
  computed: {
    isAdmin() {
      return this.user?.role === 'admin'
    }
  },
  mounted() {
    this.checkAuth()
    window.addEventListener('storage', this.checkAuth)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.checkAuth)
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token')
      this.isAuth = !!token
      const userStr = localStorage.getItem('user')
      this.user = userStr ? JSON.parse(userStr) : null
    },
    logout() {
      localStorage.clear()
      this.checkAuth()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
header {
position: fixed;
top: 0;
left: 0;
width: 100%;
background: white;
padding: 1rem 2rem;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
z-index: 100;
}

.logo {
font-size: 1.5rem;
font-weight: bold;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
cursor: pointer;
}

nav {
display: flex;
gap: 1.5rem;
align-items: center;
flex-wrap: wrap;
}

nav a {
text-decoration: none;
color: #333;
transition: color 0.3s;
cursor: pointer;
}

nav a:hover {
color: #667eea;
}

.router-link-active {
color: #667eea;
font-weight: bold;
}

.user-name {
font-weight: 500;
color: #667eea;
}

.admin-link, .logout-btn {
background: none;
border: none;
cursor: pointer;
font-size: 1rem;
}

.admin-link {
color: #667eea;
}

.logout-btn {
color: #ef4444;
}

@media (max-width: 768px) {
header {
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
}

nav {
  justify-content: center;
  gap: 1rem;
}
}
</style>