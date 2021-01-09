<template>
	<div class="subbox">
		<div class="subboxtop">
			<div class="title">{{this.loginchange.nickname}}的收藏</div>
			<ul class="ulnav">
				<li class="linav" v-for="(item,n) in this.tab" :key="n" @click="changenav(n)" :class="[index==n?'linavs':'']">{{item}}</li>
			</ul>
		</div>
		<!-- 歌曲 -->
		<div class="subboxcontent" v-if="this.index==0">
			<div class="show" v-if="this.like.length==0"></div>
			<div class="table" v-else>
				<div class="allplay" @click="allplay">播放全部</div>
			<el-table 
				:data="this.like"
				v-loading="loading"
				@row-click="rowcilck"
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
		<!-- 专辑 -->
		<div class="subboxcontent" v-if="this.index==1">
			<div class="show" v-if="this.myfoll.length==0"></div>
			<div v-else>

			</div>
		</div>
		<!-- 艺人 -->
		<div class="subboxcontent" v-if="this.index==2">
			<div class="show" v-if="this.artist.length==0"></div>
			<div class="list singer" v-else>
				<div class="singersbox" v-for="(item) in this.artist" :key="item.id">
					<img :src="item.img1v1Url" alt="">
					<div class="userdesc">
						<div>
							<span>{{item.name}}</span>
							<span>{{item.trans}}</span>
						</div>
						<div>
							<span>{{item.albumSize}}个专辑</span>
							<span>{{item.mvSize}}个MV</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- MV -->
		<div class="subboxcontent" v-if="this.index==3">
			<div class="show" v-if="this.mv.length==0"></div>
			<div class="list" v-else>
				<div class="itembox" v-for="(item,index) in this.mv" :key="index">
					<img class="mvimg" :src="item.coverUrl" alt="">
					<div  class="userbox">
						<span>{{item.creator[0].userName}}:</span>
						<span>{{item.title}}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 歌单 -->
		<div class="subboxcontent" v-if="this.index==4">
			<div class="show" v-if="this.playlist.length==0"></div>
			<div v-else>
				<div class="playitem" >
					<div class="itembox" v-for="(item, index) in this.playlist" :key="index" @click="gedan(item.id)">
						<div class="img">
							<img :src="item.coverImgUrl" alt="">
						</div>
						
						<el-tooltip class="item" effect="dark" :content="item.name" placement="bottom">
							<div class="name">{{item.name}}</div>
						</el-tooltip>
						<div class="tab" v-if="item.tags!=undfined">
							<span v-for="(item,index) in item.tags" :key="index">#{{item}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
	
<script>
import { MyFolloweds,MyArtist,MySublist,MyTopic,MyPlaylist } from "./my";
export default {
	name:'MySubItem',
	data(){
		return{
			index:0,
			tab:['歌曲','专辑','艺人','MV','歌单'],
			myfoll:[],
			mv:[],
			artist:[],
			like:[],
			playlist:[],
			loading:true,
			loginchange:{}
		}
	},
	created(){
		this.GetSubData()
		this.loginchange=JSON.parse(sessionStorage.getItem("loginchange"))
	},
	methods:{
		changenav(val){
			this.index=val	
		},
		async GetSubData(){
			// 收藏的mv
			const{data:mysublist} =await MySublist()
			// 收藏歌手列表
			const{data:myartist} =await MyArtist()
			//收藏的专辑 
			const {data:myfoll} =await MyFolloweds()
			// 收藏的歌单
			const {data:playlist} = await MyPlaylist(this.loginchange.userId)
			
			console.log(playlist)
			this.playlist =playlist.playlist
			this.mv=mysublist.data
			this.artist=myartist.data
			// 收藏的音乐
			this.like=this.$store.state.music
			
			this.loading=false
		},
		// 播放音乐
		rowcilck(row){
			console.log(row )
			var list =JSON.parse(sessionStorage.getItem('music'));
			list.unshift(row)
			this.resSetItem('music',JSON.stringify(list))
		},
		//播放全部
		allplay(){
			var list =JSON.parse(sessionStorage.getItem('music'))||[];
			list.unshift(...this.like)
			this.resSetItem('music',JSON.stringify(list))

		},
		//跳转歌单
		gedan(id){
			this.$router.push('/Dj'+id+'')
		},

		
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
	padding: 0 8px ;
	line-height: 43px;
	height: 43px;
}
.linavs{
	border-bottom: 3px solid #000;
}
.show{
	width: 100%;
	height: 300px;
	background: url('../../assets/404.png') no-repeat center;
}
.playitem{
	display: flex;
	flex-wrap: wrap;
}
.itembox{
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 20px 0;
	margin-right: 40px;
	width: 170px;
}
.name{
	width: 80%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	padding: 8px 0;
	font-size: 14px;
	font-weight: 600;
}
.img{
	width: 170px;
	height: 170px;
	position: relative;
}
.img img{
	box-shadow: 0px 0px 5px #ccc;
	position: relative;
	z-index: 9;
}
.img::after{
	content: "";
	width: 80%;
	height: 87%;
	display: block;
	position: absolute;
	background: #d9d9d9;
	top: 50%;
	right: -6px;
	border-radius: 2px;
	transform: translateY(-50%);
}
.img::before{
	content: "";
	width: 80%;
	height: 77%;
	display: block;
	position: absolute;
	background: #e6e6e6;
	top: 50%;
	right: -10px;
	border-radius: 2px;
	transform: translateY(-50%);
}

.tab{
	color: #ff410f;
	font-size: 12px;
}
.tab span{
	margin-right: 15px;
}

.list{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}
.itembox{
	width: 17%;
	padding-bottom: 20px;
} 
.mvimg{
	width: 100%;
	height: 137px;
	padding-bottom: 15px;

}
.userbox{
	font-size: 16px;
}
.userbox span:nth-child(2){
	font-size: 14px ;
	color: #ccc;
}

.singersbox{
	display: flex;
	width: 22%;
	padding: 15px;
	margin-right: 40px;
}
.singersbox img{
	width: 70px;
	height: 70px;
	margin-right: 30px;
}
.userdesc{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.userdesc div:nth-child(1){
	text-align: left;
	font-weight: 600;

}
.userdesc div:nth-child(2){
	text-align: left;
	font-size: 13px;
	color: #666;
}
.userdesc div:nth-child(1) span:nth-child(2){
	margin-left: 10px;
	font-size: 14px;
	color: #ccc;
}
.userdesc div:nth-child(2) span:nth-child(2){
	margin-left: 20px;
}
.allplay{
	width: 80px;
	padding: 8px 15px;
	border-radius: 20px;
	background: #ff410f;
	color: #fff;
	margin-bottom: 15px;
}
</style>