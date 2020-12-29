<template>
	<div class="topmusics">
		<div class="containter">
			<div class="contert">
				<div class="contert_top">
					<div class="icon">
						<img  :src="this.TopDetail.playlist.coverImgUrl" alt="">
					</div>
					<div class="contert_title">
						<p>{{this.TopDetail.playlist.name}}</p>
						<div class="contert_title_icon_box">
							<img class="contert_title_icon" :src="this.TopDetail.playlist.creator.avatarUrl" alt="">
							<span class="contert_title_user">{{this.TopDetail.playlist.creator.description}}</span>
							<span class="creattime">{{createTime}}</span>
						</div>
						<div class="contert_title_tab">
							<span class="title_tabs">标签：</span>
							<span class="title_tabs_item" v-for="(item,index) in this.TopDetail.playlist.tags" :key="index">{{item}}</span>
						</div>
						<div class="title_desc">{{this.TopDetail.playlist.description}}</div>
					</div>
				</div>
				<div class="all">
					<span class="all_button" @click="allplay">全部播放</span>
					<span class="all_shochang" ><span class="iconfont">&#xe607;</span>未收藏</span>
				</div>
				<!-- 歌曲栏 -->
				<div class="table">
					<el-table
						:data="music"
						stripe
						highlight-current-row
						@cell-mouse-enter="enter_lient"
						@cell-mouse-leave="hover_leave"
						@cell-click="row_click"
					>
						<el-table-column
							:label="indexs" 
							min-width="60"
							align="center"
						>
							<template slot-scope="scope" >
								<div v-if="!scope.row.cells">
									<span v-if="scope.row.hover" class="iconfont" >&#xe630;</span>
									<span v-else>{{scope.row.courrindex}}</span>
								</div>
								<span v-else class="iconfont">&#xe61c;</span>
							</template>
						</el-table-column>

						<el-table-column
							label="歌曲"
							min-width="180"
							prop="musicname"
						></el-table-column>
						<el-table-column
							label="歌手"
							min-width="90"
							prop="user"
						></el-table-column>
						<el-table-column
							min-width="120"
							label="专辑"
							prop="djname"
						></el-table-column>
						<el-table-column
							label="时长"
							min-width="80"
						>
							<template slot-scope="scope">
								<div v-if="scope.row.hover">								
									<span class="iconfont shoc">&#xe607;</span>
									<span class="iconfont down">&#xe687;</span>
									<span class="iconfont move">&#xe63f;</span>
								</div>
								<span v-else>{{scope.row.playtime}}</span>
							</template>
						</el-table-column>

					</el-table>
				</div>
				<!-- 评论主体 -->
				<pin-lun class="pinglun" :type="2" :hotcomment="TopPingLun" ref="pinglun">
					<div slot="pingtitle">评论</div>
				</pin-lun>
			</div>
			<!-- 侧边栏 -->
			<div class="rigth">
				<!-- 喜欢这专辑的人 -->
				<div class="subdj">
					<div class="subdjtitle">喜欢这专辑的人</div>
					<div class="porper">
						<div class="useritem" v-for=" ( item,index) in this.TopDetail.playlist.subscribers" :key="index">
							<img :src="item.avatarUrl" alt="">
						</div>
					</div>
				</div>
				<!-- 推荐歌单 -->
				<div class="subtuijian">
					<div class="subtuijianTitle">相关推荐</div>
					<div class="subtuijianItem" v-for="(item,index) in this.subSingers" :key="index">
						<img :src="item.coverImgUrl" alt="">
						<div class="subtuijiancontent">
							<div>{{item.name}}</div>
							<div >{{item.creator.nickname}}</div>
						</div>
					</div>
				</div>
				<!-- 精彩评论 -->
				<div class="hotpinlun">
					<div class="hotpinlunTitle">精彩评论</div>
					<div class="hotpinlunItem" v-for="(item,index) in this.TopPingLun.slice(0,4)" :key="index">
						<img :src="item.user.avatarUrl" alt="">
						<div class="hotpinluncontent">
							<div class="hotpinluncontent_nickname">{{item.user.nickname}} <span class="time">{{item.time}}</span></div> 
							<div class="content">{{item.content}}</div>
						</div>
					</div>
					<el-button class="seemove" @click="topinlun">查看更多</el-button>
				</div>
				<!-- 回到顶部按钮 -->
				<div class="backtop" v-if="backgtop" @click="backtop"> <i class="el-icon-top"></i></div>
			</div>
		</div>
		<bottom class="bottom" ref="play"/>
	</div>
</template>

