<template>
	<singer-item   :type="type" :area="area" :zimu="zimu" :SingersList="SingersList"
		@saixuna="saixuna"
	>
		<div slot="yunyantype">语种：</div>
		<div slot="catery">分类：</div>
		<div slot="zimu">筛选：</div>
		<div slot="Singers">
			<div class="Singers">
				<div class="SingersBox">
					<div class="SingersItem" @click="SingersDetails(item.id)" v-for="(item,index) in this.SingersList " :key="index">
						<div class="Singersicon">
							<img :src="item.img1v1Url" alt="">
							<div>{{item.name}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</singer-item>
</template>

<script>

import SingerItem from '../components/Singers/SingerItem.vue';
import { SingersTop,Singerscart } from "../components/Singers/Singers";
export default {
	
	name:'Singers',
	data(){
		return{
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
				type:-1,
				area:-1,
				initial:'-1'
			}
		}
	},
	components:{
		SingerItem
	},
	mounted(){
		this.$bus.$on('name',(value)=>{
			console.log("singers",value )
			this.palytime=value
		})
	},
	methods:{
		SingersDetails(id){
			console.log(id )
			this.$router.push({
				path: '/SingersDetails'+id+''
			})
		},
		async 	getSingersTop(){
			const {data:data} =await SingersTop()
			console.log(data.list.artists)
			this.SingersList=data.list.artists
		},
		async saixuna(item,a){
			console.log("saixuna",a)
			console.log("saixuna",item)
			if(a==1){
				this.info.type=item.val
			}
			if(a==2){
				this.info.area=item.val
			}
			if(a==3){
				this.info.initial=item.val
			}
			console.log(this.info)
			const {data:data}= await Singerscart(this.info.type,this.info.area,this.info.initial)
			console.log("info",data.artists)
			this.SingersList=data.artists
		}
		
	},
	created(){
		this.getSingersTop()
		this.music = JSON.parse(sessionStorage.getItem('music'))
	}

}
</script>

<style scoped>
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