<template>
    <main class="pt-[70px] min-h-screen flex justify-center items-center">
        <div class="w-[350px]">
            <!-- hey -->
            <QrcodeStream @decode="onDecode"/>
            {{ something }}
        </div>
    </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
    // methods: {
    //     onDecode(result: any) {
    //         // Send the result (ticket ID) to your server
    //         this.verifyTicket(result);
    //     },
    //     verifyTicket(ticketId: string) {
    //         console.log(ticketId);
    //         // Make an API call to your backend to check if the ticket exists
    //         // and perform necessary actions
    //         // You might want to use a Vuex store to manage state and communicate
    //         // between components.
    //     },
    // },
    components: {
        QrcodeStream,
    },
    setup() {
        const something = ref<string>('');
        const verifyTicket = (ticketId: string) => {
            console.log(ticketId);
            something.value = ticketId;
        }

        const onDecode = (result: any) => {
            console.log(result)
            verifyTicket(result);
        }

        return {
            something,

            onDecode,
        }
    }
};
</script>
