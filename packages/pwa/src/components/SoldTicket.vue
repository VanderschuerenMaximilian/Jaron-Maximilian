<template>
    <div v-if="soldTicket.amount > 0" class="flex relative sm:w-3/4 w-72 bg-white items-center p-4 gap-3 rounded-2xl">
        <div>
            <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Ticket</p>
            <p class="text-3">{{ soldTicket.name }}</p>
            <p class="text-3">{{ $t('tickets.amount') }}: {{ soldTicket.amount }}</p>
            <p class="text-3 text-primary-green font-bold mt-2">{{ "€ " + soldTicket.price }}</p>
        </div>
        <button @click="handleDeleteTicketAmount" class="p-1 rounded-full hover:bg-gray-100 absolute right-4 top-4 cursor-pointer">
            <X/>
        </button>
    </div> 
</template>

<script lang="ts">
import useTicketPurchase from '@/composables/useTicketPurchase';
import { X } from 'lucide-vue-next';

export default {
    props: ['soldTicket'],
    components: {
        X,
    },
    setup(props) {
        const { soldTickets } = useTicketPurchase();
        const handleDeleteTicketAmount = () => {
            soldTickets.value.map((ticket) => {
                if (ticket.id === props.soldTicket.id && ticket.amount > 0) {
                    ticket.amount = 0;
                }
            });
        };

        return {
            handleDeleteTicketAmount,
        };
    },
};
</script>
