<template>
    <div class="w-3/5 flex flex-col gap-4 items-center">
        <h1>Forgot Password?</h1>
        <p>Enter your email address and we will send you a link to reset your password.</p>
        <form @submit.prevent="handleReset" class="flex flex-col items-center gap-6">
            <input type="email" name="email" id="email" v-model="email" placeholder="Email" />
            <button type="submit" class="px-4 py-2 bg-primary-green rounded text-white">Reset Password</button>
        </form>
        <div class="flex justify-between w-20%">
            <RouterLink to="/login" class="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-slate-100 rounded">Login</RouterLink>
            <RouterLink to="/register" class="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-slate-100 rounded">Register</RouterLink>
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