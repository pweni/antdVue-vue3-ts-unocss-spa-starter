<template>
    <div class="min-h-80vh h-80vh flex-col justify-center">
        <h2 class="logo-font">Bodycheck Your Drug</h2>
        <a-row justify="center" align="middle" class="relative">
            <a-col :md="8" :sm="12" :xs="22" :lg="6" class="fcc py-50 px-10">
                <a-input v-model:value="inputSmiles" placeholder="Input SMILES Here" size="large" @press-enter="onSearch">
                    <template #suffix>
                        <div class="ml-6">
                            <a-tooltip title="Go with your Molecule">
                                <a-button type="text" shape="circle" @click="onSearch">
                                    <i class="i-twemoji-magnifying-glass-tilted-left text-24 !px-0 !mr-0"></i>
                                </a-button>
                            </a-tooltip>
                            <a-tooltip title="Draw a Molecule">
                                <a-button type="text" shape="circle" @click="openKetcherModal">
                                    <i class="i-fxemoji-lowerleftpaintbrush text-24 !px-0"></i>
                                </a-button>
                            </a-tooltip>
                        </div>
                    </template>
                </a-input>
                <a-button
                    type="primary"
                    class="ml-8"
                    @click="
                        () => {
                            inputSmiles = 'CC(C)OC(=O)CC(=O)CSC1=C(C=C2CCCC2=N1)C#N'
                        }
                    "
                >
                    Example
                </a-button>
            </a-col>
        </a-row>
        <a-modal v-model:open="open" style="width: 860px" @ok="ok" :closable="false">
            <template #footer>
                <a-row justify="space-between">
                    <a-col>
                        <a-button type="primary" @click="setMolInKetcher" :loading="!isKetcherReady">Set Molecule from input SMILES</a-button>
                        <a-button type="primary" @click="setExample" :loading="!isKetcherReady">Example</a-button>
                    </a-col>
                    <a-col>
                        <a-button @click="cancel">Cancel</a-button>
                        <a-button type="primary" @click="ok" :loading="okDebounce">Ok</a-button>
                    </a-col>
                </a-row>
            </template>
            <a-spin :spinning="spinning" :delay="500">
                <template #tip>
                    loading...
                    <br />
                    Chemical structure editor is initializing...
                    <br />
                    The first loading may take a bit longer(12MB)
                </template>
                <KetcherEditor></KetcherEditor>
            </a-spin>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import KetcherEditor from 'components/ketcher-editor/index.vue'
import { useGlobalStore } from 'stores/global'
import { message } from 'ant-design-vue'
import { initRDKit } from 'utils/initRDKit'
const global = useGlobalStore()
const router = useRouter()
// a-spin控制
const spinning = ref<boolean>(true)
// ketcher初始化标注
const isKetcherReady = ref<boolean>(false)
// modal的显示变量
const open = ref(false)
// ketcher Dom的引用 用getElementByID取
const ketcherRef = ref<HTMLIFrameElement | null>()
// smiles
const inputSmiles = ref<string>('')
// 用global.smiles控制inputSmiles
inputSmiles.value = global.smiles
watch(
    () => global.smiles,
    (newval) => {
        inputSmiles.value = newval
    }
)
// 进入主页就设置isIndexPage=true
global.isIndexPage = true
global.headerNav = ['home']
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
initRDKit().then(() => {
    message.success({
        content: 'rdkit.js is ok.',
        style: {
            zIndex: 9999,
        },
    })
})
// 点击主页查询按钮的逻辑，就是直接输入框输入然后，查询目前画图的也会使用,
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
    // 修复了inputSmiles.value为无效分子时，mol为null，导致读取null上的is_valid报错的bug，就是加个?就可以
    let isSmilesValid = mol?.is_valid()
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
    global.isIndexPage = false
    // 每次点击预测而不是直接进入导航上面的Service，修改key而触发keepalive的组件强制刷新
    global.resultKey += 1
    await router.push('/result')
    // 设置最上面导航栏，和路由统一
    global.headerNav = ['result']
}

// 打开编辑器的按钮
const openKetcherModal = () => {
    open.value = true
    const ketcherLoadingSpy = setInterval(() => {
        //@ts-ignore
        if (document.getElementById('ketcherId').contentWindow?.ketcher) {
            spinning.value = false
            isKetcherReady.value = true
            clearInterval(ketcherLoadingSpy)
        }
        return
    }, 200)
}
// modal里面的一些按钮
// begin
const setMolInKetcher = () => {
    ketcherRef.value = document.getElementById('ketcherId') as HTMLIFrameElement
    //@ts-ignore
    ketcherRef.value.contentWindow.ketcher.setMolecule(inputSmiles.value)
}

const cancel = () => {
    open.value = false
}

const setExample = () => {
    ketcherRef.value = document.getElementById('ketcherId') as HTMLIFrameElement
    //@ts-ignore
    ketcherRef.value.contentWindow.ketcher.setMolecule('CC(C)OC(=O)CC(=O)CSC1=C(C=C2CCCC2=N1)C#N')
}
// 点击modal ketcher ok按钮的逻辑
const okDebounce = ref<boolean>(false)
const ok = () => {
    okDebounce.value = true
    if (isKetcherReady.value) {
        ketcherRef.value = document.getElementById('ketcherId') as HTMLIFrameElement
        //@ts-ignore
        ketcherRef.value.contentWindow.ketcher.getSmiles().then((res) => {
            if (res != '' && window.RDKitModule.get_mol(res)?.is_valid()) {
                global.smiles = res
                open.value = false
                nextTick(() => onSearch())
                setTimeout(() => {
                    okDebounce.value = false
                }, 3000)
            } else {
                message.error({
                    content: `Please draw a valid molecule`,
                    style: {
                        zIndex: 9999,
                    },
                })
                okDebounce.value = false
                return
            }
        })
        return
    }
    open.value = false
    okDebounce.value = false
    return
}
// end
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kablammo&family=Kaushan+Script&display=swap');
.logo-font {
    text-align: center;
    font-family: 'Kablammo', cursive;
    font-family: 'Kaushan Script', cursive;
    font-size: 60px;
    padding-bottom: 10px;
    margin-bottom: 0;
    letter-spacing: 5px;
    background: -webkit-linear-gradient(34deg, #6097f1 0%, #48abe0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
