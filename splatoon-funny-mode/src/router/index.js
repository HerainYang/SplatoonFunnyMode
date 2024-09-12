import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RandomWeaponModeView from '../views/Modes/RandomWeaponMode/RandomWeaponModeView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import CommentViewVue from '@/views/CommentView.vue'

const routes = [
  {
    path: '/randomweaponmode',
    name: 'randomweaponmode',
    component: RandomWeaponModeView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutViewVue
  },
  {
    path: '/comment',
    name: 'comment',
    component: CommentViewVue
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
