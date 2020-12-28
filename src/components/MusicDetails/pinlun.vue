<template>
	<div>
		<div class="pinglun">
               <div class="pinlutitle"><slot name="pingtitle"></slot></div>
               <el-input type="textarea" placeholder="我来说两句...."
                    v-model="textarea"
                    maxlength="300"
                    show-word-limit
                    :autosize="{ minRows: 4}"
                ></el-input>
                <div class="pinglubtn" @click="sendcomment">评论</div>
        </div>
		<div class="oldpinglun" v-if="this.hotcomment!=undefined">
			<div class="hot" v-if="this.hotcomment.length!=0">热门评论 <span>{{this.hotcomment.length}}</span></div>
			<div class="pingluitem"  v-for="(item,index) in this.hotcomment" :key="index">
				<div class="usersicon">
					<img :src="item.user.avatarUrl" alt="">
				</div>
				<div class="">
					<div class="pinglunname">
						{{item.user.nickname}} <span class="iconfont" style="color:red;font-size:24px">&#xe67c;</span>
					</div>
					<div class="pinglundesc">{{item.content}}</div>
					<div class="pingluntime">    
						<span>{{item.time}}</span>
						<span class="iconfont">&#xe68e;</span>
						<span class="iconfont">&#xe646;<span>{{item.likedCount}}</span></span>
						<span>更多</span>
					</div>
				</div>
			</div>
		</div>
		<div class="newpinglun" v-if="this.newcomment!=undefined">
			<div class="hot" v-if="this.newcomment.length!=0">最新评论 <span>{{this.newcomment.length}}</span></div>
			<div class="pingluitem" v-for="(item,index) in this.newcomment" :key="index">
				<div class="usersicon">
					<img :src="item.user.avatarUrl" alt="">
				</div>
				<div class="">
					<div class="pinglunname">
						{{item.user.nickname}} <span class="iconfont" style="color:red;font-size:24px">&#xe67c;</span>
					</div>
					<div class="pinglundesc">{{item.content}}</div>
					<div class="pingluntime">    
						<span>{{item.time}}</span>
						<span class="iconfont">&#xe68e;</span>
						<span class="iconfont">&#xe646;<span>{{item.likedCount}}</span></span>
						<span>更多</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { SendComment,DelComment,EventLikeComment,LikeComment} from "../comment/pinlun";
export default {
	name:'Pinglun',
	data(){
		return{
			textarea:''
		}
	},
	props:{
		hotcomment:{
			type:Array
		},
		newcomment:{
			type:Array
		},
		type:Number,
		id:String 
	},
	methods:{
		async sendcomment(){
			console.log("发送评论:",this.id,this.textarea )
			const{data:Data} =await SendComment(this.type,this.id,this.textarea)
			console.log(Data )
			this.$forceUpdate()
		}
	},

}
</script>

<style scoped>
.pinglun{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 80px;
    position: relative;
	padding-top: 80px;
}
.pinlutitle{
     text-align: left;
    font-size: 24px;
    font-weight: 500;
    margin: 40px 0 30px 0;
}

.pinglubtn  {
    display: block;
    width: 100px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    background: #ff410f;
    border-radius: 30px;
    margin:20px  0 30px 0;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
}
.oldpinglun,.newpinglun{
    text-align: left;
    display: flex;
    flex-direction: column;
    font-size: 14px;
	margin-bottom: 30px;
   
}
.newpinglun{
    margin-top: 3	0px;
}
.hot{
    font-size: 16px ;
    margin: 15px 0;
    font-weight: 500;
    color: #4a4a4a;
}
.pingluitem{
    margin: 10px 0;
    display: flex;
    box-shadow: 0 1px 0 0 #ededed;
    padding-bottom: 20px;
    
}
.pinglundesc{
    width: 85%;
    margin: 10px 0;
    line-height: 22px;
    white-space:inherit
}
.pinglundesc ,.pingluntime{
     color: #999;
    
}
.pingluntime span{
    margin-right: 30px;
    font-size: 16px;
}
.usersicon{
    width: 40px;
    min-height: 110px;
    margin-right: 20px;
}
.usersicon img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>