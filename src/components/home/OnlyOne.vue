<template>
    <div class="container">
        <div class="title">独家放送<i class="el-icon-arrow-right"></i> <span class="more">更多<i class="el-icon-circle-plus-outline"></i></span></div>
        <div class="duijiabox">
            <div class="duijiaitem" v-for="item in only" :key="item.id">
                <img :src="item.picUrl" alt="">
                <div class="name">{{item.name}}</div>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    name:'OnlyOne',
    props:{
        only:Array
    }
}
</script>

<style scoped>
.container{
    width: 1200px;
    margin: 0 auto;
}
.title{
    margin: 20px 0;
}
.duijiabox{
    display: flex;
    width: 100%;
    height: auto;
    justify-content: space-between;
    align-items: center;

}
.duijiaitem{
    width: 30%;
    height: 100%;
    text-align: left;

}
.duijiaitem img{
    width: 100%;
    height: 150px;
    border-radius: 10px;

}
.name{
    font-size: 12px;
    margin-top: 10px;
}
</style>