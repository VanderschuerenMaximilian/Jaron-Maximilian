<template>
    <div class="flex justify-center items-center min-h-screen drop-shadow-lg">
        <div class="bg-white border-t-12 border-primary-green rounded-md w-full sm:w-130">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center">{{ $t('login.title') }}</h1>
            <div v-show="dirties.account" class="mx-auto p-4 bg-[#FFDFE2] border-red-600 border-3 mt-3 max-w-sm rounded-lg">
                <p class="text-center font-medium text-red-600">{{ $t('login.popUp.error') }}</p>
            </div>
            <form @submit.prevent="handleLogin" class="flex flex-col gap-[20px] mt-[20px] mx-[40px]" novalidate>
                
                <div class="flex flex-col gap-1">
                    <label for="email">{{ $t('login.email.label') }}</label>
                    <input type="email" name="email" id="email" v-model="loginCredentials.email" :placeholder="$t('login.email.placeholder')" class="w-100% bg-light-slate h-[51px] p-3 rounded-md button-focus">
                    <p v-show="dirties.email" class="text-red-500 text-3 mb-[-28px] flex justify-end">{{ $t('login.email.error') }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="password">{{ $t('login.password.label') }}</label>
                    <div class="relative">
                        <input type="password" name="password" id="password"
                        class="w-100% bg-light-slate h-[51px] p-3 pr-10 rounded-md button-focus" v-model="loginCredentials.password"
                        :placeholder="$t('login.password.placeholder')" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        @click="togglePasswordVisibility()">
                        <button id="eye" type="button" class="select-none hover:opacity-80 button-focus rounded-md">
                            <Eye/>
                        </button>
                        <button id="eye-off" type="button" class="hidden select-none hover:opacity-80 button-focus rounded-md button-focus">
                            <EyeOff/>
                        </button>
                    </div>
                </div>
                <p v-show="dirties.password" class="text-red-500 text-3 flex justify-end">{{ $t('login.password.error') }}</p>
                </div>
                <RouterLink to="/reset" class="mt-[-10px] flex justify-end text-primary-green underline hover:opacity-80 w-fit ml-auto button-focus">{{ $t('login.forgotPassword') }}</RouterLink>
                <button type="submit" class="bg-primary-green text-white w-100% h-[51px] rounded-md hover:opacity-80 button-focus">{{ $t('login.logIn') }}</button>
                <div class="mt-[-10px] flex justify-center gap-1 mb-[40px]">
                    <p>{{ $t('login.noAccount') }}</p>
                    <RouterLink to="/register" class=" color-primary-green underline font-bold hover:opacity-80 button-focus">{{ $t('login.signUp') }}</RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '../composables/useFirebase'
import useCustomPerson from '../composables/useCustomPerson'
import { Eye, EyeOff } from 'lucide-vue-next';
import { useRouter } from 'vue-router'

export default {
    components: {
        Eye,
        EyeOff,
    },
    setup() {
        const { login, firebaseUser } = useFirebase()
        const { restoreCustomPerson } = useCustomPerson()
        const dirties = ref({
            email: false,
            password: false,
            account: false,
        
        })
        const router = useRouter();
        const loginCredentials = ref({
            email: 'test@management.bellewaerde.be',
            password: 'test123'
        })

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

        const handleLogin = () => {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!loginCredentials.value.email || !emailPattern.test(loginCredentials.value.email)) {
                if (!loginCredentials.value.email) {
                    dirties.value.email = true;
                }
                if (!emailPattern.test(loginCredentials.value.email)) {
                    dirties.value.email = true; 
                }
            }
            else dirties.value.email = false;
            if (!loginCredentials.value.password || loginCredentials.value.password.length < 6) {
                if (!loginCredentials.value.password) {
                    dirties.value.password = true;
                }
                if (loginCredentials.value.password.length < 6) {
                    dirties.value.password = true;
                }
            } else dirties.value.password = false;

            if (!dirties.value.email && !dirties.value.password) {
                login(loginCredentials.value.email, loginCredentials.value.password, router)
                    .then(async (firebaseUser) => {
                        dirties.value.account = false;
                        await restoreCustomPerson();
                        const Useremail = firebaseUser.email
                        const splitEmail = Useremail?.split("@")
                        if (firebaseUser.email === "admin@admin.bellewaerde.be") {
                            router.push("/auth/management/" + firebaseUser.uid + "/dashboard/overview")
                        }
                        else if (splitEmail?.[1].includes("employee.bellewaerde.be")) {
                            router.push("/auth/employee/" + firebaseUser.uid + '/profile')
                        } else if (splitEmail?.[1].includes("management.bellewaerde.be")) {
                            router.push("/auth/management/" + firebaseUser.uid + "/dashboard/overview")
                        } else {
                            router.push("/auth/visitor/" + firebaseUser.uid + "/mytickets")
                        }
                    })
                    .catch((error) => {
                        dirties.value.account = true;
                    });
            }
        }

        return {
            loginCredentials,
            firebaseUser,
            togglePasswordVisibility,
            handleLogin,
            dirties,
        }
    }
}
</script>