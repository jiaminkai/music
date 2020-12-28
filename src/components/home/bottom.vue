<template>
  <div class="bottomc">
	<div class="container">
		<p class="title">jiaminkai@163.com</p>
		<span class="samtitle">jiaminkai@163.com</span>
		<div class="zanzhu">
			<span class="iconfont">&#xe9b0;</span>
			<span class="iconfont">&#xe9af;</span>
			<span class="iconfont">&#xe609;</span>


		</div>
	</div>
  </div>
</template>

<script>
export default {
	name:'bottom'
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_paqbkcfucqd.eot');
  src: url('//at.alicdn.com/t/font_2223549_paqbkcfucqd.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_paqbkcfucqd.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_paqbkcfucqd.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_paqbkcfucqd.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_paqbkcfucqd.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:28px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.bottomc{
	width: 100%;
	height: 250px;
	background: #161e27;
}
.container{
	width: 1200px;
	margin: 0 auto;
}
.title{
	margin-top: 40px;
	color: #fff;
	font-size: 14px;
	border-left: 3px salmon solid;
	padding-left:  10px;
}
.samtitle{
	display: block;
	font-size: 12px;
	text-align: left;
	color: #616161;
}
.zanzhu{
	display: flex;
	color: #616161;
	margin-top: 30px;
}
.zanzhu span{
	margin-right: 15px;
}
</style>