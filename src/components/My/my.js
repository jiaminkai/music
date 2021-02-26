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
// 用户歌单
export function MyPlaylist(id){
	return request({
		url:`/user/playlist?uid=${id}`
	})
}
// 历史播放
export function MyRecord(id){
	return request({
		url:`/user/record?uid=${id}&type=0`
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

// 收藏视频
export function MyVaiod(){
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
//收藏歌手列表
export function MyArtist(){
	return request({
		url:`/artist/sublist`
	})
}


//播放视频历史
export function MyPlaylistVideo(){
	return request({
		url:`/playlist/video/recent`
	})
}
//查看签到信息
export function MyYunbei(){
	return request({
		url:`/yunbei/today`
	})
}
//签到
export function MyYun(){
	return request({
		url:`/yunbei/sign`
	})
}




