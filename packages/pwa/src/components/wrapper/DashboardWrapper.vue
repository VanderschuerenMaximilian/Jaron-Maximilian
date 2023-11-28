<template>
    <section class="relative w-full flex bg-primary-green min-h-screen overflow-x-hidden">
        <aside class="flex flex-col items-center ease-in-out"
        :class="navContainerState? 'w-[400px] transform transition-all duration-300':'w-[50px] transform transition-all duration-300'">
            <div class="h-[100px] w-full flex justify-between items-center"
            :class="navContainerState? 'px-8':'px-2 translate-x-1'">
                <RouterLink to="/" class="overflow-hidden" v-if="navContainerState">
                    <picture>
                        <img src="../../assets/logo.jpg" alt="Logo" loading="lazy" class="w-52">
                    </picture>
                </RouterLink>
                <button @click="handleNavContainer">
                    <ChevronLeft class="scale-150 text-slate-100 cursor-pointer rounded-full hover:bg-slate-100 hover:bg-opacity-10 transform transition-colors"
                    :class="navContainerState? 'rotate-0 transfrom transition-transform duration-200':'-rotate-180 transform transition-transform duration-200'"/>
                </button>
            </div>
            <ul class="c-dash-nav flex flex-col items-center w-full gap-6 py-8 overflow-y-scroll h-[calc(100vh-100px)]" v-if="navContainerState">
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
        <section v-if="successfullAssignedEmployees.length > 0" class="absolute bottom-12 right-2 space-y-2">
            <AlertAssignment v-for="alert in successfullAssignedEmployees" :alert="alert" :key="alert.id" />
        </section>
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
import { RouterLink } from 'vue-router'
import { Box, ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import useFirebase from '@/composables/useFirebase';
import { onMounted, ref, watch } from 'vue';
import useCustomPerson from '@/composables/useCustomPerson';
import { UPDATE_NAV_CONTAINER_STATE } from '@/graphql/person.mutation';
import { PERSON_ASSIGNED_TO_ALERT } from '@/graphql/alert.subscription';
import { useMutation, useSubscription } from '@vue/apollo-composable';
import AlertAssignment from '../dashboard/AlertAssignment.vue';
import type { Alert as IAlert } from '@/interfaces/IAlert';

export default {
    components: {
    RouterLink,
    Box,
    ChevronLeft,
    AlertAssignment
},
    setup() {
        const { signOutUser } = useFirebase()
        const { customPerson } = useCustomPerson()
        const path = ref('overview')
        const router = useRouter()
        const navContainerState = ref<boolean>(true)
        const { mutate: updateNavContainerState } = useMutation(UPDATE_NAV_CONTAINER_STATE)
        const { result: employeeAssigned } = useSubscription(PERSON_ASSIGNED_TO_ALERT)
        const checkPath = (route: string) => {
            path.value = route    
        }
        const successfullAssignedEmployees = ref<IAlert[]>([])

        const handleNavContainer = () => {
            navContainerState.value = !navContainerState.value
        }
        
        const handleSignOut = () => {
            signOutUser(router)
        }

        onMounted(() => {
            checkPath(router.currentRoute.value.path.split('/')[router.currentRoute.value.path.split('/').length - 1])
        })
        
        watch(customPerson, () => {
            if (customPerson.value) navContainerState.value = customPerson.value?.navContainerState
        }, { immediate: true })

        watch(navContainerState, () => {
            updateNavContainerState({
                updateNavContainerStateInput: {
                    id: customPerson.value?.id,
                    navContainerState: navContainerState.value,
                }
            })
        })

        watch(employeeAssigned, (data: any) => {
            if (data.personAssignedToAlert) {
                successfullAssignedEmployees.value = [...successfullAssignedEmployees.value, data.personAssignedToAlert]
            }
        })

        return {
            navContainerState,
            path,
            successfullAssignedEmployees,

            checkPath,
            handleNavContainer,
            handleSignOut,
        }
    }
}

</script>
