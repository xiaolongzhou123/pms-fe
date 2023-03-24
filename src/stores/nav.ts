import type { Nav } from "@/typeing"

import { defineStore } from "pinia"


export const useNav = defineStore('nav', {
  state: () => ({
    count: 0,
    name: 'abc',
    navList: [] as Nav[]
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    UpdateNav(nav: Nav[]) {
      this.navList = nav
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
      paths: ["navList"]
    }]
  }
})


