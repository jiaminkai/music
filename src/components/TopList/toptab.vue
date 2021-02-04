<template>
  <div class="top">
     <div class="top-row">
        <div span="4" class="toptitle">网易云官方榜</div>
        <div  class="top4">
          <div :class="{'active':index==0}" @click="change(0)">新歌</div>
          <div :class="{'active':index==1}" @click="change(1)">原创</div>
          <div :class="{'active':index==2}" @click="change(2)">飙升</div>
       </div>
     </div>
      <div class="topguan">
          <div class="topguanitem" v-if="this.index==0">
              <div class="imgbox">
                  <div class="img">
                      <img class="img1" :src="this.bendi[0].list[0].al.picUrl" alt="" srcset="">
                      <img  class="img2" :src="this.bendi[0].list[1].al.picUrl" alt="" srcset="">
                      <img class="img3"  :src="this.bendi[0].list[2].al.picUrl" alt="" srcset="">
                  </div>
              </div>
              <div class="imgrigth">
                  <div class="allpaly"><span @click="allmusic(0)">全部播放</span> <span class="move" @click="tomore(0)">详情<div class="iconfont move">&#xe607;</div></span></div>
                  <div class="imglist">
                      <div class="imgitem" v-for="(n,index) in this.bendi[0].list" :key="index" @click="itemmusic(n)">
                          <img :src="n.al.picUrl" alt="">
                          <div class="couindex">{{index+1}}</div>
                          <div class="imgitemnam">{{n.name}}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
     <div class="topguan">
          <div class="topguanitem" v-if="this.index==1">
              <div class="imgbox">
                  <div class="img">
                      <img class="img1" :src="this.bendi[1].list[0].al.picUrl" alt="" srcset="">
                      <img  class="img2" :src="this.bendi[1].list[1].al.picUrl" alt="" srcset="">
                      <img class="img3"  :src="this.bendi[1].list[2].al.picUrl" alt="" srcset="">
                  </div>
              </div>
              <div class="imgrigth">
                  <div class="allpaly"><span @click="allmusic(1)">全部播放</span> <span @click="tomore(1)">详情<div class="iconfont">&#xe607;</div></span></div>
                  <div class="imglist">
                      <div class="imgitem" v-for="(n,index) in this.bendi[1].list" :key="index" @click="itemmusic(n)">
                          <img :src="n.al.picUrl" alt="">
                          <div class="couindex">{{index+1}}</div>
                          <div class="imgitemnam">{{n.name}}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
     <div class="topguan">
          <div class="topguanitem"  v-if="this.index==2">
              <div class="imgbox">
                  <div class="img">
                      <img class="img1" :src="this.bendi[2].list[0].al.picUrl" alt="" srcset="">
                      <img  class="img2" :src="this.bendi[2].list[1].al.picUrl" alt="" srcset="">
                      <img class="img3"  :src="this.bendi[2].list[2].al.picUrl" alt="" srcset="">
                  </div>
              </div>
              <div class="imgrigth">
                  <div class="allpaly" @click="allmusic(2)"><span>全部播放</span> <span @click="tomore(2)">详情<div class="iconfont">&#xe607;</div></span></div>
                  <div class="imglist">
                      <div class="imgitem" v-for="(n,index) in this.bendi[2].list" :key="index" @click="itemmusic(n)">
                          <div class="hovepaly"><span class="el-icon-video-play"></span></div>
                          <img :src="n.al.picUrl" alt="">
                          <div class="couindex">{{index+1}}</div>
                          <div class="imgitemnam">{{n.name}}</div>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </div>
</template>

