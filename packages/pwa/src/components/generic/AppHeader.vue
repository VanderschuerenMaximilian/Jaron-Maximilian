<template>
    <header v-if="$route.meta.showHeader" class="flex absolute items-center justify-between w-full bg-slate-100 shadow-lg pr-4 z-99">
        <div>
            <RouterLink to="/" class="overflow-hidden">
                <picture>
                    <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                </picture>
            </RouterLink>
        </div>
        <!-- desktop menu -->
        <nav class="gap-3 md:flex md:items-center hidden">
            <ul class="flex lg:gap-x-4 gap-x-2 my-auto">
                <li><RouterLink to="/" class="nav-link">{{ $t('navigation.home') }}</RouterLink></li>
                <li><RouterLink to="/map" class="nav-link">{{ $t('navigation.map') }}</RouterLink></li>
                <li><RouterLink to="/events" class="nav-link">{{ $t('navigation.events') }}</RouterLink></li>
                <li><RouterLink to="/contact" class="nav-link">{{ $t('navigation.contact') }}</RouterLink></li>
                <li><RouterLink to="/openinghours" class="nav-link">{{ $t('navigation.openingHours') }}</RouterLink></li>
                <li><RouterLink to="/tickets" class="nav-link">{{ $t('navigation.tickets') }}</RouterLink></li>
                <li><RouterLink to="/alerts" class="nav-link">{{ $t('navigation.alerts') }}</RouterLink></li>
            </ul>
            <div class="flex items-center">
                <RouterLink to="/login" class="bg-primary-green hover:bg-secondary-green px-4 py-2 text-slate-100 rounded" v-if="!firebaseUser">{{ $t('navigation.login') }}</RouterLink>
                <button class="button-focus w-8 h-8 rounded-full overflow-hidden bg-primary-green text-slate-100 items-center text-5" @click="clickProfile" v-else>
                    <img class="profile-section" :src="profileLetter" :alt="customPerson?.fullName">
                </button>
                <section v-if="clickedProfile" class="profile-section transition-opacity rounded fixed top-12 right-18 w-72 bg-secondary-green text-slate-100 px-4 pt-4 space-y-2">
                    <div class="profile-section border-b-2 pb-2">
                        <h4 class="profile-section h5 mb-2">{{ $t('navigation.title') }}</h4>
                        <div class="profile-section flex items-center w-full gap-4">
                            <div class="profile-section w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                                <img class="profile-section" :src="profileLetter" :alt="customPerson?.fullName">
                            </div>
                            <div class="profile-section text-slate-100">
                                <h3 class="profile-section font-bold m-0 text-start w-[200px] overflow-hidden truncate whitespace-nowrap">{{ firebaseUser?.displayName }}</h3>
                                <p class="profile-section text-sm text-start w-[200px] overflow-hidden truncate whitespace-nowrap">{{ firebaseUser?.email }}</p>
                            </div>
                        </div>
                    </div>
                    <section class="profile-section border-b-2 pb-2 text-start" v-if="customPerson && firebaseUser">
                        <div v-if="customPerson.personType === PersonType.ADMIN" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/management/' + firebaseUser?.uid + '/dashboard/overview'" class="menu-link" @click="clickProfile">{{ $t('navigation.dashboard') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/profile'" class="menu-link" @click="clickProfile">{{ $t('navigation.profile') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">{{ $t('navigation.shops') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/qrscanner'" class="menu-link" @click="clickProfile">QRScanner</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.MANAGER" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/management/' + firebaseUser?.uid + '/dashboard/overview'" class="menu-link" @click="clickProfile">{{ $t('navigation.dashboard') }}</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.EMPLOYEE" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/profile'" class="menu-link" @click="clickProfile">{{ $t('navigation.profile') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">{{ $t('navigation.shops') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/qrscanner'" class="menu-link" @click="clickProfile">QRScanner</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.VISITOR" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/visitor/' + firebaseUser?.uid + '/mytickets'" class="menu-link" @click="clickProfile">{{ $t('navigation.myTickets') }}</RouterLink>
                            <RouterLink :to="'/auth/visitor/' + firebaseUser?.uid + '/myalerts'" class="menu-link" @click="clickProfile">My Alerts</RouterLink>
                        </div>
                    </section>
                    <section class="profile-section text-start">
                        <ul class="profile-section space-y-2">
                            <li class="profile-section"><RouterLink to="/" class="menu-link" @click="clickProfile">{{ $t('navigation.home') }}</RouterLink></li>
                            <li class="profile-section"><RouterLink to="/map" class="menu-link" @click="clickProfile">{{ $t('navigation.map') }}</RouterLink></li>
                            <li class="profile-section"><RouterLink to="/events" class="menu-link" @click="clickProfile">{{ $t('navigation.events') }}</RouterLink></li>
                            <li class="profile-section"><RouterLink to="/contact" class="menu-link" @click="clickProfile">{{ $t('navigation.contact') }}</RouterLink></li>
                            <li class="profile-section"><RouterLink to="/openinghours" class="menu-link" @click="clickProfile">{{ $t('navigation.openingHours') }}</RouterLink></li>
                            <li class="profile-section"><RouterLink to="/tickets" class="menu-link" @click="clickProfile">{{ $t('navigation.tickets') }}</RouterLink></li>
                            <li class="profile-section"><RouterLink to="/alerts" class="menu-link" @click="clickProfile">{{ $t('navigation.alerts') }}</RouterLink></li>
                        </ul>
                    </section>
                    <button @click="handleLogout" class="menu-link py-2 border-t-2 w-full text-start">{{ $t('navigation.logOut') }}</button>
                </section>
            </div>
            <select class="nav-link link-focus h-6 bg-slate-100 cursor-pointer" name="language" id="language"
            @change="setLanguage" :value="currentLocale">
                <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
                    {{ key }}
                </option>
            </select>
            <AppLocalePicker/>
        </nav>
        <!-- mobile menu -->
        <section class="md:hidden block">
            <button class="profile-section button-focus h-full flex items-center justify-center" @click="clickProfile">
                <Menu class="profile-section w-8 h-8 text-primary-green" />
            </button>
            <div :class="{'absolute top-0 right-0 z-50 w-1/2 bg-primary-green translate-x-[100%] transition-transform hidden': !clickedProfile,
            'absolute top-0 right-0 z-50 w-1/2 bg-primary-green translate-x-[0%] transition-transform drop-shadow-2xl rounded-bl-xl': clickedProfile}">
                <div class="w-full flex justify-between items-center pr-8 pl-5 h-20">
                    <select class="button-focus bg-primary-green text-slate-100 border-2 border-slate-100 rounded-md" name="language" id="language"
                    @change="setLanguage" :value="currentLocale">
                        <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
                            {{ key }}
                        </option>
                    </select>
                    <button class="button-focus rounded-full" @click="clickProfile">
                        <X class="w-8 h-8 text-slate-100" />
                    </button>
                </div>
                <section class="px-4 space-y-4">
                    <div class="border-b-2 pb-2" v-if="firebaseUser">
                        <h4 class="h5-white text-center">{{ $t('navigation.title') }}</h4>
                        <div class="flex gap-4 items-center">
                            <div class="text-slate-100">
                                <h3 class="font-bold m-0 text-start">{{ firebaseUser?.displayName }}</h3>
                                <p class="text-sm text-start break-all">{{ firebaseUser?.email }}</p>
                            </div>
                        </div>
                    </div>
                    <section class="border-b-2 pb-2 text-start" v-if="customPerson && firebaseUser">
                        <div v-if="customPerson.personType === PersonType.ADMIN" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/management/' + firebaseUser?.uid + '/dashboard/overview'" class="menu-link" @click="clickProfile">{{ $t('navigation.dashboard') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/profile'" class="menu-link" @click="clickProfile">{{ $t('navigation.profile') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">{{ $t('navigation.shops') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/qrscanner'" class="menu-link" @click="clickProfile">QRScanner</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.MANAGER" class="flex flex-col gap-2">
                            <RouterLink to="'/auth/management/' + 'firebaseUser.value?.uid' + '/dashboard/overview'" class="menu-link" @click="clickProfile">{{ $t('navigation.dashboard') }}</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.EMPLOYEE" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/profile'" class="menu-link" @click="clickProfile">{{ $t('navigation.profile') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">{{ $t('navigation.shops') }}</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/qrscanner'" class="menu-link" @click="clickProfile">QRScanner</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.VISITOR" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/visitor/' + firebaseUser?.uid + '/mytickets'" class="menu-link" @click="clickProfile">{{ $t('navigation.myTickets') }}</RouterLink>
                            <RouterLink :to="'/auth/visitor/' + firebaseUser?.uid + '/myalerts'" class="menu-link" @click="clickProfile">My Alerts</RouterLink>
                        </div>
                    </section>
                    <ul class="flex flex-col gap-4 border-b-2 pb-4">
                        <li><RouterLink to="/" class="menu-link" @click="clickProfile">{{ $t('navigation.home') }}</RouterLink></li>
                        <li><RouterLink to="/map" class="menu-link" @click="clickProfile">{{ $t('navigation.map') }}</RouterLink></li>
                        <li><RouterLink to="/events" class="menu-link" @click="clickProfile">{{ $t('navigation.events') }}</RouterLink></li>
                        <li><RouterLink to="/contact" class="menu-link" @click="clickProfile">{{ $t('navigation.contact') }}</RouterLink></li>
                        <li><RouterLink to="/openinghours" class="menu-link" @click="clickProfile">{{ $t('navigation.openingHours') }}</RouterLink></li>
                        <li><RouterLink to="/tickets" class="menu-link" @click="clickProfile">{{ $t('navigation.tickets') }}</RouterLink></li>
                        <li><RouterLink to="/alerts" class="menu-link" @click="clickProfile">{{ $t('navigation.alerts') }}</RouterLink></li>
                    </ul>
                    <button v-if="firebaseUser" @click="handleLogout" class="menu-link pb-4 w-full text-start">{{ $t('navigation.logOut') }}</button>
                    <RouterLink to="/login" class="group" v-else="firebaseUser">
                        <button @click="clickProfile" class="text-slate-100 py-4" >
                            <span class="group-hover:underline">{{ $t('navigation.login') }}</span>
                        </button>
                    </RouterLink>
                </section>
            </div>
        </section>
    </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import useCustomPerson from '@/composables/useCustomPerson'
import useLanguage from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import { PersonType } from '@/interfaces/IPersonType'
import { useRouter } from 'vue-router'
import { ref, watch, onBeforeUnmount } from 'vue'
import { X, Menu } from 'lucide-vue-next';
import { UPDATE_LOCALE } from '@/graphql/person.mutation'
import { useMutation } from '@vue/apollo-composable'

export default {
    components: {
        X,
        Menu,
        RouterLink,
    },
    setup() {
        const { firebaseUser, signOutUser } = useFirebase()
        const { customPerson } = useCustomPerson()
        const { setLocale } = useLanguage()
        const { locale } = useI18n()
        const currentLocale = ref<string>(customPerson.value?.locale || locale.value)
        const profileLetter = ref<string>(customPerson.value?.profilePicture || 'A')
        const router = useRouter()
        const clickedProfile = ref(false)
        const { mutate: updateLocale } = useMutation(UPDATE_LOCALE)

        watch(customPerson, ()=> {
            setLocale(customPerson.value?.locale || locale.value)
        }, { immediate: true })

        const clickProfile = () => {
            clickedProfile.value = !clickedProfile.value

            if (clickedProfile) {
                document.addEventListener('click', closeProfileSection);
            } else {
                document.removeEventListener('click', closeProfileSection);
            }
        }

        const closeProfileSection = (event: Event) => {
            const profileSection = document.querySelector('.profile-section');
            const selectedElement = event.target as HTMLElement;
            if (profileSection && !selectedElement.classList.contains('profile-section')) {
                clickedProfile.value = false;
                document.removeEventListener('click', closeProfileSection);
            }
        }

        const handleLogout = () => {
            signOutUser().then(() => {
                clickedProfile.value = false
                customPerson.value = undefined
                router.push("/login")
            })
        }

        const setLanguage = (event: Event) => {
            const target = event.target as HTMLSelectElement
            setLocale(target.value)
            currentLocale.value = target.value
            updateLocale({
                personId: customPerson.value?.id,
                locale: target.value,
            })
        }

        onBeforeUnmount(() => {
            document.removeEventListener('click', closeProfileSection);
        });

        return {
            firebaseUser,
            clickedProfile,
            customPerson,
            currentLocale,
            locale,
            PersonType,
            SUPPORTED_LOCALES,

            profileLetter,
            clickProfile,
            handleLogout,
            setLanguage,
        }
    }
}
</script>