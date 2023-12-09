<template>
    <div class="absolute bg-black opacity-40 w-100% h-screen left-0 top-0"></div>
        <section v-if="isShowPassport" class="absolute left-0 top-20 md:top-30 md:left-1/2 md:top-1/2 md:-translate-x-[360px] md:-translate-y-[40px] w-full h-full min-h-3/4 bg-white p-10 z-2 md:max-w-180 rounded-lg max-h-100 overflow-y-auto">
            <button @click="isShowPassport = false" class="absolute left-4 top-4 cursor-pointer hover:opacity-80 button-focus rounded-full">
                <ArrowLeft/>
            </button>
            <button class="absolute right-4 top-4 cursor-pointer hover:opacity-80 button-focus rounded-full" @click="$emit('close')">
                <X/>
            </button>
            <div class="flex flex-col mt-4 overflow-y-auto overflow-x-hidden max-h-200">
                <div class="flex md:flex-row flex-col gap-5">
                    <img :src=passportData.profilePicture :alt=passportData.name class="w-20 h-20 md:w-40 md:h-40 rounded-lg">
                    <div class="flex flex-col">
                    <p class="text-6 md:text-8 font-bold overflow-hidden w-100 truncate">{{ passportData.fullName }}</p>
                    <div class="flex md:flex-row flex-col mb-4">
                        <p class="text-4 font-bold w-50">Function:</p>
                        <p class="text-4 font-normal">{{ passportData.personType.charAt(0).toUpperCase() + passportData.personType.slice(1).toLowerCase() }}</p>
                    </div>
                    <div class="flex md:flex-row flex-col mb-4">
                        <p class="text-4 font-bold w-50">Phone number:</p>
                        <p class="text-4 font-normal">{{ passportData.phone }}</p>
                    </div>
                    <div class="flex md:flex-row flex-col mb-4">
                        <p class="text-4 font-bold w-50">Work email:</p>
                        <p class="text-4 font-normal break-all w-full md:w-50">{{ passportData.workEmail }}</p>
                    </div>
                    <div class="flex md:flex-row flex-col mb-4">
                        <p class="text-4 font-bold w-50">Personal email:</p>
                        <p class="text-4 font-normal break-all w-full md:w-50">{{ passportData.personalEmail }}</p>
                    </div>
                </div>
                </div>
                <div class="flex flex-col mt-4 gap-4">
                    <p class="text-6 font-bold">Work blocks</p>
                    <div class="w-full bg-slate-100 h-20"></div>
                    <div class="w-full bg-slate-100 h-20"></div>
                    <div class="w-full bg-slate-100 h-20"></div>
                </div>
            </div>
        </section>
        
        <section v-else class="absolute left-0 top-20 md:top-30 md:left-1/2 md:top-1/2 md:-translate-x-[360px] md:-translate-y-[40px] w-full h-full min-h-3/4 bg-white p-10 z-2 md:max-w-180 rounded-lg max-h-100 overflow-hidden">
            <button @click="$emit('close')" class="absolute right-4 top-4 cursor-pointer button-focus rounded-full">
                <X/>
            </button>
            <div class="flex gap-4" >
                <input type="text" class=" pl-1 mb-4 w-200 md:w-111 px-4 py-2 bg-slate-100 button-focus" placeholder="Search employee" v-model="search">
                <select v-model="selectedJobType" class="flex justify-center items-center h-fit w-20 md:w-40 rounded-md bg-slate-100 px-4 py-2 mr-5 cursor-pointer button-focus">
                    <option v-for="job of jobEnumArray" :value="job">{{ job }}</option>
                </select>
            </div>
            <section v-if="employeesLoading">
                <section class="flex flex-col gap-2 h-[570px] pr-4 overflow-y-scroll c-employees button-focus">
                    <div v-for="skeleton in skeletons" class="animate-pulse flex flex-col gap-1 w-full bg-gray-200 h-14 py-2 px-6 rounded-md">
                        <div class="bg-neutral-300 h-4 rounded-sm"></div>
                        <div class="bg-neutral-300 h-4 w-24 rounded-sm"></div>
                    </div>
                </section>
            </section>
            <section v-else-if="employeesError">
                <p>Error: {{ employeesError.message }}</p>
            </section>
            <section v-else>
                <template v-if="search.length > 0 && selectedJobType !== 'ALL'">
                    <section class="flex flex-col gap-2 h-[570px] pr-4 overflow-y-scroll c-employees button-focus"
                        v-if="searchEmployees && searchEmployees.personsBySearchString.length > 0 && selectedJobType">
                        <Employee :employee="employee" :selectedJobType="selectedJobType" v-if="employees" v-for="employee in searchEmployees.personsBySearchString" @show-passport="handleShowPassport" @choose-employee="handleChooseEmployee" :key="employee.id"/>
                    </section>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else-if="search.length > 0 && selectedJobType === 'ALL'">
                    <section class="flex flex-col gap-2 h-[570px] pr-4 overflow-y-scroll c-employees button-focus"
                        v-if="searchEmployees && searchEmployees.personsBySearchString.length > 0 && selectedJobType">
                        
                        <Employee :employee="employee" :selectedJobType="selectedJobType" v-if="employees" v-for="employee in searchEmployees.personsBySearchString" @show-passport="handleShowPassport" @choose-employee="handleChooseEmployee" :key="employee.id"/>

                    </section>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else>
                    <section class="flex flex-col gap-2 h-[570px] pr-4 overflow-y-scroll c-employees button-focus">
                        <Employee :employee="employee" :selectedJobType="selectedJobType" v-if="employees" v-for="employee in employees.personsByPersonType" @show-passport="handleShowPassport" @choose-employee="handleChooseEmployee" :key="employee.id"/>
                    </section>
                </template>
            </section>
    </section>
  </template>
  
  <script lang="ts">
