<template>
  <div class="containter">
	<div class="eventleft">
		<div class="eventTop">
			<span class="eventTitle">动态</span>
			<div class="fabu">
			<span class="iconfont">&#xe78e;<span>发动态</span></span>	
			<span class="iconfont">&#xe652;<span>发布视频</span></span>	
			</div>	
		</div>
		<div class="eventcontant">
			<div class="backtop" v-if="showbacktop" @click="backtop">
			</div>
			<div class="eventitem" v-for="(item,index) in this.event" :key="index">
				<div v-if="item.extJsonInfo!=null">
					<div class="eventitem-title">
						<img class="item-enent-img" :src="item.user.avatarUrl" alt="">
						<div class="item-event">
							<div class="event-user"><a href="#">{{item.user.nickname}}</a></div>
							<div class="item-time">{{item.eventTime}}</div>
						</div>
					</div>
					<div class="eventitem-content">
						<div class="item-text">{{item.json.msg}}</div>
						<!-- 动态推送专辑 -->
						<div v-if="item.json.program!=undefined" class="item-event-music" @click="plays(item.json.song)">
							<el-image v-if="item.json.program!=undefined"  :src="item.json.program.coverUrl"
									style="width: 40px; height: 40px"
								>
									<div slot="error" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							<div class="item-event-music-title">
								<span class="item-event-music-name">{{item.json.program.name}}</span>
								<div class="item-event-music-title-category"><span>{{item.json.program.radio.category}}</span> <span>{{item.json.program.radio.name}}</span></div>
							</div>
						</div>
						<!-- 动态推送歌曲 -->
						<div v-if="item.json.song!=undefined" class="item-event-music" @click="plays(item.json.song)">
							<audio :src="item.json.song.url" ></audio>
								<el-image v-if="item.json.song.album!=undefined"  :src="item.json.song.album.img80x80"
									style="width: 40px; height: 40px"
								>
									<div slot="error" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							<div class="item-event-music-title">
								<div>{{item.json.song.album.name}}</div>
								<div>{{item.json.song.artists[0].name}}</div>
							</div>
						</div>
						<!-- 动态转发信息 -->
						<div v-if="item.json.event!=undefined" class="item-event-zuanfa">
							<div>{{item.json.event.json.msg}}</div>
							<div class="item-event-zuanfa-img">
								<img :src="item.json.event.json.album.img80x80" alt="">
								<div class="item-event-zuanfa-img-title">
									<div><span>{{item.json.event.json.album.type}}</span> <span>{{item.json.event.json.album.name}}</span></div>
								<div>
									<span>{{item.json.event.json.album.artist.name}}</span>
								</div>
								</div>
							</div>
						</div>
						<!-- 动态图片 -->
						<div class="img" :class="[item.pics.length > 1 ? 'moveimgbox':'']">
							<div  v-for="(iitem,index) in item.pics" :key="index">
								<img :class="[item.pics.length > 1 ? 'moveimg':'']" :src="iitem.originUrl" alt="">
							</div>
						</div>
						
					</div>
					<!-- 評論 -->
					<div class="item-zhan">
						<div @click="showpinlun(index)"><span >评论</span><span>({{item.info.commentCount}})</span></div>
						<div ><span>转发</span><span>({{item.insiteForwardCount}})</span></div>
						<div @click="likecomment(item.info.threadId)"><span class="iconfont">&#xe604;</span><span>({{item.info.likedCount}})</span></div>
					</div>
					<div class="pinglunbox">
						<pinlun :id="''+item.info.threadId+''" v-if="item.ispunlunshow" :type="6" class="solepinlun" :hotcomment="item.hotComments" :newcomment="item.comments"/>
					</div>
				</div>
				<!-- 廣告 -->
				<div class="elesimg" v-else @click="close()">
					<div class="elesimgclose" >X</div>
					<img  :src="item.json.coverMobileUrl" alt="">
					<div class="inner">
						<div>#{{item.json.title}}</div>
						<div class="canyu">{{item.json.participateCount}}人参与</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	<div class="eventright">
		<div class="userbox">
			<div class="userbg">
				<div class="userbg-img">
					<img :src="this.login.avatarUrl" alt="">
				</div>
				
				<div class="username">{{this.login.nickname}}</div>
			</div>
			<div class="userguan">
				<div><span>0</span><span>动态</span></div>
				<div><span>3</span><span>关注</span></div>
				<div><span>0</span><span>粉丝</span></div>
			</div>
		</div>
		<div class="eventsub">

		</div>
	</div>
  </div>
</template>

