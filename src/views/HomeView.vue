<template>
  <div>
    <h1>主页</h1>
    <h1>{{ user }}</h1>
  </div>
</template>

<style></style>


<script setup lang="ts">
import type { IUser } from '@/typeing'
import { getUser } from '@/utils/request';
import { useNav, useMenu, useHome } from '@/stores'
import { storeToRefs } from 'pinia'


// 解构用户对象
const homestore = useHome()
const { user } = storeToRefs(homestore)

getUser().then((user: IUser) => {
  homestore.UpdateHomeUser(user)
})

</script>