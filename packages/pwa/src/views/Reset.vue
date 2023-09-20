<template>
    <div class="w-3/5 flex flex-col gap-4">
        <h1>Forgot Password?</h1>
        <p>Enter your email address and we will send you a link to reset your password.</p>
        <form @submit.prevent="handleReset" class="flex flex-col items-center gap-6">
            <input type="email" name="email" id="email" v-model="email" placeholder="Email" />
            <button type="submit" class="px-4 py-2 bg-green-800 rounded text-white">Reset Password</button>
        </form>
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