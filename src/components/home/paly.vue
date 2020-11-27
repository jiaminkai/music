<template>
    <div class="palybox">
        <img class="icon" :src="like[this.i].picUrl" alt="">
        <div class="musictitle">
            <div class="name"><span >{{like[this.i].musicname }}</span>  - <span>{{ like[this.i].user}}</span></div>
            <div class="time">
                {{starttime}} / {{endtime}}
            </div>
        </div>
         <audio  :src="like[this.i].url"  @canplay="getDuration"   @timeupdate="updateTime()"  ref="audio"/>
         <div class="audio">
                <span class="iconfont" @click="upone">&#xe637;</span>
                <span v-if="this.ispaly" class="iconfont" @click="playmusic">&#xe768;</span>
                <span v-else class="iconfont" @click="pausemusic">&#xe606;</span>
                <span class="iconfont" @click="next">&#xe600;</span>
         </div>
         <div class="right">
            <span class="iconfont">&#xe61c;</span>
            <el-slider v-model="value3" :show-tooltip="false"></el-slider>
         </div>
         <div class="ci">
                <span class="iconfont" v-if="type==1" @click="change">&#xe66c;</span>
                <span class="iconfont" v-if="type==2"  @click="change">&#xe613;</span>
                <span class="iconfont" v-if="type==3"  @click="change">&#xe622;</span>
                <span  class="iconfont" @click="geci(like[i])">&#xe727;</span>
                <span class="iconfont" @click="opendrawer">&#xe636;</span>
         </div>

    </div>
</template>

<script>
export default {
    name:'Play',
    props:{
        like:Array
    },
    data(){
        return{
            value3:43,
            endtime:'',
            starttime:'00:00',
            ispaly:true,
            i:0,
            isone:true,
            type:1,
            drawer:false
         
        }
    }
    ,
    mounted(){
        window.addEventListener("timeupdate",this.updateTime)
    },
    destroyed(){
        window.removeEventListener("timeupdate",this.updateTime)
    },
    methods:{
        geci(val){
            this.$emit("godetails",val)
        },

        opendrawer(){
            console.log("open" )
            this.$emit("opend",!this.drawer)
        },
        // 上一首
        upone(){
            if(this.i==0){
                this.i=this.like.length-1
            }else{
                this.i=this.i-1
            }
        },
        // 下一首
        next(){
            if(this.type==1){
                if(this.i==this.like.length-1){
                    
                    this.i=0
                }else{
                    this.i=this.i+1
                }
            }
            if(this.type==2){
                this.i=this.i+0
            }
            if(this.type==3){
                this.i=Math.ceil(Math.random()*this.like.length-1)
            }
            this.$emit("timeup",0)
        },

        // 播放方式
        change(){
            if(this.type==3){
                this.type=1
            }else{
                this.type+=1
            }
            switch (this.type){
                case 1 :console.log("按序播放" )
                break;
                case 2 : console.log("单曲播放" )
                break;
                case 3:console.log("随机播放" )
            }
        },
        // 监听播放时长
          updateTime() {
            var m =Math.ceil(parseInt(this.$refs.audio.currentTime/60))
            var s =Math.ceil(parseInt(this.$refs.audio.currentTime%60))
            if(m<10){ m='0'+m}
            if(s<10){ s='0'+s}
            console.log(m+':'+s )
            this.starttime=m+':'+s
            this.$emit("timeup",this.$refs.audio.currentTime/this.$refs.audio.duration)
            if(this.$refs.audio.currentTime/this.$refs.audio.duration==1){
                this.next()
            }
            this.$bus.$emit('name',this.starttime)
    },
        // 播放
        playmusic(){
            console.log("播放音乐" )
            this.$refs.audio.play()
            this.ispaly=false
          
        },
        // 暂停音乐
        pausemusic(){
            console.log("停止播放" )
            this.$refs.audio.pause()
            this.ispaly=true
        },

        
    // 获取播放时长
    getDuration() {
      var m =Math.ceil(parseInt(this.$refs.audio.duration/60))
      var s =Math.ceil(parseInt(this.$refs.audio.duration%60))
      if(m<10){ m='0'+m}
      if(s<10){ s='0'+s}
      console.log(m+':'+s )
        this.endtime =m+':'+s
    },
    
    },

}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_48kdtz68pjr.eot');
  src: url('//at.alicdn.com/t/font_2223549_48kdtz68pjr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_48kdtz68pjr.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_48kdtz68pjr.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_48kdtz68pjr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_48kdtz68pjr.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.palybox{

    display: flex;
    width: 100%;
    height: auto;
    padding: 5px 20px;
}
.icon{
    width: 45px;
    height: 45px;
    margin-right: 20px;
    /* border: 1px solid aqua; */
}
.musictitle{
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 12px;
    color: #cacaca;
}
.name{
    font-size: 12px;
    color: #cacaca;
}
.name span:nth-child(1){
    color: #000;
}
.audio {
    min-width: 480px;
    height: 45px;
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;

}
.audio span{
    display: block;
    place-self: center;
    font-size: 35px;
    border-radius: 20%;
      
}

.audio span:nth-child(2){
    margin: 0 40px;
      
}
.audio span:hover{
    box-shadow:  1px 2px 5px #cccccc;
}
.right{
    width: 250px;
    height: 45px;
    margin: right;
    display: flex;
    align-items: center;
   
    /* position: relative;
    left: -100px; */
}
.right span{
    display: block;
    width: 30px;
    height: 30px;
    margin-top: 10px;
}
.el-slider{
width: 150px;
}
.ci{
    width: 240px;
    margin: right;
    height: 45px;
    display: flex;
    justify-content: space-evenly;
  
}
.ci span{
    display: block;
    place-self: center;
    font-size: 25px;
}
.el-drawer{
    position: relative;
    z-index: 33;
    background: #fff;
}
</style>