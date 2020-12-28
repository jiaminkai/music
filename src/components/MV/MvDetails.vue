<template>
	<div class="mvdebox">
		<navmenu></navmenu>
		<div class="mvcontent" 
		>
			<div class="mvleft">
					<h4 class="MvTitle"><i class="el-icon-arrow-left"></i>MV详情</h4>
					<video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
					<div class="mvicon">
						<div class="user">
							<img class="icon" :src="this.playerOptions.icon" alt="">
							<span class="iconname">{{this.playerOptions.artistName}}</span>
						</div>
						<h3 class="desc">{{this.playerOptions.name}}</h3>
						<div class="playtimes">
							<span>发布：<span>{{this.playerOptions.publishTime}}</span></span>
							<span>播放：<span>{{this.playerOptions.palyCount}}</span></span>
						</div>
					</div>
					<div class="comment">
						<pinlun :type="1" :hotcomment="this.comment.hotComments" :newcomment="this.comment.comments">
							<div slot="pingtitle">评论</div>
						</pinlun>
					</div>
			</div>
			<div class="mvrigth">
				<div class="mvdesc">
					<div class="mvdesctitle">MV简介</div>
					<div class="mvdesctcenter" v-if="this.playerOptions.briefDesc!=null">{{this.playerOptions.briefDesc}}</div>
					<div v-else class="wudesc">暂无简介</div>
				</div>
				<div class="recommen">
					<div class="recommenTitle">相关推荐</div>
					<div class="remvitem" v-for="(item,index) in this.remv" :key="index" @click="tomv(item.id)">
						<img :src="item.cover" alt="">
						<div class="remvitemdesc">
							<div>{{item.name}}</div>
							<div>{{item.artists[0].name}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import navmenu from '../../components/home/NavMenu.vue'
import Pinlun from '../../components/MusicDetails/pinlun.vue';
import { MVDetail,MVPinglun,MVAddres,PalyVideo,MVComment,MVReMv} from "./MV";
export default {
	name:'MvDetails',
	data(){
		return{
			mvid:'',
			playerOptions:{},
			comment:[],
			remv:[],
		}
		
	},
	components:{navmenu,Pinlun},
	methods:{
		async getMvData(id){
			const {data:details} =await MVDetail(id)
			const {data:pinglun} =await MVPinglun(id)
			const {data:addres} =await MVAddres(id)
			const {data:comment} =await MVComment(id)
			const {data:remv} =await MVReMv(id)
			console.log("详情：", details.data)
			console.log("评论转发数据：", pinglun)
			console.log("地址：", addres.data.url)
			console.log("评论：", comment)
			console.log("相关MV：", remv.mvs)
			this.playerOptions = new PalyVideo(details.data,addres.data.url)
			this.comment=comment
			this.remv=remv.mvs
			console.log(this.playerOptions)
		}
		,
		tomv(id){
			this.$router.push({path:`/MVDetail${id}`,params:{id}})
		}
	},
	created(){
		console.log(this.$route.params.id )
		this.getMvData(this.$route.params.id)
		// var self = this;
        // self.fetchData();
	},
watch :{
'$route': function (to, from) {
//执行数据更新查询
this.getMvData(this.$route.params.id);
}
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
.video-js{
	border-radius: 10px !important;
	background: #fff !important;
}
.vjs-modal-dialog-content{
	padding: 0 !important;
}
.MvTitle{
	width: 100%;
	height: 40px;
	text-align: left;
	font-size: 18px;
	font-weight: 500;
	line-height: 40px;
}

.user{
	display: flex;
	padding: 13px 0 0  0;
}
.icon{
	width: 45px;
	height: 45px;
	border-radius: 50%;
	place-self: center;
}
.iconname{
	display: block;
	font-size: 16px;
	margin-left: 15px;
	place-self: center;
}
.desc{
	text-align: left;
	
}
.playtimes{
	text-align: left;
	font-size: 15px;
    color: #cecece;
}
.playtimes span:nth-child(2){
	margin-left: 20px;
}
.mvdesctitle{
	font-size: 18px;
	font-weight: 600;
	text-align: left;
}
.mvdesctcenter{
	width: 100%;
	font-size: 14px;
	text-align: left;
	white-space: pre-line;
	text-indent: 2em;
}
.wudesc{
	font-size: 24px;
	color: #cecece;
	margin-top: 40px;
}
.mvdesc{
	margin-top: 30px;
	padding: 20px;
	box-shadow: 2px 1px 10px #cecece;
	box-sizing: border-box;
	height: 160px;
}
.mvrigth{
	width: 24%;

}
.recommen{
	width: 100%;
	margin-top: 30px;
	box-shadow: 2px 1px 10px #cecece;
	padding: 10px 15px;
	box-sizing: border-box;
}
.recommenTitle{
	text-align: left;
	font-weight: 600;
	font-size: 16px;
}
.remvitem{
	display: flex;
	margin: 10px 0 30px;

}
.remvitem img{
	width: 55%;
	height: 80px;
	border-radius: 10px;
	margin-right: 10px;
	position: relative;
}

      
.remvitem img::after {
	display: block;
	align-items: center;
	place-self: center;
	content: "正在加载";
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background: #fcfcfc
}
.remvitemdesc{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 12px;
	white-space: pre-line;
	text-align: left;

}
.remvitemdesc div:nth-child(1){ 
	font-weight: 600;
	height: 50px;
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
 }
</style>