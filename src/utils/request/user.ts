import request from '@/utils/request/axios'

import type { IResponseData, ILogin, ILoginData, IUser } from '@/typeing'








//{"mydata":[{"id":1,"name":"aa"},{"id":2,"name":"bb"}],"succes":true}
export function getUser() {
    return request<any, IResponseData<IUser>>({
        url: "/ssoapi/user",
        method: "get",
    }).then(res => {
        return res.data
    })
}

