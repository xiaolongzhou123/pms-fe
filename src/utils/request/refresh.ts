import request from '@/utils/request/axios'

import type { IResponseData, ILogin, ILoginData, IUser } from '@/typeing'








//{"mydata":[{"id":1,"name":"aa"},{"id":2,"name":"bb"}],"succes":true}
export function Getrefresh() {
    return request<any, IResponseData<ILogin>>({
        url: "/ssoapi/refresh_token",
        method: "get",
    }).then(res => {
        return res.data
    })
}

