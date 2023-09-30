<template>
    <div class="flex justify-center min-h-screen items-center drop-shadow-lg">
        <div class="bg-white border-t-12 border-[#047143] rounded-md mt-[-120px]">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center ">Forgot Password?</h1>
            <form @submit.prevent="handleReset" class="flex flex-col gap-[20px] mt-[20px] mx-[40px]" novalidate>
                <div class="flex flex-col gap-1">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="email" placeholder="Email" class="w-[498px] bg-[#E7E7E7] h-[51px] p-3  rounded-md" />
                    <p v-show="dirties.email" class="text-red-500 text-3 flex justify-end">Ongeldig e-mailadres</p>
                </div>
                <button type="submit" class="bg-[#047143] text-white w-[498px] h-[51px] rounded-md">Reset Password</button>
            </form>
            <div class="mt-[10px] flex justify-center gap-1 mb-[40px]">
                <p>Remember Password?</p>
                <RouterLink to="/login" class="color-[#047143] underline font-bold">Log in</RouterLink>
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

        const handleReset = () => {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (email.value !== '' && emailPattern.test(email.value)) {
                dirties.value.email = false
            } else {
                dirties.value.email = true
            }

            if(!dirties.value.email) {
                forgotPassword(email.value)
            }
        }

        return {
            email,
            dirties,

            handleReset
        }
    }
}

</script>