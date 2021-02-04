<template>
<div class="seach">
	<div class="seachtop">
		<el-input v-model="input" placeholder="请输入内容" @keyup.enter.native="aaa">
			<template slot="append">
				<div class="el-icon-search"></div>
			</template>
		</el-input>
	</div>
	<div class="results">
		<div class="resbox">
			<div class="searchtitlr">搜索结果</div>
			<ul class="SearchCollection">
				<li :class="[this.index==1?'activetab':'']" @click="changetab(1)">单曲</li>
				<li :class="[this.index==100?'activetab':'']" @click="changetab(100)">歌手</li>
				<li :class="[this.index==10?'activetab':'']" @click="changetab(10)">专辑</li>
				<li :class="[this.index==1004?'activetab':'']" @click="changetab(1004)">MV</li>
				<li :class="[this.index==1000?'activetab':'']" @click="changetab(1000)">歌单</li>
			</ul>
		</div>
		<div class="CollectionList" v-if="this.index==1" v-loading="loading">
			<music-song :song="this.Song"></music-song>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[30, 50, 100]"
				:page-size="30"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
		<div class="CollectionList" v-if="this.index==100">
			<search-singer :artists="this.artists" ></search-singer>
		</div>
		<div class="CollectionList" v-if="this.index==10">
			<search-albums :albums="this.albums"></search-albums>
		</div>
		<div class="CollectionList" v-if="this.index==1004">
			<search-mv :mvs="this.mvs"></search-mv>
		</div>
		<div class="CollectionList" v-if="this.index==1000">
			<search-dj :playlist="this.playlists"></search-dj>
		</div>

	</div>
</div>
</template>

<script>

import MusicSong from '../components/serach/Search.vue';
import SearchSinger from '../components/serach/SearchSinger.vue';
import SearchMv from '../components/serach/SearchMv.vue';
import SearchDj from '../components/serach/SearchDj.vue'
import SearchAlbums from '../components/serach/SearchAlbums.vue';
import { Search } from "../components/serach/Search";
import {SingersSong,Song } from "../components/Singers/Singers";


export default {		
	name:'Search',
	data(){
		return{
			input:"王一博",
			index:1,
			Song:[],
			artists:[],
			albums:[],
			mvs:[],
			playlists:[],
			total:0,
			count:30,
			offset:0,
			loading:true,
		}
	},
	components:{MusicSong,SearchSinger, SearchAlbums,SearchMv,SearchDj},
	methods:{
		// 搜索结果切换
		changetab(index){
			this.index=index
			console.log(index )
			this.GetSearch()
		},
		// 获取搜索到的单曲
		async	GetSearch(){
			const {data:data} = await Search(this.input,this.index,this.count,this.offset)
			if(this.index==1){
				this.total=data.result.songCount 
				var a =[]
				data.result.songs.forEach(item => {
					var h=Math.floor(item.dt/1000/60)<10?"0"+Math.floor(item.dt/1000/60):Math.floor(item.dt/1000/60);
					var m =Math.floor(item.dt/1000%60)<10?"0"+Math.floor(item.dt/1000%60):Math.floor(item.dt/1000%60);
					item.dt =h+":"+m;
					SingersSong(item.id).then(res=>{
						item.url=res.data.data[0].url
						var c = new Song(item);
						a.push(c);
					})
				});
				this.Song=a
			}else if(this.index==100){
				this.total=data.result.artistCount 
				this.artists = data.result.artists
			}else if(this.index==10){
				this.total=data.result.albumCount 
				this.albums = data.result.albums
			}else if(this.index==1004){
				this.total=data.result.mvCount;
				
				this.mvs=data.result.mvs
				this.mvs.forEach(item=>{
					item.playCount = item.playCount>1000000?Math.floor(item.playCount/1000000)+"百万":item.playCount>10000?Math.floor(item.playCount/10000)+"万":item.playCount
					item.duration=(Math.floor(item.duration/1000/60)<10?"0"+Math.floor(item.duration/1000/60):Math.floor(item.duration/1000/60))+":"+(Math.floor(item.duration/1000%60)<10?"0"+Math.floor(item.duration/1000%60):Math.floor(item.duration/1000%60))
					console.log(item.playCount,item.duration )
				})

			}else if(this.index==1000){
				this.total=data.result.playlistCount;
				this.playlists=data.result.playlists
				this.playlists.forEach(item=>{
					item.playCount = item.playCount>100000000?Math.floor(item.playCount/100000000)+"亿":item.playCount>1000000?Math.floor(item.playCount/1000000)+"百万":item.playCount>10000?Math.floor(item.playCount/1000000)+"万":item.playCount
				})
			}

			this.loading=false
		},
		// 切换当前页的数量
		handleSizeChange(val){
			this.offset = val
			this.GetSearch()
		},
		handleCurrentChange(val){
			console.log("当前页数",val )
			this.offset = this.offset*this.count
			this.GetSearch()
		},
		// 回车搜索
		aaa(){
			console.log("回车事件" )
			this.GetSearch()
		}
		
	},
	created(){
		
		this.input=this.$route.query.text!=""?this.$route.query.text:"2020年度听歌报告"
		this.GetSearch()
	}

}
</script>

<style scoped>
.seachtop{
	height: 280px;
	width: 100%;
	background: url('../assets/seachbg.jpg') center center no-repeat;
	background-attachment:fixed;
	display: flex;
	justify-content: center;
	align-items: center;
}
.results{

	width: 100%;
}
.el-input{
	width: 35%!important;
	height: 40px !important;
	margin: 0;
	border: none;
	border-radius: 5px;
	padding-left: 20px;
	box-sizing: border-box;
}
.el-icon-search{
	border: none !important;
}
.resbox{
	display:flex;
	align-items: center;
	width: 1200px;
	margin: 0 auto;
	padding: 40px 0;
}
.searchtitlr{
	font-size: 20px;
	font-weight: 600;
	line-height: 40px;
}
.SearchCollection{
	display: flex;
	list-style: none;
	line-height: 40px;
	padding-left: 40px;
}
.SearchCollection li{
	font-size: 15px;
	color:darkgrey;
	padding: 0 18px;
	margin: 0 5px;

}
.activetab{
	border-bottom: 4px solid salmon;
}

.CollectionList{
	margin-top: 60px;
	width: 1200px;
	margin: 0 auto;

}
</style>