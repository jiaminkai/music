<template>
	<div class="SongTag">
		<div class="allplay"><span>全部播放</span></div>
		<el-table
			:data="song"
			stripe
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