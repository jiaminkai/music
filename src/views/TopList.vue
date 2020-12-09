<template>
    <el-container>
        <el-header>
            <nav-menu></nav-menu>
        </el-header>
        <el-main>
            <div class="container">
                <toptab :toplist="this.toplist" :guan="this.guan"></toptab>
                <tabitem :array="this.neidi"/>
                <tabwin :win="win"/>
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
import tabitem from '../components/TopList/TopNeiDi.vue'
import tabwin from '../components/TopList/Topwin.vue'


import {Toplist,TopGuan,TopGuanSong,TopGuanSongUrl,Guan,Guanimg} from '../components/TopList/TopList'
export default {
    name:'TopList',
    data(){
        return{
            music:[],
            toplist:[],
            guan:[],
            neidi:[],
            neidiimg:[],
            newdata:[],
            win:[]
        }
    },
    components:{
        NavMenu,
        bottom,
        toptab,
        tabitem,
        tabwin
    },
    methods:{
    //    获取top数据
        async getTop(){
            const data = await Toplist()
            //   console.log("cc",data.data)
            this.toplist=data.data.list
            var guanlist =this.toplist.slice(0,3)
            this.neidi = this.toplist.slice(3,9)
            this.win = this.toplist.slice(9)
            this.guan=  this.getTopGuan(guanlist)
            },
        //  getTopitem(ac,data){
        //     console.log(this.neidi )
        //     var array=[]
        //     console.log(ac,data )
        //        ac.forEach((item,index)=>{
        //             console.log("ab",item)
        //             var a = new Guanimg(item.list[0],data).then(res=>{
        //                 console.log("re s",res )
        //             })
        //             console.log("a",a )
        //         })
        // },
    //   获取banter数据
         getTopGuan(guanlist){
        //   console.log("guan",guanlist )
            var array=[]
             guanlist.forEach(item=>{
            //  console.log(item.id )
                const data = new TopGuan(item.id).then(res=>{
                    var dre ={}
                    dre.list=[]
                    var lists = res.data.playlist.tracks.slice(0,8)
                    lists.forEach(a=>{
                            var c = new Guan(a)
                            dre.list.push(c)
                    })
                    array.push(dre)
                })
                })
                return array
        }
    },

     created(){
        this.music= JSON.parse(window.sessionStorage.getItem('music'))
        this.$nextTick(function(){
                this.getTop()
            })
  
    }
}
</script>

<style scoped>
.container{
width: 1200px;
margin: 0 auto;
box-shadow: 1px 0px 13px;
background: #fff;
}
.el-main{
background: #cecece;
}

</style>