<template>
    <main v-if="firebaseUser" class="flex flex-col px-4 pt-4 bg-slate-100 flex-1 rounded-l-3xl">
        <input type="text" class="mb-4 w-84" placeholder="Search for an employee" v-model="search">
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
    </main>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import { ALL_EMPLOYEES, FIND_EMPLOYEES_BY_SEARCH } from '@/graphql/person.query'
import { PersonType } from '../../../interfaces/IPersonType'

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
    setup() {
        const search = ref<String>('')

        const { loading: employeesLoading, result: employees, error: employeesError } = useQuery<Persons>(ALL_EMPLOYEES, { personType: PersonType.EMPLOYEE })
        const { document, result: searchEmployees, load } = useLazyQuery<Persons>(FIND_EMPLOYEES_BY_SEARCH, ()=> ({
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