<template>
    <div class="flex justify-center items-center min-h-screen mt-[-120px] drop-shadow-lg">
        <div class="bg-white border-t-12 border-[#047143] rounded-md">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center ">Forgot Password?</h1>
            <form @submit.prevent="handleReset" class="flex flex-col gap-[24px] mt-[40px] mx-[40px]">
                <div class="flex flex-col gap-1">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="email" placeholder="Email" class="w-[498px] bg-[#E7E7E7] h-[51px] p-3  rounded-md" />
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

        const email = ref<string>('')

        const handleReset = () => {
            forgotPassword(email.value).then(()=> {
                console.log('email sent')
            })
        }

        return {
            email,

            handleReset
        }
    }
}

</script>