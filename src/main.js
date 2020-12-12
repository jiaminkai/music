import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI  from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer) // 引入video视频

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$bus=new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
