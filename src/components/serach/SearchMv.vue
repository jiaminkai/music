<template>
	<div class="mvbox">
		<div class="mvitem" v-for="(item,index) in this.mvs" :key="index">
			<img :src="item.cover" alt="">
			<div class="MvsitemTatle">{{item.name}}</div>
			<div class="playcount"><i class="el-icon-video-play"></i>{{item.playCount}}</div>
			<div class="playtime">{{item.duration}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		mvs:{
			type:Array,
			defaule:function(){
				return [];
			}
		}
	}
}
</script>

<style scoped>
	.mvbox{
		display: flex;
		flex-wrap: wrap;
		width: 1200px;
		margin:  0 auto;
	}
	.mvitem{
		width: 22%;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-right: 38px;
		margin-bottom: 10px;
	}
	.mvitem:nth-child(4n){
		margin-right: 0;
	}
	.mvitem img{
		width: 100%;
		height: 160px;
		border-radius: 10px;
		box-shadow: 2px 2px 5px #ccc;
	}
	.MvsitemTatle{
		font-size: 15px;
		text-align: left;
		margin-top: 15px;
		width: 90%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.playcount{
		position: absolute;
		font-size: 12px ;
		z-index: 999;
		padding: 0 10px;
		line-height: 28px;
		right: 13px;
		top: 5px;
		color: #fff;
		background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
		background-size: cover;
		height:28px;
	}
	.playcount::after{
		content: "";
		position: absolute;
		right: -10px;
		top: 0;
		background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
		background-size: cover;
		height: 28px;
		width: 10px;
		display: block;
	}
	.playtime{
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 35px;
		height: 35px;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 16px;
		text-align: right;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		line-height: 35px;
		padding-right: 15px;
		box-sizing: border-box;
	}
</style>