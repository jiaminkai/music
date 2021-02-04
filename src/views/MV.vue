<template>
<div class="sss">
	<singer-item  :type="type" :area="area" :zimu="zimu" :SingersList="SingersList"
		@saixuna="saixuna">
	<div slot="yunyantype">地区：</div>
	<div slot="catery">类型：</div>
	<div slot="zimu">排序：</div>
	<div slot="Singers">
		<div class="MV" v-loading="loading">
			<div class="MVbox">
				<div class="MVitem" @click="SingersDetails(item.id)" v-for="(item,index) in this.SingersList " :key="index">		
					<img class="MVicon" :src="item.cover" alt="">
					<div>{{item.name}}</div>
				</div>
			</div>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout=" prev, pager, next"
				>
			</el-pagination>
		</div>
	</div>
</singer-item>
</div>

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
			totel:0,
			size:30,
			page:1,
			loading:true,
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
			console.log(val)
			console.log("saixuna",val.a)
			console.log("saixuna",val.id)
			if(val.a==1){
				if(this.info.type==val.id)
					this.info.type="全部"
				this.info.type=val.id
			}
			if(val.a==2){
				if(this.info.area==val.id)
					this.info.area="全部"
				this.info.area=val.id
			}
			if(val.a==3){
				if(this.info.order==val.id)
					this.info.order="全部"
				this.info.order=val.id
			}
			console.log(this.info)
			const {data:data}= await AllMV(this.info.type,this.info.area,this.info.order)
			console.log("info",data.data)
			this.SingersList=data.data
			this.loading=false
			this.$forceUpdate()
		},
		SingersDetails(id){
			console.log(id)
			this.$router.push({path:`/MVDetail${id}`,params:{id}})
		},
			// 更改当前页的数量
		async handleSizeChange(val){
			console.log(val )
			this.size=val
			const {data:data}= await AllMV(this.info.type,this.info.area,this.info.order,this.size,this.page)
			console.log("info",data)
			this.SingersList=data.data
			this.loading=false
		},
		//切换页 
		async handleCurrentChange(val){
			console.log(val )
			this.page=(val-1)*this.size
			const {data:data}= await AllMV(this.info.type,this.info.area,this.info.order,this.size,this.page)
			console.log("info",data.data)
			this.SingersList=data.data
			this.loading=false

		},
	},
	async created(){
		const {data:data}= await AllMV(this.info.type,this.info.area,this.info.order)
			console.log("info",data.data)
			this.SingersList=data.data
			this.loading=false
	}

}
</script>

<style>
.sss{
	padding: 30px 0;
}
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