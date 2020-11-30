<template>
     <el-container>
         <el-header>
             <nav-menu ></nav-menu>
         </el-header>
         <el-main>
             <div class="container">
                <toptab :toplist="this.toplist" :guan="this.guan"></toptab>
                <topneidi :array="this.neidi"></topneidi>
             </div>
         </el-main>
         <el-footer>
            <bottom  :like="this.music"/>
         </el-footer>
     </el-container>
</template>

<script>
import NavMenu from '../components/home/NavMenu.vue'
import bottom from '../components/home/paly.vue'
import toptab from '../components/TopList/toptab.vue'
import topneidi from '../components/TopList/TopNeiDi.vue'

import {Toplist,TopGuan,TopGuanSong,TopGuanSongUrl,Guan} from '../components/TopList/TopList'
export default {
   name:'TopList',
   data(){
       return{
           music:[],
           toplist:[],
           guan:[],
           niedi:[]
       }
   },
   components:{
      NavMenu,
      bottom,
      toptab,
      topneidi
      
   },
   methods:{
    //    获取top数据
      async getTop(){
          const data = await Toplist()
          console.log("cc",data.data)
          this.toplist=data.data.list
          var guanlist =this.toplist.slice(0,3)
          this.neidi =this.toplist.slice(3,9)
          this.getTopGuan(guanlist)
      },
    //   获取banter数据
      async getTopGuan(guanlist){
          console.log("guan",guanlist )
         await guanlist.forEach(item=>{
             console.log(item.id )
             const data =  TopGuan(item.id).then(res=>{
                 console.log(res.data.playlist)
                 var dre ={}
                 dre.list=[]
                 var list = res.data.playlist.tracks.slice(0,8)
                 list.forEach(a=>{
                     var c = new Guan(a)
                     dre.list.push(c)
                 })
                 this.guan.push(dre)
             })
            //   console.log(data )
             
          })
      }
   },

   created(){
      this.music= JSON.parse(window.sessionStorage.getItem('music'))
      this.getTop()
      
   }
}
</script>

<style scoped>
.container{
    width: 1200px;
    margin: 0 auto;
}
</style>