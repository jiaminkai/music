import { request } from "../../../request/request";
export function Search(key="2020年度听歌报告",type=1,limit=30,offset=0){
	return request({
		method:'get',
		url:`/cloudsearch?keywords=${key}&type=${type}&limit${limit}&offset=${offset}`

	})
}