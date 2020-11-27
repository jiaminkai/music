<template>
  <div class="home">
    <el-container>
        <el-header>
          <nav-menu></nav-menu>
          <el-button v-if="this.loginchange" @click="login">登录</el-button>
          <div v-else class="usericon">
              <img :src="this.loginuser.avatarUrl" alt="" srcset="">
          </div>
        </el-header>
        <el-main>
            <router-view @palynewmusic="palynewmusic">

            </router-view>
        </el-main>
        <el-footer>
             <el-progress :show-text="false" :percentage="percentage" color="#FFC125"></el-progress>
             <play ref="paly" @godetails="godetails" @opend="opend" :like="likemusci"  @timeup="timeup"></play>
        </el-footer>
    </el-container>

    <el-dialog
        title="提示"
        :visible.sync="islogin"
        width="30%"
        :before-close="handleClose">
        <el-form :ref="loginfrom" v-model="loginfrom" :rules="rule">
            <el-form-item label="账号" prop="loginfrom.email">
                <el-input placeholder="手机号/邮箱" v-model="loginfrom.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="loginfrom.password" >
                <el-input placeholder="请输入密码" v-model="loginfrom.password"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="islogin = false">取 消</el-button>
          <el-button type="primary" @click="sumbit()">确 定</el-button>
        </span>
  </el-dialog>
  <el-drawer
    title="播放历史"
    :visible.sync="drawer"
    :modal="false"
    size="430px"
    :with-header="false">
    <div class="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="正在播放" name="first">
                  <template>
                    <el-table
                          :data="likemusci"
                          max-height="400"  
                          :show-header="false"
                          @row-click="onplay"
                          @
                          @cell-mouse-enter="hoveraction"
                          @cell-mouse-leave="hoverleave"
                      >
                                  <el-table-column
                                      width="50"
                                      prop="isonplay"
                                    >
                                      <template slot-scope="scope">
                                          <span v-if="!scope.row.isonplay">{{scope.row.index}}</span>
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
                               
                                <span>{{scope.row.playtime}}</span>
                            </template>
                          </el-table-column>
                          
                      </el-table>
                  </template>
          </el-tab-pane>
          <el-tab-pane label="播放历史" name="second">播放历史</el-tab-pane>
        </el-tabs>
    </div>
    <div class="bottom">
        <div>共{{this.likemusci.length}}首</div>
        <div>
            <span>编辑列表</span>
            <span>清空</span>
        </div>
    </div>

