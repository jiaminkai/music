import { request } from "../../../request/request";
export function SingersTop(){
	return request({
		url:'/toplist/artist',
		method:'get'
	})
}
export function SingersDj(id){
	return request({
		url:`/artist/album?id=${id}&limit=8`,
		method:'get'
	})
}
export function Singerscart(type=0,area=-1,initial='-1'){
	return request({
		url:`/artist/list?type=${type}&area=${area}&initial=${initial}`,
		method:'get'
	})
}

export function SingersMV(id){
	return request({
		url:`/artist/mv?id=${id}`,
		method:'get'
	})
}
export function SimiSinger(id){
	return request({
		url:`/simi/artist?id=${id}`,
		method:'get'
	})
}



export function SingersDetails(id){
	return request({
		url:`/artist/detail?id=${id}`,
		method:'get'
	})
}
export function SingersMusic(id,num){
	return request({
		url:`/artist/songs?id=${id}&order=hot&limit=15&offset=${num}`,
		method:'get'
	})
}
export class Singers{
	constructor(singers){
		this.coverImgUrl=singers.artist.cover
		this.description   =singers.artist.briefDesc
		this.name	=singers.artist.name
	}
}