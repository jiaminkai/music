<template>
	<div class="albumsbox">
		<div class="djitem" v-for="(item,index) in  this.albums" :key="index">
			<img :src="item.blurPicUrl" alt="">
			<div class="musicname">
				{{item.name}}
			</div>
			<div class="singer"> {{item.artists[0].name}}</div>
			<div class="time">{{item.publishTime}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		albums:{
			type:Array,
			default:function(){
				return []
			}
		}
	}
}
</script>

<style scoped>
.albumsbox{
	width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;

}
.djitem{
	width: 200px;
	font-size: 12px;
	text-align: left;
	padding-bottom: 30px;
	position: relative;
	margin-right: 10px;
	margin-right: 40px;
}

.djitem:nth-child(5n){
	margin-right: 0;
}
.djitem img{
	width: 170px;
	height: 170px;
	position: relative;
	z-index: 2;
	box-shadow: 1px 1px 5px #000;
	border-radius: 5px;
}
.djitem::before{
	content: "";
	display: block;
	width: 170px;
	height: 170px;
	border-radius: 50%;
	background: #000;
	position: absolute;
	top: 0;
	left: 30px;
}
.djitem::after{
	content: "";
	display: block;
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: sandybrown;
	position: absolute;
	top: 25px;
	left: 60px;
}
</style>