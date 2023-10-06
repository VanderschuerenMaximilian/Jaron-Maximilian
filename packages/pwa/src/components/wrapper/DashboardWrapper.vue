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
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Overview</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Finances</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Employees</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Visitors</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Attractions</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Shops</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Animals</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><RouterLink to="">
                    <div class="flex">
                        <Box class="w-6 h-6" />
                        <span>Alerts</span>
                    </div>
                </RouterLink></li>
                <li class="dashboard-link"><button class="flex">
                    <Box class="w-6 h-6" />
                    <span>Log Out</span>
                </button></li>
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
        background: #028043;
        border-radius: 25px;
    }
</style>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Box } from 'lucide-vue-next'

export default {
    components: {
        RouterLink,
        Box
    }
}
</script>
