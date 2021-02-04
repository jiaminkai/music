<template>
	<div class="mvdebox">
		<div class="mvcontent">
			<div class="mvleft">
				<div class="ls">
					<div class="icon">
						<img :src="this.desc.picUrl" alt="">
					</div>
					<div class="content">
						<div class="DtTitle"><span>电台</span><span>{{this.desc.rcmdText}}</span></div>
						<div class="DtUser">
							<img :src="this.desc.dj['avatarUrl']" alt="">
							<span>{{this.desc.dj.nickname}}</span>
						</div>
						<div class="sub">
							<div><i class="el-icon-star-off"></i><span>订阅{{this.desc.subCount}}</span></div>
							<div><i class="el-icon-video-play"></i><span>播放全部</span></div>
							<div><i class="el-icon-upload2"></i><span>分享{{this.desc.shareCount}}</span></div>
						</div>
						<div class="tabbox">
							<span class="tab">{{this.desc.category}}</span>
							<span>{{this.desc.rcmdText}}</span>
						</div>
					</div>
				</div>
				<div class="jiemulist">
					<div class="jiemutitle">
						<div class="title-top"><span>节目列表</span> <span>共{{this.totel}}首</span></div>
						<div class="updown">
							<i class="el-icon-headset">生成外链播放器</i>
							<div @click="updown">
								<i class="el-icon-sort"></i>
							</div>
						</div>
					</div>
					<el-table
						:show-header="false"
						:data="DtList"
						stripe
						align="left"
						@row-click="rowclick"
						@cell-mouse-enter="mouseenter"
						@cell-mouse-leave="mouseleave"
					>
						<el-table-column
							width="60"
						>
							
							<template slot-scope="scope">
								{{scope.row.index}}
							</template>
						</el-table-column>
						<el-table-column
							min-width="250px"
						>
							<template slot-scope="scope">
								<dir class="show"> 
									<div class="musictextbox">
										<i class="el-icon-video-play"></i>
										<span class="musictext">{{scope.row.name}}</span>
									</div>
									<div v-if="scope.row.hover" class="hide">
										<span class="el-icon-plus"></span>
										<span class="el-icon-download"></span>
										<span class="el-icon-upload"></span>
									</div>
								</dir>
							</template>
						</el-table-column>
						<el-table-column
							min-width="70"
						>
							<template slot-scope="scope">
								播放{{scope.row.listenerCount}}
							</template>
						</el-table-column>
						<el-table-column
							min-width="70"
						>
							<template slot-scope="scope">
								点赞{{scope.row.likedCount}}
							</template>
						</el-table-column>
						<el-table-column
							min-width="80"
						>
							<template slot-scope="scope">
								{{scope.row.createTime}}
							</template>
						</el-table-column>
						<el-table-column
							min-width="80"
						>
							<template slot-scope="scope">
								{{scope.row.duration}}
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:page-sizes="[10,20,30]"
						:page-size="30"
						layout="total, sizes, prev, pager, next, jumper"
						:total="this.totel">
					</el-pagination>
				</div>
			</div>
			<div class="mvrigth">
				<div class="mvdesc">
					<div class="mvdesctitle">收藏该电台的人</div>
					<div class="sublist">
						<div class="subitem" v-for="item in this.DtSub" :key="item.userId">
							<img :src="item.avatarUrl" :title="item.nickname" >
						</div>
					</div>
					
				</div>
				<div class="recommen">
					<div class="recommenTitle">相关节目</div>
					<div class="remvitem" v-for="(item,index) in this.DtPer" :key="index">
						<img :src="item.picUrl" alt="">
						<div class="remvitemdesc">
							<div>{{item.name}}</div>
							<div>{{item.rcmdText}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { DtSong,DtDetail,DtSubscriber,DtPersonalize} from "../components/Dt/dt";
export default {
	data(){
		return{
			DtList:[],
			totel:0,
			more:false,
			desc:{},
			size:30,
			page:1,
			DtSub:[],
			DtPer:[]
		
		}
	},
	methods:{
		// 获取电台中的节目
		async getDtlist(id){
			const{data:data} = await DtSong(id,this.size,this.page)
			this.totel=data.count
			this.DtList=data.programs
			this.DtList.forEach((item,index)=>{
				item.index=index+1
				item.hover=false
				item.createTime =this.getTime(item.createTime)
				item.duration=(Math.floor(item.duration/1000/60)<10?"0"+Math.floor(item.duration/1000/60):Math.floor(item.duration/1000/60))+":"+(Math.floor(item.duration/1000%60)<10?"0"+Math.floor(item.duration/1000%60):Math.floor(item.duration/1000%60))
			})
			this.more=data.more
		},
		// 时间戳转换
		getTime(a){
			var now = new Date(a),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " ;
		},
		// 获取电台的详细信息
		async getDtDetails(id){
			const{data:data} = await DtDetail(id)
			this.desc =data.data
		},
		// 点击表格中的行
		rowclick(row,colom,event){
			console.log(row.id)
			this.$router.push({path:`/DtItem${row.id}`})
		},
		
		//鼠标移入
		mouseenter(row,cell,event){
			var inc =0;
			var a={}
			this.DtList.forEach((item,index)=>{
				if(item.id==row.id){
					inc=index
					a=item
				}
			})
			a.hover=true
			this.$set(this.DtList,inc,a)
		},
		//鼠标移除
		mouseleave(row,cell,event){
		var inc =0;
			var a={}
			this.DtList.forEach((item,index)=>{
				if(item.id==row.id){
					inc=index
					a=item
				}
			})
			a.hover=false

			this.$set(this.DtList,inc,a)
		},
		
		// 更改当前页的数量
		handleSizeChange(val){
			console.log(val )
			this.size=val
			this.getDtlist(this.$route.params.id);
		},
		//切换页 
		handleCurrentChange(val){
			console.log(val )
			this.page=(val-1)*this.size
			this.getDtlist(this.$route.params.id);

		},
		// 升序降序
		updown(){
			this.DtList.reverse()
		},
		//获取电台的订阅者
		async GetDtSub(id){
			const {data:data} =await DtSubscriber(id)
			console.log(data )
			this.DtSub=data.subscribers
		},
		//获取电台的推荐
		async GetDtPer(){
			const {data:data} =await DtPersonalize()
			console.log(data )
			this.DtPer=data.data
		}

	},
	created(){
		this.getDtlist(this.$route.params.id)
		this.getDtDetails(this.$route.params.id)	
		this.GetDtSub(this.$route.params.id)
		this.GetDtPer()
	}
}
</script>

<style scoped>

.mvdebox{
	width: 1200px;
	margin: 0 auto;
}
.mvcontent{
	width: 100%;
	display: flex;
	justify-content: space-between;

}
.mvleft{
	width: 65%;
	padding: 30px;
	margin-top: 30px;
	box-shadow: 1px 1px 10px #cecece;

	
}
.ls{
	display: flex;

}
.mvrigth{
	width: 24%;

}
.mvdesc{
	margin-top: 30px;
	padding: 20px;
	box-shadow: 2px 1px 10px #cecece;
	box-sizing: border-box;

}
.mvrigth{
	width: 24%;

}
.recommen{
	width: 100%;
	margin-top: 30px;
	box-shadow: 2px 1px 10px #cecece;
	padding: 10px 20px;
	box-sizing: border-box;
}
.recommenTitle{
	text-align: left;
	font-weight: 600;
	font-size: 16px;
}
.show{
	display: flex;
	place-items: center;
	padding-left: 0px;
	justify-content: space-between;
}
.hide{
	margin-left: 20px;
	font-size: 18px;
}
.musictextbox{
	padding-left: 0px;
	display: flex;
	place-items: center;
}
.musictext{
	display: block;
	white-space: nowrap;
	width: 190px;
	overflow: hidden;
	text-overflow: ellipsis;
}
.mvdesctitle,.recommenTitle{
	font-size: 18px;
	font-weight: 600;
	text-align: left;
	margin-left: -14px;
	padding-left: 12px;
	border-left: 3px solid salmon;
}
.mvdesctcenter{
	width: 100%;
	font-size: 14px;
	text-align: left;
	white-space: pre-line;
	text-indent: 2em;
}
.icon{
	width: 200px;
	height: 200px;
	border: 1px solid #ececec;
	box-shadow: 1px 1px 10px #6e6e6e;
	padding: 2px;
}
.content{
	display: flex;
	flex-direction: column;
	margin-left: 30px;

}
.DtTitle{
	display: flex;
}
.DtTitle span:nth-child(1){
	display: block;
	width: 45px;
	height: 25px;
	background: firebrick;
	color: #fff;
	font-size: 14px;
	align-items: center;
	line-height: 25px;
	position: relative;
	box-shadow: 1px 1px 5px #eee;
}
.DtTitle span:nth-child(2){
	display: block;
	min-width: 45px;
	height: 25px;
	font-size: 18px;
	align-items: center;
	line-height: 25px;
	font-weight: 600;
	padding-left: 30px;

}
.DtTitle span:nth-child(1)::after{
	content: "";
	display: block;
	width: 0px;
	height: 0px;
	position: absolute;
	border-right: 15px transparent solid;
	border-left: 15px firebrick solid;
	border-bottom: 12px transparent solid;
	border-top: 13px transparent solid;
	top: 0;
	right: -30px;
}
.DtUser{
	display: flex;
	padding: 15px 0 20px ;
	align-items: center;
}
.DtUser img{
	width: 38px;
	height: 38px;
}
.DtUser span{
	font-size: 12px;
	color: #0c73c2;
	padding-left: 15px;
}
.sub{
	display: flex;
}
.sub div{
	display: flex;
	border: 1px solid #ececec;
	border-radius: 5px;
	align-items: center;
	padding: 5px 10px;
	margin-right: 20px;
	font-size: 14px;
	
}
.sub div:nth-child(1){
	background: firebrick;
	color: #fff;
}
.tabbox{
	text-align: left;
	font-size: 12px;
	margin-top: 30px;
	align-items: center;
}
.tab{
	padding: 0 3px;
	border: 1px solid #cc0000;
	color: #cc0000;
	margin-right: 10px;
}
.jiemutitle{
	display: flex;
	font-size: 16px;
	justify-content: space-between;
	margin-top: 40px;
	margin-bottom: 10px;
	border-bottom: 2px solid #cc0000;
	padding-bottom: 10px;
}
.updown{
	display: flex;
	font-size: 16px;
	place-items: center;
}
.title-top{
	width: 180px;
	display: flex;
	justify-content: space-between;
	place-items: center;
}
.title-top span:nth-child(1){
	font-size: 24px;
}
.updown{
	width: 190px;
	display: flex;
	justify-content: space-between;
}
.updown i{
	color: #0c73c2;
	font-size: 12px;
}
.updown div i{
	color: #ccc;
	font-size: 18px;
	margin-right: 20px;
}
.sublist{
	display: flex;
	flex-wrap: wrap;
	margin-top: 20px;
}
.subitem{
	width: 40px;
	margin-right: 10px;
	margin-bottom: 10px;
	transform-style: preserve-3d;
	perspective: 10px;
}
.subitem.subitem:nth-child(5n){

	margin-right: 0px;
	
}
.subitem img{
	width: 40px;
	height: 40px;
	border-radius: 5px;
	box-shadow: 1px 1px 5px #ccc;
}
.subitem img:hover{
	transform: translateZ(1px);
}
.remvitem{
	display: flex;
	padding: 10px 0;
}
.recommen img{
	width: 50px;
	height: 50px;
	box-shadow: 1px 1px 5px #cecece;
	margin-right: 10px;
}
.remvitemdesc{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: left;
	font-size: 14px;
}
.remvitemdesc div{
	width: 160px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.remvitemdesc div:nth-child(2){
	font-size: 13px;
	color: #6c6c6c;
}
</style>