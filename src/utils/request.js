import axios from 'axios'
import { Message,  } from 'element-ui'
const service = axios.create({
  baseURL:'/api',
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if(res.status !== 200){
    Message({
      message: res.error,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return res
},
error => {
  Message({
    message: error,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
