<template>
	<div class="Album">
		<h1 class="AlbumName">{{this.$route.query.name}}的全部专辑</h1>
		<div class="AlbumList">
			<div class="AlbumItem" v-for="(item,index) in this.list" :key="index">
				<div class="AlbumItemImg" @click="todetails(item.id)">
					<img :src="item.picUrl" alt="">
					<div class="AlbumItemImgBJ">
						<img id="ItemImgBJ" src="../assets/album.png" alt="">
					</div>
				</div>
				<div class="AlbumItemContent">
					<div class="AlbumItemname">{{item.name}}</div>
					<div class="AlbumSingers"><span v-for="(n) in item.artists" :key="n.id">{{n.name}}</span></div>
					<div class="AlbumTime">{{item.publishTime}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { SingersDj } from "../components/Singers/Singers";
export default {
	data() {
		return {
			list:[],
			size:50,
			page:0

		}
	},
	methods:{
		//获取专辑
		async getalbums(){
			console.log(this.size*this.page)
			const {data:data} = await SingersDj(this.$route.params.id,50,(this.size*this.page));
			console.log(data)
			data.hotAlbums.forEach(item=>{
				item.publishTime=this.$time(item.publishTime)
			})
			this.list =data.hotAlbums
		},
		//调往详情
		todetails(id){
			this.$router.push({name:`DatailAlbum`,params:{id}})
		}
	},
	created(){
		this.getalbums()
	}
}
</script>

<style scoped>
	.Album{
		width:1200px;
		margin: 40px auto;
	}
	.AlbumName{
		text-align:left;
		width:100%;
		position: relative;
		margin-left: -40px;
	}
	.AlbumList{
		width:100%;
		margin: 50px auto;
		display: flex;
		flex-wrap: wrap;
	}
	.AlbumItem{
		width:180px;
		
		margin-right: 60px;
		margin-bottom: 20px;
	}
	.AlbumItem:nth-child(5n){
		margin-right:0px;
	}
	.AlbumItemImg{
		width:180px;
		height:180px;
		position: relative;
	}
	.AlbumItemImg img{
		box-shadow: 2px 2px 10px #ccc;
		width:180px;
		height:180px;
		border-radius:5px;
	}
	.AlbumItemContent{
		text-align:left;
		line-height: 24px;
		font-size: 13px;
	}
	.AlbumSingers span{
		margin-right: 10px;
	}
	.AlbumItemImgBJ{
		position:absolute;
		width:180px;
		height:180px;
		top: 0;
		left:20px;
	}
	#ItemImgBJ{
		box-shadow: none;
	}
</style>