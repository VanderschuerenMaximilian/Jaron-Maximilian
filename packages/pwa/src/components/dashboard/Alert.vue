<template v-if="alert">
    <div class="bg-gray-200 px-2 py-2">
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
    </div> 
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import draggableComponent from 'vuedraggable';
import EmployeeDraggable from '@/components/dashboard/EmployeeDraggable.vue';
import AssignedEmployee from '@/components/dashboard/AssignedEmployee.vue';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import type { Person as IPerson } from '@/interfaces/IPersons';
import { ADD_PERSON_TO_ALERT } from '@/graphql/alert.mutation';
import { useMutation } from '@vue/apollo-composable';

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
    },
    setup(props) {
        const assignedEmployees = ref<IPerson[]>([]);
        const { mutate: addPersonToAlert } = useMutation(ADD_PERSON_TO_ALERT);

        const onInput = (event: IAlert) => {
            const uniqueEmployees = assignedEmployees.value.filter((employee, index, self) =>
                index === self.findIndex((t) => (
                    t.id === employee.id
                ))
            )
            if (props.alert.persons?.find((person) => person.id !== event.id)) {
                // addPersonToAlert({
                //     alertId: props.alert.id,
                //     personId: event.id,
                // })
            }
            assignedEmployees.value = uniqueEmployees
        }

        watch(props, (newProps) => {
            if (newProps.alert.persons) {
                assignedEmployees.value = [...newProps.alert.persons]
            }
        }, { immediate: true })

        return {
            assignedEmployees,

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