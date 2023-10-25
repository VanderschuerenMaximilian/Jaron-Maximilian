import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap'

import useFirebase from '@/composables/useFirebase'
import useCustomPerson from './composables/useCustomPerson'
import useCustomAlerts from './composables/useCustomAlerts'
import { i18n } from './bootstrap/i18n'

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomPerson } = useCustomPerson()
const { restoreCustomAssignedAlerts } = useCustomAlerts()

app.use(i18n)
;(async () => {
    await restoreUser()
    if(firebaseUser.value) {
        await restoreCustomPerson()
        await restoreCustomAssignedAlerts()
    }
    app.use(router)
    app.mount('#app')
})()
