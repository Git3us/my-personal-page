import { createRouter, createWebHistory } from 'vue-router'
import PersonalHome from '../views/PersonalHome.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PersonalHome
    }
  ]
})

export default router
