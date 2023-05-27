import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    // presetWebFonts,
    // transformerDirectives,
    // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: [
        // ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        // ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
        ['fcc', 'flex justify-center items-center'],
        ['flex-col', 'flex flex-col'],
        ['text-ellipsis', 'truncate'],
        ['wf', 'w-full'],
        ['hf', 'h-full'],
        ['fit', 'wf hf'],
        // ["ctner", "container mx-auto"],
        [
            'icon-btn',
            'text-16 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary !outline-none',
        ],
    ],
    presets: [
        presetUno(),
        // presetAttributify(),
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
            warn: true,
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
    // theme: {
    //   breakpoints: {
    //     sm: "576px",
    //     // => @media (min-width: 640px) { ... }

    //     md: "768px",
    //     // => @media (min-width: 768px) { ... }

    //     lg: "992",
    //     // => @media (min-width: 1024px) { ... }

    //     xl: "1200px",
    //     // => @media (min-width: 1280px) { ... }

    //     "2xl": "1600px",
    //     // => @media (min-width: 1536px) { ... }
    //   },
    // },
    theme: {
        container: {
            center: true,
        },
    },
})
