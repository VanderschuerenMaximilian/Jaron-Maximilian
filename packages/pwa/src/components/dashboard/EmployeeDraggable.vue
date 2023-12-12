<template>
    <template v-if="selectedJobType === 'ALL'">
        <button class="w-full py-2 px-4 flex items-center gap-2 text-start bg-gray-200 rounded-md">
            <div>
                <img :src=employee.profilePicture :alt=employee.fullName class="w-8 h-8 rounded-full">
            </div>
            <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ employee.lastName }}</p>
                <p class="text-xs opacity-60">{{ employee.jobType }}</p>
            </div>
        </button>
    </template>
    <template v-else-if="selectedJobType === employee.jobType">
        <button class="w-full py-2 px-4 flex items-center gap-2 text-start bg-gray-200 rounded-md">
            <div>
                <img :src=employee.profilePicture :alt=employee.fullName class="w-8 h-8 rounded-full">
            </div>
            <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ employee.lastName }}</p>
                <p class="text-xs opacity-60">{{ employee.jobType }}</p>
            </div>
        </button>
    </template>
    <template v-else>

    </template>
</template>

<script lang="ts">
import type { JobType as IJobType } from '@/interfaces/IJobType';
import type { Person as IPerson } from '@/interfaces/IPerson';

export default {
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