<template>
    <p>{{ error }}</p>
    <div class="flex justify-center items-center min-h-screen drop-shadow-lg">
        <div class="bg-white border-t-12 border-[#047143] mt-[-180px] rounded-md">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center">Sign up</h1>
            <form @submit.prevent="handleRegister" class="flex flex-col gap-[20px] mt-[20px] mx-[40px]">
                <div class="flex justify-between">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between">
                            <label for="voornaam">Voornaaam</label>
                             <p v-show="dirties.voornaam" class="text-red-500 ">Ongeldige.</p>
                        </div>
                        <input type="text" name="voornaam" id="voornaam" class="w-[239px] bg-[#E7E7E7] h-[51px] p-3 rounded-md"
                        v-model="newUser.voornaam" placeholder="Voornaam">
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between">
                            <label for="achternaam">Achternaam</label>
                             <p v-show="dirties.achternaam" class="text-red-500">Ongeldig.</p>
                        </div>
                        <input type="text" name="achternaam" id="achternaam"
                        class="w-[239px] bg-[#E7E7E7] h-[51px] p-3 rounded-md" v-model="newUser.achternaam"
                        placeholder="Achternaam">
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex justify-between">
                            <label for="email">Email</label>
                             <p v-show="dirties.email" class="text-red-500">Ongeldig e-mailadres</p>
                        </div>
                    <input type="email" name="email" id="email" class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 rounded-md"
                    v-model="newUser.email" placeholder="Email" />
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex justify-between">
                            <label for="wachtwoord">Wachtwoord</label>
                             <p v-show="dirties.password" class="text-red-500">Het wachtwoord moet langer dan 5.</p>
                        </div>
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
                    <div class="flex justify-between">
                            <label for="bevestigwachtwoord">Bevestig Wachtwoord</label>
                             <p v-show="dirties.bevestigpassword" class="text-red-500">Niet gelijk aan wachtwoord.</p>
                        </div>
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
        const dirties = ref({
            voornaam: false,
            achternaam: false,
            email: false,
            password: false,
            bevestigpassword: false,
        })

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
            if(newUser.value.voornaam === '') {
                dirties.value.voornaam = true
            } else dirties.value.voornaam = false
            if(newUser.value.achternaam === '') {
                dirties.value.achternaam = true
            } else dirties.value.achternaam = false
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if(newUser.value.email === '' || !emailPattern.test(newUser.value.email)) {
                dirties.value.email = true
            } else dirties.value.email = false
            if(newUser.value.password === '' || newUser.value.password.length < 6) {
                dirties.value.password = true
            } else dirties.value.password = false
            if(newUser.value.bevestigpassword !== newUser.value.password) {
                dirties.value.bevestigpassword = true
            } else dirties.value.bevestigpassword = false

            if (dirties.value.voornaam && dirties.value.achternaam && dirties.value.email && dirties.value.password && dirties.value.bevestigpassword) {
            register(newUser.value.voornaam + ' ' + newUser.value.achternaam, newUser.value.email, newUser.value.password)
                .then(() => {
                    login(newUser.value.email, newUser.value.password, router)
                        .then(()=>{
                            router.push('/login')
                        });
                })
                .catch((error) => {
                    error.value = error
                })
            }
        }

        return {
            newUser,
            error,
            dirties,
            togglePasswordVisibility,
            toggleBevestigPasswordVisibility,
            handleRegister,

        }
    }
}
</script>