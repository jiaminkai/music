<template>
    <div class="top">
        <div class="container">
              <swiper  :swipe="swipe"></swiper>
        </div>
            <tui-music :tuijian="tuijianmusic"/>
            <only-one :only="only"/>
            <new-music :newmusic="newmusic" @palynewmusic="palynewmusic"/>
    </div>
</template>

<script>
import Swiper from '../components/home/swipe.vue'
import TuiMusic from '../components/home/TuiJianMusic.vue'
import OnlyOne from '../components/home/OnlyOne.vue'
import NewMusic from '../components/home/NewMusic.vue'
import {Home,Subcount,LikeMusic,GetMusic,GetMusicDetails,Music} from '../components/home/home'// eslint-disable-line no-unused-vars
import {Login,LoginDetail} from '../components/login/login'// eslint-disable-line no-unused-vars
export default {
  name: 'Home',
  data(){
    return{ 
      swipe:[],
      music:{},
      tuijianmusic:[],
      only:[],
      newmusic:[],
      uesrId:'',

    }
  },
  components: {
    Swiper,
    TuiMusic,
    OnlyOne,
    NewMusic,

  },

  methods:{
   
    // 播放新歌
  
  async  palynewmusic(val){
      var music = JSON.parse(sessionStorage.getItem('music'))
         await this.getmusic(val.id).then(res=>{
           console.log("播放新歌",res )
           res[0].picUrl=val.picUrl
            if(music==null){
              music=[]
            }
              music.unshift(res[0])
         })
        this.resetSetItem('music', JSON.stringify(music));
    },
    // 获取音乐
    async getmusic(id){
        var array=[]
        const {data:data} =await GetMusic(id)
        const {data:ndata} =await GetMusicDetails(id)
        for(var i =0 ;i<ndata.songs.length;i++){
            var c = new Music(ndata.songs[i],data.data[i].url)
            array.push(c)
        }
        return array
    },

    // 获取用户歌单
    async getuserSub(id,cookie){
        const {data:data} =await Subcount(id,cookie)
        console.log("usersub",data)
    },
    // 关闭登录弹框
    handleClose(){
      this.islogin =false
    },
    // 获取首页轮播图
   async getdata(){
       const res= await Home('/banner')
       console.log("lunbu", res.data.banners)
       this.swipe=res.data.banners
    },
    // 获取推荐数据
    async gettuijian(){
       const music= await Home('/personalized')
      //  console.log( music.data.result)
       this.tuijianmusic=music.data.result
       this.tuijianmusic.forEach(function(item){
        item.playCount=  parseInt(item.playCount)/10000>0 ? (parseInt(item.playCount)/10000).toFixed(1)+'万' : parseInt(item.playCount)/1000>0 ? (parseInt(item.playCount)/1000).toFixed(1)+'千':parseInt(item.playCount)
        
        // console.log( item.playCount )
           
      })
    },
    // 获取独家数据
    async getonlyone(){
    const music= await Home('/personalized/privatecontent')

    this.only=music.data.result
  },
  // 获取心音乐数据
    async getnewmusic(){
    const music= await Home('/personalized/newsong')
    console.log( music.data.result)
    
    this.newmusic=music.data.result
    this.newmusic.forEach(item=>{
     
      item.song.bMusic.playTime= (item.song.bMusic.playTime/1000/60<10? "0"+Math.floor(item.song.bMusic.playTime/1000/60) : Math.floor(item.song.bMusic.playTime/1000/60))+":"+(item.song.bMusic.playTime/1000%60<10?"0" +Math.floor(item.song.bMusic.playTime/1000%60):Math.floor(item.song.bMusic.playTime/1000%60))
    })
  },
    handleClick(val){
      console.log(val )
    }
    
    
  },
  created(){
    this.getdata()
    this.gettuijian()
    this.getonlyone()
    this.getnewmusic()
  }
}

</script>
    
<style scoped>

.top{
  margin-top: 30px;
}
.container{
  width: 1200px;
  margin: 0 auto;
} 
</style>