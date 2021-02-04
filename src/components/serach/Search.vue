<template>
	<div class="SongTag">
		<div class="allplay"><span>全部播放</span></div>
		<el-table
			:data="song"
			stripe
			@row-click="rowclick"
		>
			<el-table-column
				type="index"
				label="序号"
				width="100"
			>
			</el-table-column>
			<el-table-column
				label="歌曲"
				prop="musicname"
			>
			</el-table-column>
			<el-table-column
				label="歌手"
				prop="user"
			>
			</el-table-column>
			<el-table-column
				label="专辑"
				prop="djname"
			>
			</el-table-column>
			<el-table-column
				label="时长"
				prop="playtime"
			>
			</el-table-column>
		</el-table>
	
	</div>
</template>

<script>

export default {
	name:'MusicSong',
	props:{
		song:{
			type:Array,
			default:function(){
				return [];
			}
		}
	},
	data(){
		return{
			xuhao:"序号"
		}
	},
	methods:{
		rowclick(row){
			console.log(row)
			var c=JSON.parse(sessionStorage.getItem('music'));
			var index =c.findIndex(item=>{
				return item.musicid=row.musicid
			})
			if(index!=-1){
				c.unshift(row)
				this.resSetItem('music', JSON.stringify(c))
				
			}else{
				this.$bus.$emit('playmnue',index)
			}
		},
	}
}
</script>

<style scoped>
.allplay{
	text-align: right;
}
.allplay span{
	width: 90px;
	height: 35px;
	border-radius: 50px;
	padding:10px 15px;
	background: salmon;
	line-height: 35px;
	
}
</style>