import { ref, watch, } from 'vue';
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import { 
    ALL_EMPLOYEES, 
    FIND_EMPLOYEES_BY_SEARCH, } from '@/graphql/person.query'
import { PersonType } from '../interfaces/IPersonType'
import { JobType } from '../interfaces/IJobType'
import { RouterLink } from 'vue-router'
import { ChevronDown, X, ArrowLeft  } from 'lucide-vue-next'
import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'
import Employee from '@/components/dashboard/Employee.vue';
import type { Persons as IPersons } from '@/interfaces/IPersons'

import useFirebase from '@/composables/useFirebase'

const { firebaseUser } = useFirebase()

export default {
    components: {
        RouterLink,
        ChevronDown,
        DashboardTitle,
        Employee,
        X,
        ArrowLeft 
    },
    setup( props, {emit} ) {
        const search = ref<String>('')
        const jobEnumArray = ref<JobType[]>(Object.values(JobType))
        const selectedJobType = ref<JobType>(JobType.ALL)
        const { loading: employeesLoading, result: employees, error: employeesError } = useQuery<IPersons>(ALL_EMPLOYEES, { personType: PersonType.EMPLOYEE })
        const { document, result: searchEmployees, load } = useLazyQuery<IPersons>(FIND_EMPLOYEES_BY_SEARCH, () => ({
            searchString: search.value
        }))
        const isShowPassport = ref(false)
        const skeletons = ref<number[]>(Array(10))
        const passportData = ref<any>(null)
        const showPopup = ref(false)

        watch(search, () => {
            load(document.value, {
                searchString: search.value
            })
        })

        const closeAssignPersonPopup = () => {
            showPopup.value = false;
        }

        const handleShowPassport = (employee: any) => {
            isShowPassport.value = true;
            passportData.value = employee;
            emit('show-passport', employee);
        };

        const handleChooseEmployee = (employee: any) => {
            emit('choose-employee', employee);
            emit('close');
        };

        return {
            employeesLoading,
            employees,
            employeesError,
            firebaseUser,
            jobEnumArray,
            search,
            searchEmployees,
            selectedJobType,
            skeletons,
            isShowPassport,
            passportData,

            handleShowPassport,
            handleChooseEmployee,
            closeAssignPersonPopup
        }
    }   
}
</script>