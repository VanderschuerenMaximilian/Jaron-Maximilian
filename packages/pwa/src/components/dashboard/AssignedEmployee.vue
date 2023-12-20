<template>
    <template v-if="employee">
        <button class="rounded-full bg-secondary-green overflow-hidden">
            <img class="h-8 w-8" :src="employee.profilePicture" alt="">
        </button>
    </template>
</template>

<script lang="ts">
import type { Person as IPerson } from '@/interfaces/IPerson';
import { onMounted } from 'vue';

export default {
    props: {
        employee: {
            type: Object as () => IPerson,
            required: false,
        },
        onInput: {
            type: Function,
            required: false,
        },
        assignedPersonId: {
            type: String,
            required: false,
        },
    },
    setup(props) {
        onMounted(() => {
            if (typeof props.onInput === 'function') {
                props.onInput(props.employee);
            }
        });

        return {
        }
    }
}
</script>