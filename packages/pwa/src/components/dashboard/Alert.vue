<template v-if="alert">
<section class="flex items-center gap-2">
    <section class=" w-72 bg-gray-200 px-2 py-2">
        <p class="font-bold">{{ alert.title }}</p>
        <draggableComponent
        :list="assignedEmployees"
        item-key="id"
        tag="section"
        group="employees"
        class="flex flex-col gap-2 min-h-[40px] bg-slate-100 pr-4 overflow-y-scroll c-employees"
        @input="onInput"
        >
            <template #item="{element: employee}">
                <AssignedEmployee :employee="employee" :onInput="onInput" :key="employee.id"/>
            </template>
        </draggableComponent>
    </section> 
    <button @click="completeAssignment" :disabled="!hasChanged" class="pt-0.5 w-8 h-8 rounded-full flex justify-center items-center bg-secondary-green"
    :class="hasChanged? 'transition-colors hover:bg-primary-green' : 'disabled:bg-opacity-80'">
        <Loader2 v-if="loading" class="text-slate-100 animate-spin"/>
        <Check v-else class="text-slate-100"/>
    </button>
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
            }
        }, { immediate: true })

        watchEffect(() => {
            if (props.alert.persons && assignedEmployees.value.length !== props.alert.persons.length) {
                hasChanged.value = true
            } else {
                hasChanged.value = false
                console.log('hasChanged', hasChanged.value)
            }
        })

        const completeAssignment = async () => {
            for (const employee of assignedEmployees.value) {
                if (!props.alert.persons?.find((person) => person.id === employee.id)) {
                    await addPersonsToAlert({
                        alertId: props.alert.id,
                        personId: employee.id,
                    })
                }
            }
        }

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
.c-employees::-webkit-scrollbar {
    width: 4px;
}

.c-employees::-webkit-scrollbar-thumb {
    background: #c3c5c8;
    border-radius: 25px;
}
</style>