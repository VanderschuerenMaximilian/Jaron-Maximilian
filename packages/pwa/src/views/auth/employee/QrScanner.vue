<template>
    <main class="pt-[70px] min-h-screen">
      <div>
        <p class="decode-result px-[5%]">
          Last result: <b class="text-xs break-all">{{ result }}</b>
        </p>
        <p>
            ticketId: <b class="text-xs break-all">{{ ticketId }}</b>
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
import { useMutation } from '@vue/apollo-composable';

export default {
    components: { QrcodeStream },

    data() {
        return {
            isValid: false,
            paused: false,
            goNext: false,
            result: '',
            ticketId: '',
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
            this.isValid = false
        },

        onDetect([firstDetectedCode] :any) {
            const { mutate: updateTicket } = useMutation(UPDATE_TICKET)
            this.result = firstDetectedCode.rawValue
            this.paused = true

            this.isValid = this.result.startsWith('http')

            if (this.isValid) {
                const params = new URLSearchParams(this.result)
                const ticketId = params.get('ticketId')
                this.ticketId = ticketId as string
                updateTicket({id: ticketId}).then(() => {
                    this.goNext = true
                })
            }
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
