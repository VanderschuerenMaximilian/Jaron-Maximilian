import { createRouter, createWebHistory } from 'vue-router'
import AppWrapperVue from '../components/wrapper/AppWrapper.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/wrapper/AppWrapper.vue'),
      meta: { requiresAuth: false, showFooter: true },
      children: [
        {
          path: '',
          component: () => import('../views/Home.vue'),
        },
        {
          path: 'login',
          component: () => import('../views/Login.vue'),
        },
        {
          path: 'register',
          component: () => import('../views/Register.vue'),
        },
        {
          path: 'reset',
          component: () => import('../views/Reset.vue'),
        },
        {
          path: 'map',
          component: () => import('../views/Map.vue'),
        },
        {
          path: 'contact',
          component: () => import('../views/Contact.vue'),
        },
        {
          path: 'openingsuren',
          component: () => import('../views/Openingsuren.vue'),
        },
        {
          path: 'tickets',
          component: () => import('../views/Tickets.vue'),
        },
        {
          path: 'alerts',
          component: () => import('../views/Alerts.vue'),
        }
      ],
    },
    {
      path: '/auth',
      component: import('../components/wrapper/AppWrapper.vue'),
      meta: { requiresAuth: true, showFooter: false },
      children: [
        {
          path: 'werknemer/:id',
          component: () => import('../views/auth/werknemer/Profile.vue'),
        },
        {
          path: 'administratie/:id',
          component: () => import('../components/wrapper/DashboardWrapper.vue'),
          children: [
            {
              path: 'dashboard',
              component: () => import('../views/auth/administratie/Dashboard.vue'),
            }
          ],
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ]
})

export default router
