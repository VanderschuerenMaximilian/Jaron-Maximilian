<template>
    <div class="flex justify-center min-h-screen items-center drop-shadow-lg">
        <div class="bg-white border-t-12 border-primary-green rounded-md mt-[-120px] w-full sm:w-120">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center ">{{ $t('forgot.title') }}</h1>

            <form @submit.prevent="handleReset" class="flex flex-col gap-[20px] mt-[20px] mx-[40px]" novalidate>
            <div v-if="isSend" class="mx-auto p-4 bg-secondary-green bg-opacity-20 border-primary-green border-3 mt-3 max-w-sm rounded-lg">
                <p class="text-center font-medium text-primary-green">'{{ $t('forgot.popUp') }}'</p>
            </div>
                <div class="flex flex-col gap-1">
                    <label for="email">{{ $t('forgot.email.label') }}</label>
                    <input type="email" name="email" id="email" v-model="email" :placeholder="$t('forgot.email.placeholder')" class="w-100% bg-[#E7E7E7] h-[51px] p-3 rounded-md button-focus" />
                    <p v-show="dirties.email" class="text-red-500 text-3 flex justify-end">{{ $t('forgot.email.error') }}</p>
                </div>
                <button type="submit" class="bg-primary-green text-white w-100% h-[51px] rounded-md hover:opacity-80 button-focus">{{ $t('forgot.reset') }}</button>
            </form>
            <div class="mt-[10px] flex justify-center gap-1 mb-[40px]">
                <p>{{ $t('forgot.remember') }}</p>
                <RouterLink to="/login" class="color-primary-green underline font-bold hover:opacity-80 button-focus">{{ $t('forgot.logIn') }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '../composables/useFirebase'

export default {
    setup() {
        const { forgotPassword } = useFirebase()
        const dirties = ref({
            email: false,
        })
        const email = ref<string>('')
        const isSend = ref<boolean>(false)
        const handleReset = () => {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (email.value !== '' && emailPattern.test(email.value)) {
                dirties.value.email = false
            } else {
                dirties.value.email = true
            }

            if(!dirties.value.email) {
                forgotPassword(email.value)
                .then(() => {
                    isSend.value = true
                })
            }
        }

        return {
            email,
            dirties,
            isSend,

            handleReset
        }
    }
}

</script>