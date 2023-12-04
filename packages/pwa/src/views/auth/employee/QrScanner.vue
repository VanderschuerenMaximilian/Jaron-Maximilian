<template>
    <main class="pt-[70px] min-h-screen flex flex-col items-center md:justify-center justify-between gap-6">
      <div class="w-full flex md:justify-center items-center h-2/3 md:pt-0 pt-12">
        <qrcode-stream class="max-w-2xl" :paused="paused" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
            <div v-if="isValid" 
            class="absolute w-full h-full bg-white bg-opacity-80 flex flex-col justify-center items-center gap-6">
                    <div class="p-16 bg-secondary-green rounded-full w-fit animate-icon">
                        <Check class="text-slate-100 scale-[400%] rounded-full translate-y-1"/>
                    </div>
            </div>

            <div v-if="!isValid && error" 
            class="absolute w-full h-full bg-white bg-opacity-80 flex flex-col justify-center items-center gap-6">
                <div class="p-16 bg-red-500 rounded-full w-fit animate-icon">
                    <X class="text-slate-100 scale-[400%]"/>
                </div>
                <p class="font-bold text-center text-red-500 text-xl">{{ error }}</p>
            </div>

            <div v-if="isValid === undefined && paused" 
            class="absolute w-full h-full bg-white bg-opacity-80 flex flex-col justify-center items-center gap-6">
                <div class="animate-spin">
                    <Loader2 class="text-primary-green scale-[400%]"/>
                </div>
            </div>

            <!-- Qrcode indicator -->
            <div v-if="!paused" class="w-full h-full flex justify-center items-center">
                <div class="relative sm:w-72 w-52 sm:h-72 h-52">
                    <div class="absolute top-0 left-0 bg-primary-green h-3 w-9"></div>
                    <div class="absolute top-0 left-0 bg-primary-green h-9 w-3"></div>
                    <div class="absolute top-0 right-0 bg-primary-green h-3 w-9"></div>
                    <div class="absolute top-0 right-0 bg-primary-green h-9 w-3"></div>
                    <div class="absolute bottom-0 left-0 bg-primary-green h-3 w-9"></div>
                    <div class="absolute bottom-0 left-0 bg-primary-green h-9 w-3"></div>
                    <div class="absolute bottom-0 right-0 bg-primary-green h-3 w-9"></div>
                    <div class="absolute bottom-0 right-0 bg-primary-green h-9 w-3"></div>
                </div>
            </div>
        </qrcode-stream>
      </div>
      <button v-if="goNext || error" @click="resetValidationState" class="sm:w-[498px] rounded-md px-5 py-3 bg-secondary-green text-slate-100 hover:bg-primary-green transition-colors md:mb-0 mb-12">Go to scan</button>
    </main>
</template>
<style scoped>
@keyframes scaleAnimation {
    0% {
      transform: scale(0);
    }
    90% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
}

.animate-icon {
    animation: scaleAnimation 0.3s ease-in-out;

}
</style>
<script lang="ts">
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { UPDATE_TICKET } from '@/graphql/ticket.mutation';
import { GET_TICKET_BY_VALIDATION_ID } from '@/graphql/ticket.query';
import { useMutation } from '@vue/apollo-composable';
import { useQuery } from '@vue/apollo-composable';
import type { ITicket } from '@/interfaces/ITicket';
import { X, Check, Loader2 } from 'lucide-vue-next';
import { TicketState as ITicketState } from '@/interfaces/ITicketState';

export default {
    components: { 
        QrcodeStream,
        X,
        Check,
        Loader2,
    },
    setup() {
        const isValid = ref<boolean | undefined>(undefined);
        const paused = ref<boolean>(false);
        const goNext = ref<boolean>(false);
        const result = ref<string>('');
        const toValidateId = ref<string>('');
        const ticket = ref<ITicket>();
        const error = ref<string | null>(null);
        const info = ref<string | null>('');

        const onError = () => console.error;

        const resetValidationState = () => {
            goNext.value = false
            paused.value = false
            isValid.value = undefined
            toValidateId.value = ''
            result.value = ''
            ticket.value = undefined
            error.value = null
            info.value = null
        }

        const handleExpireDate = (inputDateString: string) => {
            const inputDate = new Date(inputDateString);

            // Date options (English month)
            const dateOptions = { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' };
            const dateString = inputDate.toLocaleDateString('en-US', dateOptions as Intl.DateTimeFormatOptions);

            // Time options
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Paris' };
            const timeString = inputDate.toLocaleTimeString('en-US', timeOptions as Intl.DateTimeFormatOptions);

            return dateString;
        }

        const onDetect = async ([firstDetectedCode]: any) => {
            result.value = firstDetectedCode.rawValue;
            paused.value = true;

            const url = new URL(result.value);
            const ticketId = url.searchParams.get('ticketId');
            toValidateId.value = ticketId as string;

            if (toValidateId.value !== '') {
                await fetchDetectedTicket(toValidateId.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (ticket.value && ticket.value.validationId && toValidateId.value) {
                    if (ticket.value.isActive === ITicketState.INACTIVE) {
                        if(today.getTime() == new Date(ticket.value.usableOn).getTime()) {
                            await updateDetectedTicket(ticket.value.id, toValidateId.value);
                        } else {
                            isValid.value = false;
                            error.value = `Ticket is not usable today but on ${handleExpireDate(ticket.value.usableOn.toString())}`;
                        }
                    } 
                    else if (ticket.value.isActive === ITicketState.ACTIVE) {
                        await updateDetectedTicket(ticket.value.id, toValidateId.value);
                    }
                    else if (ticket.value.isActive === ITicketState.USED) {
                        isValid.value = false;
                        error.value = 'Ticket is already used';
                    }
                } else {
                    isValid.value = false;
                    error.value = 'This is not a valid ticket';
                }
            } else {
                isValid.value = false;
                error.value = 'Somthing went wrong with the QR code';
            }
        }

        const fetchDetectedTicket = async (validationId: string): Promise<void> => {
            return new Promise<void>(resolve => {
                const { onResult } = useQuery(GET_TICKET_BY_VALIDATION_ID,{ validationId });
                
                onResult((result) => {
                    if (result.data) {
                        ticket.value = result.data.ticketByValidationId;
                        resolve();
                    }
                });
            })
        }

        const updateDetectedTicket = async (ticketId: string, validationId: string): Promise<void> => {
            return new Promise<void>(resolve => {
                const { mutate: updateTicket, onDone } = useMutation(UPDATE_TICKET);
                updateTicket({
                    updateTicketInput: {
                        id: ticketId,
                        validationId,
                    }
                });
                onDone((result) => {
                    isValid.value = true;
                    goNext.value = true;
                    resolve();
                });
            })
        }

        return {
            error,
            goNext,
            info,
            isValid,
            paused,
            result,
            ticket,
            toValidateId,

            fetchDetectedTicket,
            handleExpireDate,
            onDetect,
            onError,
            resetValidationState,
            updateDetectedTicket,
        }
    }
}
</script>