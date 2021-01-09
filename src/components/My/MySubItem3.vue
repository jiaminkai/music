<template>
	<div class="subbox">
		<div class="subboxtop">
			<div class="title">{{this.title}}</div>
			<ul class="ulnav">
				<li class="linav"  v-for="(item,n) in this.tab" :key="n" @click="changenav(n)" :class="[indexs==n?'linavs':'']" >{{item}}</li>
			</ul>
		</div>
		<div class="subboxcontent" v-if="this.indexs==0">
			<div class="show" v-if="true"></div>
			<div v-else>

			</div>
		</div>
		<div class="subboxcontent" v-if="this.indexs==1">
			<div class="show" v-if="true"></div>
			<div v-else>

			</div>
		</div>
	</div>
</template>
	
<script>
export default {
	name:'MySubItem',
	data(){
		return{
			title:'已购音乐',
			tab:['歌曲','专辑'],
			indexs:0,
		}
	},
	methods:{
		changenav(val){
			console.log(val )
			this.indexs=val
		}
	},
	created(){
		this.index=this.$route.params.type
	}
}
</script>

<style scoped>
.subbox{
	width: 1200px;
	margin: 0 auto;
	margin-top: 40px;
	
}
.subboxtop{
	display: flex;
	align-items: center;
}
.title{
	font-size: 24px;
}
.ulnav{
	list-style: none;
	font-size: 18px;
}
.linav{
	float: left;
	margin-right: 20px;
	padding: 0 8px ;
	line-height: 43px;
	height: 43px;
}
.linavs{
	border-bottom: 3px solid #000;
}
.show{
	width: 100%;
	height: 400px;
	background: url('../../assets/404.png') no-repeat center;
}
</style>