<template>
    <p>{{ error }}</p>
    <div class="flex justify-center items-center min-h-screen drop-shadow-lg">
        <div class="bg-white border-t-12 border-[#047143] mt-[-180px] rounded-md">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center">Sign up</h1>
            <div v-show="dirties.account" class="mx-auto p-4 bg-[#FFDFE2] border-red-600 border-3 mt-3 max-w-sm rounded-lg">
                    <p class="text-center font-medium text-red-600">This account already exists.</p>
                </div>
            <form @submit.prevent="handleRegister" class="flex flex-col gap-[20px] mt-[20px] mx-[40px]" novalidate>
                <div class="flex justify-between">
                    <div class="flex flex-col gap-1">
                        <label for="First name">First name</label>
                        <input type="text" name="FirstName" id="FirstName" class="w-[239px] bg-[#E7E7E7] h-[51px] p-3 rounded-md"
                        v-model="newUser.FirstName" placeholder="First name">
                        <p v-show="dirties.FirstName" class="text-red-500 text-3 mb-[-28px] flex justify-end">Invalid first name</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="LastName">Last name</label>
                        <input type="text" name="LastName" id="LastName"
                        class="w-[239px] bg-[#E7E7E7] h-[51px] p-3 rounded-md" v-model="newUser.LastName"
                        placeholder="Last name">
                        <p v-show="dirties.LastName" class="text-red-500 text-3 mb-[-28px] flex justify-end">Invalid last name</p>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 rounded-md"
                    v-model="newUser.email" placeholder="Email" />
                    <p v-show="dirties.email" class="text-red-500 text-3 mb-[-28px] flex justify-end">Invalid email</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="password">Password</label>
                    <div class="relative">
                        <input type="password" name="password" id="password"
                        class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md" v-model="newUser.password"
                        placeholder="Password" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        @click="togglePasswordVisibility()">
                        <Eye id="eye" class="select-none"/>
                        <EyeOff id="eye-off" class="hidden select-none"/>
                    </div>
                </div>
                <p v-show="dirties.password" class="text-red-500 text-3 mb-[-28px] flex justify-end">The password must be longer than 5</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="Confirmpassword">Confirm password</label>
                    <div class="relative">
                        <input type="password" name="Confirmpassword" id="Confirmpassword"
                        class="w-[498px] bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md" v-model="newUser.Confirmpassword"
                        placeholder="Confirm password" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        @click="toggleConfirmPasswordVisibility()">
                        <Eye id="eye2" class="select-none"/>
                        <EyeOff id="eye2-off" class="hidden select-none"/>
                    </div>
                </div>
                <p v-show="dirties.Confirmpassword" class="text-red-500 text-3 flex justify-end">Not equal to password</p>
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
            FirstName: false,
            LastName: false,
            email: false,
            password: false,
            Confirmpassword: false,
            account: false,
        })

        const newUser = ref({
            FirstName: '',
            LastName: '',
            email: '',
            password: '',
            Confirmpassword: ''
        })

        const error = ref<AuthError | null>(null)

        const togglePasswordVisibility = () => {
            const passwordInput = document.getElementById('password') as HTMLInputElement;
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

        const toggleConfirmPasswordVisibility = () => {
            const passwordInput = document.getElementById('Confirmpassword') as HTMLInputElement;
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
            if(newUser.value.FirstName === '') {
                dirties.value.FirstName = true
            } else dirties.value.FirstName = false
            if(newUser.value.LastName === '') {
                dirties.value.LastName = true
            } else dirties.value.LastName = false

            const forbiddenDomains = ['admin', 'administration', 'employee'];
            const emailPattern = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,4}$/;
            const matches = newUser.value.email.match(emailPattern);
            if (!matches || forbiddenDomains.includes(matches[1].toLowerCase())) {
                dirties.value.email = true;
            } else {
                dirties.value.email = false;
            }

            if(newUser.value.password === '' || newUser.value.password.length < 6) {
                dirties.value.password = true
            } else dirties.value.password = false
            if(newUser.value.Confirmpassword !== newUser.value.password) {
                dirties.value.Confirmpassword = true
            } else dirties.value.Confirmpassword = false
            
            if (!dirties.value.FirstName && !dirties.value.LastName && !dirties.value.email && !dirties.value.password && !dirties.value.Confirmpassword) {
                const name: string = newUser.value.FirstName + ' ' + newUser.value.LastName
                register(name, newUser.value.email, newUser.value.password)
                    .then(() => {
                        login(newUser.value.email, newUser.value.password, router)
                            .then(()=>{
                                router.push('/login')
                            });
                    })
                    .catch((error) => {
                        dirties.value.account = true;
                    })
            }
        }

        return {
            newUser,
            error,
            dirties,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            handleRegister,

        }
    }
}
</script>