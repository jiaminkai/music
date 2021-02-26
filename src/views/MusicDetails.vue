<template>
<div>
     <musicitem :music="this.music" @allplay1="allplay1" @musicsub="musicsub" :newcomment="newcomment" :array="array" :songs="songs" :palytime="palytime" :hotcomment="hotcomment" v-loading="loading" >
      
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
                    <div class="xiangsige" >
                            <div class="xiangsiitem" v-for="(item,index) in this.songs" :key="index" @click="submusic(item)">
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
    <el-dialog
        title="添加到歌单"
        :visible.sync="dialogVisible"
        width="25%"
        :before-close="handleClose"
        center
        :modal="false"
        top="25vh"
        >
        <div class="submusicbox">
            <div class="adddj" @click="addnewplay">
                <span class="el-icon-circle-plus-outline addicon"></span>
                <span >新歌单</span>
            </div>
            <div class="palylist">
                <div class="palyitem" @click="addpaly(item.id)" v-for="(item,index) in this.playlist" :key="index">
                    <img :src="item.coverImgUrl" alt="">
                    <div class="listname">
                        <div class="">{{item.name}}</div>
                        <div class="">{{item.trackCount}}首</div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
        <el-dialog
        title="新建歌单"
        :visible.sync="dialogVisible2"
        width="25%"
        :before-close="handleClose"
        center
        :modal="false"
        top="25vh"
        >
        <div class="newpaly">
           <div class="newplayname">
                <span>歌单名：</span>
                <input  placeholder="输入歌单名" v-model="input1">
           </div>
           <span class="newdesc">可通过“收藏”将音乐添加到新歌单中</span>
           <div class="buttongroud">
               <div class="newcreat" @click="creatplay">新建</div>
               <div class="newdel" @click="handleClose">取消</div>

           </div>
        </div>
    </el-dialog>
</div>
   

</template>

