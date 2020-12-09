import { request } from "../../../request/request";
export function SongCate(){
	return request({
		url:'/playlist/catlist',
		method:'get'
	})
}
export function SongHot(){
	return request({
		url:'/playlist/hot',
		method:'get'
	})
}
export function SongDetail(id){
	return request({
		url:`/playlist/detail?id=${id}`,
		method:'get'
	})
}
export function SongTop(order,cat,limit,offset){
	return request({
		url:`/top/playlist`,
		method:'get',
		params:{
			order,
			cat,
			limit,
			offset
		}
	})
}