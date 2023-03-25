import type { IUser } from "@/typeing"

import { defineStore } from "pinia"


export const useHome = defineStore('home', {
    state: () => ({
        count: 0,
        name: 'abc',
        user: {} as IUser
    }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        UpdateHomeUser(obj: IUser) {
            this.user = obj
        }
    }
})


