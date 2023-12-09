<template>
    <template v-if="selectedJobType === 'ALL'">
        <div class="w-full py-2 px-4 flex text-start bg-gray-200 rounded-md justify-between min-w-110 overflow-auto min-h-15">
            <div class="flex xs:flex-row gap-4">
                <img :src=employee.profilePicture :alt=employee.name class="w-10 h-10 rounded-full ">
                <div class="flex flex-col">
                    <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                    <p class="text-xs opacity-60">{{ employee.jobType }}</p>
                </div>
            </div>
            <div class="flex gap-4 my-auto">
                <button @click="showPassport()" class="p-2 bg-primary-green hover:opacity-80 text-white rounded-lg text-3 md:text-4 button-focus">Show passport</button>
                <button @click="chooseEmployee()" class="p-2 bg-primary-green hover:opacity-80 text-white rounded-lg text-3 md:text-4 button-focus">Choose</button>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="w-full py-2 px-4 flex text-start bg-gray-200 rounded-md justify-between min-w-110 overflow-auto min-h-15" v-if="selectedJobType === employee.jobType">
            <div class="flex xs:flex-row gap-4 items-start">
                <img :src="employee.profilePicture" :alt="employee.name" class="w-10 h-10 rounded-full ">
                <div class="flex flex-col">
                    <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                    <p class="text-xs opacity-60">{{ employee.jobType }}</p>
                </div>
            </div>
            <div class="flex gap-4 my-auto">
                <button @click="showPassport()" class="p-2 bg-primary-green hover:opacity-80 text-white rounded-lg text-3 md:text-4 button-focus">Show passport</button>
                <button @click="chooseEmployee()" class="p-2 bg-primary-green hover:opacity-80 text-white rounded-lg text-3 md:text-4 button-focus">Choose</button>
            </div>
        </div>
    </template>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    props: ['employee', 'selectedJobType'], 
    setup(props, { emit }) {
        const employee = ref(props.employee);
        const selectedJobType = ref(props.selectedJobType);
        const showPassport = () => {
            emit('show-passport', employee.value);
        }
        const chooseEmployee = () => {
            emit('choose-employee', employee.value);
        }
        return {
            employee,
            selectedJobType,
            showPassport,
            chooseEmployee
        }
        
    },
}
</script>