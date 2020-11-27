import {request } from "../../../request/request";
export function GetDj(id){
    return request({
        method:'get',
        url:`/playlist/detail?id=${id}`
    })
}