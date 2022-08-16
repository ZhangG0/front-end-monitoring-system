import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
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
  //
  if (res.code !== 200) {
    Message({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.msg || 'Error')
  } else {
    return res
  }
},
error => {
  // console.log(error)
  Message({
    message: error.msg,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
