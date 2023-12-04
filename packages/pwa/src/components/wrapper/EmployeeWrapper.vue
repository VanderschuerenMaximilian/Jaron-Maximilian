<template v-if="customPerson.personType === IPersonType.EMPLOYEE">
    <section v-if="assignedAlerts" class="absolute md:block hidden right-4 top-[86px] space-y-4">
        <AlertPopUp :alert="alert" v-for="alert in assignedAlerts" :key="alert.id" />
    </section>
    <section v-if="assignedAlerts" class="absolute md:hidden flex right-1 top-[86px] flex-col items-end max-w-md">
        <p class="absolute z-50 -translate-y-1 translate-x-1 text-xs text-slate-100 bg-primary-green px-1 rounded-full"
        :class="showAlerts? 'opacity-0 transform transition-opacity':'opacity-100 transform transition-opacity'">{{ assignedAlerts.length }}</p>
        
        <button @click="toggleAlerts" class="p-2 bg-secondary-green ease-in-out duration-200"
        :class="showAlerts? 'rounded-t-md transform transition-all':'rounded-full transform transition-all delay-100'">
            <Bell class="text-slate-100"/>
        </button>
        
        <div class="space-y-2 bg-secondary-green p-2 rounded-b-md rounded-tl-md origin-top-right -translate-y-1 -translate-x-.25 duration-200 ease-in-out"
        :class="showAlerts? 'scale-100 transform transition-transform delay-100':'scale-0 transform transition-transform'">
            <AlertPopUp :alert="alert" v-for="alert in assignedAlerts" :key="alert.id" />
        </div>
    </section>
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
import { Bell } from 'lucide-vue-next';

export default {
    components: {
        AlertPopUp,
        Bell,
    },
    setup() {
        const { customPerson } = useCustomPerson();
        const assignedAlerts = ref<IAlert[]>([]);
        const { result, loading } = useQuery(GET_NON_RESOLVED_ALERTS_FROM_EMPLOYEE, () => ({
            employeeId: customPerson.value?.id,
        }));
        const showAlerts = ref<boolean>(false);

        watch(loading, () => {
            if (!loading.value && result.value) {
                assignedAlerts.value = result.value.nonResolvedAlertsByEmployee;
            }
        }, { immediate: true })

        const toggleAlerts = () => {
            showAlerts.value = !showAlerts.value;
        }

        return {
            assignedAlerts,
            customPerson,
            IPersonType,
            showAlerts,

            toggleAlerts,
        }
    }
}
</script>