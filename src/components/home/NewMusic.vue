<template>
  <div class="conatiner">
      <div class="title">最新新歌<i class="el-icon-arrow-right"></i> <span class="more">更多<i class="el-icon-circle-plus-outline"></i></span></div>
      <div class="newmusicbox">
          <div class="newmusic-item" @click="paly(item.id)" v-for="(item,index) in newmusic" :key="index">
              <div class="musicindex">{{index}}</div>
              <img class="icon" :src="item.picUrl" alt="">
              <div class="namebox">
                <div class="singer">{{item.name}}</div>
                <div class="name">{{item.song.artists[0].name}}</div>
              </div>
              <div class="musicname">『{{item.name}}』</div>
              <div class="play"><i class="el-icon-video-play"></i></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'NewMusic',
  props:{
    newmusic:Array
  },
  methods:{
    paly(id){
      this.$emit("palynewmusic",id)
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
.newmusic-item{
  display: flex;
  width: 49.6%;
  height: 65px;
  box-shadow:  1px 2px 5px #cccccc;
  margin-bottom: 20px;
  align-items: center;

}
.musicindex{
  width: 60px;
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
}

</style>