<template>
    <section class="flex items-center justify-between w-96 h-16 bg-secondary-green text-slate-100 text-sm font-medium rounded-md px-3 translate-x-[500px]"
    :class="showNotification?'translate-x-0 transform transition-transform duration-500':'translate-x-[500px] transform transition-transform duration-500'">
        <p class="max-w-[275px]">Assigment to <span class="font-bold">"{{ alert.title }}"</span> complete!</p>
        <div class="flex gap-1">
            <!-- TODO: Add undo functionality -->
            <!-- <Undo2 class="w-8 h-8 cursor-pointer px-1 hover:bg-slate-100 hover:bg-opacity-10 rounded-full transition-all" /> -->
            <X class="w-8 h-8 cursor-pointer px-1 hover:bg-slate-100 hover:bg-opacity-10 rounded-full transition-all" @click="closeNotification"/>
        </div>
    </section>
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import { X, Undo2 } from 'lucide-vue-next';
import type { Alert as IAlert } from '@/interfaces/IAlert';

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

        watch(props.alert, () => {
            showNotification.value = true;
        }, { immediate: true })

        return {
            showNotification,

            closeNotification,
        }
    }
}
</script>