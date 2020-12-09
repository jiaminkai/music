<template>
	<el-container>
        <el-header>
            <nav-menu></nav-menu>
        </el-header>
        <el-main>
			<div class="sanxuan">
				<div class="yunyantype">
					<div>语种：</div>
					<div class="yuzhong">
						<ul>
							<li v-for="(item,index) in type" :key="index" :a="1" @click="saixuna(item,1)">
								<a href="#">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="catery">
					<div>分类：</div>
					<div class="cary">
						<ul>
							<li v-for="(item,index) in area" :key="index" :a="2" @click="saixuna(item,2)">
								<a href="#">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="sanxuna">
					<div>筛选：</div>
					<div class="zimu">
						<ul>
							<li v-for="(item,index) in zimu" :key="index" :a="3" @click="saixuna(item,3)">
								<a href="#">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
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
			
        </el-main>
        <el-footer>
            <el-progress :show-text="false" :percentage="percentage" color="#FFC125"></el-progress>
            <bottom   :like="music" @timeup="timeup" ></bottom>
        </el-footer>
    </el-container>

</template>

<script>
import NavMenu from '../components/home/NavMenu.vue'
import bottom from '../components/home/paly.vue'
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
				tyep:-1,
				area:-1,
				initial:'-1'
			}
		}
	},
	components:{
		NavMenu,
		bottom
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
		timeup(val){
			console.log(val )
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
}
.Singersicon img:hover{	
	box-shadow: 0px 2px 5px;

}
.Singersicon div{
	font-size: 14px;
}
.sanxuan{
	width: 1200px;
	margin: 0 auto;
	padding-bottom: 30px;
	font-size: 14px;
}
.sanxuan div {
	height: 30px;
	line-height: 30px;
}
.yunyantype,.catery,.sanxuna{
	text-align: left;
	display: flex;
	align-items: center;
	height: 30px;
	padding: 2px 0;
}
.yuzhong,.cary{
	display: flex;
}
ul{
	list-style: none;
	margin: 0;
	padding: 0;
}
li{
	float: left;
	line-height: 30px;
	
	
	
}
li a{
	padding: 0 15px;
	border-right: 1px #ccc solid;
	text-decoration: none;
	color: orange;
}
</style>