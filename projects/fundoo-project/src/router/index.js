import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import ForgotPassword from '../views/ForgotPasswordView.vue'
import ResetPassword from '../views/ResetPasswordView.vue'
import Hooks from '../views/HooksView.vue'
import Dashboard from '../views/DashboardView.vue'
import Demo from '@/views/DemoView.vue'
import GetAllNotes from '@/components/GetAllNotes.vue'
import DialogBox from '@/views/DialogBoxView.vue'
import GetAllTrashNotes from '@/views/GetAllTrashNotesView.vue'
import GetAllArchivedNotes from '@/views/GetAllArchivedNotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/dashboard/notes',
          name: 'getAllNotes',
          component: GetAllNotes
        },
        {
          path: '/dashboard/trashNotes',
          name: 'getAllTrashNotes',
          component: GetAllTrashNotes
        },
        {
          path: '/dashboard/archivedNotes',
          name: 'getAllArchivedNotes',
          component: GetAllArchivedNotes
        }
      ]
    },
    {
      path: '/hooks',
      name: 'hooks',
      component: Hooks
    },
    {
      path: '/d',
      name: 'dialog',
      component: DialogBox
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
