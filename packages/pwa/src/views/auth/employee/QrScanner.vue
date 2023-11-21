<template>
    <main class="pt-[70px] min-h-screen flex flex-col items-center md:justify-center justify-between gap-6">
      <div class="w-full flex md:justify-center items-center h-2/3 md:pt-0 pt-12">
        <qrcode-stream class="max-w-2xl" :paused="paused" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
            <div v-if="validationSuccess" 
            class="absolute w-full h-full bg-white bg-opacity-80 flex flex-col justify-center items-center gap-6">
                    <div class="p-16 bg-secondary-green rounded-full w-fit animate-icon">
                        <Check class="text-slate-100 scale-[400%] rounded-full translate-y-1"/>
                    </div>
            </div>

            <div v-if="validationFailure" 
            class="absolute w-full h-full bg-white bg-opacity-80 flex flex-col justify-center items-center gap-6">
                <div class="p-16 bg-red-500 rounded-full w-fit animate-icon">
                    <X class="text-slate-100 scale-[400%]"/>
                </div>
                <p class="font-bold text-center text-red-500 text-xl">{{ error }}</p>
            </div>

            <div v-if="validationPending" 
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
      <button v-if="goNext || error" @click="toggleNext" class="sm:w-[498px] rounded-md px-5 py-3 bg-secondary-green text-slate-100 hover:bg-primary-green transition-colors md:mb-0 mb-12">Go to scan</button>
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
import { QrcodeStream } from 'vue-qrcode-reader';
import { UPDATE_TICKET } from '@/graphql/ticket.mutation';
import { GET_TICKET_BY_VALIDATION_ID } from '@/graphql/ticket.query';
import { useMutation } from '@vue/apollo-composable';
import { useQuery } from '@vue/apollo-composable';
import type { ITicket } from '@/interfaces/ITicket';
import { X, Check, Loader2 } from 'lucide-vue-next';

export default {
    components: { 
        QrcodeStream,
        X,
        Check,
        Loader2,
    },

    data() {
        return {
            isValid: undefined as boolean | undefined,
            paused: false as boolean,
            goNext: false as boolean,
            result: '' as string,
            toValidateId: '' as string,
            ticket: {} as ITicket,
            error: null as string | null,
        }
    },

    computed: {
        validationPending() {
            return this.isValid === undefined && this.paused
        },

        validationSuccess() {
            return this.isValid === true
        },

        validationFailure() {
            return this.isValid === false && this.error
        }
    },

    methods: {
        onError: console.error,

        resetValidationState() {
            this.isValid = undefined
        },

        handleExpireDate(inputDateString: string) {
            const inputDate = new Date(inputDateString);

            // Date options (English month)
            const dateOptions = { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' };
            const dateString = inputDate.toLocaleDateString('en-US', dateOptions as Intl.DateTimeFormatOptions);

            // Time options
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Paris' };
            const timeString = inputDate.toLocaleTimeString('en-US', timeOptions as Intl.DateTimeFormatOptions);

            return dateString;
        },

        async onDetect([firstDetectedCode]: any) {

                this.result = firstDetectedCode.rawValue;
                this.paused = true;

                const url = new URL(this.result);
                const ticketId = url.searchParams.get('ticketId');
                this.toValidateId = ticketId as string;

                if (this.toValidateId !== '') {
                    await this.fetchDetectedTicket(this.toValidateId);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (this.ticket.validationId && this.toValidateId) {
                        if (!this.ticket.isActive) {
                            if(today.getTime() == new Date(this.ticket.usableOn).getTime()) {
                                await this.updateDetectedTicket(this.ticket.id, this.toValidateId);
                            } else {
                                this.isValid = false;
                                this.error = `Ticket is not usable today but on ${this.handleExpireDate(this.ticket.usableOn.toString())}`;
                            }
                        } else {
                            this.isValid = false;
                            this.error = 'Ticket is already used';
                        }
                    } else {
                        this.isValid = false;
                        this.error = 'This is not a valid ticket';
                    }
                } else {
                    this.isValid = false;
                    this.error = 'Somthing went wrong with the QR code';
                }
        },

        async fetchDetectedTicket(validationId: string): Promise<void> {
            return new Promise<void>(resolve => {
                const { onResult } = useQuery(GET_TICKET_BY_VALIDATION_ID,{ validationId });
                
                onResult((result) => {
                    if (result.data) {
                        this.ticket = result.data.ticketByValidationId;
                        resolve();
                    }
                });
            })
        },

        async updateDetectedTicket(ticketId: string, validationId: string): Promise<void> {
            return new Promise<void>(resolve => {
                const { mutate: updateTicket, onDone } = useMutation(UPDATE_TICKET);
                updateTicket({
                    updateTicketInput: {
                        id: ticketId,
                        validationId,
                    }
                });
                onDone((result) => {
                    this.isValid = true;
                    this.goNext = true;
                    resolve();
                });
            })
        },

        toggleNext() {
            this.goNext = false
            this.paused = false
        }
    }
}
</script>