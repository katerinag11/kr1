<template>
  <v-app-bar app color="primary" dark elevate-on-scroll>
    <v-container class="d-flex align-center">
      <v-toolbar-title @click="$router.push('/')" class="cursor-pointer">
        <span class="logo-text">FitComplex</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">Главная</router-link>
      <router-link to="/raspisanie" class="nav-link" :class="{ active: $route.path === '/raspisanie' }">Расписание</router-link>
      
      <template v-if="!isAuth">
        <router-link to="/login" class="nav-link" :class="{ active: $route.path === '/login' }">Вход</router-link>
        <router-link to="/register" class="nav-link register-link" :class="{ active: $route.path === '/register' }">Регистрация</router-link>
      </template>
      
      <template v-else>
        <router-link to="/profile" class="nav-link" :class="{ active: $route.path === '/profile' }">Профиль</router-link>
        <router-link v-if="isAdminUser" to="/admin" class="nav-link" :class="{ active: $route.path === '/admin' }">Админ</router-link>
        <button @click="logout" class="logout-btn">Выйти</button>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script>
import { clearAuth, getStoredUser, isAuthenticated, isAdmin } from '../utils/auth'

export default {
  name: 'Header',
  data() {
    return {
      isAuth: false,
      user: null,
    }
  },
  computed: {
    isAdminUser() {
      return isAdmin()
    },
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
      this.isAuth = isAuthenticated()
      this.user = getStoredUser()
    },
    logout() {
      clearAuth()
      this.checkAuth()
      this.$router.push('/')
    },
  },
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

.nav-link {
  text-decoration: none;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
  margin: 0 4px;
  padding: 8px 16px;
  border-radius: 50px;
  transition: all 0.3s;
}

.nav-link:hover {
  color: white;
  background: rgba(255,255,255,0.15);
}

.nav-link.active {
  color: white;
  background: rgba(255,255,255,0.25);
  font-weight: 600;
}

.register-link {
  background: rgba(255,255,255,0.1);
}

.register-link:hover {
  background: rgba(255,255,255,0.2);
}

.logout-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}

.v-app-bar {
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}
</style>