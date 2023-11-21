<template>
    <template v-if="selectedJobType === 'ALL'">
        <button class="w-full py-2 px-6 flex text-start bg-gray-200 rounded-md">
            <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                <p class="text-xs opacity-60">{{ employee.jobType }}</p>
            </div>
        </button>
    </template>
    <template v-else-if="selectedJobType === employee.jobType">
        <button class="w-full py-2 px-6 flex text-start bg-gray-200 rounded-md">
            <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ employee.fullName }}</p>
                <p class="text-xs opacity-60">{{ employee.jobType }}</p>
            </div>
        </button>
    </template>
    <template v-else>

    </template>
</template>

<script lang="ts">
import type { JobType as IJobType } from '@/interfaces/IJobType';
import type { Person as IPerson } from '@/interfaces/IPersons';

export default {
    // props: ['employee', 'selectedJobType'],
    props: {
        employee: {
            type: Object as () => IPerson,
            required: true,
        },
        selectedJobType: {
            type: String as () => IJobType,
            required: true,
        },
    }
}
</script>