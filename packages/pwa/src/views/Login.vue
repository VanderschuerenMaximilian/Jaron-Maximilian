<template>
    <p class="max-w-2xl break-all text-xs">{{ firebaseUser }}</p>
    <button @click="handleLogout"
        class="bg-red-500 px-4 py-2 rounded text-white">Sign Out</button>
    <form @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4 items-center">
            <input type="email" name="email" id="email" class="py-2 px-1 border-1 border-slate-400" v-model="loginCredentials.email">
            <input type="password" name="password" id="password" class="py-2 px-1 border-1 border-slate-400" v-model="loginCredentials.password">
            <button class="bg-green-800 px-3 py-2 rounded text-slate-100">Login</button>
        </div>
    </form>
    <div class="flex justify-between w-20%">
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/reset">Forgot password</RouterLink>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '../composables/useFirebase'

export default {
    setup() {
        const { login, firebaseUser, signOutUser } = useFirebase()

        const loginCredentials = ref({
            email: 'test@email.com',
            password: ''
        })

        const handleLogout = () => {
            signOutUser()
        }

        const handleLogin = () => {
            login(loginCredentials.value.email, loginCredentials.value.password)
                .then(() => {
                    // TODO: hier wordt naar database enzo gestuurd
                })
        }

        return {
            loginCredentials,
            firebaseUser,

            handleLogin,
            handleLogout
        }
    }
}
</script>