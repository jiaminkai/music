import vue from 'vue'
import Tosat from './Toast.vue';

const CustTosat = vue.extend(Tosat);

function ShowToast (message,type="normal",duration=2000){
	const _toast = new CustTosat({
		data(){
			return{ 
				message: message,
				showToast: true,
				type:type,
				duration: duration
			}
		}
	});
	let element = _toast.$mount().$el;
	if(document.getElementsByClassName("CustToast").length>0){
		let chlid = document.getElementsByClassName("CustToast")
		console.log(chlid)
		chlid.forEach(item => {
			document.body.removeChild(item);
		});
		document.body.appendChild(element);
	}else{
		document.body.appendChild(element);
	}

	
	setTimeout(()=>{_toast.showToast=false;console.log(_toast.message )},duration) 
}
ShowToast.install = (Vue) => {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    Vue.prototype.$toast = ShowToast
};

export default ShowToast