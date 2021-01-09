<template>
    <div class="waibox">
        <div class="container" >
        <toptab :toplist="this.toplist" :guan="this.guan"></toptab>
        <tabitem :array="this.neidi"/>
        <tabwin :win="win" style="margin-bottom:30px"/>
    </div>
    </div>

</template>

<script>
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
        toptab,
        tabitem,
        tabwin
    },
    methods:{
    //    获取top数据
        async getTop(){
            const data = await Toplist()
            this.toplist=data.data.list
            var guanlist =this.toplist.slice(0,3)
            this.neidi = this.toplist.slice(3,9)
            this.win = this.toplist.slice(9)
            this.guan=  this.getTopGuan(guanlist)
            },
        getTopGuan(guanlist){
            var array=[]
            guanlist.forEach(item=>{
            
                var  data =  TopGuan(item.id).then(res=>{
                    console.log(res.data.playlist.tracks.slice(0,8) )
                    var dre ={}
                    dre.list= res.data.playlist.tracks.slice(0,8)
                    dre.id=item.id
                    array.push(dre)
                })
                })
                return array
        }
    },

    created(){
        this.$nextTick(function(){
                this.getTop()
            })

    }
}
</script>

<style scoped>
.waibox{
    width: 100%;
    height: 100%;
    background: #eee;

}
.container{
width: 1200px;
margin: 0 auto;
box-shadow: 0px 0px 8px #efefef;
background: #fff;
}
.el-main{
background: #fefefe;
}

</style>