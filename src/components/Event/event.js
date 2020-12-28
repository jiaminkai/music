import { request } from "../../../request/request";
// 获取动态消息
export function GetEvent(){
	return request({
		url:`/event?pagesize=30`,
		method:'get'
	})
}
// 获取动态评论
export function GetEventPinglun(id){
	return request({
		url:`/comment/event?threadId=${id}`,
		method:'get'
	})
}
export function LikeEventPinglun(t,id){
	return request({
		url:`/resource/like?t=${t}&type=6&threadId=${id}`,
		method:'get'
	})
}

// 转发动态
export function GetEventForWard(id,uid){
	return request({
		url:`/event/forward?evId=${id}&uid=${uid}&forwards=测试内容`,
		method:'get'
	})
}
// 删除动态
export function GetEventDel(id){
	return request({
		url:`/event/del?evId${id}`,
		method:'get'
	})
}
// 获取用户动态
export function GetUserEvent(id){
	return request({
		url:`/user/event?uid=${id}`,
		method:'get'
	})
}
//h获取动态中的音乐
export function GetSong(id){
	return request({
		url:`/song/url?id=${id}`,
		method:'get'
	})
}
export function GetEventPing(id){
	return request({
		url:`/comment/event?threadId=${id}`,
		method:'get'
	})
}