</el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '../components/home/NavMenu.vue'
import Play from '../components/home/paly.vue'
// import MusicDetails from '../views/MusicDetails.vue';
import {Home,Subcount,LikeMusic,GetMusic,GetMusicDetails,Music} from '../components/home/home'// eslint-disable-line no-unused-vars
import {btnLogin,Login,LoginDetail} from '../components/login/login'// eslint-disable-line no-unused-vars
export default {
  name: 'Home',
  data(){
    return{ 
      activeName:'first',
         drawer:false,
      token:'',
      likemusci:[],
      cookie:'',
      only:[],
      newmusic:[],
      loginuser:{},
      uesrId:'',
      percentage:0,
      islogin:false,
      loginchange:true,
      userSubcount:[],
      loginfrom:{
        email:'',
        password:''
      },
      rule:{
        email:[{required: true, trigger: 'blur'}],
        password:[{required: true, trigger: 'blur'}]
      }

    }
  },
  components: {
    
    NavMenu,
    Play,

  },

  methods:{
    godetails(val){
      this.$router.push({
        path: '/details',
        query:val
      })
    },
//  鼠标移入表格行事件
    hoveraction(row,event,column){
      console.log(row.userId,event,column)
      this.likemusci.forEach(item=>{
          if(item.userId==row.userId){
            item.hover=true
          }
      })
      // this.$forceUpdate()

    },
//  鼠标移出表格行事件
    hoverleave(row,event,column){
       console.log(row.userId,event,column)
      // this.likemusci.forEach(item=>{
      //     if(item.userId==row.userId){
      //       item.hover=false
      //     }
      // })

    },
    // 播放目录中的音乐
    onplay(row,event,column){
      console.log(row.userId,event,column)
      var a =this.likemusci.findIndex(item => {
        return item.userId==row.userId
      })
      this.$refs.paly.i=a
    //  this.$refs.paly.playmusic();
    },

    opend(val){
      this.drawer=val
    },
    // 播放新歌
    palynewmusic(val){
         this.likemusci.unshift(val)
         this.$forceUpdate()
         this.islogin
         this.percentage =0
        this.likemusci.forEach((item,index)=>{
            item.isonplay=false
            item.hover=false
            item.index=index
        })
        this.$refs.paly.$refs.audio.play();
        console.log(this.$refs.paly)
    },
    // 更改进度条状态
    timeup(val){
      if(Number.isNaN(parseFloat(val*100))){
        this.percentage=0
        console.log(this.percentage)
      }else{
         this.percentage=parseFloat(val*100)
         console.log(this.percentage)
      }
     
    },
    // 获取音乐
    async getmusic(id){
        var array=[]
        const {data:data} =await GetMusic(id)
        
        const {data:ndata} =await GetMusicDetails(id)
        console.log("musci",ndata)
        for(var i =0 ;i<ndata.songs.length;i++){
            var c = new Music(ndata.songs[i],data.data[i].url)
            array.push(c)
        }
        return array
    },
    // 点击登录
    login(){
     this.islogin=true
    },
    // 获取喜欢的歌曲列表
    async getlike(id){

        const {data:data} =await LikeMusic(id)
       await this.getmusic(data.ids.join(',')).then(res=>{
           this.likemusci=res
        })
        this.likemusci.forEach((item,index)=>{
          item.isonplay=false
          item.hover=false
          item.index=index
          var h=parseInt(item.playtime/1000/60)
          if(parseInt(item.playtime/1000/60)<10){
              h='0'+ parseInt(item.playtime/1000/60)
          }
          var s=parseInt(item.playtime/1000%60)
          if(parseInt(item.playtime/1000%60)<10){
              s='0'+ parseInt(item.playtime/1000%60)
          }
          item.playtime= h+':'+s
        })
        this.music = this.likemusci[0]
    },
    // 查看登录状态
    async loginchan(){
     const logs =await btnLogin()
     
     if(logs.data.profile!=null){
       this.loginchange=false
       console.log("已登录")
       console.log(logs.data.profile)
       this.uesrId=logs.data.profile.userId
       this.loginuser =logs.data.profile
       this.getuserSub(this.uesrId)
       this.getlike(this.uesrId)

        
     }else{
       this.loginchange=true
     }
    },
    // 获取登录信息详情
    async getuser(id,cookie){
      const {data:data} =await LoginDetail(id,cookie)
      console.log("user",data.profile)
      
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
    // 提交登录信息
   async sumbit(){
      const res= await Login({email:this.loginfrom.email,password:encodeURIComponent(this.loginfrom.password)})// eslint-disable-line no-unused-vars
      console.log(res)
      if(res.status==200){
        if(res.data.code==200){
            console.log("登录成功" )
            console.log(res.data.account)
            this.loginuser=res.data.account
            sessionStorage.setItem('token',res.data.token)
             this.uesrId   =res.data.account.id
            this.cookie =window.document.cookie
            this.getuser(this.uesrId)

        } else{
        this.$message.error("登录失败")
      }
      }
      this.islogin =false
    },


    handleClick(val){
      console.log(val )
    }
    
    
  },
  created(){
    // this.getdata()
    // this.gettuijian()
    // this.getonlyone()
    // this.getnewmusic()
    this.loginchan()
    // this.islogin =this.btnLogin()
  }
}
</script>
<style >
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_p9m953adpb.eot');
  src: url('//at.alicdn.com/t/font_2223549_p9m953adpb.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_p9m953adpb.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_p9m953adpb.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_p9m953adpb.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_p9m953adpb.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
body{
  padding: 0;
  margin: 0;
}
.el-header{
    background: #fff;
    box-shadow: 0px 2px 5px #cccccc;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 333;
 
    
}
.container{
  width: 1200px;
  margin: 0 auto;
}
.el-main{
  height: 100%;
  padding: 0 !important;

}
.el-footer{
  height: 70px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px #cccccc;
  padding: 0!important;
  position: fixed;
  bottom: 0 ;
  display: flex;
  flex-direction: column;
}
.usericon{
  width: 50px;
  height: 50px;
}
.usericon img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all 1s ;
  animation: rotate 10s linear infinite;
}
.usericon img:hover{
  transform: rotate(360deg);
}
.el-progress-bar__outer{
  height: 3px;
}
.el-drawer{
  height: 60% !important;
  position: fixed !important;
  bottom: 60px !important;
  top: auto!important;
  padding: 20px 30px;
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
