<template>
    <section v-if="isVisible && currentAlert.state !== IAlertState.RESOLVED" class="alert-section relative flex flex-col items-center justify-between shadow-xl rounded-md py-4 px-6 w-[350px] min-h-[175px] bg-[#D9D9D9]"
    :class="currentAlert.state !== IAlertState.RESOLVED && customPerson?.personType === IPersonType.VISITOR? 'hover:shadow-2xl transform transition-shadows':'transition-all'">
        <div class="alert-section w-full flex justify-between">
            <div class="alert-section w-10/12 flex flex-col justify-between h-full gap-1">
                <h5 class="alert-section h5">{{ currentAlert.title }}</h5>
                <p class="alert-section font-semibold text-sm">{{ currentZone?.name }}</p>
                <p v-if="customPerson && customPerson.personType === IPersonType.VISITOR">State: <span class="alert-section font-semibold">{{ currentAlert.state }}</span></p>
                <p class="alert-section line-clamp-2 break-all">{{ currentAlert.description }}</p>
            </div>
        </div>
        <template v-if="customPerson && customPerson.personType === IPersonType.EMPLOYEE">
            <button v-if="currentAlert.state === IAlertState.OPEN" @click="acceptAlert" :disable="!mutatingAlert" 
            class="alert-section flex justify-center bg-secondary-green hover:bg-primary-green disabled:bg-opacity-50 transition-colors p-2 rounded-md w-1/2"
            >
                <p v-if="!mutatingAlert" class="alert-section text-slate-100">Accept</p>
                <Loader2 v-else class="alert-section w-6 h-6 text-slate-100 animate-spin"/>
            </button>
            <button v-else @click="completeAlert" :disable="!mutatingAlert" class="alert-section flex justify-center bg-secondary-green hover:bg-primary-green disabled:bg-opacity-50 transition-colors p-2 rounded-md w-1/2"
            >
                <p v-if="!mutatingAlert" class="alert-section text-slate-100">Complete</p>
                <Loader2 v-else class="alert-section w-6 h-6 text-slate-100 animate-spin"/>
            </button>
        </template>
    </section>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { AlertCircle, Check, X, Loader2 } from 'lucide-vue-next';
import { UPDATE_ALERT_STATE } from '@/graphql/alert.mutation';
import { useMutation } from '@vue/apollo-composable';
import { AlertState as IAlertState } from '@/interfaces/IAlertState';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import useCustomPerson from '@/composables/useCustomPerson';
import { GET_ZONE_BY_ID } from '@/graphql/zone.query';
import { useQuery } from '@vue/apollo-composable';
import type { Zone as IZone } from '@/interfaces/IZone';
import { PersonType as IPersonType } from '@/interfaces/IPersonType';

export default {
    props: {
        alert: {
            type: Object as () => IAlert,
            required: true,
        }
    },
    components: {
    AlertCircle,
    Check,
    X,
    Loader2,
},
    setup(props, {emit}) {
        const { customPerson } = useCustomPerson();
        const currentAlert = ref<IAlert>({...props.alert});
        const isVisible = ref<boolean>(true);
        const { mutate: updateAlertState, loading: mutatingAlert } = useMutation(UPDATE_ALERT_STATE);
        const { result } = useQuery(GET_ZONE_BY_ID, () => ({
            zoneId: currentAlert.value.zoneId,
        }));

        const currentZone = computed<IZone | undefined>(() => {
            return result.value?.zone;
        });

        const closePopUp = () => {
            isVisible.value = false;
        }

        const acceptAlert = async () => {
            updateAlertState({
                updateAlertInput: {
                    id: currentAlert.value.id,
                    state: IAlertState.ACKNOWLEDGED,
                    assignedPersonId: customPerson.value?.id,
                },
            }).then(() => {
                currentAlert.value.state = IAlertState.ACKNOWLEDGED;
            })
        }

        const completeAlert = async () => {
            updateAlertState({
                updateAlertInput: {
                    id: currentAlert.value.id,
                    state: IAlertState.RESOLVED,
                    assignedPersonId: customPerson.value?.id,
                },
            }).then(() => {
                currentAlert.value.state = IAlertState.RESOLVED;
                emit('alertCompleted', currentAlert.value)
            })
        }

        return {
            currentAlert,
            currentZone,
            customPerson,
            IAlertState,
            IPersonType,
            isVisible,
            mutatingAlert,

            acceptAlert,
            closePopUp,
            completeAlert,
        }
    }
}
</script>