<template>
    <div class="flex justify-center items-center min-h-screen mt-[-120px] drop-shadow-lg">
        <div class="bg-white border-t-12 border-[#047143] rounded-md">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center">Login</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col gap-[24px] mt-[40px] mx-[40px]">
                <div class="flex flex-col gap-1">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" v-model="loginCredentials.email" placeholder="Email" class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 rounded-md">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="wachtwoord">Wachtwoord</label>
                    <div class="relative">
                        <input type="password" name="wachtwoord" id="wachtwoord"
                            class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md" v-model="loginCredentials.password"
                            placeholder="Wachtwoord" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            @click="togglePasswordVisibility()">
                            <Eye id="eye" class="select-none"/>
                            <EyeOff id="eye-off" class="hidden select-none"/>
                        </div>
                    </div>
                </div>
                <RouterLink to="/reset" class="mt-[-20px] flex justify-end color-[#047143] underline">forgot your password?</RouterLink>
                <button type="submit" class="bg-[#047143] text-white w-[498px] h-[51px] rounded-md">Login</button>
                <div class="mt-[-20px] flex justify-center gap-1 mb-[40px]">
                    <p>Don't have an account?</p>
                    <RouterLink to="/register" class=" color-[#047143] underline font-bold">Sign up</RouterLink>
                </div>
            </form>
        </div>
    </div>
    <p class="max-w-2xl break-all text-xs">{{ firebaseUser }}</p>

</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '../composables/useFirebase'
import { Eye, EyeOff } from 'lucide-vue-next';


export default {
    components: {
        Eye,
        EyeOff,
    },
    setup() {
        const { login, firebaseUser } = useFirebase()
        const dirties = ref({
            email: false,
            password: false
        
        })

        const loginCredentials = ref({
            email: 'test@email.com',
            password: 'test123'
        })

        const togglePasswordVisibility = () => {
            const passwordInput = document.getElementById('wachtwoord') as HTMLInputElement;
            const eye = document.getElementById('eye') as HTMLInputElement;
            const eye_off = document.getElementById('eye-off') as HTMLInputElement;
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    eye.style.display = 'none';
                    eye_off.style.display = 'block';
                } else {
                    passwordInput.type = 'password';
                    eye.style.display = 'block';
                    eye_off.style.display = 'none';
                }
            }
        }

        const handleLogin = () => {
            if (!loginCredentials.value.email || !loginCredentials.value.password) {
                console.log(loginCredentials.value.email)
                console.log(loginCredentials.value.password)
            }
            else {

            
            login(loginCredentials.value.email, loginCredentials.value.password)
                .then(() => {
                    // TODO: hier wordt naar database enzo gestuurd
                })
            }
        }

        return {
            loginCredentials,
            firebaseUser,
            togglePasswordVisibility,
            handleLogin
        }
    }
}
</script>