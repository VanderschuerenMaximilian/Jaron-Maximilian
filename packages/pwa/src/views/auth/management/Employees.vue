<template>
    <main v-if="firebaseUser" class="flex flex-col pl-20 pr-4 pt-12 bg-slate-100 flex-1 rounded-l-3xl">
        <DashboardTitle currentRoute="Employees" />
        <section class="flex flex-col border-r-2 border-r-slate-400 w-fit pr-4">
            <div class="flex gap-2">
                <input type="text" class=" pl-1 mb-4 w-42" placeholder="Search employee" v-model="search">
                <select v-model="selectedJobType" class="flex justify-center items-center h-fit w-20 rounded-md px-2">
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

                        <Employee :employee="employee" :selectedJobType="selectedJobType"
                        v-for="employee in searchEmployees.personsBySearchString" :key="employee.id"/>

                    </section>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else-if="search.length > 0 && selectedJobType === 'ALL'">
                    <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees"
                        v-if="searchEmployees && searchEmployees.personsBySearchString.length > 0 && selectedJobType">
                        
                        <Employee :employee="employee" :selectedJobType="selectedJobType"
                        v-for="employee in searchEmployees.personsBySearchString" :key="employee.id"/>

                    </section>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else>
                    <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
                        <Employee :employee="employee" :selectedJobType="selectedJobType" v-if="employees" v-for="employee in employees.personsByPersonType" :key="employee.id"/>
                    </section>
                </template>
            </section>
        </section>
    </main>
</template>
<style>
.c-employees::-webkit-scrollbar {
    width: 4px;
}

.c-employees::-webkit-scrollbar-thumb {
    background: #c3c5c8;
    border-radius: 25px;
}
</style>
<script lang="ts">
import { ref, watch, } from 'vue';
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import { 
    ALL_EMPLOYEES, 
    FIND_EMPLOYEES_BY_SEARCH,
 } from '@/graphql/person.query'
import { PersonType } from '../../../interfaces/IPersonType'
import { JobType } from '../../../interfaces/IJobType'
import { RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
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
    Employee
},
    setup() {
        const search = ref<String>('')
        const jobEnumArray = ref<JobType[]>(Object.values(JobType))
        const selectedJobType = ref<JobType>(JobType.ALL)
        const { loading: employeesLoading, result: employees, error: employeesError } = useQuery<IPersons>(ALL_EMPLOYEES, { personType: PersonType.EMPLOYEE })
        const { document, result: searchEmployees, load } = useLazyQuery<IPersons>(FIND_EMPLOYEES_BY_SEARCH, () => ({
            searchString: search.value
        }))
        const skeletons = ref<number[]>(Array(10))

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
            skeletons
        }
    }   
}
</script>