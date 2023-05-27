import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import Inspector  from "vite-plugin-vue-inspector";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Inspector(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            dts: true,
        }),
        Unocss({}),
        visualizer({
            open: true,
        }),
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
        splitVendorChunkPlugin(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            src: '/src/',
            stores: '/src/stores/',
            layouts: '/src/layouts/',
            views: '/src/views/',
            router: '/src/router/',
            components: '/src/components/',
            boot: '/src/boot/',
            utils: '/src/utils/',
            types: '/src/types/',
            jsons: '/src/jsons/',
        },
    },
    base:'/drugmatrix/'
    // build: {
    //     // rollup 配置
    //     rollupOptions: {
    //         output: {
    //             manualChunks(id: any): any {
    //                 if (id.includes('node_modules')) {
    //                     return id.toString().split('node_modules/')[1].split('/')[0].toString()
    //                 }
    //             },
    //         },
    //     },
    // },
})
