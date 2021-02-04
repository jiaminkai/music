<template>
	<div class="containter">
		<div class="Title">网易云热评</div>
		<div class="containt">
			<div class="eventleft">
				<!-- <div class="desc">我们生活在这个地球上，音乐，拉近了我们的距离。听着云村音乐，看着一条条发自内心的评论，你会发现，原来，这个世界上还有着很多跟自己相似的灵魂。每个人，都有他们不平凡的经历，他们都在云村留下了自己的青春回忆。下面，让我们一起来欣赏那些相似的灵魂吧！</div> -->
				<div class="Wall">
					<div class="wallevevt" v-for="(item,index) in this.event" :key="index" @click="toDetails(item)">
						<div class="wallevevtbot"></div>
						<div class="wallevevttop"></div>
						<div class="wallevevtcontent">{{item.content}}</div>
						<div class="wallevevtuser">
							<span class="userdesc">来自网易云音乐用户——————{{item.simpleUserInfo.nickname}}</span>
							<img  class="usericon" :src="item.simpleUserInfo.avatar" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {GetWall,WallComment,Song} from '../components/Wall/Wall';
export default {
	data(){
		return{
			event:[]
		}
	},
	methods:{
		async	getwallevent(){
			const {data:data} =await GetWall()
			console.log(data.data )
			this.event=data.data
		},
		toDetails(item){
			var song = new Song(item.simpleResourceInfo)
			
			this.$router.push({
				name:'CWDetail',
				params:{data:song,id:item.threadId}
				})
		}
	},
	created(){
		this.getwallevent()
	}
}
</script>

<style scoped>
	.containter{
		width: 1200px;
		margin: 30px auto;
		overflow: hidden;
		background:rgba(230, 26, 26);
	}
	.containt{
		width: 1250px;
		padding: 0 25px;
		box-sizing: border-box;
		height: 600px;
		/* border: rgb(230, 26, 26)  10px solid; */
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		transition: all ease-in ;
	}
	.eventleft{
		position: relative;
		/* background: rgba(0,0,0,.5); */
		width: 100%;
		margin: 40px auto;
		z-index: 9;
		
	}
	.Title{
		text-align: left;
		padding: 20px;
		padding-left: 20px;
		font-size: 25px;

		color: rgb(107, 104, 104);
	}
	.Title:hover{
		opacity: .3;
		color: rgb(54, 52, 52);
	}
	.desc{
		display: flex;
		width: 80%;
		text-align: left;
		position: absolute;
		top: 80px;
		left: 50%;
		transform: translateX(-50%);
	}
	.Wall{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 30px;
		box-sizing: border-box;
	}

	.wallevevt{
		width: 50%;
		padding: 20px;
		min-height: 120px;
		text-align: left;
		border: 4px solid #ccc;
		margin-bottom: 60px;
		display: flex;
		flex-direction: column;
		position: relative;
		font-size: 24px;
		justify-content: space-around;
		background: #fff;
	}
	.wallevevt:nth-child(2n+1):before{
		content: "";
		width: 100%;
		display: flex;
		min-height: 120px;
		border: 4px solid #ccc;
		position: absolute;
		top: -20px;
		right: -20px;
		z-index: -1;
		background: #fff;
	}
	.wallevevt:nth-child(2n):before{
		content: "";
		width: 100%;
		display: flex;
		min-height: 120px;
		border: 4px solid #ccc;
		position: absolute;
		top: -20px;
		left: -20px;
		z-index: -1;
		background: #fff;
	}
	.wallevevtbot,.wallevevttop{
		width: 0;
		height: 0;
		overflow: hidden;
		position: absolute;
	}
	.wallevevtcontent{
		font-size: 18px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.wallevevt:nth-child(2n+1) .wallevevtbot{
		border-width: 22px;
		border-style: dashed dashed solid ;
		border-color: transparent   transparent transparent #ccc;
		left: -4px;
		bottom: -43%;
		transform: translateY(-100%);
		
	}
	.wallevevt:nth-child(2n+1) .wallevevttop{
		border-width: 16px;
		border-style: dashed dashed solid ;
		border-color: transparent transparent transparent #fff;
		left: 0px;
		bottom: -29.4%;
		transform: translateY(-100%);
	}
		.wallevevt:nth-child(2n) .wallevevtbot{
		border-width: 22px;
		border-style: dashed dashed solid ;
		border-color: transparent  #ccc transparent transparent ;
		right: -4px;
		bottom: -42.5%;
		transform: translateY(-100%);
	}
	.wallevevt:nth-child(2n) .wallevevttop{
		border-width: 16px;
		border-style: dashed dashed solid ;
		border-color: transparent #fff transparent transparent ;
		right: 0px;
		bottom: -28.4%;
		transform: translateY(-100%);
	}
	.wallevevt:nth-child(2n+1){
		margin-right: auto;
	}
	.wallevevt:nth-child(2n){
		
		margin-left: auto;
	}
	.wallevevtuser{
		display: flex;
		margin-top: 20px;
	}
	.userdesc{
		font-size: 14px;
		place-self: center;
		margin-right: 10px;
	}
	.usericon{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
</style>