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
export  function DtSong(id){
	return request({
		url:`/song/url?id=${id}`,
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
