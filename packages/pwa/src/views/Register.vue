<template>
    <p>{{ error }}</p>
    <div class="flex justify-center items-center min-h-screen mt-[-90px] drop-shadow-lg">
        <div class="bg-white border-t-12 border-[#047143] rounded-md">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center">Sign up</h1>
            <form @submit.prevent="handleRegister" class="flex flex-col gap-[24px] mt-[40px] mx-[40px]">
                <div class="flex justify-between">
                    <div class="flex flex-col gap-1">
                        <label for="voornaam">Voornaam</label>
                        <input type="text" name="voornaam" id="voornaam" class="w-[239px] bg-[#E7E7E7] h-[51px] p-3 rounded-md"
                        v-model="newUser.voornaam" placeholder="Voornaam">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="achternaam">Achternaam</label>
                        <input type="text" name="achternaam" id="achternaam"
                        class="w-[239px] bg-[#E7E7E7] h-[51px] p-3 rounded-md" v-model="newUser.achternaam"
                        placeholder="Achternaam">
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 rounded-md"
                    v-model="newUser.email" placeholder="Email" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="wachtwoord">Wachtwoord</label>
                    <div class="relative">
                        <input type="password" name="wachtwoord" id="wachtwoord"
                            class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md" v-model="newUser.password"
                            placeholder="Wachtwoord" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            @click="togglePasswordVisibility()">
                            <Eye id="eye" class="select-none"/>
                            <EyeOff id="eye-off" class="hidden select-none"/>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="bevestigwachtwoord">Bevestig wachtwoord</label>
                    <div class="relative">
                        <input type="password" name="bevestigwachtwoord" id="bevestigwachtwoord"
                            class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md" v-model="newUser.bevestigpassword"
                            placeholder="Bevestig wachtwoord" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            @click="toggleBevestigPasswordVisibility()">
                            <Eye id="eye2" class="select-none"/>
                            <EyeOff id="eye2-off" class="hidden select-none"/>
                        </div>
                    </div>
                </div>

                <button type="submit" class="bg-[#047143] text-white w-[498px] h-[51px] rounded-md">Register</button>
            </form>
            <div class="mt-[10px] flex justify-center gap-1 mb-[40px]">
                <p>Already have an account?</p>
                <RouterLink to="/login" class=" color-[#047143] underline font-bold">Log in</RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'
import useFirebase from '../composables/useFirebase'
import router from '../router'
import { Eye, EyeOff  } from 'lucide-vue-next';

export default {
    components: {
        Eye,
        EyeOff,
    },
    setup() {
        const { register, login } = useFirebase()

        const newUser = ref({
            voornaam: '',
            achternaam: '',
            email: '',
            password: '',
            bevestigpassword: ''
        })

        const error = ref<AuthError | null>(null)

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

        const toggleBevestigPasswordVisibility = () => {
            const passwordInput = document.getElementById('bevestigwachtwoord') as HTMLInputElement;
            const eye2 = document.getElementById('eye2') as HTMLInputElement;
            const eye2_off = document.getElementById('eye2-off') as HTMLInputElement;
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    eye2.style.display = 'none';
                    eye2_off.style.display = 'block';
                } else {
                    passwordInput.type = 'password';
                    eye2.style.display = 'block';
                    eye2_off.style.display = 'none';
                }
            }
        }

        const handleRegister = () => {
            register(newUser.value.voornaam + ' ' + newUser.value.achternaam, newUser.value.email, newUser.value.password)
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
            togglePasswordVisibility,
            toggleBevestigPasswordVisibility,
            handleRegister,

        }
    }
}
</script>