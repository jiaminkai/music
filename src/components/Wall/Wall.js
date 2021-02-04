import { request } from "../../../request/request";
export function GetWall(){
	return request({
		url:`/comment/hotwall/list`,
		method:'get'
	})
}
export function WallComment(id){
	return request({
		url:`/comment/event?threadId=${id}`,
		method:'get'
	})
}
export class Song{
	constructor(data){
		this.djname=data.song.al.name,
		this.djid=data.song.al.id,
		this.picUrl=data.songCoverUrl,
		this.playtime=data.song.dt,
		this.musicname=data.song.name,
		this.musicid=data.songId,
		this.user=data.artists[0].name
		this.userId=data.artists[0].id

	}
}