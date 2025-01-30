import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false,

        timeline: {
            enabled: true,
        },
    },
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL || 'http://localhost:4000',
        }
    },
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    modules: [
        '@nuxt/devtools',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
    ],
    css: ['~/assets/scss/main.scss'],
})
