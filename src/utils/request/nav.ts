import request from '@/utils/request/axios'

import type { IResponseData, Nav } from '@/typeing'








//{"mydata":[{"id":1,"name":"aa"},{"id":2,"name":"bb"}],"succes":true}
export function GetNav() {
    return request<any, IResponseData<Nav[]>>({
        url: "/api/nav",
        method: "get",
    }).then(res => {
        return res.data
    })
}

