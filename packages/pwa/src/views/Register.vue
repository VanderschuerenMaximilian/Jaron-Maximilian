<template>
    <p>{{ error }}</p>
    <div class="flex justify-center items-center min-h-screen drop-shadow-lg">
        <div class="bg-white border-t-12 border-primary-green mt-20 rounded-md w-full sm:w-120">
            <h1 class="text-[30px] font-bold mt-[44px] flex justify-center">{{ $t('signup.title') }}</h1>
            <div v-show="dirties.account" class="mx-auto p-4 bg-[#FFDFE2] border-red-600 border-3 mt-3 max-w-sm rounded-lg">
                    <p class="text-center font-medium text-red-600">{{ $t('signup.popUp.error') }}</p>
                </div>
            <form @submit.prevent="handleRegister" class="flex flex-col gap-[20px] mt-[20px] mx-[40px]" novalidate>
                <div class="flex sm:flex-row flex-col justify-between gap-4">
                    <div class="flex flex-col gap-1">
                        <label for="FirstName">{{ $t('signup.firstName.label') }}</label>
                        <input type="text" name="FirstName" id="FirstName" class="w-100% bg-[#E7E7E7] h-[51px] p-3 rounded-md button-focus"
                        v-model="newUser.FirstName" :placeholder="$t('signup.firstName.placeholder')">
                        <p v-show="dirties.FirstName" class="text-red-500 text-3 mb-[-28px] flex justify-end">{{ $t('signup.firstName.error') }}</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="LastName">{{ $t('signup.lastName.label') }}</label>
                        <input type="text" name="LastName" id="LastName"
                        class="w-100% bg-[#E7E7E7] h-[51px] p-3 rounded-md button-focus" v-model="newUser.LastName"
                        :placeholder="$t('signup.lastName.placeholder')">
                        <p v-show="dirties.LastName" class="text-red-500 text-3 mb-[-28px] flex justify-end">{{ $t('signup.lastName.error') }}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email">{{ $t('signup.email.label') }}</label>
                    <input type="email" name="email" id="email" class="w-[100% bg-[#E7E7E7] h-[51px] p-3 rounded-md button-focus"
                    v-model="newUser.email" :placeholder="$t('signup.email.placeholder')" />
                    <p v-show="dirties.email" class="text-red-500 text-3 mb-[-28px] flex justify-end">{{ $t('signup.email.error') }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="password">{{ $t('signup.password.label') }}</label>
                    <div class="relative">
                        <input type="password" name="password" id="password"
                        class="w-100% bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md button-focus" v-model="newUser.password"
                        :placeholder="$t('signup.password.placeholder')" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        @click="togglePasswordVisibility()">
                        <button id="eye" type="button" class="select-none hover:opacity-80 button-focus">
                            <Eye/>
                        </button>
                        <button id="eye-off" type="button" class="hidden select-none hover:opacity-80 button-focus">
                            <EyeOff/>
                        </button>
                    </div>
                </div>
                <p v-show="dirties.password" class="text-red-500 text-3 mb-[-28px] flex justify-end">{{ $t('signup.password.error') }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="Confirmpassword">{{ $t('signup.confirmPassword.label') }}</label>
                    <div class="relative">
                        <input type="password" name="Confirmpassword" id="Confirmpassword"
                        class="w-100% bg-[#E7E7E7] h-[51px] p-3 pr-10 rounded-md button-focus" v-model="newUser.Confirmpassword"
                        :placeholder="$t('signup.confirmPassword.placeholder')" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        @click="toggleConfirmPasswordVisibility()">
                        <button id="eye2" type="button" class="select-none hover:opacity-80 button-focus">
                            <Eye/>
                        </button>
                        <button id="eye2-off" type="button" class="hidden select-none hover:opacity-80 button-focus">
                            <EyeOff/>
                        </button>
                    </div>
                </div>
                <p v-show="dirties.Confirmpassword" class="text-red-500 text-3 flex justify-end">{{ $t('signup.confirmPassword.error') }}</p>
                </div>

                <button type="submit" class="bg-primary-green text-white w-100% h-[51px] rounded-md disabled:opacity-50 flex items-center justify-center hover:opacity-80 button-focus"
                :disabled="addUserLoading">
                    <template v-if="!addUserLoading">{{ $t('signup.register') }}</template>
                    <Loader2 v-else class="animate-spin"/>
                </button>
            </form>
            <div class="mt-[10px] flex justify-center gap-1 mb-[40px]">
                <p>{{ $t('signup.hasAccount') }}</p>
                <RouterLink to="/login" class=" color-primary-green underline font-bold hover:opacity-80 button-focus">{{ $t('signup.logIn') }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'
import useFirebase from '../composables/useFirebase'
import useCustomPerson from '../composables/useCustomPerson'
import router from '@/bootstrap'
import { Eye, EyeOff  } from 'lucide-vue-next';
import { CREATE_PERSON } from '../graphql/person.mutation'
import { useMutation } from '@vue/apollo-composable'
import type { Person } from '@/interfaces/IPersons'
import { Loader2 } from 'lucide-vue-next'

export default {
    components: {
    Eye,
    EyeOff,
    Loader2
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

        const {mutate: addUser, loading: addUserLoading, onDone: userCreated} = useMutation<Person>(CREATE_PERSON)
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

            const forbiddenDomains = ['admin.bellewaerde', 'management.bellewaerde', 'employee.bellewaerde'];
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
                        addUser({
                            createPersonInput: {
                                firstName: newUser.value.FirstName,
                                lastName: newUser.value.LastName,
                                fullName: newUser.value.FirstName + ' ' + newUser.value.LastName,
                                personalEmail: newUser.value.email,
                                phone: null,
                                locale: 'en',
                                personType: 'VISITOR',
                            }
                        }).then(() => {
                            login(newUser.value.email, newUser.value.password, router)
                            .then(()=>{
                                router.push('/login')
                            });
                        })
                    })
                    .catch((error) => {
                        dirties.value.account = true;
                    })
            }
        }

        return {
            addUser,
            addUserLoading,
            newUser,
            error,
            dirties,
            userCreated,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            handleRegister,

        }
    }
}
</script>../bootstrap