import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SigninView.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue')
  },
  {
    path: '/profile/:username',
    name: 'userProfile',
    component: () => import('../views/UserProfile.vue')
  },
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL), routes
  history: createWebHashHistory(process.env.baseBackendUrl), routes
})

export default router
