<template>
    <div class="absolute bg-black opacity-40 w-screen h-screen left-0 top-0"></div>
    <section v-if="isShowPassport" class="absolute w-230 min-h-3/4 bg-white p-10 z-2 left-1/2 -translate-x-65 top-1/2 -translate-y-1/2 border-0 border-t-20 border-primary-green rounded-lg">
            <ArrowLeft class="absolute left-4 top-4 cursor-pointer" @click="isShowPassport = false"/>
            <X class="absolute right-4 top-4 cursor-pointer" @click="$emit('close')"/>
            <div class="flex flex-col mt-4">
                <div class="flex gap-5">
                    <img :src=passportData.profilePicture :alt=passportData.name class="w-50 h-50 rounded-lg">
                    <div class="flex flex-col">
                    <p class="text-8 font-bold overflow-hidden w-100 truncate">{{ passportData.fullName }}</p>
                    <div class="flex">
                        <p class="text-5 font-bold w-50">Function:</p>
                        <p class="text-5 font-normal">{{ passportData.personType.charAt(0).toUpperCase() + passportData.personType.slice(1).toLowerCase() }}</p>
                    </div>
                    <div class="flex">
                        <p class="text-5 font-bold w-50">Phone number:</p>
                        <p class="text-5 font-normal">{{ passportData.phone }}</p>
                    </div>
                    <div class="flex">
                        <p class="text-5 font-bold w-50">Work email:</p>
                        <p class="text-5 font-normal">{{ passportData.workEmail }}</p>
                    </div>
                    <div class="flex">
                        <p class="text-5 font-bold w-50">Personal email:</p>
                        <p class="text-5 font-normal">{{ passportData.personalEmail }}</p>
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
        
        <section v-else class="absolute w-180 min-h-3/4 bg-white p-10 z-2 left-1/2 -translate-x-40 top-1/2 -translate-y-1/2 border-0 border-t-20 border-primary-green rounded-lg">
            <X class="absolute right-4 top-4 cursor-pointer" @click="$emit('close')"/>
            <div class="flex gap-4">
                <input type="text" class=" pl-1 mb-4 w-111 px-4 py-2 bg-slate-100" placeholder="Search employee" v-model="search">
                <select v-model="selectedJobType" class="flex justify-center items-center h-fit w-40 rounded-md bg-slate-100 px-4 py-2">
                    <option v-for="job of jobEnumArray" :value="job">{{ job }}</option>
                </select>
            </div>
            <section v-if="employeesLoading">
                <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
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
                    <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees"
                        v-if="searchEmployees && searchEmployees.personsBySearchString.length > 0 && selectedJobType">
                        <Employee :employee="employee" :selectedJobType="selectedJobType" v-if="employees" v-for="employee in searchEmployees.personsBySearchString" @show-passport="handleShowPassport" @choose-employee="handleChooseEmployee" :key="employee.id"/>
                    </section>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else-if="search.length > 0 && selectedJobType === 'ALL'">
                    <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees"
                        v-if="searchEmployees && searchEmployees.personsBySearchString.length > 0 && selectedJobType">
                        
                        <Employee :employee="employee" :selectedJobType="selectedJobType" v-if="employees" v-for="employee in searchEmployees.personsBySearchString" @show-passport="handleShowPassport" @choose-employee="handleChooseEmployee" :key="employee.id"/>

                    </section>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else>
                    <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
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
    data() {
        return {
            showPopup: false
        }
    },
    methods: {
        closeAssignPersonPopup() {
            this.showPopup = false;
        },
        handleShowPassport(employee: any) {
            this.isShowPassport = true;
            this.passportData = employee;
            
        },

        handleChooseEmployee(employee: any) {
            this.$emit('choose-employee', employee);
            this.$emit('close');
        }

    },
    
    setup() {
        const search = ref<String>('')
        const jobEnumArray = ref<JobType[]>(Object.values(JobType))
        const selectedJobType = ref<JobType>(JobType.ALL)
        const { loading: employeesLoading, result: employees, error: employeesError } = useQuery<IPersons>(ALL_EMPLOYEES, { personType: PersonType.EMPLOYEE })
        const { document, result: searchEmployees, load } = useLazyQuery<IPersons>(FIND_EMPLOYEES_BY_SEARCH, () => ({
            searchString: search.value
        }))
        console.log(search.value)
        const isShowPassport = ref(false)
        const skeletons = ref<number[]>(Array(10))
        const passportData = ref<any>(null)

        watch(search, () => {
            load(document.value, {
                searchString: search.value
            })
        })

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
            passportData
        }
    }   
}
</script>