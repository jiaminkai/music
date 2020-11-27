<template>
  <h1>专辑</h1>
</template>

<script>
import { GetDj } from "./Dj";
import { GetMusicDetails,Music,GetMusic } from "../../components/home/home";

export default {
    name:'Dj',
    data(){
        return{
            Dj:[],
            Djid:'',
            music:[]
        }
    },
    methods:{
      async  getDj(id){
          const {data:data} =await GetDj(id)
          console.log(data )
          this.Dj=data.playlist
          var djid=[]
          data.playlist.trackIds.forEach(item => {
            djid.push(item.id) 
          });
         this.Djid= djid.join(',')
          console.log( this.Djid)
         this.music= this.getDjdetails(this.Djid)
        },
        async getDjdetails(id){
            const {data:data} =await GetMusicDetails(id)
            const {data:ndata} = await GetMusic(id)
            console.log("data",data)
            var array=[]
            for(var i =0 ;i<data.songs.length;i++){
            var c = new Music(data.songs[i],ndata.data[i].url)
            array.push(c)
        }
        return array
        }
    },
    created(){
        this.$route.params.id
        console.log(this.$route.params.id)
        this.getDj(this.$route.params.id)
    }

}
</script>

<style>

</style>