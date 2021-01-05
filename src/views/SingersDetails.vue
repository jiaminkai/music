<template>
	<el-container>
        <el-main>
            <div class="container">
				<div class="left">
					<div class="aidesc">
						<img :src="this.array.artist.cover" alt="">
						<div >
							<div class="descTitle">
								歌手介紹
							</div >
							<div class="desc">{{this.array.artist.briefDesc}}</div>
							<div class="move">更多</div>
						</div>
					</div>
				</div>


				<div class="mian">
					<div class="username">
						<div class="icon">
							<span  v-if="this.array!=undefined">{{this.array.artist.name}}</span>  
						</div>
						<div class="signature" v-if="this.array.user" >{{this.array.user.description}}</div>
						<div class="tabs" >
							<span v-for="(item,index) in this.array.artist.identifyTag" :key="index">#{{item}}</span>
						</div>
						<div class="Btnbox">
							<div @click="allplay2" ><span class="iconfont">&#xe630;</span><span>全部播放</span></div>
							<div><span class="iconfont">&#xe607;</span><span>1314159</span></div>
							<div><span class="iconfont">&#xe785;</span><span>分享</span></div>
							<div><span class="iconfont">&#xe608;</span><span>手机试听</span></div>
						</div>
					</div>
					<el-table
						:data="this.songs"
						stripe
						@row-click="rowclick"
					>
						<el-table-column
							type="index"
							width="50px"
							>
						</el-table-column>
						<el-table-column
							label="歌曲"
							min-width="120px"
							prop="musicname"
							>
						</el-table-column>
						<el-table-column
							label="歌手"
							min-width="80px"
							prop="user"
							>
						</el-table-column>
						<el-table-column
							label="专辑"
							min-width="120px"
							prop="djname"
							>
						</el-table-column>
						<el-table-column
							label="时长"	
							min-width="60px"
							prop="playtime"						
							>
							
						</el-table-column>
						<el-table-column
							idth="60px"
							label="播放"
							>
							<template>
								<span v-if="true" class="iconfont">&#xe630;</span>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						background
						layout="prev, pager, next"
						@current-change="handleCurrentChange"
						>
					</el-pagination>
					<div class="dj">
						<div class="djname"><span>专辑</span><span>全部<i class="el-icon-arrow-right"></i></span></div>
						<div class="djbox">
							<div class="djitem" v-for="(item,index) in  this.SingersDj" :key="index">
								<img :src="item.blurPicUrl" alt="">
								<div class="musicname">
									{{item.name}}
								</div>
								<div class="singer"> {{item.artists[0].name}}</div>
								<div class="time">{{item.publishTime}}</div>
							</div>
						</div>
					</div>
					<div class="mv" v-if="this.mvs!=undefined">
						<div class="djname"><span>MV</span><span>全部<i class="el-icon-arrow-right"></i></span></div>
						<div class="MVbox">
							<div class="MVitem" v-for="(item,index) in this.mvs" :key="index">
								<img :src="item.imgurl16v9" alt="">
								<div class="artistName">{{item.name}}</div>
								<div class="singersname">{{item.artistName}}</div>
							</div>
						</div>
					</div>
					<div class="singerss" v-if="this.smimt!=undefined">
						<div class="djname"><span>相似歌手</span><span>更多<i class="el-icon-arrow-right"></i></span>
						</div>
						<div class="singerbox">
								<div class="singerssitem" v-for="(item,index) in this.smimt" :key="index">
									<img :src="item.img1v1Url" alt="">
									<div class="artistName">{{item.name}}</div>
									<div class="singersname" v-if="item.alias!=[]">{{item.alias[0]}}</div>
								</div>
							</div>
					</div>
				</div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import MusicItem from '../components/MusicDetails/Musicitem.vue';
