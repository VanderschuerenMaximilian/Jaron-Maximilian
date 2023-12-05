import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap'

import useFirebase from '@/composables/useFirebase'
import useCustomPerson from './composables/useCustomPerson'
import { i18n } from './bootstrap/i18n'
import LogRocket from 'logrocket';

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomPerson, customPerson } = useCustomPerson()
// LogRocket.init('s0ro0t/bellewaerde', {
//     dom: {
//         inputSanitizer: true,
//     }
// })

app.use(i18n)
;(async () => {
    await restoreUser()
    if(firebaseUser.value) {        
        await restoreCustomPerson()
        // if (customPerson.value) {
        //     LogRocket.identify(firebaseUser.value?.uid, {
        //         name: customPerson.value.fullName,
        //         email: firebaseUser.value.email as string,

        //         personType: customPerson.value.personType,
        //         workEmail: customPerson.value.workEmail,
        //         firstName: customPerson.value.firstName,
        //         lastName: customPerson.value.lastName,
        //         jobType: customPerson.value.jobType,
        //     });
        // }
    }
    app.use(router)
    app.mount('#app')
})()
