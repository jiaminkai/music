<template>
	<div class="container">
		
		<!-- <div class="left"></div> -->
		<div class="context"></div>
		<!-- <div class="right"></div> -->
	</div>
</template>

<script>
import { WallComment } from "../components/Wall/Wall";
export default {
	name:'CloudWallDetails',
	data(){
		return{
			hotcomment:[],
			topcomment:[],
			song:[],
			more:false,
			moreHot:false,
			total:0,
			userId:""
		}

	},
	methods:{
		async	getDate(){
			const {data:data} =await WallComment(this.$route.params.id)
			console.log(data )
			this.hotcomment=data.comments
			this.topcomment=data.hotComments
			this.total=data.total
			this.userId=data.userId
			this.more=data.more
			this.moreHot=data.moreHot
		},
		
	},
	created(){
		this.song=this.$route.params.data
		this.getDate()
	}
}
</script>

<style scoped>
.container{
	margin: 100px auto;

	height: 100px;
	background: lightgreen;

}

.context{
	/* background: blanchedalmond;
	width: 100%; */
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 10%;
	margin: auto;
	width: 200px;
	height: 200px;
	background: lightcoral;
	flex-direction: column;

}
.left{
	position: relative;
	margin-left: -100%;
	left: -100px;
	background: lightcoral;
	width: 100px;
	
}
.right{
	float: left;
	width: 200px;
	height: 100px;
	position: relative;
	background: lightblue;
	margin-left: -200px;
	left: 200px;

}
.context,.right,.left{
	float: left;
	height: 100px;
}
</style>