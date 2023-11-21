<template>
    <template v-if="selectedJobType === 'ALL'">
        <button class="w-full py-2 px-6 flex text-start bg-gray-200 rounded-md">
            <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                <p class="text-xs opacity-60">{{ employee.jobType }}</p>
            </div>
        </button>
    </template>
    <template v-else>
        <button class="w-full py-2 px-6 flex text-start bg-gray-200 rounded-md" v-if="selectedJobType === employee.jobType">
            <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                <p class="text-xs opacity-60">{{ employee.jobType }}</p>
            </div>
        </button>
    </template>
</template>

<script lang="ts">
export default {
    props: ['employee', 'selectedJobType'],
}
</script>