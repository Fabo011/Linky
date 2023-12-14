import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue';

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
    path: '/keys',
    name: 'keys',
    component: () => import('../views/KeysView.vue'),
  },
  {
    path: '/profile/:username',
    name: 'userProfile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/chat/:link',
    name: 'chat',
    component: () => import('../views/ChatRoom.vue')
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/Movies.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
  //history: createWebHashHistory(process.env.baseBackendUrl), routes
})

export default router
