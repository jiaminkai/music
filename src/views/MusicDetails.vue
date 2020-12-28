<template>
   
<musicitem :music="this.music" :newcomment="newcomment" :array="array" :songs="songs" :palytime="palytime" :hotcomment="hotcomment">
      
       <div slot="dj">
                 <div class="lyricbox" :style="{height:this.height}">
                        <p id="geici">歌词</p>
                        <p v-for="(item,index) in this.array.lyric" :key="index">{{item}}</p>
                </div>
                <p class="slh" v-if="this.ismove">.....</p>
                <div class="movegeci">
                    <span  v-if="this.ismove" @click="showmove">更多<span class="iconfont">&#xe601;</span></span>
                    <span v-else @click="hiedmove">收齐<span  class="iconfont">&#xe603;</span></span>
                </div>
                <div class="xiangsibox">
                    <div class="xiangsi">
                    <p>相似歌曲</p>
                    <div class="xiangsige">
                            <div class="xiangsiitem" v-for="(item,index) in this.songs" :key="index">
                                <img :src="item.album.picUrl" alt="">
                                <div class="xiangsimusic">{{item.name}}</div>
                                <div class="xiangsiuser">{{item.artists[0].name}}</div>
                                <div class="xiangsitime">{{item.bMusic.playTime}}</div>
                                <audio :src="item.mp3Url"></audio>
                            </div>
                    </div>
                </div>
                </div>
       </div>
       <div slot="djcary">
             <div class="djcary">
                  <div><span>所属专辑</span><span>{{this.array.djname}}</span></div>
                  <div><span>作词</span><span>{{this.array.user}}</span></div>
                  <div><span>作曲</span><span>{{this.array.user}}</span></div>
             </div>
       </div>
</musicitem>

</template>

<script>
import {Musics,GetComment,GetAlbum,GetDetails,GetLyric,GetSong,GetHotComment} from '../components/MusicDetails/details';// eslint-disable-line no-unused-vars
import Musicitem from "../components/MusicDetails/Musicitem.vue";
import {Music,GetMusic} from '../components/home/home'
export default {
    name:'Details',
    data(){
        return{
            music:{},
            array:{},
            palytime:'',
            songs:[],
            hotcomment:[],
            newcomment:[],
            ismove:true,
            height:'350px'

        }
    },
    components:{
        Musicitem
    },
    mounted(){
        this.$bus.$on('name',(value)=>{
            console.log(value )
            this.palytime=value
        })
    },

    methods:{
    // 展开歌词
    showmove(){
        this.ismove =false
        this.height='auto'
    },
    // 折叠歌词
    hiedmove(){
        this.ismove =true
        this.height='350px'
    },

     async getsong(){
        const {data:data} = await GetSong(this.music.musicid)
        console.log("相似",data )
        this.songs=data.songs
            this.songs.forEach(item=>{
                var c= Math.floor(item.bMusic.playTime/1000/60)
                var b=Math.floor(item.bMusic.playTime/1000%60)
                if(c<10){c='0'+c}
                if(b<10){b='0'+b}
                    item.bMusic.playTime= c+':'+b
            })
        
      },
    //   直接重搜索跳转到详情
      async geimus(id){
          console.log(id )
           const {data:list} = await GetDetails(id)
           const {data:url} = await GetMusic(id)
            console.log(list,url )
            this.music = new Music(list.songs[0],url.data[0].url)
            this.getmusic()
      },

      async  getmusic(){
          console.log(this.music)
            const {data:list} = await GetDetails(this.music.musicid)// eslint-disable-line no-unused-vars
            const {data:alcum}  = await GetAlbum(this.music.djid)
            const {data:comment}  = await GetComment(this.music.musicid)
            const {data:Lyric}  = await GetLyric(this.music.musicid) 
            const {data:hotcomment}  = await GetHotComment(this.music.musicid)
            console.log( comment)
            this.hotcomment=hotcomment.hotComments
            this.newcomment=comment.data.comments
            this.hotcomment.forEach(item=>{
                item.time=new Date(item.time).toLocaleDateString().replace(/\//g,"-")
            })
             this.newcomment.forEach(item=>{
                item.time=new Date(item.time).toLocaleDateString().replace(/\//g,"-")
            })
            this.array =new Musics(list.songs[0],alcum,comment,Lyric)
            var c =this.array.lyric.replace(/\[.*?\]/g,'')
            var snsArr=c.split(/[(\r\n)\r\n]+/);
            snsArr.forEach((item,index)=>{
                if(!item){
                    snsArr.splice(index,1);//删除空项
                }
            })
            // console.log(typeof(snsArr),snsArr )
            this.array.lyric =snsArr
        }
    },
    created(){
       this.music= this.$route.query
       if(this.$route.query.id!=undefined){
           this.geimus(this.$route.query.id)
       }else{
         this.getmusic( this.music)
        this.getsong()
       }



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
.xiangsibox{
    display: flex;
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
    width: 500px;
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
.pinglun{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 80px;
    position: relative;
}
.pinlutitle{
     text-align: left;
    font-size: 24px;
    font-weight: 500;
    margin: 40px 0 30px 0;
}

.pinglubtn  {
    display: block;
    width: 100px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    background: #ff410f;
    border-radius: 30px;
    margin:20px  0 30px 0;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
}
.oldpinglun,.newpinglun{
    text-align: left;
    display: flex;
    flex-direction: column;
    font-size: 14px;
   
}
.newpinglun{
    margin-top: 40px;
}
.hot{
    font-size: 16px ;
    margin: 15px 0;
    font-weight: 500;
    color: #4a4a4a;
}
.pingluitem{
    margin: 10px 0;
    display: flex;
    box-shadow: 0 1px 0 0 #ededed;
    padding-bottom: 20px;
    
}
.pinglundesc{
    width: 280px;
    margin: 10px 0;
    line-height: 22px;
    white-space:inherit
}
.pinglundesc ,.pingluntime{
     color: #999;
    
}
.pingluntime span{
    margin-right: 30px;
    font-size: 16px;
}
.usersicon{
    width: 40px;
    min-height: 110px;
    margin-right: 20px;
}
.usersicon img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
/* .a{
    width: 100%;
    height: 300px;
    background: #000;
} */
.main-block{
    width: 100%;
}
.desc{
    height: 300px;

}
</style>