<template>
    <a-config-provider :theme="global.theme">
        <RouterView />
    </a-config-provider>
</template>
<script setup lang="ts">
import { useGlobalStore } from 'stores/global'
// 通过config-provider 定义主题也就是antd自带的样式，完美覆盖
// https://next.antdv.com/docs/vue/customize-theme-cn
const global = useGlobalStore()
global.smiles = ''
</script>

<style scoped></style>
