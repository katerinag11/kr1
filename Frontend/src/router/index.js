import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { getStoredUser, isAdmin, isAuthenticated } from '../utils/auth'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/raspisanie', name: 'raspisanie', component: () => import('../pages/RaspisaniePage.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
  { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue') },
  { path: '/profile', name: 'profile', component: () => import('../pages/UserProfile.vue') },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../pages/AdminPanel.vue'),
    meta: { requiresAdmin: true },
  },
  { path: '/service/gym', name: 'gym', component: () => import('../pages/GymPage.vue') },
  { path: '/service/group', name: 'group', component: () => import('../pages/GroupPage.vue') },
  { path: '/service/personal', name: 'personal', component: () => import('../pages/PersonalPage.vue') },
  { path: '/service/spa', name: 'spa', component: () => import('../pages/SpaPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (!to.meta.requiresAdmin) return true

  if (!isAuthenticated()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (!isAdmin()) {
    return { path: '/profile' }
  }

  return true
})

export default router
export { getStoredUser, isAdmin }