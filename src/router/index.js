import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/graphs/:id',
    name: 'Graph',
    component: function () {
      return import('../views/Graph.vue')
    }
  },
  {
    path: '/graphs/:id/edit',
    name: 'Graph edit',
    component: function () {
      return import('../views/EditGraph.vue')
    }
  },
  {
    path: '/graphs/:id/statistics',
    name: 'Graph statistics',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
