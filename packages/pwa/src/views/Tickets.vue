<template>
    <main class="w-full min-h-screen flex pt-[70px]">
        <section class="w-3/4 h-full pl-8">
            <h2 class="h2 my-8">Tickets</h2>
            <div class="flex flex-col gap-4">
                <div class="flex justify-center" v-for="ticket in ticketPrices">
                    <Ticket :ticketPrice="ticket"/>
                </div>
            </div>
        </section>
        <section class="h-min-screen w-1/4 bg-slate-300 py-12 flex flex-col justify-between items-center">
            <h3 class="h3">Your Order</h3>
            <div class="h-[250px] w-full bg-slate-200">
                Here will the order of the tickes come
            </div>
            <button class="bg-secondary-green hover:bg-primary-green transition-colors w-3/5 px-4 py-2 rounded-md text-slate-100">Order</button>
        </section>
    </main>
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import { GET_TICKET_PRICES } from '@/graphql/ticket-prices';
import { useQuery } from '@vue/apollo-composable';
import Ticket from '@/components/Ticket.vue';

export default {
    components: {
        Ticket,
    },
    setup() {
        const ticketPrices = ref();
        const { result } = useQuery(GET_TICKET_PRICES);
        
        watch(result, (value) => {
            console.log(value.ticketPrices);
            ticketPrices.value = value.ticketPrices;
        });

        return {
            ticketPrices,
        };
    },
};


</script>