<template>
    <section class="flex items-center justify-between w-11/12 py-4">
        <div>
            <RouterLink to="/" class="hover:text-green-800">Home</RouterLink>
        </div>
        <div>
            <RouterLink to="/login" class="underline cursor-pointer hover:text-green-800" v-if="!firebaseUser">Login</RouterLink>
            <button @click="handleLogout" v-else
                class="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded text-slate-100">Sign Out</button>
        </div>
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