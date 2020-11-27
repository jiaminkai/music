import axios from "axios";
export function request(config){
  axios.defaults.headers.c
    const service = axios.create({
        baseURL:'http://localhost:3000',
        timeout:4000,
        withCredentials: true,
        
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      })
      service.interceptors.request.use(
        // config.headers.Authorization= sessionStorage.getItem('cookie'),
        config => {
          if (config.method == 'post') {
            config.data = {
              ...config.data,
              timestamp: Date.parse(new Date()) / 1000
            }
          } else if (config.method == 'get') {
            config.params = {
              timestamp: Date.parse(new Date()) / 1000,
              ...config.params
            }
          }
          return config
        }, function (error) {
          return Promise.reject(error)
        }
      )
      service.interceptors.response.use(config=>{
        return config
    },err=>{
        console.log("err",err )
    })
    return service(config)
}