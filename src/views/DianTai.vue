<template>
	<div class="Dt" >
		<div class="DtBOX">
		<div class="DtLeftNav" >
			<ul class="ulnav" :style="{top:this.top+'px'}">
				<li class="linav" :class="[item.id==ind?'hover':'']" v-for="(item,index) in this.categories" :key="index" @click="tagers(item.id)">{{item.name}}<div class="bor" :class="[item.id==ind?'borhover':'']" ></div></li>
			</ul>
		</div>
		<div class="DtRigthNav">
			<div class="DtCatelistbox">
				<div class="Dtacateitem" v-for="(item,index) in this.categories" :key="index" :ref="'item'+item.id"  >
					<div class="itemborder">
						<span>{{item.name}}</span>
						<div></div>
					</div>
					<div class="itemlist" >
						<div class="itemitem" v-for="(n) in item.djRadios" :key="n.id" @click="todj(n.id)">
							<img :src="n.dj.avatarUrl" alt="">
							<span>{{n.name}}</span>
							<div>订阅量：{{n.subCount}}</div>
						</div>
					</div>
				</div>		
			</div>
		</div>	
	</div>
	</div>
</template>
<script>
import { DtBanner,DtRecommend,DtCatelist,DtDetail,DtSong,DtCateSub} from "../components/Dt/dt";
export default {
	data(){
		return{
			categories:[],
			ind:3,
			top:'',
		}
	},
	created(){
		this.getDtCate()

	},

	mounted(){
		window.addEventListener("scroll",this.hanvten)
	},
	destroyed(){
		window.removeEventListener("scroll",this.hanvten)
	},
	
	methods:{
	// 获取电台分类
		async getDtCate(){
			const {data:data} = await DtCatelist()
			var c =data.categories
			c.forEach(item=>{
				DtCateSub(item.id).then((res)=>{
					item.djRadios=res.data.djRadios
				})
			})
		this.categories=c;

		this.$forceUpdate()

	},
	// 切换nav
	tagers(val){
		console.log(val )
		this.ind=val
		if(val==3){
			document.documentElement.scrollTop =this.$refs.item3[0].offsetTop-100

		}else if(val==2){
			document.documentElement.scrollTop =this.$refs.item2[0].offsetTop-100
		}else if(val==3001){
			document.documentElement.scrollTop =this.$refs.item3001[0].offsetTop-100
		}else if(val==2001){
			document.documentElement.scrollTop =this.$refs.item2001[0].offsetTop-100
		}else if(val==10001){
			document.documentElement.scrollTop =this.$refs.item10001[0].offsetTop-100
		}else if(val==8){
			document.documentElement.scrollTop =this.$refs.item8[0].offsetTop-100
		}else if(val==5){
			document.documentElement.scrollTop =this.$refs.item5[0].offsetTop-100
		}else if(val==10002){
			document.documentElement.scrollTop =this.$refs.item10002[0].offsetTop-100
		}else if(val==6){
			document.documentElement.scrollTop =this.$refs.item6[0].offsetTop-100
		}else if(val==14){
			document.documentElement.scrollTop =this.$refs.item14[0].offsetTop-100
		}else if(val==13){
			document.documentElement.scrollTop =this.$refs.item13[0].offsetTop-100
		}else if(val==11){
			document.documentElement.scrollTop =this.$refs.item11[0].offsetTop-100
		}
	},
	//监听滚动
	hanvten(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
		if(scrollTop>70){
				this.top=scrollTop
		}else if(scrollTop<60){
			this.top=0
		}
		if(scrollTop+30<300){
			this.ind=3
		}else if(scrollTop+300<this.$refs.item3001[0].offsetTop&&scrollTop+300>this.$refs.item2[0].offsetTop){
			this.ind=2
		}else if(scrollTop+300<this.$refs.item2001[0].offsetTop&&scrollTop+300>this.$refs.item3001[0].offsetTop){
			this.ind=3001
		}else if(scrollTop+300<this.$refs.item10001[0].offsetTop&&scrollTop+300>this.$refs.item2001[0].offsetTop){
			this.ind=2001
		}else if(scrollTop+300<this.$refs.item8[0].offsetTop&&scrollTop+300>this.$refs.item10001[0].offsetTop){
			this.ind=10001
		}else if(scrollTop+300<this.$refs.item5[0].offsetTop&&scrollTop+300>this.$refs.item8[0].offsetTop){
			this.ind=8
		}else if(scrollTop+300<this.$refs.item10002[0].offsetTop&&scrollTop+300>this.$refs.item5[0].offsetTop){
			this.ind=5
		}else if(scrollTop+300<this.$refs.item6[0].offsetTop&&scrollTop+300>this.$refs.item10002[0].offsetTop){
			this.ind=10002
		}else if(scrollTop+300<this.$refs.item14[0].offsetTop&&scrollTop+300>this.$refs.item6[0].offsetTop){
			this.ind=6
		}else if(scrollTop+300<this.$refs.item13[0].offsetTop&&scrollTop+300>this.$refs.item14[0].offsetTop){
			this.ind=12
		}else if(scrollTop+300<this.$refs.item11[0].offsetTop&&scrollTop+300>this.$refs.item13[0].offsetTop){
			this.ind=13
		}else{
			this.ind=11
		}
	},
	//跳转详情
	async todj(id){
		this.$router.push({path:`/Dts${id}`})

	}
	}

}
</script>

