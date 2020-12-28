import { request } from "../../../request/request";
// 用户收藏数量
export function MyCounr(){
	return request({
		url:`/user/subcount`
	})
}
// 用户信息
export function My(){
	return request({
		url:`/user/account`
	})
}
// 播放列表
export function MyPlaylist(id){
	return request({
		url:`/user/playlist?uid=${id}`
	})
}
// 历史播放
export function MyRecord(id){
	return request({
		url:`/user/record?uid=${id}`
	})
}
// 电台
export function MyDj(id){
	return request({
		url:`/user/dj?uid=${id}`
	})
}

export function MyFollows(id){
	return request({
		url:`/user/follows?uid=${id}`
	})
}
// 动态
export function MyEvent(id){
	return request({
		url:`/user/event?uid=${id}`
	})
}
export function MyAudio(id){
	return request({
		url:`/user/audio?uid=${id}`
	})
}

// 收藏的视频
export function MyVideo(){
	return request({
		url:`/video/sub`
	})
}
// 收藏的mv
export function MySublist(){
	return request({
		url:`/mv/sublist`
	})
}
//收藏专辑列表
export function MyFolloweds(){
	return request({
		url:`/album/sublist`
	})
}




