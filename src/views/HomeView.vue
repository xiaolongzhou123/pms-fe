<template>
  <div>
    <h1>主页</h1>

  </div>
</template>

<style></style>


<script setup lang="ts">
import type { IUser } from '@/typeing'
import { getUser } from '@/utils/request';
import { ref } from 'vue'






getUser().then((res: IUser) => {
  console.log("===", res)
}).catch(error => {
  console.log("获取失败", error.response.data)
});
</script>