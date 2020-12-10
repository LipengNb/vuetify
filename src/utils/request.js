import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 30000
})
// 设置post请求数据类型
instance.defaults.headers.post['content-type'] = 'application/json;charset=UTF-8'

// 请求拦截
instance.interceptors.request.use(option => {
	return option
}, error => {
	console.log('请求没有发出去', error)
})

// 响应拦截
instance.interceptors.response.use(option => {
	// 响应成功
	return option
}, error => {
	// 相应失败
})

export default instance