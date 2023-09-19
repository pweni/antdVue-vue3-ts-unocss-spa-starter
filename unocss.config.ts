import {
    defineConfig,
    presetIcons,
    presetUno,
    // presetWebFonts,
    // transformerDirectives,
    // transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
export default defineConfig({
    shortcuts: [
        ['fcc', 'flex justify-center items-center'],
        ['flex-col', 'flex flex-col'],
        ['text-ellipsis', 'truncate'],
        ['wf', 'w-full'],
        ['hf', 'h-full'],
        ['fit', 'wf hf'],
    ],
    presets: [
        presetUno(),
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
            warn: true,
        }),
        presetRemToPx({
            baseFontSize: 4,
        }),
        // presetWebFonts({
        //   fonts: {
        //     sans: 'DM Sans',
        //     serif: 'DM Serif Display',
        //     mono: 'DM Mono',
        //   },
        // }),
    ],
    // transformers: [
    //   transformerDirectives(),
    //   transformerVariantGroup(),
    // ],
    theme: {
        breakpoints: {
            sm: '576px',
            md: '768px',
            lg: '992',
            xl: '1200px',
            '2xl': '1600px',
        },
        container: {
            center: true,
            maxWidth: {
                sm: '540px',
                md: '720px',
                lg: '960px',
                xl: '1140px',
                '2xl': '1400px',
            },
        },
    },
})
