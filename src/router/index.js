import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import SignUp from '../views/SignUp.vue'
import HomePage from '../views/HomePage.vue'
import LogoCraft from '../views/LogoCraft.vue'
import LeboGpt from '../views/LeboGpt.vue'
import Postra from '../views/PostraView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: AuthPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/studio/logocraft',
      name: 'logocraft',
      component: LogoCraft,
    },
    {
      path: '/studio/lebogpt',
      name: 'lebogpt',
      component: LeboGpt,
    },
    {
      path: '/studio/postra',
      name: 'postra',
      component: Postra,
    },
  ],
})

export default router
