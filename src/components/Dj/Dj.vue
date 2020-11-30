<template>
  <musicitem  @allplay2="allplay2" :dj="this.Dj" :newcomment="this.comment" >
        <div class="desc" slot="djdesc">
            <div class="desctitle">歌单介绍</div>
            <div class="djdesc">
                {{this.Dj.description}}
            </div>
            <span class="move">更多</span>
        </div> 
        <div slot="dj">
            <el-table
                :data="music"
                stripe
                @row-click="paly"
                @cell-mouse-enter="hoverenter"
                @cell-mouse-leave="hoverleave"
            >
                <el-table-column
                     :label="index"
                     width="80"
                     
                >
                    <template slot-scope="scope">
                        <div v-if="!scope.row.ispaly">
                                <div v-if="!scope.row.hover">{{scope.row.index}}</div>
                                <div v-else class="iconfont">&#xe768;</div>
                        </div>
                        <span v-else class="iconfont">
                              &#xe61c;
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                     label="歌曲"
                     min-width="300"
                     prop="musicname"
                >
                
                </el-table-column>
                <el-table-column
                    label="歌手"
                    min-width="180"
                    prop="user"


                ></el-table-column>
                <el-table-column
                   label="专辑"
                   min-width="120"
                   prop=""
                ></el-table-column>
                <el-table-column
                   label="时长"
                   min-width="120"
                   
                >
                    <template slot-scope="scope">
                         <div v-if="!scope.row.hover">{{scope.row.playtime}}</div>
                         <div class="span" v-else >
                             <span class="iconfont">&#xe607;</span>
                             <span class="iconfont">&#xe687;</span>
                             <span class="iconfont">&#xe63f;</span>
                         </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
  </musicitem>
  
</template>

<script>
import { GetDj, GetDjComment} from "./Dj";
import { GetMusicDetails,Music,GetMusic} from "../../components/home/home";
import Musicitem from '../../components/MusicDetails/Musicitem.vue';
export default {
    name:'Dj',
    data(){
        return{
            Dj:[],
            Djid:'',
            music:[],
            comment:[],
            index:''
        }
    },
    components: { Musicitem },
    methods:{
    hoverenter(row){
        console.log(row.musicid)
        var index = this.music.findIndex(item=>{
          return  row.musicid==item.musicid
        })
        console.log("index",index )
        var a =this.music[index]
        console.log(a )
        a.hover=true
        this.$set(this.music,index,a)
    },
    hoverleave(row){
          console.log(row.musicid)
        var index = this.music.findIndex(item=>{
          return  row.musicid==item.musicid
        })
        console.log("index",index )
        var a =this.music[index]
        console.log(a )
        a.hover=false
        this.$set(this.music,index,a)
    },
    allplay2(){
                console.log("全部播放")
                var  a =[]
                this.music.forEach(item=>{
                    a.push(item)
                })

                a.reverse()
                console.log("a",a )
                a.forEach(item=>{
                     console.log(this.$parent.$parent.$parent.palynewmusic(item))
                })
                
      },
      paly(row, column, event){
          console.log(row.url,column,event )
          this.music.forEach(item => {
               item.ispaly=false
          });
        var index = this.music.findIndex(item=>{
          return  row.musicid==item.musicid
        })
        console.log("index",index )
        var a =this.music[index]
        console.log(a )
        a.ispaly=true
        this.$set(this.music,index,a)
          this.$parent.$parent.$parent.palynewmusic(row)
      },
      async  getDj(id){
          const {data:data} =await GetDj(id)
          this.Dj=data.playlist
          var djid=[]
          data.playlist.trackIds.forEach(item => {
             djid.push(item.id) 
          });
           this.Djid= djid.join(',')
          console.log( this.Djid)
        this.getDjdetails(this.Djid)
        },
        async GetComment(id){
            const {data:data} =await GetDjComment(id)
            console.log("aaaa",data.comments)
            this.comment =data.comments

        },
        async getDjdetails(id){
            const {data:data} =await GetMusicDetails(id)
            const {data:ndata} = await GetMusic(id)
            
            
        for(var i =0 ;i<data.songs.length;i++){
                var c = new Music(data.songs[i],ndata.data[i].url)
                this.music.push(c)
        }
        this.music.forEach((item,index)=>{
               item.hover=false
               item.ispaly=false
               item.index=index+1<10?'0'+(index+1):index+1
              var c= Math.floor(item.playtime/1000/60)
                var b=Math.floor(item.playtime/1000%60)
                if(c<10){c='0'+c}
                if(b<10){b='0'+b}
                    item.playtime= c+':'+b
        })
        this.index=this.music.length+'首'
        }
    },

    created(){
        this.$route.params.id
        console.log(this.$route.params.id)
        this.getDj(this.$route.params.id)
        this.GetComment(this.$route.params.id)
    }

}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_lmnsoaglqzo.eot');
  src: url('//at.alicdn.com/t/font_2223549_lmnsoaglqzo.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_lmnsoaglqzo.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_lmnsoaglqzo.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_lmnsoaglqzo.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_lmnsoaglqzo.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
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
.span span{
    margin-right: 10px;
}

</style>