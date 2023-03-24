import type { Menu } from "@/typeing"

import { defineStore } from "pinia"


export const useMenu = defineStore('menu', {
  state: () => ({
    count: 0,
    name: 'abc',
    Auth: false,
    menuList: [] as Menu[]
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    UpdateMenu(menu: Menu[]) {
      console.log("===useMenu,UpdateMenu", menu)
      this.menuList = menu

    },
    UpdateAuth(auth: boolean) {
      this.Auth = auth
    }
  },
  persist: {
    enabled: true,
    strategies: [{
      // 自定义存储的 key，默认是 store.$id
      //key: "custom storageKey",
      // 可以指定任何 extends Storage 的实例，默认是 sessionStorage,localStorage
      storage: sessionStorage,
      // state 中的字段名，按组打包储存
      paths: ["menuList"]
    }]
  }
})