<style scoped>
.Dt{
	width: 100%;
	background: #fafafa;
}
.DtBOX{
	padding-top: 30px;
	width: 1200px;
	margin: 0 auto;
	display: flex;
}
.DtLeftNav{
	width: 12%;
}
.ulnav{
	list-style: none;
	position: sticky;
	transition: all 0.1s ;
	top: 35px;
}
.ulnav::after{
	content: "";
	display: flex;
background: url('../assets/radio.png')  left;
width: 25%;
height: 100%;
position: absolute;
top: -23px;
left: 38px;
}
.ulnav::before{
	content: "";
	display: flex;
	background: url('../assets/radio.png')  left;
	width: 25%;
	height: 410px;
	position: absolute;
	top: 412px;
	left: 38px;
}
.linav{
	display: block;
	height: 58px;
	line-height: 42px;
	text-align: right;
	font-size: 15px;
	position: relative;

}
.bor{
	position: absolute;
	width: 40px;
	height: 0;
	top: 20px;
	left: -2px;
	z-index: 2;
}
.borhover{
	border-top: 1px solid #31c27c;
	background: #31c27c;
}
.linav:hover{
	color: #31c27c;
}
.hover{
	color: #31c27c;
}
.DtRigthNav{

	margin-left: 70px;
	flex: 1;
	display: flex;
	flex-direction: column;
}
.Dtacateitem{
	display: flex;
	flex-direction: column;
	width:100%;
	transition: 2s all;
	position: relative;
}
/* .DtCatelistbox{
	transition: 2s all;
} */
.itemborder{
	display: flex;
	width:100%;
	align-items: flex-end;
	padding: 20px 0 30px;
	
}
.itemborder span{
	min-width: 80px ;
}
.itemborder div{
	flex: 1;
	height: 0;
	border-bottom:1px solid #eee;
}
.itemlist{
	display: flex;
	flex-wrap: wrap;
}
.itemitem{
	display: flex;
	flex-direction: column;
	margin-right: 20px;
	text-align: left;
	font-size: 14px;
	padding-bottom: 25px;
	color: #6f6f6f;
	width: 180px;
	transform-style: preserve-3d;
	perspective: 10px;
	position: relative;
	overflow: hidden;
}
.itemitem span{
	padding: 12px 0 3px 0;
	color: #000;
	width: 80%;
	overflow: hidden;
	text-overflow: ellipsis;
}

.itemitem:nth-child(5n){
	display: flex;
	flex-direction: column;
	margin-right:0;
}
.itemitem img{
	width: 180px;
	height: 180px;
	box-shadow: 1px 1px 5px #ccc;
	border-radius: 10px;
	transition: 0.3s all ease-in;
	position: relative
}
.itemitem img:hover{
	transform:translateZ(1px);
	border-radius: 10px;
}
.itemitem::after{
	content: "";
	display: flex;
	width: 45px;
	height: 45px;
	position: absolute;
	top: 24%;
	left: 42%;
	z-index: 999;
	background:#ccc url('../assets/play.png') no-repeat center;
	border-radius: 50%;
	opacity: 0.5;
	z-index: -1;
}
.itemitem:hover:after{
	content: "";
	display: flex;
	width: 45px;
	height: 45px;
	position: absolute;
	top: 26%;
	left: 40%;
	z-index: 999;
	background:#ccc url('../assets/play.png') no-repeat center;
	border-radius: 50%;
	opacity: 0.5;
	transform:translateZ(2px);
	z-index: 999;
}



</style>