import { SingersDetails,Singers,SingersMusic,SingersDj,SingersMV,SimiSinger,Song,SingersSong} from "../components/Singers/Singers";
export default {
	name:'SingersDetails',
	data(){
		return{
			SingersId:0,
			music:[],
			array:[],
			numindex:1,
			songs:[],
			SingersDj:[],
			mvs:[],
			smimt:[]
		}
	},

	computed:{
	},
	methods:{
		async	getSingersDetails(id){
			const {data:data} =await SingersDetails(id)
			console.log("data",data.data )
			this.array = data.data
		},
		
		async getSingersMusic(id,limit,num){
			var list =[];
			const {data:data} =await SingersMusic(id,limit,num)
			console.log("music",data.songs)
			data.songs.forEach(item => {
				var m=Math.floor(item.dt/1000/60)<10?"0"+Math.floor(item.dt/1000/60):Math.floor(item.dt/1000/60)
				var s =Math.floor(item.dt/1000%60)<10?"0"+Math.floor(item.dt/1000%60):Math.floor(item.dt/1000%60)
				item.dt=m+":"+s
				SingersSong(item.id).then((res)=>{
					item.url  = res.data.data[0].url
					var a = new Song(item)
					list.push(a)
				})

			});
			this.songs=list

		},
		async GetSingersDesc(id){
			const {data:data}  = await	SingersDj(id)
			this.SingersDj=data.hotAlbums
			this.SingersDj.forEach(item=>{
				var n = item.publishTime ;
				var date = new Date(n);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				item.publishTime = (Y + M + D);
			})
			console.log("lsita",data )
		},
		async GetMV(id){
			const {data:data}  = await SingersMV(id)
			console.log("mvs",data.mvs)
			this.mvs = data.mvs.slice(0,4)
			// this.SingersDj=data.hotAlbums
		},
		async GetSimi(id){
			const {data:data}  = await SimiSinger(id)
			console.log("mimt",data)
			this.smimt = data.artists.slice(0,5)
			// this.SingersDj=data.hotAlbums
		},
		allplay2(){
			console.log("播放全部" )
			var c =JSON.parse(sessionStorage.getItem('music'));
			if(c.length!=0){
				c.unshift(...this.songs)
			}else{
				c=[];
				c.unshift(...this.songs)
			}
		this.resetSetItem('music', JSON.stringify(c));
        console.log("存入音乐" )
		},
		// 播放单曲
		rowclick(row,column,event){
			console.log(row )
			var c =JSON.parse(sessionStorage.getItem('music'));
			if(c.length!=0){
			c.unshift(row)
			}
			else{
				c=[];
				c.unshift(row)
			}
			this.resetSetItem('music', JSON.stringify(c));
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.limit=val
			this.getSingersMusic(this.SingersId,this.numindex)
		},
		handleCurrentChange() {
			this.numindex +=1
			this.getSingersMusic(this.SingersId,this.numindex)
		}
	},
	created(){
		this.SingersId = this.$route.params.id
		console.log("this.SingersId",this.SingersId )
		this.getSingersDetails(this.SingersId)
		this.getSingersMusic(this.SingersId,this.numindex)
		this.GetSingersDesc(this.SingersId)
		this.GetMV(this.SingersId)
		this.GetSimi(this.SingersId)
	}
}
</script>

<style scoped>
.container{
	width: 1200px;
	margin: 0 auto;
	display: flex;
	padding-bottom: 100px;
	background: #fff;
}
.desc{
	width: 200px;
    text-align: left;
    white-space:inherit;
    font-size: 14px;
    color: grey;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 10; 
    line-height: 20px;

}
.descTitle{
	text-align: left;
	padding:  20px 0;
	font-size: 20px ;
	font-weight: 600;
	color: #000;
}
.move{
	margin-top: 10px;
	font-size: 14px;
	text-align: left;
	color: deepskyblue;
}
.left{
	width: 200px;
	height: auto;
	margin-right: 40px;
	position: relative;
}
.aidesc{
	width: 200px;
	height: 100%;
	padding-left: 40px;
	display: flex;
	flex-direction: column;
	position: fixed
	
}
.aidesc img{
	width: 200px;
	height: 180px;
	/* border-radius: 50%; */
	place-self: center;
	margin-top: 60px;
}
.mian{
	flex: 1;
	height: 100%;
	padding-right: 40px;
	margin-left: 80px;
	margin-top: 80px;
	display: flex;
	flex-direction: column;
	
}
.username{
	flex: 1;
	text-align: left;
	/* margin-bottom: 100px; */
}
.icon{
	font-size: 24px;
    font-weight: 700;
}
.signature{
	margin-top: 20px;
	margin-bottom: 8px;
	width: 100%;
}
.tabs{
    font-size: 14px;
    color: #ff410f;
}
.Btnbox{
    display: flex;
    margin: 20px 0;

}
.Btnbox div{
    min-width: 70px;
    height: 40px;
    border-radius: 30px;
   background: #f2f2f2;
    margin-right: 10px;
    padding: 0 15px;
    font-size: 16px;
    line-height: 40px;
    font-weight: 500;
}
.Btnbox div:nth-child(1){
    background:#ff410f;
    color: #fff;
}
.Btnbox div span:nth-child(1){
    
    padding-right: 8px;
}
.dj{
	padding: 80px 0 40px;
}
.djname{
	font-size: 24px;
	font-weight: 500;
	text-align: left;
	padding-bottom: 50px;
	display: flex;
	justify-content: space-between;
}
.djname span{
	display: block;
}
.djbox{
	display: flex;
	width: 100%;	
	/* justify-content: space-between; */
	flex-wrap: wrap
}
.djitem{
	width: 200px;
	font-size: 12px;
	text-align: left;
	padding-bottom: 30px;
	position: relative;
	margin-right: 10px;
}
.djitem img{
	width: 170px;
	height: 170px;
	position: relative;
	z-index: 2;
	box-shadow: 1px 1px 5px #000;
	border-radius: 5px;
}
.djitem::before{
	content: "";
	display: block;
	width: 170px;
	height: 170px;
	border-radius: 50%;
	background: #000;
	position: absolute;
	top: 0;
	left: 30px;
}
.djitem::after{
	content: "";
	display: block;
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: sandybrown;
	position: absolute;
	top: 25px;
	left: 60px;
}
.musicname{
	font-size: 14px;
	font-weight: 500;
	padding-top: 10px  ;
}
.singer{
	padding: 8px 0px;
}
.el-footer{
	z-index: 99;
}
.mv{
	margin-bottom: 40px;
}
.MVbox{
	width: 100%	;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.MVitem{
	width: 24%;
	text-align: left;
	font-size: 14px;
}
.artistName{
	padding: 10px 0;
	height: 30px;
	font-weight: 500;
}
.singerbox{
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.singerssitem{
	width: 16%;
}
.singerssitem img{
	border-radius: 50%;
}
.singersname{
	font-size: 13px;
	font-weight: 300;
}

</style>