<template>
    <p>{{ error }}</p>
    <form @submit.prevent="handleRegister" class="flex flex-col items-center gap-4">
        <input type="text" name="name" id="name" v-model="newUser.name" placeholder="Name">
        <input type="email" name="email" id="email" v-model="newUser.email" placeholder="Email"/>
        <input type="password" name="password" id="password" v-model="newUser.password" placeholder="Password" />
        <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors rounded text-slate-100">Register</button>
    </form>
    <RouterLink to="/login" class="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-slate-100 rounded">Login</RouterLink>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'
import useFirebase from '../composables/useFirebase'
import router from '../router'

export default {
    setup() {
        const { register, login } = useFirebase()

        const newUser = ref({
            name: '',
            email: '',
            password: ''
        })

        const error = ref<AuthError | null>(null)

        const handleRegister = () => {
            register(newUser.value.name, newUser.value.email, newUser.value.password)
                .then(() => {
                    login(newUser.value.email, newUser.value.password)
                        .then(()=>{
                            router.push('/login')
                        });
                })
                .catch((error) => {
                    error.value = error
                })
        }

        return {
            newUser,
            error,

            handleRegister,
        }
    }
}


</script>