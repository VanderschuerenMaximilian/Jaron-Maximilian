import { createRouter, createWebHistory } from 'vue-router'
import useFirebase from '../composables/useFirebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/wrapper/AppWrapper.vue'),
      meta: { requiresAuth: false, showFooter: true, showHeader: true },
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
          path: 'events',
          component: () => import('../views/Events.vue'),
        },
        {
          path: 'contact',
          component: () => import('../views/Contact.vue'),
        },
        {
          path: 'openinghours',
          component: () => import('../views/Openingshours.vue'),
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
      meta: { requiresAuth: true, showFooter: false, showHeader: true },
      children: [
        {
          path: 'employee/:id',
          component: () => import('../views/auth/employee/Profile.vue'),
        },
        {
          path: 'administration/:id',
          component: () => import('../components/wrapper/DashboardWrapper.vue'),
          meta: { requiresAuth: true, showHeader: false },
          children: [
            {
              path: 'dashboard',
              component: () => import('../views/auth/administration/Dashboard.vue'),
            }
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.path === '/login' || to.path === '/register' || to.path === '/reset') {
    if (firebaseUser.value) {
      next("/")
    } else {
      next()
    }
  }
  else if (to.path.startsWith('/auth/employee/')) {
    if (firebaseUser.value !== null && firebaseUser.value?.email !== null) {
      const emailSplit: string[] = firebaseUser.value.email.split("@")
      if (emailSplit[1].includes("employee.bellewaerde.be") || firebaseUser.value.email === "admin@admin.bellewaerde.be") {
        next()
      } else {
        next("/")
      }
    }
  } 
  else if (to.path.startsWith('/auth/administration/')) {
    if (firebaseUser.value !== null && firebaseUser.value?.email !== null) {
      const emailSplit: string[] = firebaseUser.value.email.split("@")
      if (emailSplit[1].includes("administration.bellewaerde.be") || firebaseUser.value.email === "admin@admin.bellewaerde.be") {
        next()
      } else {
        next("/")
      }
    }
  }
  else {
    if (to.meta.requiresAuth && !firebaseUser.value) {
      next('/login')
    } else {
      next()
    }
  }
})


export default router
