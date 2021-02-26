import { request } from "../../../request/request";
export function SingersTop(){
	return request({
		url:'/toplist/artist',
		method:'get'
	})
}
export function SingersSong(id){
	return request({
		url:`/song/url?id=${id}`,
		method:'get'
	})
}
//歌手的专辑
export function SingersDj(id,limit=8,offset=0){
	return request({
		url:`/artist/album?id=${id}&limit=${limit}&offset=${offset}`,
		method:'get'
	})
}
export function Singerscart(type=0,area=-1,initial='-1',limit=50,offset=1){
	return request({
		url:`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`,
		method:'get'
	})
}
//歌手的mv
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


//歌手详情
export function SingersDetails(id){
	return request({
		url:`/artist/detail?id=${id}`,
		method:'get'
	})
}
//歌手的所有音乐
export function SingersMusic(id,num){
	return request({
		url:`/artist/songs?id=${id}&order=hot&limit=15&offset=${num}`,
		method:'get'
	})
}
//收藏歌手
export function SubSinger(id,t=1){
	return request({
		url:`/artist/sub?id=${id}&t=${t}`,
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
export class Song{
	constructor(song){
		this.url=song.url
		this.djname=song.al.name
		this.picUrl=song.al.picUrl
		this.musicname=song.name
		this.playtime=song.dt
		this.musicid=song.id
		this.djid = song.al.id
		this.user=song.ar[0].name
		this.userId=song.ar[0].id
		
	}
}