<script>
import {Musics,GetComment,GetAlbum,GetDetails,GetLyric,GetSong,GetHotComment,ChangePlay,CreatePlay} from '../components/MusicDetails/details';// eslint-disable-line no-unused-vars
import Musicitem from "../components/MusicDetails/Musicitem.vue";
import {Music,GetMusic,SubMusic,Subcount} from '../components/home/home'
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
            height:'350px',
            loading:true,
            dialogVisible:false,
            dialogVisible2:true,
            playlist:[],
            input1:""
        }
    },
    components:{
        Musicitem
    },
    mounted(){
        this.$bus.$on('sendmessang',()=>{
            console.log("监听到了评论变化")
            this.getmusic() 
        })
        this.$bus.$on('name',(value)=>{
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
        // 获取相似歌曲
        async getsong(id){
            const {data:data} = await GetSong(id)
            console.log("相似",data )
            this.songs=data.songs
                this.songs.forEach(item=>{
                    item.bMusic.playTime= this.$musictime(item.bMusic.playTime)
                    GetMusic(item.id).then((res)=>{
                        item.url =res.data.data[0].url
                    })
                })
            
        },
        //收藏歌曲
            async  musicsub(){
            console.log("收藏歌曲")
            let login = JSON.parse(sessionStorage.getItem("loginchange"))||null;
            if(login==null){
                this.$toast("请先登录")
                return
            }else{
                this.UserDj(login.userId) 
            }
            this.dialogVisible=true;
            // this.UserDj()
        },
        //   播放相关音乐
        submusic(item){
            var musicitem=new SubMusic(item)
            this.allplay1(musicitem)
        },
        //获取用户的歌单
        async UserDj(id){
            const {data:data} = await Subcount(id)
            console.log("用户歌单",data)
            this.playlist=data.playlist
            this.$set(this,'playlist',data.playlist)
        },
        //   直接从搜索跳转到详情
        async geimus(id){
            if(typeof(id)=="object"){
                console.log(id.musicid )
                id = id.musicid
            }
            console.log(id )
            const {data:list} = await GetDetails(id)
            const {data:url} = await GetMusic(id)
            console.log("歌曲详情",list )
        list.songs[0].dt= this.$musictime(list.songs[0].dt)
            this.music = new Music(list.songs[0],url.data[0].url)
            this.getmusic()
        },
            // 获取音乐详情信息
        async  getmusic(){
                const {data:list} = await GetDetails(this.music.musicid)// eslint-disable-line no-unused-vars
                const {data:alcum}  = await GetAlbum(this.music.djid)
                const {data:comment}  = await GetComment(this.music.musicid)
                const {data:Lyric}  = await GetLyric(this.music.musicid) 
                const {data:hotcomment}  = await GetHotComment(this.music.musicid)
            
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
                this.array.lyric =snsArr
            },
            // 播放音乐
        allplay1(val){
            console.log("a",val )
            var c =JSON.parse(sessionStorage.getItem('music'))
            var ind= c.findIndex((item,index)=>{
                return item.musicid==val.musicid
            })
            console.log("index",ind)
            if(ind==-1){
                c.unshift(val)
                this.resSetItem('music',JSON.stringify(c))
            }else{
                console.log("bbb" )
                this.$bus.$emit('playmnue',ind)
            }
        }   ,
        //关闭添加歌单
        handleClose(){
            this.dialogVisible=false
            this.dialogVisible2=false
        }  ,
        //添加歌曲到歌单
        async addpaly(id){
            try{
                const {data:data} =await ChangePlay("add",id,this.music.musicid)
                console.log("添加音乐",data)
                if(data.status==200){
                    if(data.body.code==502){
                        this.$toast("歌单内歌曲重复","warning")
                        this.dialogVisible=false
                    }
                    if(data.body.code==200){
                        this.$toast("添加歌单成功","success")
                        this.dialogVisible=false
                    }
                }
            }catch(Exception){
                this.$toast("添加歌曲报错","danger")
                this.dialogVisible=false
                console.log(Exception)
            }
        },
        //打开新建歌单
        addnewplay(){
            this.dialogVisible=false;
            this.dialogVisible2 = true;
        },
        //创建歌单
        async creatplay(){
            if(this.input1==""){
                this.$message.error("请输入歌单名称")
                return;
            }else{
                const {data:data} = await CreatePlay(this.input1)
                console.log("创建歌单",data)
                    if(data.code==200){
                        this.$message.success("创建歌单成功")
                        this.addpaly(data.id)
                        this.handleClose() 
                    }
            }
        }
    },
  
    created(){
       this.music= this.$route.query
       if(this.$route.query.id!=undefined){
           Promise.all([this.geimus(this.$route.query.id),this.getsong(this.$route.query.id)]).then(() => this.loading=false)
       }else{
           Promise.all([this.geimus(this.music),this.getsong(this.music.musicid)]).then(() => this.loading=false)
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
>>>.el-dialog .el-dialog__title{
    color: #fff;
}
>>>.el-dialog .el-dialog__header{
    background:#000
}
>>>.el-dialog .el-dialog__body{
    padding:0
}
.adddj{
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 12px;
    padding-left: 30px;
    box-sizing: border-box;
    display: flex;
    background:#e6e6e6;
    box-shadow: 1px 2px 5px #ccc;
}
.addicon{
    font-size: 35px;
    place-self: center;
}
.palylist{
    padding-bottom: 70px;
}
.palyitem{
    display:flex;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 8px 0 8px 30px;
}
.listname{
    display: flex;
    flex-direction:column;
    font-size: 12px;
}
.palyitem img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
}
.newpaly{
    padding: 20px;
    display: flex;
    flex-direction: column;
    
}
.newplayname{
    width: 80%;
    height:30px;
    display: flex;
}
.newplayname input{
    height:25px;
    width:210px;
    outline: none;
}
.newplayname span{
    font-size: 14px;
    width:60px;
    line-height: 40px;
}
.newdesc{
    margin: 25px  0 20px 59px;
}
.buttongroud{
    display: flex;
    padding-left: 58px;
}
.newcreat,.newdel{
    width:80px;
    height:30px;
    font-size:13px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
}
.newcreat{
    background: #0c73c2;
    color: #fff;
    margin-right: 30px;
}
.newdel{
    background: #ccc
}
</style>