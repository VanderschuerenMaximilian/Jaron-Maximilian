<template v-if="soldTicketChange">
    <section class="flex justify-between w-[600px] h-[160px] px-8 py-6 bg-white rounded-md">
        <div class="h-full flex flex-col justify-between">
            <div>
                <h5 class="h5 mb-1">{{ ticketPrice.name }}</h5>
                <p class="opacity-70 text-sm">{{ showHeightRequirement() }}</p>
            </div>
            <p>€ <span>{{ ticketPrice.price }}</span></p>
        </div>
        <div class="flex items-end justify-center w-1/3 gap-2">
            <button @click="removeTicket"
                class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">
                -
            </button>
            <div class="flex justify-center items-center px-3 py-2 bg-white text-primary-green">{{ soldTicketChange?.amount }}</div>
            <button @click="addTicket"
                class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">
                +
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { computed } from 'vue';
import useTicketPurchase from '@/composables/useTicketPurchase';
import type { TicketPurchase as ITicketPurchase } from '@/interfaces/ITicketPurchase';

export default {
    props: ['ticketPrice'],
    setup(props) {
        const { soldTickets } = useTicketPurchase();
        
        const soldTicketChange = computed(() => {
            return soldTickets.value.find((ticket: ITicketPurchase) => ticket.id === props.ticketPrice.id);
        });

        const addTicket = () => {
            soldTickets.value.map((ticket: ITicketPurchase) => {
                if (ticket.id === props.ticketPrice.id) {
                    ticket.amount++
                }
            });
        };

        const removeTicket = () => {
            soldTickets.value.map((ticket: ITicketPurchase) => {
                if (ticket.id === props.ticketPrice.id && ticket.amount > 0) {
                    ticket.amount--
                }
            });
        };

        const showHeightRequirement = () => {
            if (props.ticketPrice.maxHeight && props.ticketPrice.minHeight === null) {
                return `Smaller then ${props.ticketPrice.maxHeight} cm`;
            } else if (props.ticketPrice.minHeight && props.ticketPrice.maxHeight === null) {
                return `Taller then ${props.ticketPrice.minHeight} cm`;
            } else if (props.ticketPrice.minHeight && props.ticketPrice.maxHeight) {
                return `${props.ticketPrice.minHeight} - ${props.ticketPrice.maxHeight} cm`;
            } else {
                return 'Geen lengte vereist';
            }
        };

        return {
            soldTicketChange,

            addTicket,
            removeTicket,
            showHeightRequirement,
        };
    },
};
</script>
