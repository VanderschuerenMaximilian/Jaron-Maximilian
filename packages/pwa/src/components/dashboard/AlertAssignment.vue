<template>
    <section class="flex items-center justify-between w-96 h-16 bg-secondary-green text-slate-100 text-sm font-medium rounded-md px-3 translate-x-[500px]"
    :class="showNotification?'translate-x-0 transform transition-transform duration-500':'translate-x-[500px] transform transition-transform duration-500'">
        <p class="max-w-[275px]">Change to <span class="font-bold">"{{ alert.title }}"</span> complete!</p>
        <div class="flex gap-1">
            <Undo2 class="w-8 h-8 cursor-pointer px-1 hover:bg-slate-100 hover:bg-opacity-10 rounded-full transition-all" @click="undoAssignment" />
            <X class="w-8 h-8 cursor-pointer px-1 hover:bg-slate-100 hover:bg-opacity-10 rounded-full transition-all" @click="closeNotification"/>
        </div>
    </section>
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import { X, Undo2 } from 'lucide-vue-next';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import { useMutation } from '@vue/apollo-composable';
import { REMOVE_PERSON_FROM_ALERT } from '@/graphql/alert.mutation';

export default {
    components: {
        X,
        Undo2,
    },
    props: {
        alert: {
            type: Object as () => IAlert,
            required: true,
        },
    },
    setup(props) {
        const showNotification = ref<boolean>(false);
        const closeNotification = () => {
            showNotification.value = false;
        }
        const { mutate: removePersonFromAlert, onDone } = useMutation(REMOVE_PERSON_FROM_ALERT);

        const undoAssignment = () => {
            if (props.alert.persons) {
                const lastPerson = props.alert.persons[props.alert.persons.length - 1];

                removePersonFromAlert({
                    alertId: props.alert.id,
                    personId: lastPerson.id,
                })
            }
        }

        onDone(() => {
            showNotification.value = false;
        })

        watch(props.alert, () => {
            showNotification.value = true;
        }, { immediate: true })

        return {
            showNotification,

            closeNotification,
            undoAssignment,
        }
    }
}
</script>