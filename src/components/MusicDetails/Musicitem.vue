<template>
   
<el-container>
    <div class="container">
      <el-aside width="360px">
          <div class="djbox">
              <div class="img" >
                  <img v-if="this.array!=undefined" :src="this.array.picUrl" alt="">
                  <img v-else :src="this.dj.coverImgUrl" alt="">
              </div>
            <slot name="djdesc" class="slotdesc">
                   
              </slot>
              <slot name="djcary">
                 
              
              </slot>


          </div>
      </el-aside>
      <el-main>
          <div class="top">
                  <div class="musicname">
                      <div v-if="this.dj==undefined">{{this.music.musicname}}</div>
                      <div v-else>{{this.dj.name}}</div>
                      <div class="icon">
                            <el-avatar> user </el-avatar>
                            <span  v-if="this.array!=undefined">{{this.array.user}}</span>
                            <span v-else>{{this.dj.name}}</span>
                            
                      </div>
                      <div class="signature" v-if="this.dj.creator!=undefined">{{this.dj.creator.signature}}</div>
                      <div class="tabs" v-if="this.dj==undefined">
                          <span>#独立摇滚</span>
                          <span>#另类摇滚</span>
                      </div>
                        <div class="tabs" v-else>
                          <span v-for="(item,index) in this.dj.tags" :key="index">#{{item}}</span>
                      </div>
                    <div class="Btnbox">
                        <div @click="allplay1" v-if="this.dj==undefined"><span class="iconfont">&#xe630;</span><span>立即播放</span></div>
                        <div @click="allplay2" v-else><span class="iconfont">&#xe630;</span><span>全部播放</span></div>
                        <div><span class="iconfont">&#xe607;</span><span>1314159</span></div>
                        <div><span class="iconfont">&#xe785;</span><span>分享</span></div>
                        <div><span class="iconfont">&#xe608;</span><span>手机试听</span></div>
                    </div>
                  </div>
          </div>
          <slot name="dj">
              
          </slot>
            <pinglun :hotcomment="this.hotcomment" :newcomment="this.newcomment" ></pinglun>
           <!-- <div class="pinglun">
               <div class="pinlutitle">评论</div>
               <el-input type="textarea" placeholder="我来说两句...."
                    v-model="textarea"
                    maxlength="300"
                    show-word-limit
                    :autosize="{ minRows: 4}"
                ></el-input>
                <div class="pinglubtn">评论</div>
           </div>
           <div class="oldpinglun" v-if="this.hotcomment!=undefined">
               <div class="hot">热门评论 <span>{{this.hotcomment.length}}</span></div>
               <div class="pingluitem" v-for="(item,index) in this.hotcomment" :key="index">
                   <div class="usersicon">
                       <img :src="item.user.avatarUrl" alt="">
                   </div>
                   <div class="">
                       <div class="pinglunname">
                           {{item.user.nickname}} <span class="iconfont" style="color:red;font-size:24px">&#xe67c;</span>
                       </div>
                       <div class="pinglundesc">{{item.content}}</div>
                       <div class="pingluntime">    
                           <span>{{item.time}}</span>
                           <span class="iconfont">&#xe68e;</span>
                           <span class="iconfont">&#xe646;<span>{{item.likedCount}}</span></span>
                            <span>更多</span>
                       </div>
                   </div>
               </div>
           </div>
              <div class="newpinglun" v-if="this.hotcomment!=undefined">
               <div class="hot">最新评论 <span>{{this.newcomment.length}}</span></div>
               <div class="pingluitem" v-for="(item,index) in this.newcomment" :key="index">
                   <div class="usersicon">
                       <img :src="item.user.avatarUrl" alt="">
                   </div>
                   <div class="">
                       <div class="pinglunname">
                           {{item.user.nickname}} <span class="iconfont" style="color:red;font-size:24px">&#xe67c;</span>
                       </div>
                       <div class="pinglundesc">{{item.content}}</div>
                       <div class="pingluntime">    
                           <span>{{item.time}}</span>
                           <span class="iconfont">&#xe68e;</span>
                           <span class="iconfont">&#xe646;<span>{{item.likedCount}}</span></span>
                            <span>更多</span>
                       </div>
                   </div>
               </div>
           </div> -->
      </el-main>
 
    </div>
    <div class="a">

    </div>
</el-container>

</template>

