import {request } from "../../../request/request";
// 电台轮播
export  function DtBanner(){
	return request({
		url:`/dj/banner`,
		method:'get'
	})
}
//电台个性推荐
export  function DtRecommend(){
	return request({
		url:`/dj/personalize/recommend`,
		method:'get'
	})
}
//电台 - 分类
export  function DtCatelist(){
	return request({
		url:`/dj/catelist`,
		method:'get'
	})
}
//电台 - 详情
export  function DtDetail(id){
	return request({
		url:`/dj/detail?rid=${id}`,
		method:'get'
	})
}
//电台 -节目
export  function DtSong(id,limit=30,offset=1){
	return request({
		url:`dj/program?rid=${id}&limit=${limit}&offset=${offset}`,
		method:'get'
	})
}
//电台 -节目-详情
export  function Dtprogram(id){
	return request({
		url:`dj/program/detail?id=${id}`,
		method:'get'
	})
}
//电台 -节目-评论
export  function DtComment(id){
	return request({
		url:`/comment/dj?id=${id}`,
		method:'get'
	})
}

//电台 -分类推选
export  function DtCateSub(id){
	return request({
		url:`/dj/recommend/type?type=${id}`,
		method:'get'
	})
}
//电台订阅者列表
export  function DtSubscriber(id){
	return request({
		url:`/dj/subscriber?id=${id}`,
		method:'get'
	})
}
//电台个性推荐
export  function DtPersonalize(){
	return request({
		url:`/dj/personalize/recommend`,
		method:'get'
	})
}

