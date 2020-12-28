<template>
  <div class="home">
    <el-container>

        <el-main>
            <router-view @palynewmusic="palynewmusic">
            </router-view>
        </el-main>

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

  </div>
</template>

<script>
// @ is an alias to /src
import {Home,Subcount,LikeMusic,GetMusic,GetMusicDetails,Music} from '../components/home/home'// eslint-disable-line no-unused-vars
import {btnLogin,Login,LoginDetail} from '../components/login/login'// eslint-disable-line no-unused-vars
import { GetLyric } from "../components/MusicDetails/details";
export default {
  name: 'Home',
  data(){
    return{ 
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

  watch:{
    
  },
  mounted(){
        //   this.$bus.$on('name',(value)=>{
        //     console.log(value )
        //     this.palytime=value
        // })
  },
  methods:{



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
        
        this.resetSetItem('music', JSON.stringify(this.likemusci));
    },
    // 查看登录状态
   
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

      async loginchan(){
        const logs =await btnLogin()
        if(logs.data.profile!=null){
            console.log("已登录")
            console.log(logs.data.profile)
            this.uesrId=logs.data.profile.userId
            this.loginuser =logs.data.profile
            this.loginuser.loginchange =false
            this.resetSetItem('loginchange', JSON.stringify(this.loginuser));
            this.getuserSub(this.uesrId)
            this.getlike(this.uesrId)
        }else{
            this.loginuser.loginchange=true
        }
    },
    // 获取登录信息详情
    async getuser(id,cookie){
      const {data:data} =await LoginDetail(id,cookie)
      console.log("user",data.profile)
      
    },

    
    
  },
  created(){
    this.loginchan()
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
   z-index: 999;  
}


.el-drawer{
  height: 600px !important;
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
