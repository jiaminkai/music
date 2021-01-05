<template>
	<div class="sola">
		<singer-item    :type="type" :area="area" :zimu="zimu" :SingersList="SingersList"
		@saixuna="saixuna"
	>
		<div slot="yunyantype">语种：</div>
		<div slot="catery">分类：</div>
		<div slot="zimu">筛选：</div>
		<div slot="Singers">
			<div class="Singers" ref="singer" >
				<div class="SingersBox"    infinite-scroll-disabled="disabled"  >
					<div class="SingersItem"  @click="SingersDetails(item.id)" v-for="(item,index) in this.SingersList " :key="index">
						<div class="Singersicon" >
							<img :src="item.img1v1Url" alt="">
							<div>{{item.name}}</div>
						</div>
					</div>
				</div>
			</div>
			<p v-if="this.loading">加载中...</p>
			<p v-if="!this.more">没有更多了</p>
		</div>
	</singer-item>
	</div>
</template>

<script>

import SingerItem from '../components/Singers/SingerItem.vue';
import { SingersTop,Singerscart } from "../components/Singers/Singers";
export default {
	
	name:'Singers',
	data(){
		return{
			timer:null,
			SingersList:[],
			percentage:0,
			palytime:'',
			music:[],
			type:[
				{name:'全部',val:'-1'},
				{name:'男歌手',val:'1'},
				{name:'女歌手',val:'2'},
				{name:'乐队',val:'3'}
			],
			area:[
				{name:'全部',val:'-1'},
				{name:'华语',val:'7'},
				{name:'欧美',val:'96'},
				{name:'日本',val:'8'},
				{name:'韩国',val:'16'},
				{name:'其他',val:'0'}
			],
			zimu:[
				{name:'热门',val:'-1'},
				{name:'A',val:'a'},
				{name:'B',val:'b'},
				{name:'C',val:'c'},
				{name:'D',val:'d'},
				{name:'E',val:'e'},
				{name:'F',val:'f'},
				{name:'G',val:'g'},
				{name:'H',val:'h'},
				{name:'I',val:'i'},
				{name:'J',val:'j'},
				{name:'K',val:'k'},
				{name:'L',val:'l'},
				{name:'M',val:'m'},
				{name:'N',val:'n'},
				{name:'O',val:'o'},
				{name:'P',val:'p'},
				{name:'Q',val:'q'},
				{name:'R',val:'r'},
				{name:'S',val:'s'},
				{name:'T',val:'t'},
				{name:'U',val:'t'},
				{name:'V',val:'v'},
				{name:'W',val:'w'},
				{name:'X',val:'x'},
				{name:'Y',val:'y'},
				{name:'Z',val:'z'},
				{name:'#',val:'0'},
			],
			info:{
				type:0,
				area:-1,
				initial:'-1',
				limit :50,
				offset:1,
			},
			more:true,
			loading:false,
			times:"",
			index:1
		}
	},
	components:{
		SingerItem
	},
  computed: {
      noMore () {
        return this.more
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
	mounted(){
		window.addEventListener("scroll",this.handleScroll)
		this.$bus.$on('name',(value)=>{
			this.palytime=value
		})
	},
	methods:{
		loads () {
			this.loading = true
			this.index +=1
			this.info.offset=this.info.limit*this.index
			console.log("加载下一页" )
			var c = this.SingersList
			Singerscart(this.info.type,this.info.area,this.info.initial,this.info.limit,this.info.offset,).then(res=>{		
			c.push(...res.data.artists)
			this.SingersList=c
			})
		},
		// 防抖	// 监听页面滚动
		handleScroll(){
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
			var Top =window.innerHeight
			var chileTop = this.$el.offsetHeight
			var times =null;
			if(chileTop+310-scrollTop==window.innerHeight){
			console.log("到了" )
			let timer =null; 
			let a =this;
			let args = arguments;
			var begin = new Date().getTime();
			return function(){
			var current = new Date().getTime();
			clearTimeout(timer);  //清除定时器
			if(current - begin >= 2000){
				this.loads()
			}
			timer = setTimeout(function () {
			a.loads()
			timer =null
			}, 2000);
			}
}
		},
		SingersDetails(id){
			console.log(id )
			this.$router.push({
				path: '/SingersDetails'+id+''
			})
		},
		async 	getSingersTop(){
			const {data:data} =await Singerscart()
			console.log("der",data)
			this.SingersList=data.artists
		},
		async saixuna(item){
			if(item!=undefined){
				if(item.a==1){
					this.info.type=item.id
				}
				if(item.a==2){
					this.info.area=item.id
				}
				if(item.a==3){
					this.info.initial=item.id
				}
			}

			const {data:data}= await Singerscart(this.info.type,this.info.area,this.info.initial,this.info.limit,this.info.offset,)
			console.log("info",data.artists)
			this.SingersList=data.artists
			this.more =data.more
		}
		
	},
	created(){
		this.saixuna()
	}

}
</script>

<style scoped>
.sola{
	box-shadow: 1px 1px 10px #eee;
	width: 1300px;
	padding: 50px 50px;
	box-sizing: border-box;
	margin: 0 auto;
}
.Singers{
	width: 1200px;
	margin: 0 auto;
	background: #fff;
	
}
.SingersBox{
	display: flex;
	flex-wrap: wrap;
}
.Singersicon{
	width: 100px;
	height: auto;
}
.SingersItem{
	padding: 20px;
	border-radius: 50%;
}
.Singersicon img{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 10px;
	position: relative;
}
::v-deep .Singersicon img::after{
	content: "正在加载";
	display: block;
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background:url('../assets/icon.jpg') ;
}
.Singersicon img:hover{	
	box-shadow: 0px 2px 5px;

}
.Singersicon div{
	font-size: 14px;
}

</style>