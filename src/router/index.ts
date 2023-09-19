import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import MainLayout from 'layouts/MainLayout.vue'
import ResultPage from 'views/ResultPage.vue'
import CADMET from 'src/components/results/admet/C-ADMET.vue'

const router = createRouter({
    //TODO 解决WebHistory模式下打包后刷新result界面404的问题，目前Hash模式可以解决
    history: createWebHistory(import.meta.env.BASE_URL),
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'mainLayout',
            component: MainLayout,
            children: [
                {
                    path: '/',
                    name: 'indexPage',
                    component: () => import('src/views/IndexPage.vue'),
                }
            ],
        },
    ],
})
// console.log(import.meta.env.BASE_URL)

export default router
