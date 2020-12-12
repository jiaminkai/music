import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MusicDetails from '../views/MusicDetails.vue';
import Dj from '../components/Dj/Dj.vue';
import Top from '../views/TopList.vue';
import Song from '../views/Song.vue';
import index from '../views/index.vue';
import Singers from '../views/Singers.vue';
import SingersDetails from "../views/SingersDetails.vue";
import MV from "../views/MV.vue";
import MVDetail from "../components/MV/MvDetails.vue";

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
  },
  {
    path:'/Song',
    name:'Song',
    component : Song
 },
 {
  path:'/Singers',
  name:'Singers',
  component : Singers
}
,
 {
  path:'/SingersDetails:id',
  name:'SingersDetails',
  component : SingersDetails
}
,
 {
  path:'/MV',
  name:'MV',
  component : MV
}
,
 {
  path:'/MVDetail:id',
  name:'MVDetail',
  component : MVDetail
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
