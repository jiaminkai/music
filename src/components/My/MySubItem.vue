<template>
	<div class="subbox">
		<div class="subboxtop">
			<div class="title">{{this.loginchange.nickname}}的播放历史</div>
			<ul class="ulnav">
				<li class="linav" @click="changenav(0)" :class="[this.index==0?'linavs':'']">歌曲</li>
				<li class="linav" @click="changenav(1)" :class="[this.index==1?'linavs':'']" >视频/MV</li>
			</ul>
		</div>
		<div v-if="this.index==0" class="subboxcontent">
			<div class="">
				<el-table
					:data="music"
					@row-click="rowclick"
				>
					<el-table-column
						type="index"
						label="#"
					></el-table-column>
					<el-table-column
						label="歌曲"
						prop="musicname"
						min-width="200"
					></el-table-column>
					<el-table-column
						label="歌手"
						prop="user"
						min-width="200"

					></el-table-column>
					<el-table-column
						label="专辑"
						prop="djname"
						min-width="200"

					></el-table-column>
					<el-table-column
						label="时长"
						width="80"
						prop="playtime"
					></el-table-column>

				</el-table>
			</div>
		</div>
		<div v-if="this.index==1" class="subboxcontent">
			<div class="itembox" v-for="(item,index) in this.video" :key="index">
				<img :src="item.mlogBaseData.coverUrl" alt="">
				<div class="userbox">
					<span>{{item.mlogExtVO.artistName}}:</span>
					<span>{{item.mlogBaseData.text}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
	
<script>
import { GetMusic,Music } from "../home/home";
export default {
	name:'MySubItem',
	data(){
		return{
			index:0,
			song:[],
			userId:'',
			music:[],
			video:[],
			username:""
		}
	},
	methods:{
		// 处理数据
		getoldmusic(){
			this.song.forEach(item=>{
				item.song.dt= (Math.floor(item.song.dt/1000/60)<10?"0"+Math.floor(item.song.dt/1000/60):Math.floor(item.song.dt/1000/60))+":" +(Math.floor(item.song.dt/1000%60)<10?"0"+Math.floor(item.song.dt/1000%60):Math.floor(item.song.dt/1000%60))
			GetMusic(item.song.id).then(res=>{
				var c = new Music(item.song,res.data.data[0].url)
				this.music.push(c)
				})
			})
		},
		// 切换tab栏
		changenav(val){
			this.index=val	
		},
		// 点击表行事件
		rowclick(row){
			console.log(row )
			var list =JSON.parse(sessionStorage.getItem('music'));
			list.unshift(row)
			this.resSetItem('music',JSON.stringify(list))
		},
	},
	created(){
		this.userId=this.$route.params.userId
		this.song=this.$route.params.song
		this.video=this.$route.params.video
		this.loginchange=JSON.parse(sessionStorage.getItem('loginchange'))
		this.getoldmusic()
	}
}
</script>

<style scoped>
.subbox{
	width: 1200px;
	margin: 0 auto;
	margin-top: 40px;
	min-height: 1200px;
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
	padding: 8px ;
	box-sizing: border-box;
	
}
.linavs{
	border-bottom: 3px solid #000;
}
.subboxcontent{
	width: 1200px;
	display: flex;
	flex-wrap: wrap;
}
.itembox{
	position: relative;
	width: 17%;
	margin-right: 30px;
	text-align: left;
	font-size: 14px ;
	

}
.itembox img{
	width: 100%;
	height: 130px;
	border-radius: 10px;
}
.itembox span{

	padding: 10px 0;
	display: block;
}
.userbox{
	display: flex;
	justify-content: space-between;
}
.userbox span:nth-child(1){
	font-size: 15px;
}
.userbox span:nth-child(2){
	font-size: 14px;
	color: #6c6c6c;
	width: 60%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>