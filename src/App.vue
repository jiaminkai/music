<template>
  <div id="app">
    <el-container>
      <el-header>
          <nav-menu></nav-menu>
      </el-header>
      <el-main>
            <router-link to="/"></router-link><router-view/>
              <div class="fly bg-fly-circle1"></div>
              <div class="fly bg-fly-circle2"></div>
              <div class="fly bg-fly-circle3"></div>
              <div class="fly bg-fly-circle4"></div>
              
      </el-main>
     <foot></foot>
      <el-footer>
        <bottom></bottom>
      </el-footer>
    </el-container>
      
  
  </div>
</template>
<script>
import NavMenu from './components/home/NavMenu.vue'
import bottom from './components/home/paly.vue'
import foot from './components/home/bottom.vue'

import { btnLogin } from "./components/login/login";
import {Home,Subcount,LikeMusic,GetMusic,GetMusicDetails,Music} from './components/home/home'
export default {
  components:{NavMenu,bottom,foot},
  data(){
    return {
      loginuser:{
        loginchange:false
      },
      likemusci:{}
    }
  },
  methods:{
        // 获取音乐
    async getmusic(id){
        var array=[]
        const {data:data} =await GetMusic(id)
        const {data:ndata} =await GetMusicDetails(id)
        console.log("musci",ndata)
        for(var i =0 ;i<ndata.songs.length;i++){
            var c = new Music(ndata.songs[i],data.data[i].url)
            array.push(c)
        }
        return array
    },
    // 获取喜欢的歌曲列表
    async getlike(id){
        const {data:data} =await LikeMusic(id)
       await this.getmusic(data.ids.join(',')).then(res=>{
           this.likemusci=res
        })
        this.likemusci.forEach((item,index)=>{
          item.isonplay=false
          item.hover=false
          item.index=index
          var h=parseInt(item.playtime/1000/60)
          if(parseInt(item.playtime/1000/60)<10){
              h='0'+ parseInt(item.playtime/1000/60)
          }
          var s=parseInt(item.playtime/1000%60)
          if(parseInt(item.playtime/1000%60)<10){
              s='0'+ parseInt(item.playtime/1000%60)
          }
          item.playtime= h+':'+s
        })
        this.music = this.likemusci[0]
        this.$store.commit('SetMusic',this.likemusci)
    },
      //查看登录状态
      async loginchan(){
        const logs =await btnLogin()
        if(logs.data.code==200){
            console.log("已登录")
            this.uesrId=logs.data.profile.userId
            this.getlike(this.uesrId)
        }else{
            this.loginuser.loginchange=true
        }
    },
  },
  created(){
    this.loginchan()
  }

}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: auto;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 99999;
}
.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.07) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  left: 3%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.08) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  right: 2%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.1) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 5%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(100, 84, 239, 0.02) 0%, rgba(48, 33, 236, 0.04) 100%);
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
