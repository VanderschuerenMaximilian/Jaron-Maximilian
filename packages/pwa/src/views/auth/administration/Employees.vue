<template>
    <main v-if="firebaseUser" class="flex flex-col pl-20 pr-4 pt-12 bg-slate-100 flex-1 rounded-l-3xl">
        <section class="mb-8">
            <h2 class="h2 mb-1">Dashboard</h2>
            <div class="flex gap-1">
                <p class="text-sm">Dashboard</p>
                <p class="text-sm font-semibold">></p>
                <p class="text-sm">Employees</p>
            </div>
        </section>
        <section class="flex flex-col items-center border-r-2 border-r-slate-400 w-fit px-2">
            <div class="flex gap-2">
                <input type="text" class=" pl-1 mb-4 w-42" placeholder="Search employee" v-model="search">
                <!-- TODO: add filter -->
                <p>filter</p>
            </div>
            <section v-if="employeesLoading">
                <p>Loading...</p>
            </section>
            <section v-else>
                <template v-if="search.length > 0">
                    <div v-if="searchEmployees && searchEmployees.personsBySearchString.length > 0"
                        v-for="employee in searchEmployees.personsBySearchString" :key="employee.id">
                        <p>{{ employee.fullName }}</p>
                    </div>
                    <div v-else>
                        <p class="opacity-60">No employees found.</p>
                    </div>
                </template>
                <template v-else>
                    <section class="flex flex-col">
                        <div v-if="employees" v-for="employee in employees.personsByPersonType" :key="employee.id">
                            <p>{{ employee.fullName }}</p>
                        </div>
                    </section>
                </template>
            </section>
        </section>
        </main>
    </template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import { ALL_EMPLOYEES, FIND_EMPLOYEES_BY_SEARCH } from '@/graphql/person.query'
import { PersonType } from '../../../interfaces/IPersonType'
import { RouterLink } from 'vue-router'

import useFirebase from '@/composables/useFirebase'

const { firebaseUser } = useFirebase()

interface Persons {
    persons: Person[],
    personsByPersonType: Person[]
    personsBySearchString: Person[]
}
interface Person {
    id: string
    firstName: string,
    lastName: string,
    fullName: string,
    personalEmail: string,
    workEmail: string,
    phone: string,
    personType: string,
    createdAt: string,
    updatedAt: string,
}

export default {
    components: {
        RouterLink
    },
    setup() {
        const search = ref<String>('')

        const { loading: employeesLoading, result: employees, error: employeesError } = useQuery<Persons>(ALL_EMPLOYEES, { personType: PersonType.EMPLOYEE })
        const { document, result: searchEmployees, load } = useLazyQuery<Persons>(FIND_EMPLOYEES_BY_SEARCH, () => ({
            searchString: search.value
        }))

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
            search,
            searchEmployees,
        }
    }
}
</script>