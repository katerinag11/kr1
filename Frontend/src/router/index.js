import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/raspisanie', name: 'raspisanie', component: () => import('../pages/RaspisaniePage.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
  { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue') },
  { path: '/service/gym', name: 'gym', component: () => import('../pages/GymPage.vue') },
  { path: '/service/group', name: 'group', component: () => import('../pages/GroupPage.vue') },
  { path: '/service/personal', name: 'personal', component: () => import('../pages/PersonalPage.vue') },
  { path: '/service/spa', name: 'spa', component: () => import('../pages/SpaPage.vue') },
  { path: '/profile', name: 'profile', component: () => import('../pages/UserProfile.vue') },
  { path: '/admin', name: 'admin', component: () => import('../pages/AdminPanel.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && user.role !== 'admin') {
    next('/')
  } else {
    next()
  }
})

export default router