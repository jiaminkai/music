import {request } from "../../../request/request";
export function GetDj(id){
    return request({
        method:'get',
        url:`/playlist/detail?id=${id}`
    })
}
export function GetDjComment(id){
    return request({
        method:'get',
        url:`/comment/playlist?id=${id}`
    })
}
//獲取歌单是否收藏
export function GetDjSub(id){
    return request({
        method:'get',
        url:`/playlist/detail/dynamic?id=${id}`
    })
}
//取消/收藏歌单
export function DjSub(t=1,id){
    return request({
        method:'get',
        url:`/playlist/subscribe?t=${t}&id=${id}`
    })
}
//获取专辑的内容
export function GetAlbum(id){
    return request({
        method:'get',
        url:`/album?id=${id}`
    })
}
//专辑的动态信息
export function GetDontAlbum(id){
    return request({
        method:'get',
        url:`/album/detail/dynamic?id=${id}`
    })
}
//收藏/取消增加
export function SubAlbum(id,t=1){
    return request({
        method:'get',
        url:`/album/sub?id=${id}&t=${t}`
    })
}
//专辑评论
export function AlbumComment(id){
    return request({
        method:'get',
        url:`/comment/album?id=${id}`
    })
}


