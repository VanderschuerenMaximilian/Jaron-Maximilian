<template>
    <template v-if="selectedJobType === 'ALL'">
        <button class="w-full py-2 px-4 flex text-start bg-gray-200 rounded-md justify-between min-w-110 overflow-auto">
            <div class="flex xs:flex-row gap-4">
                <img :src=employee.profilePicture :alt=employee.name class="w-10 h-10 rounded-full ">
                <div class="flex flex-col">
                    <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                    <p class="text-xs opacity-60">{{ employee.jobType }}</p>
                </div>
            </div>
            <div class="flex gap-4 my-auto">
                <button @click="showPassport()" class="p-2 bg-primary-green text-white rounded-lg text-3 md:text-4">Show passport</button>
                <button @click="chooseEmployee()" class="p-2 bg-primary-green text-white rounded-lg text-3 md:text-4">Choose</button>
            </div>
        </button>
    </template>
    <template v-else>
        <button class="w-full py-2 px-4 flex text-start bg-gray-200 rounded-md justify-between" v-if="selectedJobType === employee.jobType">
            <div class="flex gap-4">
                <img :src=employee.profilePicture :alt=employee.name class="w-10 h-10 rounded-full ">
                <div class="flex flex-col">
                    <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                    <p class="text-xs opacity-60">{{ employee.jobType }}</p>
                </div>
            </div>
            <div class="flex gap-4 my-auto">
                <button @click="showPassport()" class="p-2 bg-primary-green text-white rounded-lg text-3 md:text-4">Show passport</button>
                <button @click="chooseEmployee()" class="p-2 bg-primary-green text-white rounded-lg text-3 md:text-4">Choose</button>
            </div>
        </button>
    </template>
</template>

<script lang="ts">
export default {
    props: ['employee', 'selectedJobType'], 
    methods: {
        showPassport() {
            this.$emit('show-passport', this.employee);
        },
        chooseEmployee() {
            this.$emit('choose-employee', this.employee);
        }
    }
}
</script>