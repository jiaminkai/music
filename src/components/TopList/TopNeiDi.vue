<template>
    <div class="paihangbangbox">
	<div class="toplist" @click="toTop(item.id)"   v-for="(item,index) in this.array" :key="index">
		<img class="mobanimg" :src="item.coverImgUrl" alt=""/>
		<div class="moban">
			<div class="topitemimg">
				<img :src="item.coverImgUrl" alt="">
			</div>
			<div class="topitems">
				<div class="itemsuser" v-for="(n,index) in item.tracks" :key="index"  @click="PlayMusic(item.id)">
					<span class="index">{{index+1}}</span>
					<div class="indexitem">
						<span>{{n.first}}</span>
						<span>{{n.second}}</span>
					</div>
				</div>
			</div>
			<div class="topleft">
				{{item.name}}
				<span class="iconfont">&#xe65f;</span>
			</div>
			<div class="toprigth">
				{{item.updateFrequency}}
			</div>
		</div>
		</div>	
	</div>

</template>

<script>
import { TopGuan } from "./TopList";
export default {
	name:'Topneidi',
	props:{
		array:{
			type:Array
		},
	},
	data(){
		return{
			dataarray:[],
			dataimg:[],
			bfimg:[]
		}
	},
	methods:{
		toTop(id){
			console.log(id )
			this.$router.push({
				path:`/TopMusics${id}`,
				params:id
			})
		},
		abuju(){
			
			this.array.forEach(item=>{
				TopGuan(item.id).then(res=>{
					console.log(res.data.playlist.subscribers )

				})
			})
		},
		PlayMusic(id){
			console.log(id )
		}
	},
	created(){
		this.abuju()
	}

}

</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_7dope0j0ell.eot');
  src: url('//at.alicdn.com/t/font_2223549_7dope0j0ell.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.svg#iconfont') format('svg');
}
.paihangbangbox{
	margin: 0 auto;
	padding: 0 80px;
	/* width: 100%; */
	display: flex;
	flex-wrap: wrap;	
	justify-content: space-between;
}
.toplist{
	width: 32%;
	height: 170px;
	margin-bottom: 20px;
	display: flex;
	position: relative;
	z-index: 9;
	background: #fff;
}
.topitemimg{
	width: 140px;
	margin: 15px 20px;
}
.topitemimg img{
	width: 100%;
	height: 100%;
}
.moban{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(255, 255, 255, 0.6);
	z-index: 6;
}
.mobanimg{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 6;
}
.topitems{
	width: 150px;
	position: absolute;
	bottom: 5px;
	right: 0;
}
.itemsuser{
	display: flex;
	height: 35px;
	padding: 4px 0;
	
}
.index{
	display: block;
	width: 20px;
	line-height: 40px;	
	font-size: 14px;
	color: #999;
	font-weight: 700;
}
.indexitem{
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
}
.indexitem span {
	width: 100%;
	display: block;
	font-size: 14px;
	text-align: left;
}
.topleft{
	background: #000;
	position: absolute;
	top: 0px;
	left: 0;
	min-width: 80px;
	height: 40px;
	color: #fff;
	line-height: 40px;
	font-size: 18px;
	padding: 0 8px;
}
.toprigth{
	position: absolute;
	font-size: 12px;
	color: #fff;
	min-width: 60px;
	top: 0;
	right: 0;
	background: #000;
	padding: 0 5px;
	border-bottom-left-radius:5px;
	border-top-right-radius: 5px;
}
</style>