<script>
import pinglun from '../../components/MusicDetails/pinlun.vue';// eslint-disable-line no-unused-vars
export default {
    name:'Detailsitem',
    props:{
music:{
    type:Object
},array:{
    type:Object
},
songs:{
    tyep:Array
},
hotcomment:{
    type:Array
},
newcomment:{
    type:Array
},
djmusic:{
    type:Array
},
dj:{
    type:Object
}
    },
    data(){
        return{
            textarea:''
        }
    },
    methods:{
        allplay1(){
                this.$emit('allplay1',this.music)
            },
        allplay2(){
                this.$emit('allplay2')
    }
    },
    components:{
        pinglun
    }
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_3yt7026ban1.eot');
  src: url('//at.alicdn.com/t/font_2223549_3yt7026ban1.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_3yt7026ban1.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_3yt7026ban1.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_3yt7026ban1.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_3yt7026ban1.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.el-container{
    background:#eee ;
    margin: 0 !important;
    padding: 0 !important;
    position: relative;
    margin-bottom: 60px!important;
}
.container{
    width: 1400px;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    height: 100%;
    background: #fff;
}
.djbox{
    display: flex;
    flex-direction: column;
    position: fixed;
    padding: 10px 20px 0 140px;
}
.img{
    width: 200px;
    height: 200px;
  

}
.img img{
    width: 100%;
    height: 100%;
    box-shadow: 0px 2px 10px #ccc; 

}
.djcary{
    margin: left;
    margin: 20px 0;
    color: grey;
    font-size: 14px;
}
.djcary div{
    text-align: left;
    display: flex;
}
.djcary span{
    display: block;
    min-width: 60px;
}
.djcary div:nth-child(2){
   margin: 10px 0;
}
.djcary div span:nth-child(1){
    margin-right: 20px;
}
.djcary div span:nth-child(2){
    color: deepskyblue;
}
.desc{
    display: flex;
    flex-direction: column;
    width: 200px;
    flex-wrap: wrap;
}
.desctitle{
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
}
.djdesc{
    width: 100%;
    text-align: left;
    white-space:inherit;
    font-size: 14px;
    color: grey;
    max-height: 300px;
    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 10; 
    line-height: 20px;
}
.move{
    margin: 10px 0;
    color: deepskyblue;
    font-size: 15px;
    text-align: left;
    
}
.el-main{
    margin-left: 35px;
     margin-right: 150px;
}
.musicname{
    text-align: left;
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
   
  
}
.icon{
    display: flex ;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
  
}
.el-avatar{
    margin: 13px 15px 10px 0;
    
}
.tabs{
    font-size: 14px;
    color: #ff410f;
}
.Btnbox{
    display: flex;
    margin: 20px 0;

}
.Btnbox div{
    min-width: 70px;
    height: 40px;
    border-radius: 30px;
   background: #f2f2f2;
    margin-right: 10px;
    padding: 0 15px;
    font-size: 16px;
    line-height: 40px;
    font-weight: 500;
}
.Btnbox div:nth-child(1){
    background:#ff410f;
    color: #fff;
}
.Btnbox div span:nth-child(1){
    
    padding-right: 8px;
}
.lyricbox{
    width: 100%;
    text-align: left;
    white-space:inherit;
    font-weight: 300;
    color: #4a4a4a;
    height: 350px;
    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; 
    /* -webkit-line-clamp: 30;  */
}
.lyricbox p{
    font-size: 14px;
    margin: 0;
    
}
.slh{
font-size: 24px;
margin: 0;
text-align: left;
color: #4a4a4a;
}
#geici{
    font-size: 24px;
    color: #4a4a4a;
    text-align: left;
    font-weight: 500;
    margin: 25px 0;
}
.movegeci{
    margin-top: 8px;
    font-size: 14px;
    color: #ff410f;
    cursor: pointer;
    text-align: left;
}
.geciitem{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
}
.geciyidong{
    height: auto;
    position: absolute;
}
.xiangsi{
    display: flex;
    flex-direction: column;
}
.xiangsi p{
    text-align: left;
    font-size: 24px;
    font-weight: 500;
    margin: 30px 0;
}
.xiangsige{
    background: #f7f7f7;
    width: 600px;
    padding: 15px 30px;
}
.xiangsiitem{
    display: flex;
    width: 100%;
    align-items: center;
    padding: 5px;
    height: 50px;
    
}
.xiangsiitem img{
    width: 40px;
    height: 40px;
    margin-right: 10px;

}
.xiangsimusic,.xiangsiuser,.xiangsitime{
    height: 100%;
    line-height: 50px;
    flex: 1;
    text-align: left;
    margin-left: 10px;
    font-size: 14px;
}
.xiangsitime{
    text-align: right;
}

/* .a{
    width: 100%;
    height: 300px;
    background: #000;
} */
.main-block{
    width: 100%;
}
.slotdesc{
    height: 300px;
   
}
.signature{
    padding: 10px 0 20px 0;
    font-size: 20px;
}
</style>