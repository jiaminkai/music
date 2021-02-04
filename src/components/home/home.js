import { request } from "../../../request/request";


export function Home(url){
    return request({
        method:'get',
        url
    })
}
export function Subcount(id,params){
    return request({
        method:'post',
        url:'/user/playlist?uid='+id+'',
        params
    })
}
export function LikeMusic(id,params){
    return request({
        method:'post',
        url:'/likelist?uid='+id+'',
        params
    })
}
export function GetMusicDetails(id,params){
    return request({
        method:'post',
        url:'/song/detail?ids='+id+'',
        params
    })
}
export function GetMusic(id,params){
    return request({
        method:'post',
        url:'/song/url?id='+id+'',
        params
    })
}
export function HotSearch(){
	return request({
		url:`/search/hot/detail`
	})
}
export class SubMusic{
    constructor(songs){
        this.picUrl=songs.album.picUrl,
        this.musicname=songs.name
        this.playtime=songs.bMusic.playTime
        this.djname=songs.album.name,
        this.user=songs.artists[0].name
        this.userId=songs.artists[0].id
        this.djid=songs.album.id
        this.url =songs.url
        this.musicid=songs.id
    }
}
export class Music{
    constructor(songs,url){
        this.picUrl=songs.al.picUrl,
        this.musicname=songs.name
        this.playtime=songs.dt
        this.djname=songs.al.name,
        this.user=songs.ar[0].name
        this.userId=songs.ar[0].id
        this.djid=songs.al.id
        this.url =url
        this.musicid=songs.id
    }
}