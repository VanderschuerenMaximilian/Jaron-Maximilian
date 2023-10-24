import { ref } from "vue";
import useGraphql from "./useGraphql";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";
import { FIND_ALERT_BY_ID } from "@/graphql/alert.query";
import useCustomPerson from "./useCustomPerson";
import type { Alert } from "@/interfaces/IAlert";

const customAssignedAlerts = ref<Alert[]>([]);

const { customPerson } = useCustomPerson();
const { apolloClient } = useGraphql();

provideApolloClient(apolloClient)

const restoreCustomAssignedAlerts = async () => {
    return new Promise<void>(resolve => {
        customPerson.value?.assignedAlerts?.forEach(async (alertId) => {
            const { onResult } = useQuery(FIND_ALERT_BY_ID, {
                alertId
            })
            onResult((result) => {
                if (result.data) {
                    customAssignedAlerts.value?.push(result.data?.alert)
                }
                resolve()
            })
        })
        console.log('customAssignedAlerts: ', customAssignedAlerts.value)
    })
};

export default () => {

    return {
        customAssignedAlerts,

        restoreCustomAssignedAlerts,
    };
};