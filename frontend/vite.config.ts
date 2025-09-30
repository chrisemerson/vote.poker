import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        replace({
            _IS_PRODUCTION_: process.env.NODE_ENV === 'production',
        })
    ],
    server: {
        port: 5000
    }
})
