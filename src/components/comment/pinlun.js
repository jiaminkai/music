import { request } from "../../../request/request";
//发送、恢复评论
export function SendComment(type,id,content){
	if(type==6){
		return request({
			url:`/comment?t=1&type=${type}&threadId=${id}&content=${content}`
		})
	}else{
		return request({
			url:`/comment?t=1&type=${type}&id=${id}&content=${content}`
		})
	}

}
// //发送动态、恢复评论
// export function SendEnevtComment(type,id,content){
// 	return request({
// 		url:`/comment?t=1&type=${type}&threadId=${id}&content=${content}`
// 	})
// }
//删除评论
export function DelComment(type,id,content){
	return request({
		url:`/comment?t=0&type=${type}&id=${id}&content=${content}`
	})
}
//评论点赞
export function LikeComment(type,id,cid){
	return request({
		url:`/comment/like?id=${id}&cid=${cid}&t=1&type=${type}`
	})
}

//动态评论点赞
export function EventLikeComment(type,id,cid){
	return request({
		url:`/comment/like?threadId=${id}&cid=${cid}&t=1&type=${type}`
	})
}
