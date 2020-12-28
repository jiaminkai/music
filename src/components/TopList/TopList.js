import { request } from "../../../request/request";
export function Toplist(){
   return request({
       method:'get',
       url:'/toplist/detail',
    })
}
export function TopGuan(id){
    return request({
        method:'get',
        url:`/playlist/detail?id=${id}`,
     })
 }
 export function TopGuanSong(id){
    return request({
        method:'get',
        url:`/song/detail?ids=${id}`,
     })
 }
 export function TopGuanSongUrl(id){
    return request({
        method:'get',
        url:`/song/url?id=${id}`,
     })
 }
 export function TopSubSingers(id){
    return request({
        method:'get',
        url:`/related/playlist?id=${id}`,
     })
 }
 export function TopPingLun(id){
    return request({
        method:'get',
        url:`/comment/playlist?id=${id}`,
     })
 }
 export class Guan{
     constructor(pdata,data){
        this.url=pdata.url
        this.musicid=data.id
        this.musicname=data.name
        this.user=data.ar[0].name
        this.picUrl=data.al.picUrl
        this.djname =data.al.name
        this.playtime="03:56"

     }
     
 }
 export class Guanimg{
    constructor(data,lists){
       this.picUrl=data.picUrl
       this.tracks=lists.tracks
    }
}