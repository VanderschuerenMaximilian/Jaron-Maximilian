<template>
    <main class="flex flex-col justify-center items-center pt-[70px] min-h-screen">
        <p>Hier komt de timeline & en de alerts voor de werknemer</p>
        <!-- <template v-if="customPerson?.assignedAlerts">
            <ul v-if="customAssignedAlerts.length > 0" class="absolute top-[85px] right-4 flex flex-col gap-4">
                <li v-for="assignedAlert in customAssignedAlerts" :key="assignedAlert.id">
                    <AlertPopup :alert="assignedAlert"/>
                </li>
            </ul>
        </template> -->
    </main>
</template>

<script lang="ts">
import useCustomPerson from '@/composables/useCustomPerson';
// import useCustomAlerts from '@/composables/useCustomAlerts';
// import type { Alert as IAlert } from '@/interfaces/IAlert';
import AlertPopup from '@/components/dashboard/AlertPopup.vue';

export default {
    components: {
        AlertPopup,
    },
    setup() {
        const { customPerson } = useCustomPerson();
        // const { customAssignedAlerts } = useCustomAlerts();

        return {
            // customAssignedAlerts,
            customPerson,

        };
    },
};

</script>