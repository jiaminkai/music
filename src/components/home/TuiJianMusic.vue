<template>
        <div class="container">
            <div class="title">推荐歌单<i class="el-icon-arrow-right"></i> <span class="more">更多<i class="el-icon-circle-plus-outline"></i></span></div>
            <div class="musicbox">
                <div class="musciitem" @click="toDj(item.id)" v-for="(item,index) in this.tuijian" :key="index" >
                    <img :src="item.picUrl" alt="">
                    <div>{{item.name}}</div>
                    <div class="count">
                    <i class="el-icon-video-play"></i> {{item.playCount}}
                    </div>
                </div>
            </div>
          
        </div>
</template>

<script>
export default {
  name:'TuiJianMusic',
  props:{
    tuijian:Array
  },
  methods:{
    toDj(id){
      this.$router.push({path:`/Dj${id}`})
    }
  }
}
</script>

<style >
.title{
  text-align: left;
  margin: 20px 0;
}
.musicbox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  transform-style: preserve-3d
}
.musciitem{
  width: 100px;
  font-size: 12px;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
  
}
.hovepaly{
  color: coral;
  font-size: 30px;
  position: absolute;
  left: 45px;
  top: 15 px;
  z-index: 99;
}
.musciitem:nth-child(10n+10){
  margin-right: 0px;
}
.musciitem img{
  width: 100px;
  height: 100px;
  border-radius: 5px;
}
.count{
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: #fcfcfc;
  padding: 3px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 10px;
  top: 5px;
  right: 5px;

}
.musciitem img:hover{
 
  box-shadow: 2px 0px 10px #000;
}
.more{
  display: block;
  margin-right: 20px;
  float: right
}
</style>