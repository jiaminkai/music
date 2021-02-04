import axios from "axios";
import { Message } from "element-ui";
import router from "../src/router";
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
          
        }, error=> {
          return Promise.reject(error)
        }
      )

  service.interceptors.response.use(
    config=>{
        return config
    }, 
    error=> {
      
      if (error.response.status) {  
        switch (error.response.status) {                
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。                
          case 401:                    
              this.$router.replace({                        
                  path: '/',                        
                  query: { 
                      redirect: this.$router.currentRoute.fullPath 
                  }
              });
              break;

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面                
          case 403:
              Message.error.error('登录过期，请重新登录')
              // 清除token
              localStorage.removeItem('token');
              this.store.commit('loginSuccess', null);
              // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
              setTimeout(() => {  
                router.replace({                            
                      path: '/login',                            
                      query: { 
                          redirect: this.$router.currentRoute.fullPath 
                      }                        
                  });                    
              }, 1000);                    
              break; 

          // 404请求不存在
          case 404:
              Message.error('呃哦, 你所寻找的热评墙进入了时间的黑洞')
              break;
          case 301:
              Message.error("请先登陸")                                      
          break;
          // 其他错误，直接抛出错误提示
          default:
              Message.error("其他错误")
      }          
      }
      return Promise.reject(error)
    }
    )
    return service(config)
  }