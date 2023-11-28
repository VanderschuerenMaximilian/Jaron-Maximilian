<template v-if="alert">
    <section class="flex flex-col justify-between gap-2 w-[400px] bg-gray-200 px-4 py-2 border-l-[6px] border-red-500 rounded-md">
        <div class="flex gap-1 h-full justify-between items-center">
            <div>
                <p class="font-bold max-w-[215px]">{{ alert.title }}</p>
                <p class="text-sm line-clamp-2 max-w-md opacity-80">{{ alert.description }}</p>
            </div>
            <button @click="completeAssignment" :disabled="!hasChanged" class="mr-2 w-24 h-10 rounded-md flex justify-center items-center bg-secondary-green"
            :class="hasChanged ? 'transition-colors hover:bg-primary-green' : 'disabled:bg-opacity-60'">
                <Loader2 v-if="loading" class="text-slate-100 animate-spin"/>
                <span v-else class="text-slate-100">Add</span>
            </button>
        </div>
        <div class="space-y-2">
            <p class="text-sm font-medium">Assigned Employees:</p>
            <draggableComponent
            :list="assignedEmployees"
            item-key="id"
            tag="section"
            group="employees"
            class="c-draggable flex items-center gap-2 min-h-[50px] bg-slate-100 bg-opacity-70 px-2 py-2"
            :class="assignedEmployees.length > 7 ? 'overflow-x-scroll' : 'overflow-x-hidden'"
            @input="onInput">
                <template #item="{element: employee}">
                    <AssignedEmployee :employee="employee" :onInput="onInput" :key="employee.id"/>
                </template>
            </draggableComponent>
        </div>
    </section> 
</template>
<script lang="ts">
import { ref, watch, watchEffect } from 'vue';
import draggableComponent from 'vuedraggable';
import EmployeeDraggable from '@/components/dashboard/EmployeeDraggable.vue';
import AssignedEmployee from '@/components/dashboard/AssignedEmployee.vue';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import type { Person as IPerson } from '@/interfaces/IPersons';
import { ADD_PERSON_TO_ALERT } from '@/graphql/alert.mutation';
import { useMutation } from '@vue/apollo-composable';
import { Check, Loader2 } from 'lucide-vue-next'

export default {
    props: {
        alert: {
            type: Object as () => IAlert,
            required: true,
        },
    },
    components: {
        draggableComponent,
        EmployeeDraggable,
        AssignedEmployee,
        Check,
        Loader2,
    },
    setup(props) {
        const assignedEmployees = ref<IPerson[]>([]);
        const alreadyAssignedEmployees = ref<IPerson[]>([]);
        const hasChanged = ref<boolean>(false);
        const { mutate: addPersonsToAlert, onDone, onError, loading } = useMutation(ADD_PERSON_TO_ALERT);
        const onInput = (event: IAlert) => {
            const uniqueEmployees = assignedEmployees.value.filter((employee, index, self) =>
                index === self.findIndex((t) => (
                    t.id === employee.id
                ))
            )
            assignedEmployees.value = uniqueEmployees
        }

        watch(props, (newProps) => {
            if (newProps.alert.persons) {
                assignedEmployees.value = [...newProps.alert.persons]
                alreadyAssignedEmployees.value = [...newProps.alert.persons]
            }
        }, { immediate: true })

        watchEffect(() => {
            if (props.alert.persons && assignedEmployees.value.length !== props.alert.persons.length) {
                hasChanged.value = true
            } else {
                hasChanged.value = false
            }
        })

        const completeAssignment = async () => {
            for (const employee of assignedEmployees.value) {
                if (!alreadyAssignedEmployees.value.find((person) => person.id === employee.id)) {
                    await addPersonsToAlert({
                        alertId: props.alert.id,
                        personId: employee.id,
                    })
                }
            }
        }

        onDone((result) => {
            console.log(result)
            hasChanged.value = false
            alreadyAssignedEmployees.value = [result.data.addPersonToAlert, ...alreadyAssignedEmployees.value]
        })

        return {
            assignedEmployees,
            hasChanged,
            loading,

            completeAssignment,
            onInput,
        }
    }
}
</script>
<style scoped>
.c-draggable::-webkit-scrollbar {
    height: 8px;
}
</style>