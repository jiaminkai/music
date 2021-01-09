<template>
  <div class="mybox">
      <div class="container" >
      <!-- 左边信息介绍 -->
        <div class="loading"  v-loading="loading" v-if="loading"></div>
        <div class="myleftbox">
          <div  class="myleft">
              <img :src="this.login.avatarUrl" alt="">
              <p>{{this.login.nickname}}</p>
              <div class="level"><small>LV.{{this.count.artistCount}}</small></div>
              <div class="liuyan">我还没有想好要说什么...</div>
              <div class="creat">来自宇宙的深处，于{{this.login.creattiem}}加入</div>
              <div class="history">
                  <div><span>{{this.myevent.length}}</span><span>动态</span></div>
                  <div><span>{{this.myfollows.length}}</span><span>关注</span></div>
                  <div><span>{{this.myfolloweds.length}}</span><span>粉丝</span></div>
              </div>
          </div>
         
        </div>
        <!-- 右边歌单，播放 -->
        <div class="myplay">
            <div class="historyTitle">
                <div class="historyTitleitem" @click="todetails(0)"><div class="iconfont">&#xe682;</div><div class="tieleitem"><span>{{this.myrecord.length}}</span>最近播放</div></div>
                <div class="historyTitleitem" @click="todetails(1)"><div class="iconfont">&#xe607;</div><div class="tieleitem"><span>{{this.count.subPlaylistCount}}</span>我的收藏</div></div>
                <div class="historyTitleitem" @click="todetails(2)"><div class="iconfont">&#xe79f;</div><div class="tieleitem"><span>0</span>已购音乐 </div></div>
            </div>
            <div class="creatgedaibox">
                <div class="creatgedai"><span>我的歌单{{this.count.createdPlaylistCount}}</span> <div class="creatgedaimove"><span class="newgedan">新建歌单</span><span class="daorugedan">导入歌单</span><span class="allgedai">全部<span class="el-icon-arrow-right"></span></span></div></div>
                <div class="creatcontent">
                    <div style="display:flex" v-if="this.myplay.length!=0">
                        <div class="creatcontent-item" v-for="(item,index) in this.myplay" :key="index">
                           <div class="creatplay" v-if="item.playCount!=undefined"><i class="el-icon-video-play" style="padding-right:5px"></i>{{item.playCount}}</div>
                            <div class="img-bg">
                                <img :src="item.coverImgUrl" alt="">
                            </div>
                            <div class="gedainame">{{item.name}}</div>
                            <div class="creatgedai-tab" v-if="item.tags!=undefined">
                              <span v-for="(n,index) in item.tags" :key="index">#{{n}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="creatcontent-item">
                            <img src="" alt="">
                            <div class="gedainame">{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="subgedan">
                <div class="creatgedai">我的电台</div>
                    <div class="creatcontent">
                    <div class="errbox" v-if="this.myplay.length!=0">
                        <!-- <div class="creatcontent-item" v-for="(item,index) in this.myplay" :key="index">
                            <img :src="item.coverImgUrl" alt="">
                        </div> -->
                        <div class="errnull"></div>
                    </div>
                    <div v-else>
                        <!-- <div class="creatcontent-item">
                            <img src="" alt="">
                            <div class="gedainame">{{item.name}}</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {My,MyPlaylist,MyCounr,MyRecord,MyDj,MyFollows,MyEvent,MyFolloweds,MySublist,MyPlaylistVideo} from "../components/My/my";
export default {
  name:'MyMusic',
  data(){
    return{
      login:{},
      count:{},
      myplay:[],
      myevent:[],
      myfolloweds:[],
      myfollows:[],
      loading: true,
      myrecord:[],
      video:[]
    }
  },
  computed:{

  },
  methods:{
  async getMy(){
      const {data:my} = await My();
      if(my.profile==null){
        this.$message.error("需要登录")
        this.$router.replace('login')
      }
      const {data:myplay} = await MyPlaylist(this.login.userId);
      const {data:mycounr} = await MyCounr();
      // 用户的播放记录
      const {data:myrecord} = await MyRecord(this.login.userId);
      // 用户的电台
      const {data:mydj} = await MyDj(this.login.userId);
      // 用户的关注列表
      const {data:myfollows} = await MyFollows(this.login.userId);
      // 用户动态
      const {data:myevent} = await MyEvent(this.login.userId);
      // 用户粉丝
      const {data:myfolloweds} = await MyFolloweds(this.login.userId);
      //用户视频播放记录
      const {data:myvaiod}  = await MyPlaylistVideo()
      this.video =myvaiod.data.videos
      var c = new Date(my.profile.createTime)
      var y = c.getFullYear();
      var m = c.getMonth()+1;
      var d = c.getDate();
      this.login.creattiem=y+'年'+(m)+'月'+(d)+'日'
      this.login.city=my.profile.city
      this.count =mycounr
      this.myplay=myplay.playlist
      this.myrecord=myrecord.allData
      this.mydj =mydj.programs
      this.myfollows=myfollows.follow
      this.myevent= myevent.events
      this.myfolloweds=myfolloweds.data
      this.myplay.forEach(a=>{
           if(a.playCount/100000000>1){
              a.playCount= (a.playCount/100000000).toFixed(2)+"亿";
            }else if(a.playCount/10000>1){
              a.playCount= (a.playCount/10000).toFixed(2)+"万";
            }
      })
      this.loading=false
   
    },
  todetails(val){
    if(val==0){
        this.$router.push({
        path:'/MySub',
        name:'MySub',
        params:{
          song:this.myrecord,
          userId:this.login.userId,
          video:this.video,
          username:this.login.name
        }
      })
    }
    if(val==1){
        this.$router.push({
        path:'/MySub2',
        name:'MySub2',
        params:{
          userId:this.login.userId,
          username:this.login.nickname
          
        }
      })
    }
    if(val==2){
        this.$router.push({
        path:'/MySub3',
        name:'MySub3',
        params:{
         
        }
      })
    }
  
  },
   
  },

  created(){
    this.login = JSON.parse(sessionStorage.getItem('loginchange'));
    this.getMy()
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_5l5zfyhbhq8.eot');
  src: url('//at.alicdn.com/t/font_2223549_5l5zfyhbhq8.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_5l5zfyhbhq8.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_5l5zfyhbhq8.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_5l5zfyhbhq8.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_5l5zfyhbhq8.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:36px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.errnull{
	width: 100%;
	height: 340px;
	background: url('../assets/404.png') center no-repeat;
}
.errbox{
  width: 100%;
  min-height: 1100px;
}
.mybox{
  width: 100%;
  background: #eee;
}
.container{
  width: 1400px;
  padding: 0 100px ;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px #eee;
  background: #fff;
  display: flex;

}
.myleftbox{
  width: 300px;
  height: 100vh;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  position: relative;
}
.myleft{
  width: 300px;
  height: 100vh;
  padding: 50px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
}
.myleft img{
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.myleft p{
  font-size: 20px;
  font-weight: 600;
  margin: 8px 0;
}
.level{
  font-size: 8px;  
  font-weight: 500;
  border: 1px #000 solid;
  border-radius: 2px;
  margin-bottom: 35px;
}
.liuyan,.creat{
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #999;
}
.liuyan{
  padding: 8px 0;
  color: #000;
}
.history{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.history div{
  display: flex;
  flex-direction: column;
}
.history div span{
  display: block;
  text-align: center;
}
.myplay{
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 40px;
  padding: 50px;
}
.loading{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255,1);
  z-index: 9989;
}
.historyTitle{
  display: flex;
  height: 128px;
  background: #f7f7f7;
  margin-bottom: 30px;
}
.historyTitleitem{
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.historyTitleitem:after{
    content: "";
     border-right:1px  solid #aaa;
     height: 45px;
     position: relative;
     left: 50px;
}
.historyTitleitem:nth-child(3):after{
    content: "";
     border-right:none;
     height: 45px;
     position: relative;
}
.historyTitleitem div:nth-child(1){
  padding: 0 30px;
}
.tieleitem{
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 600;
  box-sizing: border-box;

}
.creatgedaibox{
  display: flex;
  flex-direction: column;


}
.creatgedai{
 text-align: left;
 font-size: 26px;
 font-weight: 600;
 padding: 20px 0;
 display: flex;
 justify-content: space-between;
}
.creatcontent{
  display: flex;
  position: relative;
  width: 100%;
}
.creatplay{
  position: absolute;
  font-size: 12px ;
  z-index: 102;
  padding: 0 10px;
  line-height: 28px;
  right: 13px;
  top: 5px;
  color: #fff;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
  background-size: cover;
  height:28px;
}
.creatplay::after{
  content: "";
  position: absolute;
  right: -10px;
  top: 0;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
  background-size: cover;
  height: 28px;
  width: 10px;
  display: block;
}
.creatcontent-item{
   width: 150px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 40px;
  
}
.img-bg img{
  width: 150px;
  height: 150px;
  position: relative;
  z-index: 99;
  background: #d6d6d6;
  border-radius: 5px;


}
.img-bg::after{
  content: "";
  width: 80%;
  height: 135px;
  position: absolute;
  display: block;
  background: #d6d6d6;
  top: 5px;
  right: -7px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.img-bg::before{
  content: "";
  width: 80%;
  height: 115px;
  position: absolute;
  display: block;
  background: #eee;
  top: 12px;
  right: -12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.gedainame{
  font-size: 14px;
  color: #000;
  text-align: left;
  padding: 12px 0;
  font-weight: 600;
}
.creatgedaimove{
  font-size: 16px;
  font-weight: 500;
  line-height: .5;
  display: flex;
}
.newgedan ,.daorugedan{
  display: block;
  padding: 15px;
  border-radius: 20px;
  background: coral;
  margin-left: 15px;
}
.daorugedan{
  background: #d6d6d6;
}
.allgedai{
  display: block;
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.creatgedai-tab{
  font-size: 12px;
  color: tomato;
  text-align: left;
}
.creatgedai-tab span{
  padding-right: 5px;
}
.subgedan{
  margin-top: 80px;
}
</style>