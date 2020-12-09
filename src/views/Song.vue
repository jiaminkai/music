<template>
	<el-container>
        <el-header>
            <nav-menu></nav-menu>
        </el-header>
        <el-main>
			<div class="container">
				<div class="SongAllTab">
					<div class="Title"><span>全部歌单<span class="iconfont" style="font-size:12px">&#xe65f;</span></span></div>
					<div class="TabulBox">
						<ul class="Tabul">
							<li class="Tabli" :class="indexs==index?'isactive':''" @click="tabchange(index)" v-for="(item,index) in this.tab" :key="index">{{item.name}}</li>
						</ul>
					</div>
				</div>
				<div class="SongBox">
					<div class="SongItem" @click="Song(item.id)" v-for="(item) in this.playlists" :key="item.id">
						<img :src="item.coverImgUrl" alt="">
						<div class="SongItemname">
							{{item.name}}
						</div>
					</div>
				</div>
			</div>
			
        </el-main>
        <el-footer>
            <el-progress :show-text="false" :percentage="percentage" color="#FFC125"></el-progress>
            <bottom   :like="music" ></bottom>
        </el-footer>
    </el-container>
</template>

<script>
import NavMenu from '../components/home/NavMenu.vue'
import bottom from '../components/home/paly.vue'
import {SongDetail,SongCate,SongHot,SongTop} from '../components/Song/Song';
export default {
	data(){
		return{
			music:[],
			percentage:0,
			alltab:[],
			tab:[],
			indexs:-1,
			playlists:[]
		}
	},
	components:{
		NavMenu,
		bottom
	},
	
	methods:{
		Song(id){
			console.log(id )
			this.$router.push({path:`/Dj${id}`})
		},
		tabchange(val){
			console.log(val )
			this.indexs=val
		},
		async getSongCate(){
			const {data:data} =await SongCate()
			this.alltab=data.sub
			console.log(this.tab )
		},
		async getSongHot(){
			const {data:data} =await SongHot()
			console.log(data )
			this.tab=data.tags
		},
		async getSongTop(){
			const {data:data} =await SongTop()
			console.log("aaa",data )
			this.playlists=data.playlists
		},
		SingersDetails(val){
			console.log(val )
		}
		
	},
	created(){
		this.music=eval(window.sessionStorage.getItem('music'))	
		this.getSongCate()
		this.getSongHot()
		this.getSongTop()
	}
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_7dope0j0ell.eot');
  src: url('//at.alicdn.com/t/font_2223549_7dope0j0ell.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_7dope0j0ell.svg#iconfont') format('svg');
}
.SongAllTab{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
}
.container{
	width: 1200px;
	margin: 20px auto;
}
.Title{
	width: 90px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	border-radius: 20px;
	border: 1px solid #000;
	font-size: 14px;
}
.TabulBox{
	height: 40px;
}
.Tabul{
	min-width: 500px;
	list-style: none;
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0;
}
.Tabli{
	float: left;
	/* height: 40px;
	line-height: 40px; */
	/* padding: 0 20px; */
}


.Tabli{
	text-decoration: none;
	border-right: 1px solid #cecece;
	padding: 0 20px;
	color: #000;
	font-size: 14px;
}
.Tabli:nth-child(10){
	border-right: none;
}
.Tabli a:nth-child(9){
	border-right: none;
}
.isactive{
	color: coral;
}
.SongBox{
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	margin-top: 40px;
}
.SongItem{
	width: 110px;
	height: auto;
	margin-right: 26px;
}
.SongItem img:hover{
	box-shadow: 0px 2px 10px;
	transform: translateY(-5px);
}
.SongItem:nth-child(9n){
	margin-right: 0px;
}
.SongItem img{
	width: 110px;
	height: 110px;
	border-radius: 5px;
}
.SongItemname{
	width: 100%;
	font-size: 12px;
	text-align: left;
	margin: 8px 0 16px;

}

</style>