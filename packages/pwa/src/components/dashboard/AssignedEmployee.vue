<template>
    <button class="rounded-full px-[10px] py-2 bg-secondary-green">
        <span class="text-slate-100">{{ getInitials(employee.fullName) }}</span>
    </button>
</template>

<script lang="ts">
import type { Person as IPerson } from '@/interfaces/IPerson';
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
        console.log(props.employee);
        const getInitials = (name: string) => {
            const names = name.split(' ');
            let initials = names[0].substring(0, 1).toUpperCase();

            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }

            return initials;
        }

        return {
            getInitials,
        }
    }
}
</script>