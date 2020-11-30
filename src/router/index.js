import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MusicDetails from '../views/MusicDetails.vue';
import Dj from '../components/Dj/Dj.vue';
import Top from '../views/TopList.vue';

import index from '../views/index.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home
  },
  {
    path:'/Home',
    name:'Home',
    redirect: '/index',
    component:Home,
    children:[
      {
        path:'/index',
        component:index
      },
      {
        path:'/details',
        component:MusicDetails
      },
      {
        path:'/dj:id',
        component:Dj
      }
    ]
  },
  {
     path:'/Top',
     name:'TopList',
     component : Top
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
