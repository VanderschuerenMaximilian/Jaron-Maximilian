<template>
    <template v-if="employee">
        <button class="rounded-full bg-secondary-green overflow-hidden">
            <img class="h-8 w-8" :src="employee.profilePicture" alt="">
        </button>
    </template>
    <template v-else>
        <div class="flex items-center gap-2">
            <div class="rounded-full bg-secondary-green overflow-hidden w-8 h-8">
                <img class="h-8 w-8" :src="assignedPerson?.profilePicture" :alt="assignedPerson?.fullName">
            </div>
            <div class="flex flex-col text-sm">
                <p>{{ assignedPerson?.lastName }}</p>
                <p>{{ assignedPerson?.firstName }}</p>
            </div>
        </div>
    </template>
</template>

<script lang="ts">
import type { Person as IPerson } from '@/interfaces/IPerson';
import { computed, onMounted, watch } from 'vue';
import { FIND_PERSON_BY_ID } from '@/graphql/person.query';
import { useQuery } from '@vue/apollo-composable';

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

        const { result } = useQuery(FIND_PERSON_BY_ID, () => ({
            id: props.assignedPersonId,
        }));
        const assignedPerson = computed<IPerson | undefined>(() => {
            return result.value?.personById;
        });

        return {
            assignedPerson,
        }
    }
}
</script>