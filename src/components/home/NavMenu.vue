<template>
        <div id="nav">
            <div class="navtab">
                <div class="logo">
                    <img src="http://images.shejidaren.com/wp-content/uploads/2014/09/021504BV4.jpg" alt="">
                </div>
                <ul id="nav-ul">
                    <li><el-link :underline="false" href="/">发现音乐</el-link></li>
                    <li><el-link :underline="false" href="/Top">排行榜</el-link></li>
                    <li><el-link :underline="false" href="/Song">歌单</el-link></li>
                    <li><el-link :underline="false" href="/Singers">歌手</el-link></li>
                    <li><el-link :underline="false" href="/MV">MV</el-link></li>
                    <li><el-link :underline="false" href="/Dt">电台</el-link></li>

                </ul>
                <div class="inputbox">
                    <el-button class="search" circle icon="el-icon-search" @click="change" />
                    <input class="input" v-model="input" @blur="cloce" @keyup.enter="change" @click="folthinput" :style="{ width: width+'px', borderBottom: '#ccc solid '+this.a+'px'  }"  placeholder="请输入查找内容"/>
                    <div class="hotserach_pos" v-if="this.ishotserch">
                        <div class="hotserach">
                            <div class="hotserach_title">热门搜索</div>
                                <div class="searchList" @click="tomusic(item.score)" v-for="(item,index) in this.hotsearch" :key="index">
                                    <div class="searchindex">{{index+1}}</div>
                                    <div class="searchitem">
                                        <div>{{item.searchWord}}</div>
                                        <div>{{item.content}}</div>
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
export default {
   
 name:'NavMenu',
 data(){
     return{
         loginuser:{},
         width:130,
         a:1,
         ishotserch:false,
         hotsearch:[],
         uesrId:'',
         input:''
     }
 },
 computed:{
     logins() {
        return this.$store.state.loginchange;
      }

 },
 watch:{
    logins: function (old,newd){
        console.log(old)
          this.loginuser = old;
         }

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
    // 调往歌曲详情
    tomusic(id){
        this.$router.push({
            path: '/details',
            query:{id:id}
      })
      this.ishotserch=false
    },
    //搜索按下回车
    change(val){
      this.$router.push({path:'/Search',query:{text:this.input}})
      this.ishotserch=false
      this.input=""
    }
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
    z-index: 99;

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
    margin-right: 50px;
    align-items: center;
    display: flex;
}
.logo img{
     width: 100px;
     height: 90%   ;
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
 }
 .hotserach{
    width: 320px;
    display: flex;
    flex-direction: column;
    height: 800px;
    overflow: auto;
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
 }
</style>