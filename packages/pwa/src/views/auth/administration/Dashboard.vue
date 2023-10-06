<template>
    <main v-if="firebaseUser" class="flex flex-col gap-8">

        <div>
            dit is het dashboard
        </div>
        <div v-if="employeesLoading">Loading...</div>
        <div v-if="employeesError">Error: {{ employeesError.message }}</div>
        <div v-if="employees">
            <div v-for="employee in employees.werknemers" :key="employee.id">
                {{ employee.firstname }} {{ employee.lastname }}
            </div>
        </div>
        
        <div v-if="visitorsLoading">Loading...</div>
        <div v-if="visitorsError">Error: {{ visitorsError.message }}</div>
        <div v-if="visitors">
            <div v-for="visitor in visitors.bezoekers" :key="visitor.id">
                {{ visitor.name }} {{ visitor.fullname }}
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_EMPLOYEES } from '@/graphql/employee.query'
import { ALL_VISITORS } from '@/graphql/visitor.query'
import useFirebase from '@/composables/useFirebase'

const { firebaseUser } = useFirebase()

interface Employees {
    werknemers: Employee[]
}
interface Employee {
    id: string
    firstname: string,
    lastname: string,
    email: string,
}

interface Visitors {
    bezoekers: Visitor[]
}
interface Visitor {
    id: string
    name: string,
    fullname: string,
    email: string,
}

export default {

    setup() {
        const { loading: employeesLoading, result: employees, error: employeesError } = useQuery<Employees>(ALL_EMPLOYEES)
        const { loading: visitorsLoading, result: visitors, error: visitorsError } = useQuery<Visitors>(ALL_VISITORS)

        return {
            employeesLoading,
            employees,
            employeesError,
            firebaseUser,
            visitorsLoading,
            visitors,
            visitorsError
        }
    }
}

</script>