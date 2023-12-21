<template>
    <main v-if="customPerson" class="flex flex-col pt-12 pl-20 pr-4 bg-slate-100 flex-1 rounded-l-3xl">
        <DashboardTitle currentRoute="Alerts" />
        <section class="flex">
            <section class="flex flex-col border-r-2 border-r-slate-400 pr-4">
                <div class="flex gap-2">
                    <input type="text" class=" pl-1 mb-4 w-42" placeholder="Search employee" v-model="search">
                    <select v-model="selectedJobType" class="flex justify-center items-center h-fit w-20 rounded-md px-2">
                        <option v-for="job of jobEnumArray" :value="job">{{ job }}</option>
                    </select>
                </div>
                <section v-if="employeesLoading">
                    <section class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
                        <div v-for="skeleton in skeletons"
                            class="animate-pulse flex flex-col gap-1 w-full bg-gray-200 h-14 py-2 px-6 rounded-md">
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
                        <draggable v-if="searchEmployees && searchEmployees.length > 0 && selectedJobType" v-model="searchEmployees" tag="section" item-key="id" group="employees" class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
                            <template #item="{ element: employee }">
                                <EmployeeDraggable :employee="employee" :selectedJobType="selectedJobType" />
                            </template>
                        </draggable>
                        <div v-else>
                            <p class="opacity-60">No employees found.</p>
                        </div>
                    </template>
                    <template v-else-if="search.length > 0 && selectedJobType === 'ALL'">
                        <draggable v-if="searchEmployees && searchEmployees.length > 0 && selectedJobType" v-model="searchEmployees" tag="section" item-key="id" group="employees" class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
                            <template #item="{ element: employee }">
                                <EmployeeDraggable :employee="employee" :selectedJobType="selectedJobType" />
                            </template>
                        </draggable>
                        <div v-else>
                            <p class="opacity-60">No employees found.</p>
                        </div>
                    </template>
                    <template v-else> 
                        <template v-if="selectedJobType === 'ALL'">
                            <draggable v-model="employees" tag="section" item-key="id" group="employees" class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
                                <template #item="{element: employee}">
                                    <EmployeeDraggable :employee="employee" :selectedJobType="selectedJobType" />
                                </template>
                            </draggable>
                        </template>
                        <template v-else>
                            <draggable v-model="employees" tag="section" item-key="id" group="employees" class="flex flex-col gap-2 h-[500px] pr-4 overflow-y-scroll c-employees">
                                <template #item="{ element: employee }">
                                    <EmployeeDraggable :employee="employee" :selectedJobType="selectedJobType" />
                                </template>
                            </draggable>
                        </template>
                    </template>
                </section>
            </section>
            <section class="flex flex-col items-center gap-2 min-w-[450px]">
                <div class="w-full flex justify-end">
                    <select v-model="selectedState" class="flex justify-center items-center h-fit w-20 rounded-md px-2">
                        <option v-for="state of alertStateArray" :value="state">{{ state }}</option>
                    </select>
                </div>
                <section v-if="alertsLoading" class="flex flex-col gap-2 px-6">
                        <div v-for="skeleton in skeletons"
                        class="animate-pulse flex flex-col gap-2 w-full bg-gray-200 h-32 py-2 px-6 rounded-md">
                            <div class="bg-neutral-300 h-8 rounded-sm"></div>
                            <div class="bg-neutral-300 h-16 w-72 rounded-sm"></div>
                        </div>
                </section>
                <section v-else-if="alertsError">
                    <p>Error: {{ alertsError.message }}</p>
                </section>
                <section v-else>
                    <template v-if="selectedState === 'OPEN'">
                        <section v-if="alerts.find(alert => alert.state === selectedState)"
                            class="flex flex-col gap-2 h-[550px] overflow-y-scroll px-6 c-employees">
                            <template v-for="alert in alerts">
                                <Alert :alert="alert" v-if="alert.state === selectedState" :key="alert.id" />
                            </template>
                        </section>
                        <section v-else>
                            <p>No alerts found.</p>
                        </section>
                    </template>
                    <template v-else-if="selectedState === 'ACKNOWLEDGED'">
                        <section v-if="alerts.find(alert => alert.state === selectedState)"
                            class="flex flex-col gap-2 h-[550px] overflow-y-scroll px-6 c-employees">
                            <template v-for="alert in alerts">
                                <Alert :alert="alert" v-if="alert.state === selectedState" :key="alert.id" />
                            </template>
                        </section>
                        <section v-else>
                            <p>No alerts found.</p>
                        </section>
                    </template>
                    <template v-if="selectedState === 'RESOLVED'">
                        <section v-if="alerts.find(alert => alert.state === selectedState)"
                            class="flex flex-col gap-2 h-[550px] overflow-y-scroll px-6 c-employees">
                            <template v-for="alert in alerts">
                                <Alert :alert="alert" v-if="alert.state === selectedState" :key="alert.id" />
                            </template>
                        </section>
                        <section v-else>
                            <p>No alerts found.</p>
                        </section>
                    </template>
                </section>
            </section>
        </section>
    </main>
