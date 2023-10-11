<template>
    <header v-if="$route.meta.showHeader" class="flex absolute items-center justify-between w-full bg-slate-100 shadow-lg pr-8 z-99">
        <div>
            <RouterLink to="/" class="overflow-hidden">
                <picture>
                    <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                </picture>
            </RouterLink>
        </div>
        <!-- desktop menu -->
        <nav class="gap-4 md:flex hidden">
            <ul class="flex lg:gap-x-4 gap-x-2 my-auto">
                <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
                <li><RouterLink to="/map" class="nav-link">Map</RouterLink></li>
                <li><RouterLink to="/events" class="nav-link">Events</RouterLink></li>
                <li><RouterLink to="/contact" class="nav-link">Contact</RouterLink></li>
                <li><RouterLink to="/openinghours" class="nav-link">Opening Hours</RouterLink></li>
                <li><RouterLink to="/tickets" class="nav-link">Tickets</RouterLink></li>
                <li><RouterLink to="/alerts" class="nav-link">Alerts</RouterLink></li>
            </ul>
            <div class="flex items-center">
                <RouterLink to="/login" class="bg-primary-green hover:bg-secondary-green px-4 py-2 text-slate-100 rounded" v-if="!firebaseUser">Login</RouterLink>
                <button class="w-8 h-8 rounded-full bg-primary-green" @click="clickProfile" v-else>
                </button>
                <section v-if="clickedProfile" class="transition-opacity rounded fixed top-12 right-8 w-72 bg-secondary-green text-slate-100 px-4 pt-4 space-y-2">
                    <div class="border-b-2 pb-2">
                        <h4 class="h5 mb-2">Account</h4>
                        <div class="flex items-center w-full gap-4">
                            <div class="w-8 h-8 rounded-full bg-slate-100"></div>
                            <div class="text-slate-100">
                                <h3 class="font-bold m-0 text-start w-[200px] overflow-hidden truncate whitespace-nowrap">{{ firebaseUser?.displayName }}</h3>
                                <p class="text-sm text-start w-[200px] overflow-hidden truncate whitespace-nowrap">{{ firebaseUser?.email }}</p>
                            </div>
                        </div>
                    </div>
                    <section class="border-b-2 pb-2 text-start" v-if="customPerson && firebaseUser">
                        <div v-if="customPerson.personType === PersonType.ADMIN" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/management/' + firebaseUser?.uid + '/dashboard/overview'" class="menu-link" @click="clickProfile">Dashboard</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">Shops</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.MANAGER" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/management/' + firebaseUser?.uid + '/dashboard/overview'" class="menu-link" @click="clickProfile">Dashboard</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.EMPLOYEE" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">Shops</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.VISITOR" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/visitor/' + firebaseUser?.uid" class="menu-link" @click="clickProfile">My Tickets</RouterLink>
                        </div>
                    </section>
                    <section class="text-start">
                        <ul class="space-y-2">
                            <li><RouterLink to="/" class="menu-link" @click="clickProfile">Home</RouterLink></li>
                            <li><RouterLink to="/map" class="menu-link" @click="clickProfile">Map</RouterLink></li>
                            <li><RouterLink to="/events" class="menu-link" @click="clickProfile">Events</RouterLink></li>
                            <li><RouterLink to="/contact" class="menu-link" @click="clickProfile">Contact</RouterLink></li>
                            <li><RouterLink to="/openinghours" class="menu-link" @click="clickProfile">Opening Hours</RouterLink></li>
                            <li><RouterLink to="/tickets" class="menu-link" @click="clickProfile">Tickets</RouterLink></li>
                            <li><RouterLink to="/alerts" class="menu-link" @click="clickProfile">Alerts</RouterLink></li>
                        </ul>
                    </section>
                    <button @click="handleLogout" class="menu-link py-2 border-t-2 w-full text-start">Log Out</button>
                </section>
            </div>
        </nav>
        <!-- mobile menu -->
        <section class="md:hidden block">
            <button class="h-full flex items-center justify-center" @click="clickProfile">
                <Menu class="w-8 h-8 text-primary-green" />
            </button>
            <div :class="{'absolute top-0 right-0 z-50 h-4/5 w-1/2 bg-primary-green translate-x-[100%] transition-transform hidden': !clickedProfile,
            'absolute top-0 right-0 z-50 w-1/2 bg-primary-green translate-x-[0%] transition-transform drop-shadow-2xl rounded-bl-xl': clickedProfile}">
                <div class="w-full flex justify-end px-8 h-20">
                    <button @click="clickProfile">
                        <X class="w-8 h-8 text-slate-100" />
                    </button>
                </div>
                <section class="px-4 space-y-4">
                    <div class="border-b-2 pb-2" v-if="firebaseUser">
                        <h4 class="h5-white text-center">Account</h4>
                        <div class="flex gap-4 items-center">
                            <div class="text-slate-100">
                                <h3 class="font-bold m-0 text-start">{{ firebaseUser?.displayName }}</h3>
                                <p class="text-sm text-start">{{ firebaseUser?.email }}</p>
                            </div>
                        </div>
                    </div>
                    <section class="border-b-2 pb-2 text-start" v-if="customPerson && firebaseUser">
                        <div v-if="customPerson.personType === PersonType.ADMIN" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/management/' + firebaseUser?.uid + '/dashboard/overview'" class="menu-link" @click="clickProfile">Dashboard</RouterLink>
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">Shops</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.MANAGER" class="flex flex-col gap-2">
                            <RouterLink to="'/auth/management/' + 'firebaseUser.value?.uid' + '/dashboard/overview'" class="menu-link" @click="clickProfile">Dashboard</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.EMPLOYEE" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/employee/' + firebaseUser?.uid + '/shops'" class="menu-link" @click="clickProfile">Shops</RouterLink>
                        </div>
                        <div v-else-if="customPerson.personType === PersonType.VISITOR" class="flex flex-col gap-2">
                            <RouterLink :to="'/auth/visitor/' + firebaseUser?.uid" class="menu-link" @click="clickProfile">My Tickets</RouterLink>
                        </div>
                    </section>
                    <ul class="flex flex-col gap-4 h-full border-b-2 pb-4">
                        <li><RouterLink to="/" class="menu-link" @click="clickProfile">Home</RouterLink></li>
                        <li><RouterLink to="/map" class="menu-link" @click="clickProfile">Map</RouterLink></li>
                        <li><RouterLink to="/events" class="menu-link" @click="clickProfile">Events</RouterLink></li>
                        <li><RouterLink to="/contact" class="menu-link" @click="clickProfile">Contact</RouterLink></li>
                        <li><RouterLink to="/openinghours" class="menu-link" @click="clickProfile">Openings Hours</RouterLink></li>
                        <li><RouterLink to="/tickets" class="menu-link" @click="clickProfile">Tickets</RouterLink></li>
                        <li><RouterLink to="/alerts" class="menu-link" @click="clickProfile">Alerts</RouterLink></li>
                    </ul>
                    <button v-if="firebaseUser" @click="handleLogout" class="menu-link pb-4 w-full text-start">Log Out</button>
                    <RouterLink to="/login" class="group" v-else="firebaseUser">
                        <button @click="clickProfile" class="text-slate-100 py-4" >
                            <span class="group-hover:underline">Log In</span>
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
import { PersonType } from '@/interfaces/IPersonType'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { X, Menu } from 'lucide-vue-next';

export default {
    components: {
        X,
        Menu,
        RouterLink
    },
    setup() {
        const { firebaseUser, signOutUser } = useFirebase()
        const { customPerson } = useCustomPerson()
        const router = useRouter()
        const clickedProfile = ref(false)

        const clickProfile = () => {
            clickedProfile.value = !clickedProfile.value
        }

        const handleLogout = () => {
            signOutUser(router)
            clickedProfile.value = false
        }

        return {
            firebaseUser,
            clickedProfile,
            customPerson,
            PersonType,

            clickProfile,
            handleLogout
        }
    }
}
</script>