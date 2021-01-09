<template>
	<div class="paihangbangbox">
		<div class="TopWin">全球媒体榜</div>
		<div class="winlist">
			<div class="winitem" v-for="(item) in this.win" :key="item.id" @click="toTop(item.id)">
				<img :src="item.coverImgUrl" alt="">
				<div class="musictopname">{{item.name}}</div>
				<div class="musicuptime">{{item.updateFrequency}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:"Win",
	props:{
		win:{
			type:Array
		}
	},
	methods:{
		toTop(id){
			console.log(id )
			this.$router.push({
				path:`/TopMusics${id}`,
				params:id
			})
		}
	}
}
</script>

<style scoped>
.paihangbangbox{
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding: 0 40px;
	flex-wrap: wrap;	
	justify-content: space-between;
}
.TopWin{
	text-align: left;
	font-size: 24px;
	font-weight: 500;
	padding-bottom: 30px;
}
.winlist{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */
}
.winitem{
	width: 160px;
	font-size: 14px;
	text-align: left;
	margin-right: 29px;
	margin-bottom: 20px;
	
}
.winitem:nth-child(6n){

	margin-right: 0px;
}
.winitem img{
	width: 160px;
	height: 160px;
	box-shadow: 0px 2px 5px #cccccc;
	border-radius: 10px;
}
.winitem img:hover{
  box-shadow: 2px 0px 10px #000;
}
.musictopname{
	margin-top: 10px;
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.musicuptime{
	margin-bottom: 10px;
	font-size: 12px;
	margin-top: 5px;
	color: #999;
}
</style>