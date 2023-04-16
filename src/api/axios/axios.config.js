/*
 * @Autor        : Pat
 * @Description  : yldct axios api
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-03 17:08:15
 */
import axios from 'axios'
// 响应时间
axios.defaults.timeout = 5 * 10000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("token")) {
            config.headers['Token'] = sessionStorage.getItem("token")
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    res => {
        if (res.data) {
            return res.data
        } else {
            return res
        }
    },
    err => {
        //Message.error("链接服务器失败！请稍后再试。")
        return Promise.reject(err)
    }
)

export default axios