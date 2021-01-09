<template>
  <el-carousel :interval="3000" type="card" height="200px">
    <el-carousel-item v-for="(item,index) in this.swipe" :key="index">
      <img :src="item.imageUrl" alt=""  @click="to(item)" >
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
    name:'Swiper',
     props:{
     swipe:{
       type:Array,
       default: ()=>{ return [
            {pic:'http://p1.music.126.net/-SBn2-b5WftW3XGitVImkA==/109951165491826301.jpg?imageView&quality=89'},
            {pic:'http://p1.music.126.net/qeKz1G12SuyzXi_oxzlfeg==/109951165492221504.jpg?imageView&quality=89'},
            {pic:'http://p1.music.126.net/RCVmEnQ7uiHj0nxqxuHHoQ==/109951165492221662.jpg?imageView&quality=89'},
            {pic:'http://p1.music.126.net/nod7BlRDBomZfCtcuIwoTg==/109951165492665588.jpg?imageView&quality=89'},
            {pic:'http://p1.music.126.net/Nn5fFLjlDn1T1G0w2TJ5sw==/109951165492135859.jpg?imageView&quality=89'},
            {pic:'http://p1.music.126.net/rKP2A7Twr6scZQGqj7H7KA==/109951165492194549.jpg?imageView&quality=89'},
            {pic:'http://p1.music.126.net/wlpzyr6yu3bB93TR8lCKSQ==/109951165492198661.jpg?imageView&quality=89'}
        ] }
        
     },  
 },
 created(){},
 methods:{
   to(item){
     if(item.url!=null){
       console.log(item.url )
        window.location.href = item.url
     }else{
       if(item.targetType==1){
         this.$router.push({path:'/details',query:{id:item.targetId}})
       }
       if(item.targetType==10){
         this.$router.push({path:`/Dj${item.targetId}`,params:{id:item.targetId}})
       }
     }
   }
 },
}
</script>

<style>
.el-carousel{
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
}
img{
    width: 100%;
}
</style>