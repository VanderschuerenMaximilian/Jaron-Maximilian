<template>
    <section class="flex items-center justify-between w-full bg-slate-100 shadow-lg pr-8">
        <div>
            <!-- TODO: add logo -->
            <RouterLink to="/" class="hover:text-green-800">
                <picture>
                    <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                </picture>
            </RouterLink>
        </div>
        <section class="flex gap-4">
            <div class="space-x-4 my-auto">
                <RouterLink to="/" class="nav-link">Home</RouterLink>
                <RouterLink to="/map" class="nav-link">Map</RouterLink>
                <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
                <RouterLink to="/openingsuren" class="nav-link">Openingsuren</RouterLink>
                <RouterLink to="/tickets" class="nav-link">Tickets</RouterLink>
                <RouterLink to="/alerts" class="nav-link">Alerts</RouterLink>
            </div>
            <div class="flex items-center">
                <RouterLink to="/login" class="bg-green-800 hover:bg-green-900 px-4 py-2 text-slate-100 rounded" v-if="!firebaseUser">Login</RouterLink>
                <div class="group w-8 h-8 rounded-full bg-green-800" v-else>
                    <section class="opacity-0 group-hover:opacity-100 transition-opacity rounded fixed top-12 right-8 w-72 bg-green-700 text-slate-100 px-4 py-2 space-y-2">
                        <div>
                            <h4>Account</h4>
                            <div class="flex gap-4 items-center">
                                <div class="w-8 h-8 rounded-full bg-slate-100"></div>
                                <div class="text-slate-100">
                                    <h3 class="font-bold m-0">Naam</h3>
                                    <p class="text-sm">Email</p>
                                </div>
                            </div>
                        </div>
                            <button @click="handleLogout" class="py-2 border-t-2 w-full text-start">Uitloggen</button>
                    </section>
                </div>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import useFirebase from '@/composables/useFirebase'

export default {
    components: {
        RouterLink
    },
    setup() {
        const { firebaseUser, signOutUser } = useFirebase()

        const handleLogout = () => {
            signOutUser()
        }

        return {
            firebaseUser,

            handleLogout
        }
    }
}
</script>