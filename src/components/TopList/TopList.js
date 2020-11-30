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
 export class Guan{
     constructor(data){
        this.musicid=data.id
        this.name=data.al.name
        this.picUrl=data.al.picUrl

     }
 }