<script>
import bottom from '../../components/home/paly.vue'
import PinLun from "../../components/MusicDetails/pinlun.vue";
import { Toplist,TopGuan,TopGuanSongUrl,TopGuanSong,Guan,TopSubSingers,TopPingLun} from "./TopList";
export default {
	name:'TopMuisics',
	data(){
		return{
			TopDetail:[],
			music:[],
			subSingers:[],
			TopPingLun:[],
			backgtop:false
		}
	},
	components:{bottom,PinLun},
	computed:{
		// 计算排行榜的发布日期
		createTime(){
			var now =new Date(this.TopDetail.playlist.createTime)
			var year=now.getFullYear(); 
			var month=now.getMonth()+1; 
			var date=now.getDate(); 
			var hour=now.getHours(); 
			return year+"-"+month+"-"+date+" "+hour; 
		},
		indexs(){
			return "共"+this.TopDetail.code+"首"
		}
	},
	mounted(){
		window.addEventListener('scroll',this.handleScroll) 
		
	},
	methods:{
		// 监听页面滚动
		handleScroll(){
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
			console.log("距离顶部",scrollTop )
			if (scrollTop>=600){
				this.backgtop=true
			}else{
				this.backgtop=false
			}
		},
		// 获取排行榜详情数据
		async getTopDetail(id){
			const{data:TopDetail}= await TopGuan(id)
			this.TopDetail=TopDetail
			// console.log(TopDetail )	
			var str =[]
			this.TopDetail.playlist.trackIds.filter(item=>{
				str.push(item.id)
			})
			this.TopDetail.playlist.trackIds=str.join(',')
			// console.log("ID",this.TopDetail.playlist.trackIds)
			this.getMusics(this.TopDetail.playlist.trackIds)
			this.getSubSingers(this.$route.params.id)
			this.getTopPingLun(this.$route.params.id)
		},
		allplay(){
			var mus =JSON.parse(sessionStorage.getItem('music'))
			if(mus==null){
              mus=[]
            }
			mus.unshift(...this.music)
            console.log("legthn",mus.length)
            this.resetSetItem('music', JSON.stringify(mus))
		},
		// 获取排行榜中的音乐
		async getMusics(id){
			const {data:SongDetail} = await TopGuanSong(id)
			const {data:SongUrl} = await TopGuanSongUrl(id)
			var c =[]	
			SongUrl.data.forEach((item,index) => {
				var a = new Guan(item,SongDetail.songs[index])
				a.hover = false
				a.cells=false
				a.courrindex=index+1
				c.push(a)
			});
			this.music=c
			// console.log("this.music ",this.music)
		},
		// 表格鼠标移入单元格时间
		enter_lient(	row, column, cell, event){
			row.hover=true
			
		},
		// 表格鼠标移出单元格事件
		hover_leave(	row, column, cell, event){
			row.hover=false

		},
		// 表格鼠标点击单元格事件
		row_click(	row, column, cell, event){
			this.music.forEach(item=>{
				item.cells =false
			})
			row.cells=true
			var mus = JSON.parse(sessionStorage.getItem('music'))
			var indes= mus.findIndex((item)=>{
				return	item.musicid ==row.musicid
			})
			if(indes==-1){
				mus.unshift(row)
				this.resetSetItem('music', JSON.stringify(mus))
				this.$bus.$emit('plays')
			}else{
				this.$bus.$emit("playmnue",indes)
			}

		},
		//获取推荐相似歌单
		async	getSubSingers(id){
			const {data:SubSingers } = await TopSubSingers(id)
			this.subSingers=SubSingers.playlists
		},
		// 获取评论信息
		async getTopPingLun(id){
			const {data:topPingLun} =await TopPingLun(id)
			console.log("TopPingLun",topPingLun.comments )
			this.TopPingLun =topPingLun.comments
			this.TopPingLun.forEach(item=>{
				
				var now =new Date(item.time)
				var year=now.getFullYear(); 
				var month=now.getMonth()+1; 
				var date=now.getDate(); 
				var hour=now.getHours(); 
				var m =now.getMinutes()
				item.time= year+"-"+month+"-"+date+" "+hour+":"+m; 
			})
		},
		//调往评论主体的锚点
		topinlun(){
			var times
			var scroolTop =this.$refs.pinglun.$el.offsetTop
			var seepd=100;
			times=setInterval(()=>{
				if(document.documentElement.scrollTop>=this.$refs.pinglun.$el.offsetTop){
					clearInterval(times)
				}else{
					
					document.documentElement.scrollTop =this.$refs.pinglun.$el.offsetTop/seepd +seepd
					seepd+=200
				}
			},60)
		},
		// 回到顶部
		backtop(){
			var times
			var scroolTop =this.$refs.pinglun.$el.offsetTop
			var seepd=5;
			times=setInterval(()=>{
				if(document.documentElement.scrollTop==0){
					clearInterval(times)
				}else{
					
					document.documentElement.scrollTop =this.$refs.pinglun.$el.offsetTop*(seepd/5)
					seepd-=Math.random()
				}
			},60)
		},
	},

	created(){
		console.log(this.$route.params.id )
		this.getTopDetail(this.$route.params.id)
		
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
	.iconfont{
		font-family:"iconfont" !important;
		font-size:16px;font-style:normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;}
	.topmusics{
		background: #fcfcfc;
	}

	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.containter{
		width: 1200px;
		margin: 80px auto;
		/* padding: 60px 0; */
		display: flex;
		justify-content: space-between;
	}
	.contert{
		width: 70%;
		box-shadow: 2px 2px 10px #cccccc;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
	}
	.contert_top{
		display: flex;
		padding: 25px;
		box-sizing: border-box;
	}
	.icon{
		position: relative;
		width: 190px;
		height: 190px;
		margin-right: 20px;
	}
	.icon img{
		width: 180px;
		height: 180px;
		border-radius: 10px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.icon::before{
		content: "";
		display: block;
		position: absolute;
		width: 168px;
		height: 168px;
		background: rgba(0, 0, 0, 0.3);
		left: 18px;
		top: 18px;
		border-radius: 10px;
	}
	.contert_title_icon{
		width: 40px ;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #ccc;
		background: #000;
		margin-right: 10px;
	}
	.contert_title{
		flex: 1;
	}
	.contert_title p{ 
		text-align: left;
		font-size: 22px;
		font-weight: 600;
	}
	.contert_title_icon_box{
		display: flex;
		height: 50px;
		align-items: center;

	}
	.table{
		width: 90%;
		margin: 0 auto;
	}
	.contert_title_user{
		font-size: 16px;
	}
	.creattime{
		margin-left: 25px ;
		font-size: 14px;
		color: #ccc;
	}
	.contert_title_tab{
		display: flex;
		padding: 10px 0;
	}
	.title_tabs{
		min-width: 60px;
		font-size: 16px;
	}
	.title_tabs_item{
		min-width: 60px;
		background:tomato;
		color: #fcfcfc;
		display: block;
		border-radius: 20px;
		height: 25px;
		line-height: 25px;
		margin-right: 15px;
	}
	.title_desc{
		font-size: 14px;
		color: #ccc;
		text-align: left;

	}
	.all{
		margin: right;
		text-align: right;
		height: 40px;
		margin-right: 40px;
		margin-bottom: 20px;
	}
	.all_button,.all_shochang{
		display: inline-block;
		min-width: 60px;
		height: 40px;
		padding: 0 15px;
		line-height: 40px;
		border-radius: 20px;
		background: #ccc;
		color: #0c0c0c;
	}
	.table{
		padding: 20px;
	}
	.all_button{
		background: tomato;
		color: #fcfcfc;
		margin-right: 20px;
	}
	.rigth{
		width: 26%;
		display: flex;
		flex-direction: column;
	}
	.subdj{
		min-height: 180px;
		box-shadow: 1px 1px 10px #ccc;
		padding: 10px 20px 15px 10px;
	}
	.subdjtitle ,.subtuijianTitle,.hotpinlunTitle{
		text-align: left;
		font-size: 16px ;
		font-weight: 600;
		padding: 3px;
		border-left: 3px salmon solid;
		margin: 8px 0;
	}
	.subtuijian,.hotpinlun{
		display: flex;
		flex-direction: column;
		margin-top: 25px;
		min-height: 180px;
		box-shadow: 1px 1px 10px #ccc;
		padding: 10px 20px 15px 10px;
		border-radius: 10px;
	}

	.subtuijianItem{
		width: 100%;
		display: flex;
		padding: 10px;
	}
	.subtuijianItem img{
		width: 45px;
		height: 45px;
		border-radius: 5px;
		margin-right: 10px;
	}
	.subtuijiancontent{
		font-size: 14px;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #cecece;
	}
	.subtuijiancontent div:nth-child(){
		width: 90%;
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;

	}
	.porper{
		display: flex;
		/* padding: 25px 20px; */
		flex-wrap: wrap;
		margin-top: 10px;
	}
	.useritem{
		width: 40px;
		height: 40px;
		margin-right: 6px;
		margin-bottom: 10px;
	}
	.useritem img{
		width: 100%;
		height: 100%;
		border-radius: 5px;

	}
	.shoc ,.down,.move{
		margin-right: 15px;
	}
	.subpinlun{
		width: 100%;
		height: 500px;
		margin-top: 40px;
		box-shadow: 1px 1px 10px #ccc;
		border-radius: 10px;
	}
	.hotpinlunItem{
		display: flex;
		min-height: 100px;
		padding-left: 5px;
		box-sizing: border-box;
	}
	.hotpinlunItem img{
		display: block;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		padding-top: 15px;

	}
	.hotpinluncontent{
		padding: 10px;
		text-align: left;
		width: 100%;
		
	}
	.hotpinluncontent_nickname{
		font-size: 12px;
	}
	.hotpinluncontent_nickname{
		font-size: 14px;
		font-weight: 600;
	}
	.time{
		color: rgba(0, 0, 0, 0.3);
		font-size: 12px;
	}
	.content{
		margin-top: 5px;
		width: 100%;
		padding: 5px 10px  5px 5px;
		box-sizing: border-box;
		background: #ececec;
		font-size: 12px;
		text-align: left;
		border-radius: 5px;
	}
	.pinglun{
		padding: 20px 60px 60px 40px;
		width: 80%;
		transition: 2s all  ease-in-out;
	}
	.backtop{
		width: 45px;
		border-radius: 50%;
		height: 45px;
		font-size: 32px;
		border: 3px solid #ccc;
		position: fixed;
		bottom: 150px;
		right: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

</style>