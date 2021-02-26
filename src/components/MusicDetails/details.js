import {request} from '../../../request/request';
//获取最新评论
export function GetComment(id){
    return request({
        url:`/comment/new?type=0&id=${id}&sortType=3`,
        method:'get'
    })
}
//获取最热评论
export function GetHotComment(id){
    return request({
        url:`/comment/hot?id=${id}&type=0&limit=5`,
        method:'get'
    })
}

//获取详情
export function GetDetails(id){
    return request({
        url:'/song/detail?ids='+id,
        method:'get'
    })
}
//获取歌手
export function GetAlbum(id){
    return request({
        url:'/album?id='+id,
        method:'get'
    })
}
//获取歌词
export function GetLyric(id){
    return request({
        url:'/lyric?id='+id,
        method:'get'
    })
}
//获取相似音乐
export function GetSong(id){
    return request({
        url:'/simi/song?id='+id,
        method:'get'
    })
}
// 收藏/删除音乐到歌单
export function ChangePlay(op,playid,musicid){
    return request({
        url:`/playlist/tracks?op=${op}&pid=${playid}&tracks=${musicid}`,
        method:'get'
    })
}
//新建歌单
export function CreatePlay(name){
    return request({
        url:`/playlist/create?name=${name}`,
        method:'get'
    })
}
export class Musics{
    constructor(songs,alcum,comments,lyric){
        this.picUrl=songs.al.picUrl,
        this.musicname=songs.al.name,
        this.user=songs.ar[0].name
        this.userId=songs.ar[0].id
        this.djid=songs.al.id
        this.musicid=songs.id
        this.djname=alcum.album.name
        this.djbg=alcum.album.picUrl
        this.djdesc=alcum.album.description
        this.company=alcum.album.company
        this.djmusic=alcum.songs
        this.lyric=lyric.lrc.lyric
        this.hotComments=comments.hotComments
    }
}
