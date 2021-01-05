<template>
	<div class="SearchDjBox">
		<div class="SearchDjItem" v-for="(item,index) in this.playlist" :key="index">
			<div class="img">
				<img :src="item.coverImgUrl" alt="">
			</div>
			<div class="name">{{item.name}}</div>
			<div class="playcount"><i class="el-icon-video-play"></i>{{item.playCount}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		playlist:{
			type:Array,
			default:function(){
				return [];
			}
		}
	}
}
</script>

<style scoped>
	.SearchDjBox{
		display: flex;
		flex-wrap: wrap;
		width: 1200px;
		margin: 0 auto;
	}
	.SearchDjItem{
		display: flex;
		flex-direction: column;
		width: 11%;
		margin-right:20px;
	}
	.SearchDjItem:nth-child(8n){
		margin-right:0;
	}
	.img{
		width: 100%;
		height: 130px;
		position: relative;

	}
	.img img{
		z-index: 999;
		position: relative;
		border-radius: 5px;
	}
	.img::after{
		content: "";
		display: flex;
		position: absolute;
		width: 100%;
		height: 80%;
		right: -5px;
		border-radius: 5px;	
		background: #a9a9a9;
		opacity: 0.6;
		top:50%;
		transform: translateY(-50%);
	}
	.name{
		font-size: 13px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
		padding-top: 10px;
		padding-bottom: 15px;
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
</style>