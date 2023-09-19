import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
// import Inspector from 'vite-plugin-vue-inspector'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            dts: true,
        }),
        Unocss({}),
        visualizer({
            open: true,
        }),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false,
                }),
            ],
            dts: true,
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
            json: '/src/json/',
            config: '/src/config/',
        },
    },
    base: '/drugmatrix/',
    build: {
        // rollup 配置
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ['vue', 'pinia', 'vue-router'],
                    antd: ['ant-design-vue', '@ant-design/icons-vue'],
                },
            },
        },
    },
})
