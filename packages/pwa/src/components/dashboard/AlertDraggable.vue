<template v-if="alert">
    <div class="bg-gray-200 px-2 py-2">
        <p class="font-bold">{{ alert.title }}</p>
        <!-- <p>{{ alert }}</p> -->
        <draggableComponent
            :list="alert.persons"
            item-key="fullName"
            tag="section"
            group="employees"
            class="flex flex-col gap-2 min-h-[40px] pr-4 overflow-y-scroll c-employees"
            @input="onInput"
        >
            <template #item="{element: employee}">
                <AssignedEmployee :employee="employee" :onInput="onInput" :key="employee.id"/>
            </template>
        </draggableComponent>
    </div> 
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import draggableComponent from 'vuedraggable';
import EmployeeDraggable from '@/components/dashboard/EmployeeDraggable.vue';
import AssignedEmployee from '@/components/dashboard/AssignedEmployee.vue';
import { watch } from 'vue';

export default {
    props: ['alert', 'selectedJobType'],
    components: {
        draggableComponent,
        EmployeeDraggable,
        AssignedEmployee,
    },
    methods: {
        onInput(event: any): void {
            console.log(event);
            this.$emit('input', event);
        },
    },
    setup(props) {
        const assignedEmployees = computed(() => {
            console.log(props.alert.persons);
            return props.alert.persons;
        });

        return {
            assignedEmployees,
        
        }
    }
}
</script>
<style>
.c-employees::-webkit-scrollbar {
    width: 4px;
}

.c-employees::-webkit-scrollbar-thumb {
    background: #c3c5c8;
    border-radius: 25px;
}
</style>