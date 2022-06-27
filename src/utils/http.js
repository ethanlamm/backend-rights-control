import axios from 'axios'
import Vue from 'vue'
import router from '@/router.js'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 映射关系 restful请求风格
let actionMap = {
    get: 'view',
    post: 'add',
    put: 'edit',
    delete: 'delete'
}
// 请求控制
axios.interceptors.request.use((req) => {
    // console.log(req.url);       // 请求的url
    // console.log(req.method);    // 请求方式

    let requestUrl = req.url
    // 除了登录请求外，其他请求(请求头)都要带上token，以便服务器鉴别身份
    if (requestUrl != 'login') {
        req.headers.Authorization = sessionStorage.getItem('token')

        // 非法请求(非权限范围内请求)
        let rights = router.currentRoute.meta   // 当前路由下用户拥有的权限
        let action = actionMap[req.method]        // 用户要进行的请求
        if (rights && rights.indexOf(action) == -1) {
            // 没有权限，属于非法请求
            alert('没有权限')
            return Promise.reject(new Error('没有权限'))
        }
    }
    return req
})

// 相应控制
axios.interceptors.response.use((res) => {
    if (res.data.meta.status == 401) {
        // 得到服务器返回状态码401，代表token被篡改或token过期，此时应该重新登录，跳转至login
        router.push('login')
        // 清空数据
        sessionStorage.clear()
        window.location.reload()
    }
    return res
})
Vue.prototype.$http = axios