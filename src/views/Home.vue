<template>
  <div class="home">
    <el-container>

        <el-main>
            <router-view >
            </router-view>
        </el-main>

    </el-container>

   
  </div>
</template>

<script>
// @ is an alias to /src
import {Home,Subcount,LikeMusic,GetMusic,GetMusicDetails,Music} from '../components/home/home'// eslint-disable-line no-unused-vars
import {btnLogin,Login,LoginDetail} from '../components/login/login'// eslint-disable-line no-unused-vars
import { GetLyric } from "../components/MusicDetails/details";
export default {
  name: 'Home',
  data(){
    return{ 
      token:'',
      likemusci:[],
      cookie:'',
      palytime:'',
      only:[],
      newmusic:[],
      loginuser:{},
      uesrId:'',
      itemkey:'',
      lyric:[],
      percentage:0,
      islogin:false,
      loginchange:true,
      userSubcount:[],
    }
  },

  watch:{
    
  },
 
  methods:{
    // 点击登录
    login(){
     this.$router.replace('/login')
    },

   
    // 获取用户歌单
 


    
    
  },

}
</script>
<style >
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_g4odzpizzem.eot');
  src: url('//at.alicdn.com/t/font_2223549_g4odzpizzem.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
body{
  padding: 0;
  margin: 0;
}
.geciname{
  display: flex;
  font-size: 20px;
  padding-top: 10px;
  align-items: center;
  justify-content: space-between;

}
.geciname span{
  display: block;
  width: 60px;
}
.gecibox{
  min-width: 230px;
  height: auto;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.lyricshowbox{
  width: 100%;
  height: 450px;
  margin-top: 20px;
  background: chocolate;
  position: relative;
  overflow: hidden;
}
.el-header{
    background: #fff;
    box-shadow: 0px 2px 5px #cccccc;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 333;
}

.el-main{
  height: 100%;
  padding: 0 !important;

} 
.el-footer{
  height: 70px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px #cccccc;
  padding: 0!important;
  position: fixed;
  bottom: 0 ;
  display: flex;
  flex-direction: column;
   z-index: 999;  
}


.el-drawer{
  height: 600px !important;
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  bottom: 60px !important;
  top: auto!important;
  right: 20px !important;
  padding: 20px 30px;
}
.bottom{
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  height: 45px;
  align-items: center;
  width: 100%;
  left: 0;
}
</style>
