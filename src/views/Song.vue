<template>
		<div class="waibox">
			<div class="container">
				<div class="SongAllTab">
					<div class="Title" @click="showallbtn"><span>{{this.alltabname}}<span class="iconfont" style="font-size:12px">&#xe65f;</span></span></div>
					<transition name="slide-fade">
						<div class="showalltab" v-if="showalltab">
							<div class="showalltabbox">
								<div v-for="(item,index) in this.alltab.categories" :key="index" >
									<div>{{item}}</div>
									<div class="tabcary">
										<span class="tabitem" v-for="(n,m) in tablist[index]" 
															:key="m" 
															@click="tabchange(-1,n.name)"
															:class="[alltabname==n.name?'changbj':'']"
															>{{n.name}}</span>
									</div>
								</div>
							</div>
						</div>
					</transition>
					<div class="hottab">热门标签:</div>
					<div class="TabulBox">
						<ul class="Tabul">
							<li class="Tabli" :class="indexs==index?'isactive':''" @click="tabchange(index,item.name)" v-for="(item,index) in this.tab" :key="index">{{item.name}}</li>
						</ul>
					</div>
					<div class="hot_new">
						<span @click="changehot('hot')" :class="[this.order=='hot'?'hot_new_active':'']">热门</span>
						<span @click="changehot('new')" :class="[this.order=='new'?'hot_new_active':'']" >最新</span>
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
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-sizes="[50, 80, 100]"
					:page-size="size"
					layout="total, sizes, prev, pager, next, jumper"
					:total="this.total">
				</el-pagination>
			</div>
		</div>
			
</template>

<script>
import {SongDetail,SongCate,SongHot,SongTop} from '../components/Song/Song';
export default {
	data(){
		return{
			music:[],
			percentage:0,
			alltab:[],
			tab:[],
			indexs:-1,
			playlists:[],
			showalltab:false,
			tablist:{
			},
			total:0,
			size:50,
			name:'全部',
			alltabname:'全部标签',
			order:'hot'
		}
	},
	
	methods:{
		//切换最新或者最热
		changehot(a){
			this.order=a
			console.log(this.name,this.size,this.order)
			this.getSongTop(this.name,this.size,1,this.order)
		},
		//切换显示条数
		handleSizeChange(val){
			console.log("当前显示条数",val )
			this.size=val
			this.getSongTop(this.name,val,1,this.order)
			
		},
		//切换页数
		handleCurrentChange(val){
			console.log("当前页",val )
			this.getSongTop(this.name,this.size,val*this.size,this.order)
		},
		// 跳转到歌单
		Song(id){
			console.log(id )
			this.$router.push({path:`/Dj${id}`})
		},
		// 切换标签
		tabchange(val,name){
			console.log(val,name)
			this.indexs=val
			this.name=name
			if(val==-1){
				this.alltabname=name	
			}
			this.getSongTop(name,this.size,1,this.order)
			this.showalltab=false

		},
		// 获取所有标签并进行分类
		async getSongCate(){
			const {data:data} =await SongCate()
			this.alltab =data
			var a=[],b=[],c=[],d =[],e=[]
			data.sub.forEach(item => {
				if(item.category==0){
					a.push(item)
				}
				if(item.category==1){
					b.push(item)
				}
				if(item.category==2){
					c.push(item)
				}
				if(item.category==3){
					d.push(item)
				}
				if(item.category==4){
					e.push(item)
				}
			});
			console.log(a,b,c,d )
			this.tablist[0]=a;
			this.tablist[1]=b;
			this.tablist[2]=c;
			this.tablist[3]=d;
			this.tablist[4]=e
		},
		// 获取热门标签
		async getSongHot(){
			const {data:data} =await SongHot()
			console.log(data )
			this.tab=data.tags
		},
		//展开所有标签页
		showallbtn(){
			this.showalltab=!this.showalltab
		}	,
		async getSongTop(cat="全部",limit=50,offset=1){
			const {data:data} =await SongTop(cat,limit,offset)
			this.total = data.total
			this.playlists=data.playlists
		},
		SingersDetails(val){
			console.log(val )
		}
		
	},
	created(){
		this.getSongCate()
		this.getSongHot()
		this.getSongTop()
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
.slide-fade-enter-active {
	transition: all .3s ease;
}
.slide-fade-leave-active {
	transition: all .3s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to
 {
	transition: all .3s ease-in;
	opacity:0.8;
}
.showalltab{
	position: absolute;
	top: 40px;
	width: 800px;
	background: #ffffff;
	text-align: left;
	padding: 20px;
	overflow: hidden;
	transition: ease-in all 0.5s;
}
.showalltabbox{
	width: 835px;
	height: 450px;
	overflow:auto;
}
.hot_new{
	position: absolute;
	right: 15px;
	height: 25px;
	line-height: 25px;
	display: flex;
	border-radius: 3px;
	background: #eee;
}
.hot_new span{
	display: block;
	padding: 0 10px;
	
}
.hot_new span:nth-child(1){
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
}
.hot_new span:nth-child(2){
	border-top-right-radius: 3px;
	border-bottom-right-radius: 3px;
}
.hot_new_active{
	background: salmon ;
}
.waibox{
	width: 100%;
	height: 100%;
	background: #eee;
}
.SongAllTab{
	display: flex;
	position: relative;
	align-items: center;
	height: 35px;
	border-radius: 5px;
	background: #ffffff;
	margin-bottom: 30px;
}
.container{
	width: 1200px;
	margin: 0 auto;
	padding: 30px 0 90px;
}
.Title{
	width: 90px;
	height: 100%;
	line-height: 35px;
	border-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	text-align: center;
	font-size: 15px;
	background: salmon;
}
.TabulBox{
	height: 35px;
}
.hottab{
	height: 35px;
	font-size: 15px;
	line-height: 35px;
	color: #ccc;
	margin-left: 15px;
}
.Tabul{

	min-width: 400px;
	list-style: none;
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
}
.Tabli{
	float: left;
}


.Tabli{
	text-decoration: none;
	border-right: 1px solid #cecece;
	padding: 0 15px;
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
.tabcary{

	padding: 20px 0;
	display: flex;
	flex-wrap: wrap;
}
.tabitem{
	display: block;
	padding: 5px 10px;
	background: #ececec;
	margin-right: 10px;
	border-radius: 15px;
	margin-bottom: 10px;
}
.changbj{
	background: coral;

}
</style>