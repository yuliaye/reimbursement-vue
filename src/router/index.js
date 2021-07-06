import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Reimbursements from '@/views/Reimbursements.vue'
import NewReimbursements from '@/views/Reimbursements/NewReimbursements.vue'
import EditReimbursements from '@/views/Reimbursements/EditReimbursements.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reimbursements',
      component: Reimbursements
    },
    {
      path: '/reimbursements/new',
      component: NewReimbursements
    },
    {
      path: '/reimbursements/edit',
      component: EditReimbursements
    },
    {
      path: '',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogged = store.state.isLogin

  if (to.path === '/login') {
    if (!isLogged) {
      next()
    } else {
      return false
      // next(false)
    }
  } else {
    isLogged ? next() : next('/login')
  }
})

export default router
