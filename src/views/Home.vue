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
             <play ref="paly" @gecishow="gecishow" @godetails="godetails" @opend="opend" :like="likemusci"  @timeup="timeup"></play>
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
    size="450px"
    :with-header="false">
    <div class="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="正在播放" name="first">
                  <template>
                    <el-table
                          :data="likemusci" 
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
        <div>共{{this.likemusci.length}}首</div>
        <div>
            <span>编辑列表</span>
            <span>清空</span>
        </div>
    </div>

</el-drawer>

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
           <div class="gecibox">
               <p v-for="(item,index) in this.lyric" :key="index">{{item.text}}</p>
           </div>
         </div>
    <div class="bottom">
        <div>翻译</div>
        <div>
            <span>歌词纠正</span>
        </div>
    </div>

</el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '../components/home/NavMenu.vue'
import Play from '../components/home/paly.vue'
import {Home,Subcount,LikeMusic,GetMusic,GetMusicDetails,Music} from '../components/home/home'// eslint-disable-line no-unused-vars
import {btnLogin,Login,LoginDetail} from '../components/login/login'// eslint-disable-line no-unused-vars
import { GetLyric } from "../components/MusicDetails/details";
export default {
  name: 'Home',
  data(){
    return{ 
      activeName:'first',
      drawer:false,
      drawergeci:false,
      token:'',
      likemusci:[],
      cookie:'',
      palytime:'',
      only:[],
      newmusic:[],
      loginuser:{},
      uesrId:'',
      itemkey:'',
      lyric:[],
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
  watch:{
    
  },
  mounted(){
          this.$bus.$on('name',(value)=>{
            console.log(value )
            this.palytime=value
        })
  },
  methods:{
    godetails(val){
      this.$router.push({
        path: '/details',
        query:val
      })
    },
    conle(){
      this.drawergeci=false
    },
    // 歌词展示
    async gecishow(val){
      console.log(val.musicid)
      this.lyric=[]
      const {data:Lyric}  = await GetLyric(val.musicid) 
      console.log(Lyric.lrc.lyric)
      this.formatLyric(Lyric.lrc.lyric)
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
    },
    sortRule(a, b) { //设置一下排序规则
      return a.time - b.time;
    },
//  鼠标移入表格行事件
    hoveraction(row,event,column){
      console.log(row.userId,event,column)
      var index= this.likemusci.findIndex(item=>{
        return  item.userId==row.userId
      })
      var a =this.likemusci[index]
      a.hover=true
      a.isonplay=true
      this.$set(this.likemusci,index,a)


    },
//  鼠标移出表格行事件
    hoverleave(row,event,column){
       console.log(row.userId,event,column)
       var index= this.likemusci.findIndex(item=>{
        return  item.userId==row.userId
      })
      var a =this.likemusci[index]
      a.hover=false
      a.isonplay=false
      this.$set(this.likemusci,index,a)
     

    },
    // 播放目录中的音乐
    onplay(row,event,column){
      console.log(row.userId,event,column)
      var a =this.likemusci.findIndex(item => {
        return item.userId==row.userId
      })
      this.$refs.paly.i=a
    },

    opend(val){
      this.drawer=val
    },
    // 播放新歌
    palynewmusic(val){
     var  valid= this.likemusci.findIndex(item=>{
        return  item.musicid==val.musicid
      })
      if(valid==-1){
        this.likemusci.unshift(val)
          window.sessionStorage.setItem('music',JSON.stringify(this.likemusci))
        this.$forceUpdate()
      }else{
        this.$refs.paly.i=valid
      }
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
        this.$store.commit('SetMusic',this.likemusci)
        window.sessionStorage.setItem('music',JSON.stringify(this.likemusci))
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
  src: url('//at.alicdn.com/t/font_2223549_g4odzpizzem.eot');
  src: url('//at.alicdn.com/t/font_2223549_g4odzpizzem.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_g4odzpizzem.svg#iconfont') format('svg');
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
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  bottom: 60px !important;
  top: auto!important;
  right: 20px !important;
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