<script>
import {EventLikeComment} from '../components/comment/pinlun';
import { GetEvent,GetEventPinglun,GetEventForWard,GetEventDel,GetUserEvent,LikeEventPinglun,GetSong,GetEventPing } from "../components/Event/event";
import pinlun from '../components/MusicDetails/pinlun.vue'
export default {
	name:"Event",
	data(){
		return{
			event:[],
			showpinglunbox:false,
			login:{},
			showbacktop:false
		}
	},
	mounted(){
		this.$bus.$on('sendmessage',()=>{
        this.getevent()
        })
	},
	components:{pinlun	},
	methods:{
		// 返回顶部
		backtop(){

		},
		// 动态评论点赞
		async likecomment(id){
		const {data:data} =await LikeEventPinglun(1,id)
		console.log(data )
		this.$forceUpdate()
		},
		// 播放动态中的音乐
		async plays(obj){
			console.log(obj )
			var c ={};
			c.musicname=obj.name
			c.user = obj.artists[0].name
			c.musicid=obj.id
			c.url =obj.url
			c.picUrl=obj.artists[0].img1v1Url
			c.playtime =(obj.bMusic.playTime/1000/60<10 ? "0"+obj.bMusic.playTime/1000/60 : obj.bMusic.playTime/1000/60)+":"+(obj.bMusic.playTime/1000%60<10?"0"+obj.bMusic.playTime/1000%60:obj.bMusic.playTime/1000/60)
			var mus = JSON.parse(sessionStorage.getItem('music'))
			if(mus==null){
              mus=[]
            }
            
			mus.unshift(c)
			// sessionStorage.clear()
			this.resSetItem('music', JSON.stringify(mus));
			console.log(c )
		},
		// 获取动态并处理数据
		async getevent(){
			const{data:event} =await GetEvent()
			this.event =event.event
			this.event.forEach(item=>{
				item.ispunlunshow =false
				var c =new  Date(item.eventTime)
				var y = c.getFullYear();
				var m = c.getMonth()+1;
				var d = c.getDate();
				var h = c.getHours()<10?"0"+ c.getHours():c.getHours();
				var mm = c.getMinutes()<10?"0"+ c.getMinutes():c.getMinutes();
				item.eventTime = y+"年"+m+"月"+d+"日"+h+":"+mm
				item.json=JSON.parse(item.json)
				if(item.json.event!=undefined){
					item.json.event.json=JSON.parse(item.json.event.json)
				}
				if(item.json.song!=undefined){
				GetSong(item.json.song.id).then(res=>{
					item.json.song.url= res.data.data[0].url
				})	
				//  item.json.song.url
				}

				if(item.pics.lenght==1){
					item.pics.forEach(n=>{
						n.originUrl=n.originUrl+"?param=110y110	"
					})
				}else{
					item.pics.forEach(n=>{
						n.originUrl=n.originUrl+"?param="+ Math.floor(Math.random()*(300)+180)+"y"+Math.floor(Math.random()*(300)+200)+"&quality=100"
					})
				}
				GetEventPing(item.info.threadId).then(res=>{
					console.log(res.data)
					item.comments=res.data.comments
					item.hotComments=res.data.hotComments
				})
			})
		},
		// 展开评论
		showpinlun(index){
			this.event[index].ispunlunshow=!this.event[index].ispunlunshow
			this.$forceUpdate()
			// this.$set(this.event,index,a)
		},

	},
	created(){
		this.getevent()
		this.login =JSON.parse(sessionStorage.getItem('loginchange'))
	},
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_o74a52afh9d.eot');
  src: url('//at.alicdn.com/t/font_2223549_o74a52afh9d.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_o74a52afh9d.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_o74a52afh9d.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_o74a52afh9d.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_o74a52afh9d.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	a{
		text-decoration: none;
	}
.containter{
	width: 1250px;
	margin: 30px auto;
	padding: 0 25px;
	box-sizing: border-box;
	box-shadow: 1px 1px 10px #eee;
	display: flex;
}
.eventleft{
	width: 60%;
	margin: 0 30px;
}
.eventTop{
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 20px 0;
	box-sizing: border-box;
	border-bottom:3px solid salmon;
}
.eventTitle{
	font-size: 24px;
	font-weight: 600;
}
.fabu{
	height: 100%;
	display: flex;	
	place-self: center;
	font-size: 16px;
}
.fabu>span{
	display: block;
	padding: 0 8px;
	border-radius: 20px;
	margin-left: 10px;
	color: salmon;
}
.eventitem{
	display:flex;
	flex-direction: column;
	padding-bottom: 20px;
	border-bottom:1px solid #eee;


}
.eventitem-title{
	display: flex;
	margin-top: 25px;

}
.item-enent-img{
	width: 45px;
	height: 45px;
	margin-right: 10px;

}
.item-event{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: left;
	font-size: 14px;
}
.item-time{
	font-size: 12px;
	color: silver;
}
.eventitem-content{
	display: flex;
	flex-direction: column;
	margin-left: 55px;
	font-size: 14px;
	text-align: left;
}
.item-event-music{
	width: 600px;
	height: 60px;
	background: #f5f5f5;
	margin: 6px 0;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}
.item-event-music img ,.image-slot,.el-image{
	width: 40px;
	height: 40px;
	display: block;
	padding: 0 20px;
}
.item-event-music-title{
	font-size: 13px;
	color: silver;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 40px;
}
.item-event-music-title div:nth-child(1){
	font-size: 16px ;
	color: #000;
}
.item-zhan{
	display: flex;
	width: 100%;
	flex-direction: row-reverse;
	font-size: 12px;
	color: #0c73c2;
	padding-top: 10px ;

}
.item-zhan div{
padding: 0 10px;
border-right: 1px solid #ccc;
place-self: center;

}
.item-zhan div:nth-child(1){
padding: 0 10px;
border-right: none;

}
.img{
	display: flex;
	flex-wrap: wrap;
	padding: 10px 0;
}
.moveimg{
	width: 100px;
	height: 100px;
	padding-left: 8px;
	padding-bottom: 4px;
}
.elesimg{
	width:100%;
	margin-top: 20px;
	display: flex;
	flex-direction: row-reverse;
	position: relative;
}
.elesimg img{
	width: 725px;
	height: 315px;
}
.elesimgclose{
	position:absolute;
	top: 15px;right: 15px;
	color: #fff;
	font-size:16px
}
.moveimgbox{
	width: 230px;
	display: flex;
	flex-wrap: wrap;
}
.solepinlun{
	margin-top: -100px;
}
.pinglunbox{
	width: 90%;
}
.eventright{
	flex: 1;
	margin-left: 40px;
	/* box-shadow: 0px 1px 2px #000; */
}
.eventright,.userbox{
	display: flex;
	flex-direction: column;
}
.userbg{
	display: flex;
	padding: 50px;

}
.userbg-img{
	width: 60px;
	height: 60px;
	display: block;
	border: 2px solid #f5f5f5;
	box-shadow: 1px 1px 5px #000;
}
.username{
	font-size: 16px;
	margin-left: 18px;

}
.userguan{
	display: flex;
	width: 80%;
}
.userguan div{
	display: flex;
	flex-direction: column;
	border-right: 1px #ececec solid;
	flex: 1;
	height: 50px;
}
.userguan div:nth-child(1){

	border-left: 1px #ececec solid;

}
.userguan div span{
	display: block;
}
.item-event-music-name{
	font-size: 14px;
	color: #000;
}
.item-event-music-title-category span:nth-child(1){
	font-size: 13px;
	border: 1px salmon solid;
	color: salmon;
}
.item-event-music-title-category span:nth-child(2){
	font-size: 12px;
	color: #000;
}
.inner{
	position: absolute;
	color: #fff;
	font-weight: 500;
	padding: 20px 50px;
	font-size: 21px;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.inner div:nth-child(1)::after{
	content: "";
	display: block;
	height: 0;
	border: 1px solid #fff;
	opacity: 0.3;
	position: absolute;
	width: 100%;
	top: 0px;
	left: 0;
}
.canyu{
	font-size: 14px;
	text-align: left;
	margin-top: 30px;
	margin-left: -10px;
}
.item-event-zuanfa{
	display: flex;
	width: 100%;
	background: #f5f5f5;
	padding: 10px 6px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;

}
.item-event-zuanfa-img{
	display: flex;
	margin: 30px 0;
	padding: 10px;
	background: #fff;

}
.item-event-zuanfa-img-title{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 14px;
}
.item-event-zuanfa-img-title div:nth-child(1) span:nth-child(1){
	border: 1px solid salmon;
	color: salmon;
	padding:0  5px;
	margin-right: 5px;
	font-size: 12px;
}
.item-event-zuanfa-img-title div:nth-child(2) span:nth-child(1){
	font-size: 12px;
	color: #ccc;
}
.item-event-zuanfa-img img{
	width: 40px;
	height: 40px;
	margin-right: 30px;
	position: relative;
	z-index: 9;
}
.item-event-zuanfa-img::after{
	content: "";
	width: 40px;
	height: 40px;
	display: block;
	border-radius: 50%;
	background: #000;
	position: absolute;
	margin-left: 10px;

}
.backtop{
	width: 60px;
	height: 60px;
	position: fixed;
	border-radius: 50%;
	border: 2px solid #f5f5f5;
	box-shadow: 1px 1px 5px #000;
	bottom: 100px;
	right: 100px;
}
</style>