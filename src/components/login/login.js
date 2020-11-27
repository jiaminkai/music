import { request } from "../../../request/request";

export function btnLogin(){
    return request({
        method:'get',
        url:'/login/status',
    })
}

export function Login(data){
    return request({
        method:'post',
        url:'/login',
        data
    })

}
export function LoginDetail(id){
    return request({
        method:'post',
        url:'/user/detail?uid='+id+'',
    })
}
