<template v-if="alert">
    <section class="flex flex-col justify-between gap-2 w-[400px] bg-gray-200 px-4 py-2 rounded-md">
        <div class="flex gap-1 h-full justify-between items-center">
            <div>
                <p class="font-bold max-w-[215px]">{{ alert.title }}</p>
                <p class="text-xs break-words max-w-[225px] opacity-80">{{ alert.description }}</p>
            </div>
            <button @click="completeAssignment" :disabled="!hasChanged" class="mr-2 w-24 h-10 rounded-md flex justify-center items-center bg-secondary-green"
            :class="hasChanged ? 'transition-colors hover:bg-primary-green' : 'disabled:bg-opacity-60'">
                <Loader2 v-if="adding || removing" class="text-slate-100 animate-spin"/>
                <span v-else class="text-slate-100">Add</span>
            </button>
        </div>
        <div class="space-y-2">
            <p class="text-sm font-medium">Assigned Employee(s):</p>
            <template v-if="alert.state === 'OPEN'">
                <draggableComponent
                :list="assignedEmployees"
                item-key="id"
                tag="section"
                group="employees"
                class="c-draggable flex items-center gap-2 min-h-[50px] bg-slate-100 bg-opacity-70 px-2 py-2"
                :class="assignedEmployees.length > 7 ? 'overflow-x-scroll' : 'overflow-x-hidden'"
                @change="onInput">
                    <template #item="{element: employee}">
                        <AssignedEmployee :employee="employee" :onInput="onInput" :key="employee.id"/>
                    </template>
                </draggableComponent>
            </template>
            <template v-else>
                <div class="flex flex-col gap-2">
                    <AssignedEmployee :assignedPersonId="alert.assignedPersonId" :key="alert.assignedPersonId"/>
                </div>
            </template>
        </div>
    </section> 
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import draggableComponent from 'vuedraggable';
import AssignedEmployee from '@/components/dashboard/AssignedEmployee.vue';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import type { Person as IPerson } from '@/interfaces/IPerson';
import { ADD_PERSON_TO_ALERT, REMOVE_PERSON_FROM_ALERT } from '@/graphql/alert.mutation';
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
        AssignedEmployee,
        Check,
        Loader2,
    },
    setup(props) {
        const assignedEmployees = ref<IPerson[]>([]);
        const alreadyAssignedEmployees = ref<IPerson[]>([]);
        const hasChanged = ref<boolean>(false);
        const { mutate: addPersonsToAlert, onDone: onAdding, loading: adding } = useMutation(ADD_PERSON_TO_ALERT);
        const { mutate: removePersonsFromAlert, onDone: onRemoving, loading: removing } = useMutation(REMOVE_PERSON_FROM_ALERT);

        // this function removes duplicates from the assignedEmployees array when the user drags and drops the same employee multiple times
        const onInput = () => {
            const uniqueEmployees = assignedEmployees.value.filter((employee, index, self) =>
                index === self.findIndex((t) => (
                    t.id === employee.id
                ))
            )
            assignedEmployees.value = uniqueEmployees
            if (assignedEmployees.value.length !== alreadyAssignedEmployees.value.length) {
                hasChanged.value = true
            } else {
                hasChanged.value = false
            }
        }

        // this function adds the already assigned employees to the assignedEmployees array when the alert is called
        watch(props, (newProps) => {
            if (newProps.alert.persons) {
                assignedEmployees.value = [...newProps.alert.persons]
                alreadyAssignedEmployees.value = [...newProps.alert.persons]
            }
        }, { immediate: true })

        // this function adds the assigned employees to the alert
        const completeAssignment = async () => {
            if (assignedEmployees.value.length !== 0) {
                for (const employee of assignedEmployees.value) {
                    if (!alreadyAssignedEmployees.value.some((person) => person.id === employee.id)) {
                        await addPersonsToAlert({
                            alertId: props.alert.id,
                            personId: employee.id,
                        })
                    } else if (assignedEmployees.value.length < alreadyAssignedEmployees.value.length) {
                        if (assignedEmployees.value.some((person) => person.id === employee.id) && alreadyAssignedEmployees.value.some((person) => person.id !== employee.id)) {
                            await removePersonsFromAlert({
                                alertId: props.alert.id,
                                personId: employee.id,
                            })
                        }
                    }
                }
            } else {
                for (const employee of alreadyAssignedEmployees.value) {
                    if (!assignedEmployees.value.some((person) => person.id === employee.id)) {
                        await removePersonsFromAlert({
                            alertId: props.alert.id,
                            personId: employee.id,
                        })
                    }
                }
            }
        }

        // this function adds the assigned employees to the alreadyAssignedEmployees array when the mutation is done
        onAdding((result) => {
            hasChanged.value = false
            if (result.data?.addPersonToAlert.persons) {
                for (const employee of result.data.addPersonToAlert.persons) {
                    if (!alreadyAssignedEmployees.value.some((person) => person.id === employee.id)) {
                        alreadyAssignedEmployees.value = [employee, ...alreadyAssignedEmployees.value]
                    }
                }
            }
        })

        onRemoving(() => {
            hasChanged.value = false
        })

        return {
            assignedEmployees,
            alreadyAssignedEmployees,
            hasChanged,
            adding,
            removing,

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