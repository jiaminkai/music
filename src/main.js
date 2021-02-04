import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message }  from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player'
import { GetMusicDetails,GetMusic,Music } from "./components/home/home";

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer) // 引入video视频

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$message=Message;
Vue.prototype.$bus=new Vue();
Vue.prototype.resSetItem = function (key, newVal) {
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
Vue.prototype.sendmusic =function (music){
  var musiclist = JSON.parse(sessionStorage.getItem('music'))||[];
  if(typeof(music)=='object'){
    var index = musiclist.findindex(item=>{
      return item.musicid=music.musicid
    })
    if(index!=-1){
      this.$bus.$emit('playmnue',index)
    }else{
      musiclist.unshift(music)
      this.resSetItem('music',JSON.stringify(musiclist))
    }
  }else{
    var array=[]
    const {data:data} =await GetMusic(music)
    const {data:ndata} =await GetMusicDetails(id)
    Promise.all(this.GetMusic(music), this.GetMusicDetails(music)).then(res=>{
      console.log("加载完成")
    })
    for(var i =0 ;i<ndata.songs.length;i++){
        var c = new Music(ndata.songs[i],data.data[i].url)
        array.push(c)
    }
  }
}
// 浅拷贝
function shallowCopy(object){
  if(!object||typeof object !== 'object')
    return ;
  let newObject = Array.isArray(object)?[]:{};
  for(let key in object){
      if(object.hasOwnProperty(key)){
        newObject[key] = object[key];
      }
  }
  return newObject;
}
// 深拷贝
function deepCopy(object){
  if(!object||typeof object !== 'object')
    return ;
  let newObject = Array.isArray(object)?[]:{};
  for(let key in object){
      if(object.hasOwnProperty(key)){
        newObject[key] = typeof object[key]=="object"? deepCopy( object[key]): object[key];
      }
  }
  return newObject;
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
