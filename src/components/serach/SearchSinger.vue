<template>
  <div class="SingersBox" >
		<div class="SingersItem"  @click="SingersDetails(item.id)" v-for="(item,index) in this.artists " :key="index">
			<div class="Singersicon" >
				<div>
					<img :src="item.img1v1Url" alt=""  >
				</div>
				<div>{{item.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		song:{
			type:Array,
			default:function(){
				return [];
			}
		},
		artists:{
				type:Array,
			default:function(){
				return [];
			}
		}	
		
	},
	methods:{
		SingersDetails(id){
			this.$router.push({
				path: '/SingersDetails'+id+''
			})
		}
		
	}
	
}
</script>

<style scoped>
	.SingersBox{
		display: flex;
		flex-wrap: wrap;
		width: 1200px;
		margin: 0 auto;

	}
	.SingersItem{
		padding: 20px;
		border-radius: 50%;
		
	}
	.Singersicon{
		position: relative;
		width: 110px;
	}
	.Singersicon img{
		width: 110px;
		height: 110px;
		border-radius: 50%;
		margin-bottom: 10px;
		position: relative;
		z-index: 99;
	}
	.Singersicon img:hover{
		box-shadow: 2px 2px 10px wheat;
	}
	.Singersicon div:nth-child(1)::after{
		content: "";
		display: block;
		height: 100px;
		width: 100px;
		position: absolute;
		left: 0;
		top: 0;
		background:#eee url('../../assets/icon.jpg') ;
		border-radius: 50%;
	}
	.Singersicon div{
		font-size: 14px;
	}
</style>