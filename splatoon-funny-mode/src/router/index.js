import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RandomWeaponModeView from '../views/Modes/RandomWeaponMode/RandomWeaponModeView.vue'
import AboutViewVue from '@/views/AboutView.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
