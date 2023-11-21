<template>
    <div class="cursor-pointer">
        <p class="text-xs flex-wrap">
            {{ employee.firstName }}
            {{ employee.lastName }}
        </p>
    </div>
</template>

<script lang="ts">
import type { Person as IPerson } from '@/interfaces/IPersons';
import { onMounted } from 'vue';


export default {
    props: {
        employee: {
            type: Object as () => IPerson,
            required: true,
        },
        onInput: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        onMounted(() => {
            if (typeof props.onInput === 'function') {
                props.onInput(props.employee);
            }
        });
    }
}
</script>