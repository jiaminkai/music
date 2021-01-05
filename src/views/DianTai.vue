<template>
	<div class="DtBOX">
		<div class="DtLeftNav" >
			<ul class="ulnav" :style="{top:this.top+'px'}">
				<li class="linav" :class="[item.id==ind?'hover':'']" v-for="(item,index) in this.categories" :key="index" @click="tagers(item.id)">{{item.name}}<div class="bor" :class="[item.id==ind?'borhover':'']" ></div></li>
				
			</ul>
		</div>
		<div class="DtRigthNav">
			<div class="DtCatelistbox">
				<div class="Dtacateitem" v-for="(item) in this.categories" :key="item.id" :refs="item.id">
					<div class="itemborder">
						<span>{{item.name}}</span>
						<div></div>
					</div>
					<div class="itemlist">
						<div class="itemitem" v-for="(n) in item.djRadios" :key="n.categoryId">
							<img src="" alt="">
							<span>{{}}</span>
							<div>{{}}</div>
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
			ind:10,
			top:'',
		}
	},
	created(){
		this.getDtCate()
		this.getDtBanner()
	},
	mounted(){
		window.document.addEventListener("scroll",this.hanvten)
	},
	methods:{
	// 获取电台分类
	async getDtCate(){
		const {data:data} = await DtCatelist()
		this.categories=data.categories;
		this.categories.forEach(item=>{
			DtCateSub(item.id).then((res)=>{
			
				item.djRadios=res.data.djRadios
			})
		})

	},
	// 切换nav
	tagers(val){
		console.log(val )
		this.ind=val
	},
	//监听滚动
	hanvten(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
		if(scrollTop>50){
			setTimeout(()=>{
				this.top=scrollTop
			},10)
		}
		var Top =window.innerHeight
		var chileTop = this.$el.offsetHeight
		var times =null;
	}
	}

}
</script>

<style scoped>
.DtBOX{
	width: 1200px;
	margin: 0 auto;
	display: flex;
}
.DtLeftNav{
	width: 12%;
}
.ulnav{
	list-style: none;
	position: relative;
	transition: all 0.1s ease-in;
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
	height: 9999px;
	margin-left: 40px;
	flex: 1;
	display: flex;
	flex-direction: column;
}
.Dtacateitem{
	display: flex;
	flex-direction: column;
	width:100%;
}
.itemborder{
	display: flex;
	vertical-align:bottom;
	width:100%;
}
.itemborder span{
	min-width: 80px ;
}
.itemborder div{
	flex: 1;
	height: 0;
	border-bottom:1px solid #eee;
}


</style>