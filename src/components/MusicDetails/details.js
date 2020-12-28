import {request} from '../../../request/request';

export function GetComment(id){
    return request({
        url:`/comment/new?type=0&id=${id}&sortType=3`,
        method:'get'
    })
}
export function GetHotComment(id){
    return request({
        url:`/comment/hot?id=${id}&type=0&limit=5`,
        method:'get'
    })
}


export function GetDetails(id){
    return request({
        url:'/song/detail?ids='+id,
        method:'get'
    })
}
export function GetAlbum(id){
    return request({
        url:'/album?id='+id,
        method:'get'
    })
}
export function GetLyric(id){
    return request({
        url:'/lyric?id='+id,
        method:'get'
    })
}
export function GetSong(id){
    return request({
        url:'/simi/song?id='+id,
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
