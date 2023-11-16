<template>
    <main class="pt-[70px] min-h-screen">
      <div>
        <p class="decode-result px-[5%]">
          Last result: <b class="text-xs break-all">{{ result }}</b>
        </p>
        <p>
            ticketId: <b class="text-xs break-all">{{ toValidateId }}</b>
        </p>

        <qrcode-stream class="h-1/2" :paused="paused" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
          <div v-if="validationSuccess" class="validation-success">This is a URL</div>

          <div v-if="validationFailure" class="validation-failure">This is NOT a URL!</div>

          <div v-if="validationPending" class="validation-pending">Long validation in progress...</div>
        </qrcode-stream>
      </div>
      <button v-if="goNext" @click="toggleNext" class="px-5 py-3 bg-secondary-green text-slate-100 hover:bg-primary-green transition-colors">Scan Next</button>
    </main>
</template>

<script lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader';
import { UPDATE_TICKET } from '@/graphql/ticket.mutation';
import { GET_TICKET_BY_VALIDATION_ID } from '@/graphql/ticket.query';
import { useMutation } from '@vue/apollo-composable';
import { useQuery } from '@vue/apollo-composable';
import type { ITicket } from '@/interfaces/ITicket';

export default {
    components: { 
        QrcodeStream,
    },

    data() {
        return {
            isValid: undefined as boolean | undefined,
            paused: false as boolean,
            goNext: false as boolean,
            result: '' as string,
            toValidateId: '' as string,
            ticket: {} as ITicket,
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
            return this.isValid === false
        }
    },

    methods: {
        onError: console.error,

        resetValidationState() {
            this.isValid = undefined
        },

        async onDetect([firstDetectedCode]: any) {

                this.result = firstDetectedCode.rawValue;
                this.paused = true;

                // @ts-ignore
                this.isValid = this.result.startsWith('http');

                if (this.isValid) {
                    const url = new URL(this.result);
                    const ticketId = url.searchParams.get('ticketId');
                    this.toValidateId = ticketId as string;
                }

                if (this.toValidateId !== '') {
                    await this.fetchDetectedTicket(this.toValidateId);
                    console.log('Ticket after the function:', this.ticket);
                    if (this.ticket.validationId && this.toValidateId) {
                        await this.updateDetectedTicket(this.ticket.id, this.toValidateId);
                    }
                }
        },

        async fetchDetectedTicket(validationId: string): Promise<void> {
            return new Promise<void>(resolve => {
                const { onResult } = useQuery(GET_TICKET_BY_VALIDATION_ID,{ validationId });
                
                onResult((result) => {
                    if (result.data) {
                        console.log('Ticket:', result);
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
                    console.log('Ticket Result:', result);
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

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    color: black;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
}

.validation-success {
    color: green;
}

.validation-failure {
    color: red;
}
</style>
