<template>
<div>
	
			<div class="sanxuan">
				<div class="yunyantype">
					<slot name="yunyantype">
					</slot>
					<div class="yuzhong">
						<ul>
							<li v-for="(item,index) in type" :key="index" :class="[item.name==types?'isactive':'']"  :a="1" @click="saixuna(item,1)">
								<a href="#">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="catery">
					<slot name="catery">
						
					</slot>
					<div class="cary">
						<ul>
							<li v-for="(item,index) in area" :key="index" :class="[item.name==areas?'isactive':'']" :a="2" @click="saixuna(item,2)">
								<a href="#">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="sanxuna">
					<slot name="catery">
						
					</slot>
					<div class="zimu">
						<ul>
							<li v-for="(item,index) in zimu" :key="index" :class="[item.name==zimus?'isactive':'']" :a="3" @click="saixuna(item,3)">
								<a href="#">{{item.name}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<slot  name="Singers"></slot>
	
</div>
</template>
<style scoped>

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
	/* border-right: 1px #ccc solid; */
	text-decoration: none;
	color: orange;
}
.isactive{
	background: salmon;
	border-radius: 20px;
}
</style>

<script>
export default {
	name:'SingersItem',
	data(){
		return{
			music:[],
			percentage:0,
			types:"",
			areas:"",
			zimus:""

		}
	},
	props:{
		area:{
			type:Array
		},
		type:{
			type:Array
		},
		zimu:{
			type:Array
		}
	},
	methods:{
		saixuna(item,a){

			this.$emit('saixuna',{id:item.val,a})
			console.log("分类",a )
			if(a==1){
					this.types=item.name
				}
				if(a==2){
					this.areas=item.name
				}
				if(a==3){
					this.zimus=item.name
				}

		},
		SingersDetails(item){
			this.$emit('SingersDetails',item)
		}
	},
	
	created(){

	}

}
</script>