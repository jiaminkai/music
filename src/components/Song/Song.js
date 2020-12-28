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
export function SongTop(cat="全部",limit=50,offset=1,order){
	console.log(order )
	return request({
		url:`/top/playlist?limit=${limit}&cat=${cat}&offset=${offset}&order=${order}`,
		method:'get'
	})
}