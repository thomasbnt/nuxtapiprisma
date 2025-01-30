import '@mdi/font/css/materialdesignicons.css'
import '@/assets/scss/main.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {

  const vuetify = createVuetify({
    // @ts-ignore
    styles: {
      configFile: 'assets/scss/main.scss',
    },
  })
  app.vueApp.use(vuetify)
})

