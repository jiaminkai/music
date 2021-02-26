<template>
        <div id="nav">
            <div class="navtab">
                <div class="logo">
                    <img src="../../assets/logoblack.png" alt="">
                </div>
                <ul id="nav-ul">
                    <li :class="[this.$store.state.navmenu=='/'?'activenav':'']" @click="to('/')" ><el-link :underline="false"  >发现音乐</el-link></li>
                    <li :class="[this.$store.state.navmenu=='/Top'?'activenav':'']" @click="to('/Top')"><el-link :underline="false"  >排行榜</el-link></li>
                    <li :class="[this.$store.state.navmenu=='/Song'?'activenav':'']" @click="to('/Song')"><el-link :underline="false"  >歌单</el-link></li>
                    <li :class="[this.$store.state.navmenu=='/Singers'?'activenav':'']" @click="to('/Singers')"><el-link :underline="false"  >歌手</el-link></li>
                    <li :class="[this.$store.state.navmenu=='/MV'?'activenav':'']" @click="to('/MV')"><el-link :underline="false" >MV</el-link></li>
                    <li :class="[this.$store.state.navmenu=='/Dt'?'activenav':'']" @click="to('/Dt')"><el-link :underline="false" >电台</el-link></li>
                    <!-- <li :class="[this.$store.state.navmenu=='/YunCun'?'activenav':'']" @click="to('/YunCun')"><el-link :underline="false" >云村</el-link></li> -->


                </ul>
                <div class="inputbox">
                    <el-button class="search" circle icon="el-icon-search" @click="change" />
                    <input class="input" v-model="input" @input="keychange" @keyup.enter="change" @click="folthinput" :style="{ width: width+'px', borderBottom: '#ccc solid '+this.a+'px'  }"  placeholder="请输入查找内容"/>
                    <div class="hotserach_pos" v-if="this.ishotserch">
                        <div class="hotserach" v-if="this.result.isactive" >
                            <div class="hotserach_title">热门搜索</div>
                            <div class="searchList" @click="tomusic(item.searchWord)" v-for="(item,index) in this.hotsearch" :key="index">
                                <div class="searchindex">{{index+1}}</div>
                                <div class="searchitem">
                                    <div>{{item.searchWord}}</div>
                                    <div>{{item.content}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="searchkey">
                                <div class="searchkey_title" >搜索{{this.input}}结果>></div>

                                <div class="search_item" v-if="this.result.artists">
                                    <div class="searchkey_left">
                                        <i class="el-icon-user">歌手</i>
                                    </div>
                                    <div class="searchkey_right">
                                        <span @click="toartists(item)" v-for="(item,index) in this.result.artists" :key="index">{{item.name}}</span>
                                    </div>
                                </div>
                                <div class="search_item" v-if="this.result.songs">
                                    <div class="searchkey_left">
                                        <i class="el-icon-mic">单曲</i>
                                    </div>
                                    <div class="searchkey_right">
                                        <span @click="tosongs(item)" v-for="(item,index) in this.result.songs" :key="index">{{item.name}}</span>
                                    </div>
                                </div>
                                <div class="search_item" v-if="this.result.albums">
                                    <div class="searchkey_left">
                                        <i class="el-icon-video-play">专辑</i>
                                    </div>
                                    <div class="searchkey_right dandu">
                                        <span @click="toalbums(item)" v-for="(item,index) in this.result.albums" :key="index">{{item.name}}-{{item.artist.name}}</span>
                                    </div>
                                </div>
                                <div class="search_item" v-if="this.result.playlists">
                                    <div class="searchkey_left">
                                        <i class="el-icon-tickets">歌单</i>
                                    </div>
                                    <div class="searchkey_right">
                                        <span @click="toplaylists(item)" v-for="(item,index) in this.result.playlists" :key="index">{{item.name}}</span>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                <div class="navuser"  >
                    <el-button v-if="!this.loginuser" class="button" @click="login">登录</el-button>
                    <div v-else class="usericon" >
                        <img :src="this.loginuser.avatarUrl" alt="" srcset="" >
                        <el-dropdown @command="handleCommand" v-if="this.loginuser">
                            <span class="el-dropdown-link">
                                {{this.loginuser.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-plus" command="a">管理个人信息</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-circle-plus" command="b">我的音乐</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-circle-plus-outline" command="c">我的消息</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-check" command="d">我的动态</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-circle-check" command="e">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div v-if="this.ishotserch" class="mengban" @click="cloce">

                </div>

            </div>

        </div>
</template>

<script>
import {HotSearch} from '../home/home';
import { Logout } from "../login/login";
import { SearchKey } from "../serach/Search";

export default {
   
 name:'NavMenu',
 data(){
     return{
         loginuser:{},
         width:130,
         a:1,
         ishotserch:false,
         hotsearch:[],
         result:{
             isactive:true,
         },
         uesrId:'',
         input:'',
         Times:''
     }
 },
 computed:{
    logins() {
        return this.$store.state.loginchange;
      },

 },
 watch:{
    logins: function (old,newd){
        console.log(old)
          this.loginuser = old;
    },
        

 },
 methods:{
     login(){
         this.$router.replace('/login')
     },
     //热门搜索
     async getHotsearch(){
         const{data:data} =await HotSearch()
         this.hotsearch =data.data
     },
    //  输入框
    folthinput(){
        this.width=240;
        this.a=2
        this.ishotserch=true
    },
    cloce(){
        this.width=130;
        this.a=1
        this.ishotserch=false
    } ,       
     // 跳转到登录后的主页
    async handleCommand(command) {
       
        if(command=="b"){
            this.tomy();
            return ;
        }
        if(command=="d"){
            this.$router.push({
            path:'/Event',
            params:{id:this.loginuser.userId}

        })

        return ;
        }
        if(command=="e"){
            const {data:data } =await Logout()
            console.log("退出登录",data )
            sessionStorage.clear('')
            this.$forceUpdate()
            this.$router.replace('/login')
             return ;
        }
        this.$message("暂未开发") 
      },
    tomy(){
        this.$router.push({
            path:'/MyMusic',
            params:{id:this.loginuser.userId}
        })
    },
    to(val){
        this.$router.push(val)
        this.$store.commit('navmenuchange',val)
    },
    // 调往歌曲详情
    tomusic(text){
        console.log(text)
        this.input=text
        this.$router.push({
            path: '/Search',
            query:{text}
      })
      this.ishotserch=false
      this.$store.commit("navmenuchange","/")
    },
    //搜索按下回车
    change(val){
      this.$router.push({path:'/Search',query:{text:this.input}})
      this.ishotserch=false
      this.input=""
      this.$store.commit("navmenuchange","/")
    },
        //输入框变化
    keychange(){
        this.fnThrottle(this.keyseach,1000)
    },
    //获取搜索关键字的结果
    async keyseach(){
        console.log(this.input)
        const {data:data} = await SearchKey(this.input)
        console.log(data)
        if(data.code){
            this.result =data.result
            this.result.isactive=false
        }else{
            this.result.isactive=true
        }

    },
    //节流
    fnThrottle(func,delay) {
        let that =this
        return function(){
            if(!that.Times==""){
                clearTimeout(that.Times)
            }
            that.Times = setTimeout(()=>{
                func()
                that.Times = ""
            },delay)
            
        }()
    },
    //点击搜索结果中的歌手
    toartists(item){
        console.log(item.id)
    },
    //点击搜索结果中的歌曲
    tosongs(item){
        console.log(item.id)
    },
    //点击搜索结果中的专辑
    toalbums(item){
       console.log(item.id)
    },
    //点击搜索结果中的歌单
    toplaylists(item){
        console.log(item.id)
    },
 },
 created(){
        if(this.$store.state.loginchange.avatarUrl==undefined){
            this.loginuser = JSON.parse(sessionStorage.getItem('loginchange'))
        }
        window.addEventListener('setItem', ()=> {
            this.loginuser=JSON.parse(sessionStorage.getItem('loginchange'))
            console.log("头像監聽到了" )      
        })
        this.getHotsearch()
 }
}
</script>

<style scoped>
.navuser{
    width: 150px;
    margin-left: 20px;
    place-self: center;
}
#nav{
    background: #fff;
    box-shadow: 0px 2px 2px #cccccc;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    position:fixed;
    top: 0;
    left: 0;
    z-index: 9999;

}
.activenav{
   font-weight: 700;
 padding-bottom: 10px;
   border-bottom: 3px solid rgb(245, 134, 8);
}
.navtab{
    width: 1200px ;
    margin: 0 auto;
    height: 60px;
    display: flex;
    position: relative;
}
.button{
    min-width: 70px !important;
}
.inputbox{
    display: flex;
    align-items: center;
    width: 300px;
    flex-direction: row-reverse;
}
.input{
    height: 30px;
    min-width: 140px;
    border: none;
    border-bottom: 1px #ccc solid;
    outline:none;
    transition: all 0.2s ease-in;
   
}
.input:active{
    width: 250px;
}
.search{
    border: none;
}
.usericon{
  display: flex;
  align-items: center;
  font-size: 14px;
}
.usericon img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
}
.usericon img:hover{
  transform: rotate(360deg);
}
#nav-ul{
    display: flex;
    float: left;
    list-style: none;
    min-width: 600px;
    height: 100%;
    margin: 0;
    padding: 0;
    align-items: center;
}
#nav-ul li{
    float: left;
    display: block;
    min-width: 50px;
    text-decoration: none;
    margin: 10px;
}
#nav-ul li:hover{
    
    border-bottom: 2px solid rgb(245, 134, 8);
}
#nav a:hover{
color: rgb(245, 134, 8);    
}
.logo{
    height: 100%;
    width: 160px;
    align-items: center;
    display: flex;
}
.logo img{
     width: 100px;
     display: flex;
     place-self: center;
     vertical-align: middle;
 }
 .el-button{
     width: 40px;
     height: 40px;
     display: flex;
     place-self: center;
     
 }
 .mengban{
     width: 100%;
     height: 100vh;
     background: rgba(255, 255, 255, 0.9);
     position: fixed;
     top: 62px;
     left: 0;
 }


 .hotserach_pos{
    background: rgba(255, 255, 255, 0.9);
    width: 300px;
    position: absolute;
    top: 80px;
    transition: all 0.2s ease-in;
    z-index: 2;
    overflow: hidden;

 }
  .hotserach_title{
     text-align: left;
     font-size: 18px;
     font-weight: 500;
     padding: 15px 0;
     margin-left: 15px;
 }
 .hotserach{
    width: 320px;
    display: flex;
    flex-direction: column;
    height: 800px;
    overflow: auto;
    -webkit-overflow-scrolling:touch
 }
 .searchList{
     display: flex;
     height: 40px;
     padding: 5px 0px;
     font-size: 14px;
     text-align: left;
 }
 .searchindex{
     width: 60px;
     height: 100%;
     line-height: 40px;
     text-align: center;
     font-weight: 500;
 }
 .searchindex:nth-child(1){
     color: salmon;
 }
 .searchindex:nth-child(2){
     color: salmon;
 }
  .searchindex:nth-child(3){
     color: salmon;
 }
 .searchitem{
     font-size: 16px;
     color: #2f2f2f;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
 }  
 .searchitem div:nth-child(2){
     font-size: 14px;
     color: #cccccc;
     width: 180px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;

 }
 .searchkey{
    font-size: 12px;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 7px #555;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
    width: 240px;
 }
 .searchkey_title{
     border-bottom: 1px solid #ccc;
     padding: 12px;
     font-size: 14px;
    text-align: left;
    color: #ccc;
 }
 .search_item{
    display: flex;
    flex-direction: row;
    min-height: 40px;
    line-height: 24px;
    font-size: 12px;
 }
 .searchkey_left{
    width: 65px;
    border-right: 1px solid #ccc;
    padding-top: 5px;

 }
 .searchkey_right{
    flex: 1;
    border-bottom: 1px solid #ccc;
    display:flex;
    flex-direction: column;
    text-align: left;
    padding: 5px 0;
    box-sizing: border-box;
    background: #fff;
 }
 /* .dandu{
     background:#ccc
 } */
 .searchkey_right span{
     display: block;
     width: 164px;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
     padding: 0 5px;
 }
.searchkey_right span:hover{
    background:#ccc
}
</style>