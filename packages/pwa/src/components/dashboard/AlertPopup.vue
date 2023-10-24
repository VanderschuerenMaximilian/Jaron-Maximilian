<template>
    <section v-if="isVisible && currentAlert.state !== IAlertState.RESOLVED" class="relative flex flex-col items-center gap-4 shadow-xl rounded-md py-4 px-6 w-[350px] bg-[#D9D9D9] border-l-6 border-l-red-500">
        <button @click="closePopUp" class="absolute right-3 hover:bg-black hover:bg-opacity-10 transition-opacity rounded-full p-1">
            <X/>
        </button>
        <div class="w-full flex justify-between">
            <AlertCircle class="text-red-600 mt-2"/>
            <div class="w-10/12 flex flex-col justify-between h-full">
                <h5 class="h5">{{ currentAlert.title }}</h5>
                <p class="font-semibold text-sm">ADD THE ZONE!!!!!!!!!!</p>
                <p class="line-clamp-2">{{ currentAlert.description }}</p>
            </div>
        </div>
        <button v-if="currentAlert.state === IAlertState.OPEN" @click="acceptAlert" :disable="acceptingAlert" class="flex justify-center bg-secondary-green hover:bg-primary-green disabled:bg-opacity-50 transition-colors p-2 rounded-sm w-1/2">
            <p v-if="!acceptingAlert" class="text-slate-100">Accept</p>
            <Loader v-else class="w-6 h-6 text-slate-100 animate-spin"/>
        </button>
        <button v-else @click="completeAlert" class="bg-blue-500 hover:bg-blue-600 disabled:bg-opacity-50 transition-colors p-2 rounded-sm w-1/2">
            <p class="text-slate-100">Complete</p>
        </button>
    </section>
</template>

<script lang="ts">
import { ref } from 'vue';
import { AlertCircle, Check, X, Loader } from 'lucide-vue-next';
import { UPDATE_ALERT_STATE } from '@/graphql/alert.mutation';
import { useMutation } from '@vue/apollo-composable';
import { AlertState as IAlertState } from '@/interfaces/IAlertState';
import type { Alert as IAlert } from '@/interfaces/IAlert';
import useCustomPerson from '@/composables/useCustomPerson';

export default {
    props: ['alert'],
    components: {
    AlertCircle,
    Check,
    X,
    Loader,
},
    setup(props) {
        const { customPerson } = useCustomPerson();
        const currentAlert = ref<IAlert>(props.alert);
        const isVisible = ref<boolean>(true);
        const { mutate: updateAlertState, loading: acceptingAlert, error } = useMutation(UPDATE_ALERT_STATE);

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
            })
            .then(() => {
                isVisible.value = false;
            });
        }

        const completeAlert = async () => {
            updateAlertState({
                updateAlertInput: {
                    id: currentAlert.value.id,
                    state: IAlertState.RESOLVED,
                },
            })
            .then(() => {
                isVisible.value = false;
            });
        }

        return {
            acceptingAlert,
            IAlertState,
            currentAlert,
            isVisible,

            acceptAlert,
            closePopUp,
            completeAlert,
        }
    }
}
</script>