<script>
import { Song,SingersSong } from "../Singers/Singers";
export default {
    name:'toptab',
    props:{
      toplist:{
        type:Array
      },
      guan:{
        type:Array,
        default:function(){
           return [
            //  {id:0,list:{type:Array,default:function(){return []}}},
            //  {id:1,list:{type:Array,default:function(){return []}}},
            //  {id:2,list:{type:Array,default:function(){return []}}},
           ]
        },
      }
    },
    data(){
      return{
        index:0,
        activeName:'commentThreadId',
        bendi:[]
      }
    },
    watch:{
      
      guan:function(n,o){
       setTimeout(()=>{
          this.bendi = n
       },300)
      }
  },

  
 
    methods:{
      handleClick(val){
        console.log(val )
      },
      change(val){
        console.log(val )
        this.index=val
      },
      tomore(index){
          this.$router.push({
          path:`/TopMusics${this.guan[index].id}`,
          params:this.guan[index].id  
        })
      },
      // allmusic(index){
      //   var a={}
      //   var c =JSON.parse(sessionStorage.getItem('music'))
      //   this.guan[index].list.forEach(item => {
      //     SingersSong(item.id).then(res=>{
      //       item.url=res.data.data[0].url
      //        a= new Song(item)
      //       var ind= c.findIndex((n,index)=>{
      //         item.musicid==a.musicid
      //       })
      //       if(ind==-1){
      //           c.unshift(a)
      //           this.resSetItem('music',JSON.stringify(c))
      //       }else{
      //           this.$sotre.commit('playmusicindex',ind)
      //           this.resSetItem('music',JSON.stringify(c))
      //       }
      //       })
         
      //   });
      // },
      async itemmusic(n){
        console.log(n )
        const {data:data} =await  SingersSong(n.id)
        n.url=data.data[0].url
        n=new Song(n)
        var c =JSON.parse(sessionStorage.getItem('music'))||[]
         var ind= c.findIndex((m)=>{
              n.id==m.musicid
            })
            if(ind==-1){
                c.unshift(n)
                this.resSetItem('music',JSON.stringify(c))
            }else{
                this.$sotre.commit('playmusicindex',ind)
                this.resSetItem('music',JSON.stringify(c))
            }
      }
    },
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 1723175 */
  src: url('//at.alicdn.com/t/font_1723175_bob4w1o1bs.eot');
  src: url('//at.alicdn.com/t/font_1723175_bob4w1o1bs.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1723175_bob4w1o1bs.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1723175_bob4w1o1bs.woff') format('woff'),
  url('//at.alicdn.com/t/font_1723175_bob4w1o1bs.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1723175_bob4w1o1bs.svg#iconfont') format('svg');
}
.top{
  height: 420px;
  padding: 20px;
  margin-bottom: 30px;
      background: linear-gradient(#c5c5c5,#e4e4e4)
}
.couindex{
  font-size: 45px;
  font-weight: 600;
  position: absolute;
  left: 15px;
  top: -4px;
  color: #ccc;
}
.toptitle{
  font-size: 24px;
  font-weight: 500;
  min-width: 120px;
  line-height: 88px;
  margin:  0 40px;
}
.top-row{
  display: flex;
  height: 88px;
}
.top4{
  display: flex;
  
}
.top4 div{
  text-align: center;
  padding: 15px;
  font-size: 18px;
  place-self: center
};
.topguan{
  width: 1200px;
  height: 420px;
}
.topguanitem{
  display: flex;
  flex-direction: row;
  width: 1200px;
  height:100% ;
}
.imgbox{
   width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
   margin: 0 auto;
}
.img{
  height: 250px;
  position: relative;
  transform-style:preserve-3d;
  transform:perspective(500px)

}
.img1,.img2,.img3{  
  width: 250px;
  height: 250px;
  position: absolute;
  left:80px;
}
.img1{
transform: rotateY(25deg) translateX(-10px) translateZ(-140px);
}

.img3{
  transform: rotateY(-25deg) translateX(53px) translateZ(-140px);
}
.imglist{
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

}
.imgrigth{
 flex: 1; 
 height: 100%;
 margin-left: 20px;
}
.imgitem{
  width: 42%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
}

.imgitem img{
  width: 40px;
  height: 40px;
  padding: 0 20px ;
  position: relative;
  z-index: 9;
}
.allpaly{
  flex: 1 ;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
}
.imgitem:nth-child(1),.imgitem:nth-child(2),.imgitem:nth-child(5),.imgitem:nth-child(6){
  background:#e3e3e3 ;
}
.imgitem:nth-child(3),.imgitem:nth-child(4),.imgitem:nth-child(7),.imgitem:nth-child(8){
  background:#efefef ;
}
.move{
  line-height: 40px;
  align-items: center;
  margin: 0 10px ;
}
.allpaly span{
  display: block;
}
.allpaly span:nth-child(1){
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  background: #ff410f;
  color: #fff;
  border-radius: 20px;
}
.allpaly span:nth-child(2){
 display: flex;
}
.active{
  color:lightsalmon;
  font-weight: 500;
  border-bottom: lightsalmon 2px solid;
}
</style>