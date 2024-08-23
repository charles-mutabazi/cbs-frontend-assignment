import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/presentation/HomePage.vue'
import AuthScreen from '@/presentation/auth/AuthScreen.vue'
import SignupView from '@/presentation/auth/SignupView.vue'
import LoginView from '@/presentation/auth/LoginView.vue'
import BookingPage from '@/presentation/booking/BookingPage.vue'
import { useAuthStore } from '@/data/stores/userAccountStore'
import Layout from '@/presentation/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      meta: {
        isProtected: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
        {
          path: 'new-booking',
          name: 'booking',
          component: BookingPage,
        },
      ]
    },


    {
      path: '/auth',
      component: AuthScreen,
      children: [
        {
          path: 'signup',
          component: SignupView
        },
        {
          path: 'login',
          component: LoginView
        }
      ],
      meta: {
        isProtected: false
      }
    }
  ]
})

//guard the routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.isProtected && !authStore.jwt) {
    next('/auth/login')
  } else if (!to.meta.isProtected && authStore.jwt) {
    next('/')
  } else {
    next()
  }
})

export default router
