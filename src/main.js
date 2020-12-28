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
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'music') {

      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
