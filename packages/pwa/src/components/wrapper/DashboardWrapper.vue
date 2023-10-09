<template>
    <section class="w-full flex bg-primary-green min-h-screen">
        <aside class="w-[400px] flex flex-col items-center">
            <div class="h-[100px] flex justify-center items-center">
                <RouterLink to="/" class="overflow-hidden">
                    <picture>
                        <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                    </picture>
                </RouterLink>
            </div>
            <ul class="c-dash-nav flex flex-col items-center w-full gap-6 py-8 overflow-y-scroll h-[calc(100vh-100px)]">
                <RouterLink to="overview" class="w-full dashboard-link">
                <li class="flex w-full gap-4">
                        <Box class="w-6 h-6 ml-[37%]" />
                        <span>Overview</span>
                </li>
                </RouterLink>
                <RouterLink to="finances" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Finances</span>
                    </li>
                </RouterLink>
                <RouterLink to="employees" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Employees</span>
                    </li>
                </RouterLink>
                <RouterLink to="visitors" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Visitors</span>
                    </li>
                </RouterLink>
                <RouterLink to="attractions" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Attrations</span>
                    </li>
                </RouterLink>
                <RouterLink to="shops" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Shops</span>
                    </li>
                </RouterLink>
                <RouterLink to="stock" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Stock</span>
                    </li>
                </RouterLink>
                <RouterLink to="alerts" class="w-full dashboard-link">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Alerts</span>
                    </li>
                </RouterLink>
                <button @click="handleSignOut" class="flex dashboard-link w-full gap-4">
                    <Box class="w-6 h-6"/>
                    <span>Log Out</span>
                </button>
            </ul>
        </aside>
        <RouterView />
    </section>
</template>

<style>
    .c-dash-nav::-webkit-scrollbar {
        width: 4px;
    }
    
    .c-dash-nav::-webkit-scrollbar-thumb {
        background: #669949;
        border-radius: 25px;
    }
</style>

<script lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { Box } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import useFirebase from '@/composables/useFirebase'; 

export default {
    components: {
        RouterLink,
        Box
    },
    setup() {
        const{ signOutUser } = useFirebase()

        const router = useRouter()

        const handleSignOut = () => {
            signOutUser(router)
        }

        return {
            handleSignOut
        }
    }
}

</script>
