import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})
// 设置post请求数据类型
// instance.defaults.headers.post['content-type'] = 'application/json;charset=UTF-8'

// 请求拦截
instance.interceptors.request.use(option => {
  return option
}, error => {
  console.log('请求没有发出去', error)
})

// 响应拦截
instance.interceptors.response.use(option => {
  const { status, data } = option
  // 状态码200 代表服务端已响应
  if (status === 200) {
    const { code, message } = data
    // 业务状态码 不等于200 给出提示
    if (code !== 200) {
      alert(message)
      return Promise.reject(option)
    }
    return Promise.resolve(option)
  }
}, error => {
  // 相应失败
  console.log('相应失败', error)
})

export default instance
