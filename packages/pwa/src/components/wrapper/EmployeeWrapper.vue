<template v-if="customPerson.personType === IPersonType.EMPLOYEE">
    <div v-if="assignedAlerts" class="absolute right-4 top-[86px] space-y-4">
        <AlertPopUp :alert="alert" v-for="alert in assignedAlerts" :key="alert.id" />
    </div>
    <RouterView />
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import useCustomPerson from '@/composables/useCustomPerson';
import { useQuery } from '@vue/apollo-composable';
import { GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE } from '@/graphql/alert.query';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import { PersonType as IPersonType } from '@/interfaces/IPersonType';
import AlertPopUp from '@/components/profile/Alert.vue';

export default {
    components: {
        AlertPopUp,
    },
    setup() {
        const { customPerson } = useCustomPerson();
        const assignedAlerts = ref<IAlert[]>([]);
        const { result, loading } = useQuery(GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE, () => ({
            employeeId: customPerson.value?.id,
        }));

        watch(loading, () => {
            if (!loading.value && result.value) {
                assignedAlerts.value = result.value.nonResolvedAlertsByEmployee;
            }
        }, { immediate: true })

        return {
            assignedAlerts,
            customPerson,
            IPersonType,
        }
    }
}
</script>