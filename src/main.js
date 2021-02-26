import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message }  from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player'
import { GetMusicDetails,GetMusic,Music } from "./components/home/home";
import ShowToast from './components/comment/Toast/Toast'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer) // 引入video视频

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$message=Message;
Vue.prototype.$bus=new Vue();
//监听存音乐
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
//存音乐
Vue.prototype.sendmusic =function (music){
  var musiclist = JSON.parse(sessionStorage.getItem('music'))||new Array();
  console.log("判断",Object.prototype.toString.call(music) )
  // console.log("判断",music instanceof Object )
  if(music instanceof Object){
    console.log("musiclist",musiclist.length)
    if(musiclist.length==0){
      musiclist.unshift(music)
      this.resSetItem('music',JSON.stringify(musiclist))
      this.$bus.$emit('plays')
    }else{
      if(Object.prototype.toString.call(music)=="[object Object]"){
        console.log("单曲播放")
        var index = musiclist.findIndex(item=>{
          return item.musicid==music.musicid
        })
        if(index!=-1){
          this.$bus.$emit('playmnue',index)
        }else{
          musiclist.unshift(music)
          this.resSetItem('music',JSON.stringify(musiclist))
          this.$bus.$emit('playmnue',0)
          this.$bus.$emit('plays')
        }
      }else{
        console.log("歌单播放")
        musiclist.unshift(...music)
        const newmusic = Array.from(new Set(musiclist))
        this.resSetItem('music',JSON.stringify(newmusic))
        this.$bus.$emit('playmnue',0)
        this.$bus.$emit('plays')
      }
    }
   
  }else{
    var array=[]
    var data = []
    var ndata = []

    if(typeof(music)=='number'){
      music = music.toString()
    }
    if(music.indexOf(',')==-1){
      var indexs =  musiclist.findIndex((item)=>{
          return item.musicid == music
        })
      if(indexs==-1){
          Promise.all([GetMusic(music), GetMusicDetails(music)]).then(res=>{
          console.log("res",res)
          data =  res[0].data
          ndata =  res[1].data
          var c = new Music(ndata.songs[0],data.data[0].url)
          musiclist.unshift(c)
          this.resSetItem('music',JSON.stringify(musiclist))
        })
      }else{
        this.$bus.$emit('playmnue',indexs)
        // this.$bus.$emit('plays')
      }
    }else{
      var ids = music.split(',')
      console.log(ids)
      ids.forEach(id => {
          var indexs =  musiclist.findIndex((item)=>{
            return item.musicid == id
          })
          if(indexs==-1){
              Promise.all([GetMusic(id), GetMusicDetails(id)]).then(res=>{
              console.log("res",res)
              data =  res[0].data
              ndata =  res[1].data
              var c = new Music(ndata.songs[0],data.data[0].url)
              musiclist.unshift(c)
              this.resSetItem('music',JSON.stringify(musiclist))
            })
          }
      });
    }
  }
}
Vue.prototype.$time=function(time){
  var creartime = new Date(time);
  var y = creartime.getFullYear();
  var M = creartime.getMonth() + 1;
  var d = creartime.getDate();
  return y + "-" + M + "-" + d;
}
Vue.prototype.$musictime=function(musictime){
 return (Math.floor(musictime/1000/60)<10?"0"+Math.floor(musictime/1000/60):Math.floor(musictime/1000/60))+":"+(Math.floor(musictime/1000%60)<10?"0"+Math.floor(musictime/1000%60):Math.floor(musictime/1000%60))
}
Vue.use(ShowToast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
