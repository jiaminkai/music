import { request } from "../../../request/request";
export function AllMV(type='全部',area='全部',order='全部',limit=30,offset=1){
	return request({
		method:'get',
		url:`/mv/all?type=${type}&area=${area}&order=${order}&limit=${limit}&offset=${offset}`
	})
}
export function MVTop(){
	return request({
		method:'get',
		url:`/top/mv?limit=10`
	})
}
export function MVDetail(id){
	return request({
		method:'get',
		url:`/mv/detail?mvid=${id}`
	})
}
export function MVPinglun(id){
	return request({
		method:'get',
		url:`/mv/detail/info?mvid=${id}`
		// /comment/mv?id=
	})
}
export function MVComment(id){
	return request({
		method:'get',
		url:`/comment/mv?id=${id}`
		
	})
}
export function MVAddres(id,r=1080){
	return request({
		method:'get',
		url:`/mv/url?id=${id}&r=${r}`
	})
}
export function MVReMv(id){
	return request({
		method:'get',
		url:`/simi/mv?mvid=${id}`
	})
}

export class PalyVideo{
	constructor(MV,addres){
		this.icon = MV.artists[0].img1v1Url
		this.artistName=MV.artistName
		this.name=MV.name
		this.desc =MV.briefDesc
		this.palyCount=MV.playCount
		this.publishTime=MV.publishTime
		// this.height=300
		this.aspectRatio='16:9',
		this.fluid= false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		this.playbackRates=[0.7, 1.0, 1.5, 2.0]
		this.theme= '#b7daff'  // 风格颜色，例如播放条，音量条的颜色
		this.autoplay= false, // 如果true,浏览器准备好时开始回放。
		this.preload="auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		this.loop= false  // 是否自动循环
		this.lang='zh-cn' // 语言，'en', 'zh-cn', 'zh-tw'
		this.screenshot=false  // 是否允许截图（按钮），点击可以自动将截图下载到本地
		this.preload='auto'// 自动预加载
		this.volume= 0.7  // 初始化音量
		this.highlight= [  // 进度条时间点高亮
			{text: '10M',time: 600,},
			{text: '20M',time: 1200,}
		]
		this.sources= [
			{
				type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
				src: addres // url地址
			}
		],
		this.poster= MV.cover
		this.notSupportedMessage= '此视频暂无法播放，请稍后再试', 
		this.controlBar= {
			timeDivider: true,
			durationDisplay: true,
			remainingTimeDisplay: false,
			//全屏按钮
			fullscreenToggle: true
		}
	}
}


