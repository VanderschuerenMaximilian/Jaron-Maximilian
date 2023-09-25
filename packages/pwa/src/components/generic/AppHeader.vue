<template>
    <section class="flex items-center justify-between w-11/12 py-4">
        <div>
            <!-- TODO: add logo -->
            <RouterLink to="/" class="hover:text-green-800">Home</RouterLink>
        </div>
        <section class="flex gap-4">
            <div class="space-x-4">
                <RouterLink to="/" class="hover:text-green-800 hover:underline">Home</RouterLink>
                <RouterLink to="/map" class="hover:text-green-800 hover:underline">Map</RouterLink>
                <RouterLink to="/contact" class="hover:text-green-800 hover:underline">Contact</RouterLink>
                <RouterLink to="/openingsuren" class="hover:text-green-800 hover:underline">Openingsuren</RouterLink>
                <RouterLink to="/tickets" class="hover:text-green-800 hover:underline">Tickets</RouterLink>
                <RouterLink to="/alerts" class="hover:text-green-800 hover:underline">Alerts</RouterLink>
            </div>
            <div>
                <RouterLink to="/login" class="underline cursor-pointer hover:text-green-800" v-if="!firebaseUser">Login</RouterLink>
                <button @click="handleLogout" v-else
                class="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded text-slate-100">Sign Out</button>
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