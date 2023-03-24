// src/axios.ts
import axios, { formToJSON, type AxiosRequestConfig } from 'axios'
import { useLogin } from '@/stores'
import router from '@/router'
import type { ILogin } from '@/typeing';
import { Getrefresh } from './refresh';




// const ConfigBaseURL = env.VITE_APP_BASE_SERVER + env.VITE_API_BASE_URL //默认路径，这里也可以使用env来判断环境
const request = axios.create({
    timeout: 5000, // 请求超时时间
    baseURL: '',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 泛型接口,T的类型支持
export interface IResponseData<T = any> {
    code: number;
    message: string;
    data: T;
}
function isExipred(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const obj = JSON.parse(jsonPayload);
    const t1 = Math.round(new Date().getTime() / 1000)
    const t2 = obj.exp as number

    console.log(t1)
    console.log(t2)
    console.log(t1 - t2)
    if ((t1 - t2) > 0) {
        return true
    }
    return false
}

// 添加请求拦截器
request.interceptors.request.use(config => {
    const loginstore = useLogin()

    // console.log("request=====", config)
    if (config.url !== '/api/login' && loginstore.Info.access_token !== undefined) {
        config.headers.Authorization = loginstore.Info.access_token
    }
    //判断是否超时



    return config
})
// 添加响应拦截器
request.interceptors.response.use(response => {
    console.log("response.use(response)===", response)
    return response.data
}, error => {
    console.log("====响应拦截器:", error)
    if (error.response.status === 401) {
        // router.push("/login")
        const loginstore = useLogin()

        const ok = isExipred(loginstore.Info.access_token)
        if (ok === true) {

            console.log("超时")

            //调用刷新接口
            Getrefresh().then((res: ILogin) => {
                console.log("==obj:", res)
                loginstore.UpdateLogin(res)
                location.replace(location.href)

            }).catch(error => {
                console.log("catch.....err", error)
            });

        }
    }
    const msg = error.Message !== undefined ? error.Message : ''
    // alert(msg)
    return Promise.reject(error)
})



// // 通用的请求函数
// export async function request1<T>(config: AxiosRequestConfig) {
//     return Axios
//         .request<IResponseData<T>>(config)
//         .then((res) => res.data.data);
// }



export default request;
