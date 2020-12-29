<template>
    <div class="foot" >
        <el-progress :show-text="false" :percentage="percentage" color="#FFC125"></el-progress>
        <div class="palybox" >
            <img  @click="geci(like[i])" class="icon" :src="like[this.i].picUrl" alt="">
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
                <span  class="iconfont" @click="gecishow(like[i])">&#xe727;</span>
                <span class="iconfont" @click="opendrawer">&#xe636;</span>
         </div>
         <!-- 播放歌单 -->
        <el-drawer
            title="播放历史"
            :visible.sync="drawers"
            :modal="false"
            size="450px"
            :with-header="false">
            <div class="top">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="正在播放" name="first">
                        <template>
                            <el-table
                                :data="like" 
                                :show-header="false"
                                height="450px"
                                @row-click="onplay"
                                @cell-mouse-enter="hoveraction"
                                @cell-mouse-leave="hoverleave"
                                :key="itemkey"
                            >
                                        <el-table-column
                                            width="50"
                                            prop="isonplay"
                                            >
                                            <template slot-scope="scope">
                                                <span v-if="!scope.row.isonplay"  >{{scope.row.courrindex}}</span>
                                                <!-- <span  v-else class="iconfont">&#xe61c;</span> -->
                                                <span v-else class="iconfont">&#xe768;</span>
                                            </template>
                                            
                                        </el-table-column>
                                <el-table-column 
                                    property="musicname"
                                    min-width="140"
                                >
                                </el-table-column>
                                <el-table-column 
                                    property="user"
                                    width="100"
                                >
                                </el-table-column>
                                <el-table-column 
                                    width="80"
                                    prop="hover"
                                >
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.hover" >
                                        <span class="iconfont" >&#xe607;</span>
                                        <span class="iconfont" style="margin-left:10px">&#xe674;</span>
                                        </div>
                                    
                                        <span v-else>{{scope.row.playtime}}</span>
                                    </template>
                                </el-table-column>
                                
                            </el-table>
                        </template>
                </el-tab-pane>
                <el-tab-pane label="播放历史" name="second">播放历史</el-tab-pane>
                </el-tabs>
            </div>
            <div class="bottom">
                <div>共{{this.like.length}}首</div>
                <div>
                    <span>编辑列表</span>
                    <span>清空</span>
                </div>
            </div>

        </el-drawer>
        <!-- 歌词 -->
        <el-drawer
            title="歌词"
            :visible.sync="drawergeci"
            :modal="false"
            size="600px"
            :with-header="false">
                <div class="top">
                    <div class="geciname"><span>歌词</span> <span class="iconfont" @click="conle">&#xe701;</span></div>
                </div>
                <div class="lyricshowbox">
                <div class="gecibox" >
                    <p v-for="(item,index) in this.lyric" :key="index">{{item.text}}</p>
                </div>
                <!-- <div class="gecibox" v-else>
                    <p > 暂无歌词</p>
                </div> -->
                </div>
            <div class="bottom">
                <div>翻译</div>
                <div>
                    <span>歌词纠正</span>
                </div>
            </div>

        </el-drawer>
        </div>
    </div>
</template>

<script>
import { GetLyric } from "../MusicDetails/details";
export default {
    name:'Play',
    data(){
        return{
            value3:43,
            endtime:'',
            starttime:'00:00',
            ispaly:true,
            itemkey:'',
            percentage:0,
            i:0,
            isone:true,
            type:1,
            drawers:false,
            activeName:'first',
            drawergeci:false,
            lyric:[],
            like:[]
        }
    },
    mounted(){
        window.addEventListener("timeupdate",this.updateTime)
        this.$bus.$on('plays',this.playmusic)
        this.$bus.$on('playmnue',(val)=>{
            this.i=val
            this.playmusic
        })

        
    },
    // 获取处理歌词
    destroyed(){
        window.removeEventListener("timeupdate",this.updateTime)
    },
    methods:{
    // 歌词展示
    async gecishow(val){
        console.log(val.musicid)
        this.lyric=[]
        const {data:Lyric}  = await GetLyric(val.musicid) 
        console.log("歌词",Lyric)
        if(Lyric.lrc==undefined){
            this.lyric=[]
            console.log("歌词清空" )
        }else{
            this.formatLyric(Lyric.lrc.lyric)
        }
        this.drawergeci=true
    },
    formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach(element => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
       //把歌词提交到store里，为了重新进入该组件时还能再次渲染
       console.log(this.lyric )
    },
    conle(){
      this.drawergeci=false
    },
    sortRule(a, b) { //设置一下排序规则
      return a.time - b.time;
    },
//  鼠标移入表格行事件
    hoveraction(row,event,column){
      row.hover=true
        row.isonplay=true

    },
//  鼠标移出表格行事件
    hoverleave(row,event,column){
        row.hover=false
      row.isonplay=false

     

    },
    // 播放目录中的音乐
    onplay(row,event,column){
      console.log(row.userId,event,column)
      var a =this.like.findIndex(item => {
        return item.userId==row.userId
      })
      this.i=a
    },
    // 跳转歌曲详情页
    geci(val){
      this.$router.push({
        path: '/details',
        query:val
      })
    },
    handleClick(val){
        console.log(val )
    },

    opendrawer(){
        console.log("open")
        this.drawers=!this.drawers
    },
    // 上一首
    upone(){
        if(this.i==0){
            this.i=this.like.length-1
        }else{
            this.i=this.i-1
        }
         this.playmusic()
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
         this.playmusic()
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
        var val =this.$refs.audio.currentTime/this.$refs.audio.duration
        if(Number.isNaN(parseFloat(val*100))){
            this.percentage=0
            console.log(this.percentage)
        }else{
            this.percentage=parseFloat(val*100)
            console.log(this.percentage)
        }
        this.$emit("timeup",val)
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
        this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.play()
        }
      })
        
    },
    // 暂停音乐
    pausemusic(){
        console.log("停止播放" )
        this.ispaly=true
        this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.pause()
        }
      })
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
    created(){
        this.like= JSON.parse(sessionStorage.getItem('music'))
        window.addEventListener('setItem', ()=> {
            var c =JSON.parse(sessionStorage.getItem('music'))
            c.forEach((item,index)=>{
                item.courrindex=index+1
                item.hover =false
                item.isonplay=false
            })
            this.like = c
            this.$set(this.like,c)
            console.log("監聽到了" )   
            this.$forceUpdate();
            this.playmusic()
        })

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
.foot{
    height: 70px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 2px 4px #cccccc;
    padding: 0!important;
    position: fixed;
    bottom: 0 ;
    display: flex;
    flex-direction: column;
    z-index: 99999;
}

.time{
    text-align: left;
}
.palybox{
    position: fixed;
    display: flex;
    width: 100%;
    height: auto;
    padding: 5px 20px;
    position: fixed;
    z-index: 9;
}
.el-progress{
    width: 100%;
    position: absolute;
    top: -6px;
}
.el-progress-bar__outer{
  height: 3px;
}
.icon{
    width: 45px;
    height: 45px;
    margin: 0 20px ;
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


.el-drawer{
  height: 60% !important;
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  bottom: 60px !important;
  top: auto!important;
  right: 20px !important;
  padding: 20px 30px;
  background: #fff;
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