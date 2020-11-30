<template>
    <div class="paihangbangbox">
		<div class="toplist" v-for="(item,index) in this.array" :key="index">
			<img :src="item.coverImgUrl" alt="">
		</div>	
	</div>

</template>

<script>
export default {
	name:'Topneidi',
	props:{
		array:{
		type:Array
		}
	}
}

</script>

<style scoped>
.paihangbangbox{
	margin: 0 auto;
	padding: 0 100px;
	/* width: 100%; */
	display: flex;
	flex-wrap: wrap;	
	justify-content: space-between;
}
.toplist{
	width: 29%;
	height: 180px;
	background: darkgrey;
	margin-bottom: 20px;
	padding: 10px;
}
.toplist img{
	flex: 1;
	height: 100%;
	
}
</style>