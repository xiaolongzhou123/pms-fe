import type { ILogin } from "@/typeing"

import { defineStore } from "pinia"


export const useLogin = defineStore('login', {
  state: () => ({
    count: 0,
    name: 'abc',
    Auth: false,
    Info: {} as ILogin
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    UpdateLogin(info: ILogin) {
      this.Info = info
    },
  },
  persist: {
    enabled: true,
    strategies: [{
      // 自定义存储的 key，默认是 store.$id
      //key: "custom storageKey",
      // 可以指定任何 extends Storage 的实例，默认是 sessionStorage,localStorage
      storage: localStorage,
      // state 中的字段名，按组打包储存
      // paths: ["menuList"]
    }]
  }
})


