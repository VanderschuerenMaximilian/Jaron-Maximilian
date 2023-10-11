import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap'

import useFirebase from '@/composables/useFirebase'
import useCustomPerson from './composables/useCustomPerson'

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomPerson } = useCustomPerson()

;(async () => {
    await restoreUser()
    if(firebaseUser.value) await restoreCustomPerson()

    app.use(router)

    app.mount('#app')
})()
