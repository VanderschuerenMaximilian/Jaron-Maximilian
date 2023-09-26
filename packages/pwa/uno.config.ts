import { defineConfig, presetWebFonts } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
    shortcuts: {
        'nav-link': 'focus:font-bold focus:text-green-800 hover:text-green-800 hover:underline text-lg',
        'h1': 'text-h1 leading-h1 font-bold',
        'h1-green': 'text-h1 leading-h1 font-bold text-primary-green',
        'h1-white': 'text-h1 leading-h1 font-bold text-slate-100',
        'h2': 'text-h2 leading-h2 font-bold',
        'h2-green': 'text-h2 leading-h2 font-bold text-primary-green',
        'h2-white': 'text-h2 leading-h2 font-bold text-slate-100',
        'h3': 'text-h3 leading-h3 font-bold',
        'h3-green': 'text-h3 leading-h3 font-bold text-primary-green',
        'h3-white': 'text-h3 leading-h3 font-bold text-slate-100',
        'h4': 'text-h4 leading-h4 font-bold',
        'h4-green': 'text-h4 leading-h4 font-bold text-primary-green',
        'h4-white': 'text-h4 leading-h4 font-bold text-slate-100',
        'h5': 'text-h5 leading-h5 font-bold',
        'h5-green': 'text-h5 leading-h5 font-bold text-primary-green',
        'h5-white': 'text-h5 leading-h5 font-bold text-slate-100',
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
    theme: {
        colors: {
            'primary-green': '#00733C',
            'secondary-green': '#028043',
            'light-green': '#669949',
            'lighter-green': '#B1BD5F',
        },
        fontSize: {
            'h1': '2.5rem',
            'h2': '2rem',
            'h3': '1.75rem',
            'h4': '1.5rem',
            'h5': '1.25rem',
        },
        leading: {
            'h1': '3rem',
            'h2': '2.5rem',
            'h3': '2rem',
            'h4': '1.75rem',
            'h5': '1.5rem',
        }
    },
})