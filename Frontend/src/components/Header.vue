<template>
  <v-app-bar app color="primary" dark elevate-on-scroll>
    <v-container class="d-flex align-center">
      <v-toolbar-title @click="$router.push('/')" class="cursor-pointer">
        <span class="logo-text">FitComplex</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn text to="/" class="nav-btn">Главная</v-btn>
      <v-btn text to="/raspisanie" class="nav-btn">Расписание</v-btn>
      <v-btn text v-if="!isAuth" to="/login" class="nav-btn">Вход</v-btn>
      <v-btn text v-if="!isAuth" to="/register" class="nav-btn register-btn">Регистрация</v-btn>
      
      <template v-else>
        <v-btn text to="/profile" class="nav-btn">Профиль</v-btn>
        <v-btn text v-if="isAdmin" to="/admin" class="nav-btn">Админ</v-btn>
        <v-btn text @click="logout" color="error" class="logout-btn">Выйти</v-btn>
      </template>
    </v-container>
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
.cursor-pointer {
  cursor: pointer;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.nav-btn {
  text-transform: none;
  font-weight: 500;
  margin: 0 4px;
}

.register-btn {
  background: rgba(255,255,255,0.15);
  border-radius: 20px;
}

.logout-btn {
  text-transform: none;
  font-weight: 500;
}

.v-app-bar {
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}
</style>