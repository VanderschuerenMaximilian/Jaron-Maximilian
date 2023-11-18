<template>
    <section class="w-full flex bg-primary-green min-h-screen">
        <aside class="w-[400px] flex flex-col items-center">
            <div class="h-[100px] flex flex-col justify-center items-center">
                <RouterLink to="/" class="overflow-hidden">
                    <picture>
                        <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                    </picture>
                </RouterLink>
                <!-- TODO: Add text in the sheets -->
                <!-- <select class="h-6 bg-slate-100" name="language" id="language"
                @change="setLanguage" :value="locale">
                    <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
                        {{ key }}
                    </option>
                </select> -->
            </div>
            <ul class="c-dash-nav flex flex-col items-center w-full gap-6 py-8 overflow-y-scroll h-[calc(100vh-100px)]">
                <RouterLink to="overview" class="w-full dashboard-link" @click="checkPath('overview')" :class="{ 'bg-secondary-green': path === 'overview' }">
                <li class="flex w-full gap-4">
                        <Box class="w-6 h-6 ml-[37%]" />
                        <span>Overview</span>
                </li>
                </RouterLink>
                <RouterLink to="finances" class="w-full dashboard-link" @click="checkPath('finances')" :class="{ 'bg-secondary-green': path === 'finances' }">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Finances</span>
                    </li>
                </RouterLink>
                <RouterLink to="employees" class="w-full dashboard-link" @click="checkPath('employees')" :class="{ 'bg-secondary-green': path === 'employees' }">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Employees</span>
                    </li>
                </RouterLink>
                <RouterLink to="visitors" class="w-full dashboard-link" @click="checkPath('visitors')" :class="{ 'bg-secondary-green': path === 'visitors' }">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Visitors</span>
                    </li>
                </RouterLink>
                <RouterLink to="attractions" class="w-full dashboard-link" @click="checkPath('attractions')" :class="{ 'bg-secondary-green': path === 'attractions' }">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Attrations</span>
                    </li>
                </RouterLink>
                <RouterLink to="storeManagement" class="w-full dashboard-link" @click="checkPath('storeManagement')" :class="{ 'bg-secondary-green': path === 'storeManagement' }">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Store Management</span>
                    </li>
                </RouterLink>
                <RouterLink to="stock" class="w-full dashboard-link" @click="checkPath('stock')" :class="{ 'bg-secondary-green': path === 'stock' }">
                    <li class="flex w-full gap-4">
                            <Box class="w-6 h-6 ml-[37%]" />
                            <span>Stock</span>
                    </li>
                </RouterLink>
                <RouterLink to="alerts" class="w-full dashboard-link" @click="checkPath" :class="{ 'bg-secondary-green': path === 'alerts' }">
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
import useLanguage from '@/composables/useLanguage';
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n';
import { onMounted, ref } from 'vue';

export default {
    components: {
        RouterLink,
        Box
    },
    setup() {
        const { signOutUser } = useFirebase()
        const { setLocale } = useLanguage()
        const { locale } = useI18n()
        const path = ref('overview')
        const router = useRouter()

        const checkPath = (route: string) => {
            path.value = route    
        }
        
        const handleSignOut = () => {
            signOutUser(router)
        }

        const setLanguage = (event: any) => {
            const target = event.target as HTMLSelectElement
            setLocale(target.value)
        }

        onMounted(() => {
            checkPath(router.currentRoute.value.path.split('/')[router.currentRoute.value.path.split('/').length - 1])
        })

        return {
            locale,
            SUPPORTED_LOCALES,
            checkPath,
            path,
            handleSignOut,
            setLanguage,
        }
    }
}

</script>
