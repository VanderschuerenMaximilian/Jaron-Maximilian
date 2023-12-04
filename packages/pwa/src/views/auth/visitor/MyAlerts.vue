<template v-if="customPerson">
        <main class="py-[70px] min-h-screen sm:px-8 px-4 space-y-8">
            <h2 class="h2 absolute top-24">Your Alerts</h2>
            <section v-if="loadAlerts" class="flex gap-3 pt-12 flex-wrap">
                <div v-for="alert in loadingAlerts" class="w-[350px] h-[160px] rounded-md bg-gray-200 animate-pulse">
                </div>
            </section>
            <section v-else class="flex flex-wrap items-center gap-3 pt-12">
                <Alert v-for="alert in myAlerts" :alert="alert" :key="alert.id"/>
            </section>
        </main>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import useCustomPerson from '@/composables/useCustomPerson';
import { GET_NON_RESOLVED_ALERTS_FROM_CREATED_BY } from '@/graphql/alert.query';
import { useQuery } from '@vue/apollo-composable';
import Alert from './../../../components/profile/Alert.vue'

export default {
    components: {
        Alert
    },
    setup() {
        const { customPerson } = useCustomPerson();
        const { result: alertsResult, loading: loadAlerts } = useQuery(GET_NON_RESOLVED_ALERTS_FROM_CREATED_BY, () => ({
            createdBy: customPerson.value?.id,
        }));
        const loadingAlerts = ref<number[]>([1, 2, 3])

        return {
            customPerson,
            loadAlerts,
            loadingAlerts,
            myAlerts: computed(() => {
                return alertsResult.value?.nonResolvedAlertsByCreatedBy;
            })
        }
    }
}
</script>