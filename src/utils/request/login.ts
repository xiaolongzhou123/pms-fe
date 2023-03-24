import request from '@/utils/request/axios'

import type { IResponseData, ILogin, ILoginData } from '@/typeing'








//{"mydata":[{"id":1,"name":"aa"},{"id":2,"name":"bb"}],"succes":true}
export function Login(data: ILoginData) {
    return request<any, IResponseData<ILogin>>({
        url: "/ssoapi/login",
        method: "post",
        data: data,
    }).then(res => {
        if (res.data.access_token === undefined) {
            return Promise.reject(res.data);
        }
        return res.data
    })
}

