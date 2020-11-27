<template>
        <div id="nav">
            <div class="logo">
                <img src="http://images.shejidaren.com/wp-content/uploads/2014/09/021504BV4.jpg" alt="">
            </div>
            <ul id="nav-ul">
                <li><el-link :underline="false" @click="toindex">发现音乐</el-link></li>
                <li><el-link :underline="false" href="#">排行榜</el-link></li>
                <li><el-link :underline="false" href="#">歌单</el-link></li>
                <li><el-link :underline="false" href="#">歌手</el-link></li>
                <li><el-link :underline="false" href="#">视频</el-link></li>
                <li><el-link :underline="false" href="#">MV</el-link></li>
            </ul>
            <el-button circle icon="el-icon-search" />
            
        </div>
</template>

<script>
export default {
 name:'NavMenu',
 methods:{
     toindex(){
         this.$router.push('/')
     }
 }
}
</script>

<style scoped>
.el-container{
    background: #fff;
    box-shadow: 0px 2px 5px #cccccc;
}
#nav{
    padding: 0;
    margin: 0;
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    display: flex;

}
#nav-ul{
    display: flex;
    float: left;
    list-style: none;
    flex: 1;
    height: 100%;
    margin: 0;
    padding: 0;
    align-items: center;
}
#nav-ul li{
    float: left;
    display: block;
    min-width: 50px;
    text-decoration: none;
    margin: 10px;
}
#nav-ul li:hover{
    
    border-bottom: 2px solid rgb(245, 134, 8);
}
#nav a:hover{
color: rgb(245, 134, 8);    
}
.logo{
    height: 100%;
    width: 160px;
    margin-right: 50px;
}
.logo img{
     width: 100px;
     height: 100%   ;
     display: flex;
     vertical-align: middle;
 }
 .el-button{
     width: 40px;
     height: 40px;
     display: flex;
     place-self: center;
     
 }
</style>