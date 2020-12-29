<template>

	<div class="container">
		<div class="loginbox">
			<div class="logo">

			</div>
			<el-form
				:model="ruleForm" :rules="rules"
			>
				<el-form-item prop="email">
					<el-input
						v-model="ruleForm.email"
						prefix-icon="el-icon-mobile-phone"
						placeholder="请输入网易账号/手机号"
					>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">		
					<el-input
						v-model="ruleForm.password"
						prefix-icon="el-icon-lock"
						placeholder="请输入密码"
					>
					</el-input>
				</el-form-item>

				<el-form-item>
					<el-button @click="submitForm('ruleForm')">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>

</template>

<script>
import { Login,LoginDetail } from "../components/login/login";
export default {
name:'Login',
data(){
	return{
		ruleForm:{
		email:"",
		password:""
		},
		rules:{
			email:[ { required: true, message: '请输入网易云账号', trigger: 'blur' },],
			password:[{required: true, message: '请输入密码	', trigger: 'blur'}]
		},
		loginuser:{},
		uesrId:"",
		cookie:""
	}
},
methods:{
	async submitForm(){
      const res= await Login({email:this.ruleForm.email,password:encodeURIComponent(this.ruleForm.password)})
      if(res.status==200){
        if(res.data.code==200){
            console.log("登录成功" )
            console.log(res.data.account)
            sessionStorage.setItem('token',res.data.token)
            this.uesrId =res.data.account.id
			this.cookie =window.document.cookie
			const {data:Data } =await LoginDetail(this.uesrId)
			this.loginuser=Data.profile
			this.loginuser.loginchange =false
			this.$store.commit("loginSuccess",this.loginuser)
			sessionStorage.setItem('loginchange', JSON.stringify(this.loginuser))
			this.resetSetItem('loginchange', JSON.stringify(this.loginuser));
			this.$router.replace('/home')
        } else{
        this.$message.error("登录失败")
		}
	}
    },
}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_cctvo6vwnms.eot');
  src: url('//at.alicdn.com/t/font_2223549_cctvo6vwnms.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_cctvo6vwnms.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_cctvo6vwnms.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_cctvo6vwnms.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_cctvo6vwnms.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.container{
	width: 100%;
	height: 100vh;
	background:#5dd5c8 url('../assets/login_bg.png') center no-repeat;
	position: fixed;
	left: 0;
	top: 0;
	opacity: 1;
	z-index: 99988;
}
.loginbox{
	width: 350px;
	height: 450px;
	background: #fff url('../assets/login2.jpg') center no-repeat;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
}
.logo{
	background: url('../assets/logo.jpg') center no-repeat;
	margin-top:20px;
	width: 180px;
	height: 60px;
	place-self: center;
}
.el-form{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 80%;

}
.el-button {
 background: #55dddd;
 width: 100%;
 color: #fff;
 font-size: 16px;
}
</style>