</template>
<style scoped>
.c-employees::-webkit-scrollbar {
    width: 4px;
}

.c-employees::-webkit-scrollbar-thumb {
    background: #c3c5c8;
    border-radius: 25px;
}
</style>
<script lang="ts">
import { computed, ref, watch, } from 'vue';
import { useLazyQuery, useQuery, useSubscription } from '@vue/apollo-composable'
import {
    ALL_EMPLOYEES,
    FIND_EMPLOYEES_BY_SEARCH,
} from '@/graphql/person.query'
import { ALL_ALERTS } from '@/graphql/alert.query'
import { CREATED_ALERT, PERSON_REMOVED_FROM_ALERT } from '@/graphql/alert.subscription'
import { PersonType } from '../../../interfaces/IPersonType'
import { JobType as IJobType } from '../../../interfaces/IJobType'
import { RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'
import EmployeeDraggable from '@/components/dashboard/EmployeeDraggable.vue';
import Alert from '@/components/dashboard/DashboardAlert.vue';
import type { Persons as IPersons } from '@/interfaces/IPerson'
import type { Alert as IAlert, Alerts as IAlerts } from '@/interfaces/IAlert'
import useCustomPerson from '@/composables/useCustomPerson'
import draggable from 'vuedraggable'
import { AlertState as IAlertState } from '@/interfaces/IAlertState';


export default {
    components: {
        RouterLink,
        ChevronDown,
        DashboardTitle,
        EmployeeDraggable,
        draggable,
        Alert
    },
    setup() {
        const { customPerson } = useCustomPerson()
        const search = ref<String>('')
        const jobEnumArray = ref<IJobType[]>(Object.values(IJobType))
        const alertStateArray = ref<IAlertState[]>(Object.values(IAlertState))
        const selectedState = ref<IAlertState>(IAlertState.OPEN)
        const selectedJobType = ref<IJobType>(IJobType.ALL)
        const { loading: employeesLoading, result: employeesResult, error: employeesError } = useQuery<IPersons>(ALL_EMPLOYEES, { personType: PersonType.EMPLOYEE })
        const { loading: alertsLoading, result: alertsResult, error: alertsError } = useQuery<IAlerts>(ALL_ALERTS)
        const { document, result: searchEmployeesResult, load } = useLazyQuery<IPersons>(FIND_EMPLOYEES_BY_SEARCH, () => ({
            searchString: search.value
        }))
        const { result: alertAdded } = useSubscription<IAlert>(CREATED_ALERT)
        const { result: personRemovedFromAlert } = useSubscription<IAlert>(PERSON_REMOVED_FROM_ALERT)
        const skeletons = ref<number[]>(Array(10))
        const employees = computed(() => {
            return employeesResult.value?.personsByPersonType
        })
        const searchEmployees = computed(() => {
            return searchEmployeesResult.value?.personsBySearchString
        })
        const alerts = ref<IAlert[]>([])

        watch(alertsLoading, () => {
            if (!alertsLoading.value && alertsResult.value?.alerts) {
                alerts.value = [...alertsResult.value.alerts]
                const orderedAlerts= alerts.value.sort((a, b) => {
                    //@ts-ignore
                    return a.persons?.length - b.persons?.length
                })
                alerts.value = [...orderedAlerts]
            }
        }, { immediate: true })

        watch(alertAdded, (data: any) => {
            if (data?.alertAdded) {
                alerts.value = [data.alertAdded, ...alerts.value]
            }
        })

        watch(personRemovedFromAlert, (data: any) => {
            const alertIndex = alerts.value.findIndex(alert => alert.id === data?.personRemovedFromAlert.id);
            if (alertIndex !== -1) {
                const updatedAlert = { ...data?.personRemovedFromAlert };
                alerts.value.splice(alertIndex, 1, updatedAlert);
            }
        })

        watch(search, () => {
            load(document.value, {
                searchString: search.value
            })
        })

        return {
            alerts,
            alertsError,
            alertsLoading,
            alertStateArray,
            customPerson,
            employees,
            employeesError,
            employeesLoading,
            jobEnumArray,
            search,
            searchEmployees,
            selectedJobType,
            selectedState,
            skeletons
        }
    }
}
</script>