<template>
    <div class="min-h-80vh flex-col justify-center">
        <a-row justify="center" class="wf">
            <a-col :md="8" :sm="12" :xs="22" :lg="6">
                <a-input-search v-model:value="inputSmiles" placeholder="Your SMILES Here" enter-button size="large" @search="onSearch" />
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from 'stores/global'
// import { useResultsStore } from 'stores/results'
import { message } from 'ant-design-vue'
const global = useGlobalStore()
const router = useRouter()
// const resultsStore = useResultsStore()
const inputSmiles = ref('CC(C)OC(=O)CC(=O)CSC1=C(C=C2CCCC2=N1)C#N')
// 进入主页就设置isIndexPage=true
global.isIndexPage = true
// 并且读取global.smiles的状态给inputSmiles
// inputSmiles.value = global.smiles
// 初始化rdkitjs的时候需要提醒
if (!window.RDKitModule) {
    message.info({
        content: `rdkit.js is initializing...`,
        style: {
            zIndex: 9999,
        },
    })
}
// 每个一定事件查看rdkitjs是否初始化完成，完成就提示
const checkRdkitjs = window.setInterval(() => {
    if (window.RDKitModule) {
        message.success({
            content: 'rdkit.js is ok.',
            style: {
                zIndex: 9999,
            },
        })
        // 完成了就可以清除interval
        clearInterval(checkRdkitjs)
        return
    }
}, 500)
// 点击主页查询按钮的逻辑
const onSearch = async () => {
    // 点击按钮前先判断rdkitjs好没好
    if (!window.RDKitModule) {
        message.error({
            content: 'rdkit.js is not ready,please wait serveral seconds or refresh the page.',
            style: {
                zIndex: 9999,
            },
            class: 'c-red',
        })
        return
    }
    // rdkitjs is ready
    let mol = window.RDKitModule.get_mol(inputSmiles.value)
    let isSmilesValid = mol.is_valid()
    // 判断输入的smiles是否合法，有三点
    // 1: smiles是空，2：smiles不对，3：smiles长度小于等于1，无法用图神经网络
    if (!isSmilesValid || !inputSmiles.value || inputSmiles.value.length == 1) {
        message.error({
            content: 'Please input a valid SMILES',
            style: {
                zIndex: 9999,
            },
        })
        return
    }
    global.smiles = inputSmiles.value
    message.success({
        content: 'Computing....',
        style: {
            zIndex: 9999,
        },
    })
    // 全部通过后请求后端数据
    // resultsStore.calSingleAdmetRequest(global.smiles)
    global.isIndexPage = false
    await router.push('result')
}
</script>

<style scoped></style>
