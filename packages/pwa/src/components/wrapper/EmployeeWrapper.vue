<template v-if="customPerson.personType === IPersonType.EMPLOYEE">
    <section v-if="assignedAlerts && assignedAlerts.length > 0" class="z-50 absolute flex md:right-5 right-1 top-[86px] flex-col items-end max-w-md">
        <p class="alert-section absolute z-50 -translate-y-1 translate-x-1 text-xs text-slate-100 bg-primary-green px-1 rounded-full"
        :class="showAlerts? 'opacity-0 transform transition-opacity':'opacity-100 transform transition-opacity'">{{ assignedAlerts.length }}</p>
        
        <button @click="toggleAlerts" class="alert-section p-2 shadow-xl bg-secondary-green ease-in-out duration-200 hover:bg-primary-green"
        :class="showAlerts? 'rounded-t-md transform transition-all':'rounded-full transform transition-all delay-100'">
            <Bell class="alert-section text-slate-100"/>
        </button>
        
        <div class="c-alerts_scroll alert-section space-y-2 bg-secondary-green min-h-fit max-h-[525px] overflow-y-scroll p-2 shadow-xl rounded-b-md rounded-tl-md origin-top-right -translate-y-1 -translate-x-.25 duration-200 ease-in-out"
        :class="showAlerts? 'scale-100 transform transition-transform delay-100':'scale-0 transform transition-transform'">
            <Alert :alert="alert" v-for="alert in assignedAlerts" :key="alert.id" @alertCompleted="removeResolvedAlert" />
        </div>
    </section>
    <RouterView />
</template>

<style scoped>
.c-alerts_scroll::-webkit-scrollbar {
    width: 4px;
}

.c-alerts_scroll::-webkit-scrollbar-thumb {
    background: #F1F5F9;
    border-radius: 25px;
}

.c-alerts_scroll::-webkit-scrollbar-track {
    background: #00733C;
    border-radius: 25px;
}

</style>

<script lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import useCustomPerson from '@/composables/useCustomPerson';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import { GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE } from '@/graphql/alert.query';
import { PERSON_ASSIGNED_TO_ALERT, PERSON_REMOVED_FROM_ALERT } from '@/graphql/alert.subscription';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import { PersonType as IPersonType } from '@/interfaces/IPersonType';
import Alert from '@/components/profile/Alert.vue';
import { Bell } from 'lucide-vue-next';
import type { Person as IPerson } from '@/interfaces/IPerson';

export default {
    components: {
        Alert,
        Bell,
    },
    setup() {
        const { customPerson } = useCustomPerson();
        const assignedAlerts = ref<IAlert[]>([]);
        const { result, loading } = useQuery(GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE, () => ({
            employeeId: customPerson.value?.id,
        }));
        const { result: employeeAssigned } = useSubscription(PERSON_ASSIGNED_TO_ALERT)
        const { result: employeeRemoved } = useSubscription(PERSON_REMOVED_FROM_ALERT)
        const showAlerts = ref<boolean>(false);

        watch(loading, () => {
            if (!loading.value && result.value) {
                assignedAlerts.value = result.value.nonResolvedAlertsByEmployee;
            }
        }, { immediate: true })

        watch(employeeAssigned, (value: any) => {
            if (value && value.personAssignedToAlert.persons?.find((person: IPerson) => person.id === customPerson.value?.id)) {
                assignedAlerts.value = [value.personAssignedToAlert, ...assignedAlerts.value]
            }
        })

        watch(employeeRemoved, (value: any) => {
            if (value && !value.personRemovedFromAlert.persons?.find((person: IPerson) => person.id === customPerson.value?.id)) {
                assignedAlerts.value = assignedAlerts.value.filter((alert: IAlert) => alert.id !== value.personRemovedFromAlert.id)
            }
        })

        const toggleAlerts = () => {
            showAlerts.value = !showAlerts.value;
            
            if (showAlerts.value) {
                document.addEventListener('click', closeAlerts);
            } else {
                document.removeEventListener('click', closeAlerts);
            }
        }

        const closeAlerts = (event: Event) => {
            const profileSection = document.querySelector('.alert-section');
            const selectedElement = event.target as HTMLElement;
            console.log(selectedElement.classList)
            if (profileSection && !selectedElement.classList.contains('alert-section')) {
                showAlerts.value = false;
                document.removeEventListener('click', closeAlerts);
            }
        }

        const removeResolvedAlert = (completedAlert: IAlert) => {
            const updateAlerts = assignedAlerts.value.filter((alert) => alert.id !== completedAlert.id)
            assignedAlerts.value = [...updateAlerts]
        }

        onBeforeUnmount(() => {
            document.removeEventListener('click', closeAlerts);
        });

        return {
            assignedAlerts,
            customPerson,
            IPersonType,
            showAlerts,

            toggleAlerts,
            removeResolvedAlert,
        }
    }
}
</script>