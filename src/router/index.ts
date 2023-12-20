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
    path: '/key',
    name: 'key',
    component: () => import('../views/KeysView.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue')
  },
  {
    path: '/profile',
    name: 'userProfile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/chat/:link',
    name: 'chat',
    component: () => import('../views/ChatRoom.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../views/Archive.vue')
  },
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL), routes
  history: createWebHashHistory(process.env.baseBackendUrl), routes
})

export default router
