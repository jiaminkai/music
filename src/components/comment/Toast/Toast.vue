<template>
	<div class="CustToast" v-if="this.showToast" :class="this.type">
		{{this.message}}
	</div>
</template>

<script>
export default {
	name:'Toast',
	data(){
		return {
			showToast: true,
			type: "normal",
			message: "消息提示",
			duration: 3000
		}
	},
	
}
</script>

<style scoped>

.CustToast{
	width: auto;
	height: 50px;
	position: absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	white-space: nowrap;
	overflow: hidden;
	padding: 6px;
	line-height: 50px;
	font-size: 20px;
	font-weight: 600;
}
.normal{
	background-color:#909399
}
.success{
	background-color:#67C23A
}
.warning{
	background-color:#E6A23C
}
.danger{
	background-color:#F56C6C
}
</style>