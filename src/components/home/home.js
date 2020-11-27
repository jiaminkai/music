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

export class Music{
    constructor(songs,url){
        this.picUrl=songs.al.picUrl,
        this.musicname=songs.name,
        this.playtime=songs.dt
        this.user=songs.ar[0].name
        this.userId=songs.ar[0].id
        this.djid=songs.al.id
        this.url =url
        this.musicid=songs.id
    }
}