<template>
  <div class="conatiner">
      <div class="title">最新新歌<i class="el-icon-arrow-right"></i> <span class="more">更多<i class="el-icon-circle-plus-outline"></i></span></div>
      <div class="newmusicbox">
          <div class="newmusic-item" @click="paly(item)" v-for="(item,index) in newmusic" :key="index" @mouseenter="mouse(index)">
              <div class="musicindex">{{index+1}}</div>
              <img class="icon" :src="item.picUrl" alt="">
              <div v-show="ishow==index" class="newmusic-item-hover"><i class="el-icon-video-play"></i></div>
              <div class="namebox">
                <div class="singer">{{item.name}}</div>
                <div class="name">{{item.song.artists[0].name}}</div>
              </div>
              <div class="musicname">『{{item.name}}』</div>
              <div class="play">{{item.song.bMusic.playTime}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'NewMusic',
  props:{
    newmusic:Array,
   
  },
  data(){
    return{
       ishow:-1
    }
  },
  methods:{
    paly(item){
      this.$emit("palynewmusic",item)
    },
    mouse(index){
      this.ishow=index
    }
  }
}
</script>

<style  scoped>
.conatiner{
    width:1200px;
    margin:  30px auto;
}
.newmusicbox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.newmusic-item-hover{
  font-size: 25px;
  position: absolute;
  top: 30;
  left: 60px;
  color: salmon;
}
.newmusic-item{
  display: flex;
  width: 49.6%;
  height: 65px;
  box-shadow:  1px 2px 5px #cccccc;
  margin-bottom: 20px;
  align-items: center;
  position: relative;

}
.musicindex{
  width: 45px;
  text-align: center;
}
.icon{
  width: 50px;
  height: 50px;
  margin-right:20px;
}
.namebox{
  display: flex;
  flex-direction: column;
  height: 45px;
  justify-content: space-between;
  font-size: 12px;
  flex: 1;
  text-align: left;
}
.musicname{
  flex: 1;
  font-size: 12px;
  width: 160px;
  text-align: left;
}
.play{
  width: 50px;
  margin-right: 10px;
  font-size: 14px;
  color: #6e6e6e;
}

</style>