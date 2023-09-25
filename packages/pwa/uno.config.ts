import { defineConfig, presetWebFonts } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
    shortcuts: {
        'nav-link': 'focus:font-bold focus:text-green-800 hover:text-green-800 hover:underline text-xl'
    },
    presets: [
        presetUno(),
        presetWebFonts({
            provider: 'google',
            fonts: {
            sans: {
                    name: 'Poppins',
                    weights: [300, 400, 500, 600, 700],
                    italic: false,
                }
            },
        }),
    ],
})