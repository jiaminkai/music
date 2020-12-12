<template>
<singer-item  :type="type" :area="area" :zimu="zimu" :SingersList="SingersList"
		@saixuna="saixuna">
	<div slot="yunyantype">地区：</div>
	<div slot="catery">类型：</div>
	<div slot="zimu">排序：</div>
	<div slot="Singers">
		<div class="MV">
			<div class="MVbox">
				<div class="MVitem" @click="SingersDetails(item.id)" v-for="(item,index) in this.SingersList " :key="index">		
					<img class="MVicon" :src="item.cover" alt="">
					<div>{{item.name}}</div>
				</div>
			</div>
		</div>
	</div>
</singer-item>

</template>

<script>
import SingerItem from '../components/Singers/SingerItem.vue';
import { AllMV } from "../components/MV/MV";
export default {
	name:'MV',
	data(){
		return{
			music:[],
			SingersList:[],
			type:[
				{name:'全部',val:'全部'},
				{name:'官方版',val:'官方版'},
				{name:'原生',val:'原生'},
				{name:'现场版',val:'现场版'},
				{name:'网易出品',val:'网易出品'},
			],
			area:[
				{name:'全部',val:'全部'},
				{name:'内地',val:'内地'},
				{name:'港台',val:'港台'},
				{name:'欧美',val:'欧美'},
				{name:'日本',val:'日本'},
				{name:'韩国',val:'韩国'},
			],
			zimu:[
				{name:'上升最快',val:'上升最快'},
				{name:'最热',val:'最热'},
				{name:'最新',val:'最新'},
			],
			info:{
				type:'全部',
				area:'全部',
				order:'全部'
			}
		}
	},
	components:{
		SingerItem
	},
	methods:{
		async saixuna(val){
			console.log("saixuna",val.a)
			console.log("saixuna",val.item.val)
			if(val.a==1){
				this.info.type=val.item.val
			}
			if(val.a==2){
				this.info.area=val.item.val
			}
			if(val.a==3){
				this.info.order=val.item.val
			}
			console.log(this.info)
			const {data:data}= await AllMV(this.info.type,this.info.area,this.info.order)
			console.log("info",data.data)
			this.SingersList=data.data
		},
		SingersDetails(id){
			console.log(id)
			this.$router.push({path:`/MVDetail${id}`,params:{id}})
		}
	},
	async created(){
		this.music = JSON.parse(sessionStorage.getItem('music'))
		const {data:data}= await AllMV(this.info.type,this.info.area,this.info.order)
			console.log("info",data.data)
			this.SingersList=data.data
	}

}
</script>

<style>
.container{
	width: 1200px;
	margin: 0 auto;
}
.MV{
	width: 1200px;
	margin: 0 auto;
}
.MVbox{
	width: 1200px;
	display: flex;
	flex-wrap: wrap;

}
.MVitem{
	width: 18.2%;
	text-align:left;
	font-size: 12px;
	margin-right: 25px;
}
.MVitem:nth-child(5n+5){
	margin-right: 0px;
}
.MVitem div{
	padding: 8px 0;
}
.MVicon{
	width:100%;
	height:140px;
	border-radius: 5px;
	background-repeat: no-repeat;  
    background-size: 100% 100%;  
	box-shadow: 2px 2px 10px #ccc;  
	background: #ccc; 
}
.MVicon:hover{
	transform: translateY(-3px);
}
</style>