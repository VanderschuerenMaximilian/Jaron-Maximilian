<template>
    <main class="w-full min-h-screen flex pt-[70px]">
        <section class="w-3/4 h-full pl-8">
            <h2 class="h2 my-8">Tickets</h2>
            <div class="flex flex-col gap-4">
                <div class="flex justify-center" v-for="ticket in ticketPrices">
                    <Ticket :ticketPrice="ticket" :setAmountToNull="setAmountToNull" @watchCount="handleWatchCount" @setAmountToNull="handleSetAmountToNull"/>
                </div>
            </div>
        </section>
                <aside>
                    <div class=" w-100 h-full bg-slate-200 flex flex-col py-1">
                        <h3 class="h3 text-center mt-8">Your Tickets</h3>
                        <div  v-if="isTickets"  class="flex flex-col scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 mx-auto" ref="scrollContainer">
                            <div v-for="soldTicket of soldTickets">
                                <div v-if="soldTicket.amount > 0" class="flex relative w-90 bg-white items-center p-4 gap-3 rounded-2xl">
                                    <div>
                                        <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Ticket</p>
                                        <p class="text-3">{{ soldTicket.name }}</p>
                                        <p class="text-3">amount: {{ soldTicket.amount }}</p>
                                        <p class="text-3 text-primary-green font-bold mt-2">{{ "€ " + soldTicket.price }}</p>
                                    </div>
                                    <X class="absolute right-4 top-4 cursor-pointer" @click="handleDeleteTicketAmount"/>
                                </div>
                            </div> 
                        </div>
                        <div v-else class="">
                            <p class="text-center mt-8">No items in cart</p>
                        </div>


                        <div class="mt-auto p-6">
                        <hr class="border-t-2 border-dotted border-black">
                        <div class="flex justify-between font-bold py-4">
                            <p>Total:</p>
                            <p>{{ "€ " + toPayPrice }}</p>
                        </div>
                        <button class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900">Chekout</button>
                        <p v-if="!isTickets" class="absolute right-20 text-red-600 font-medium select-none ">There are no tickets selected.</p> 
                        </div>
                    </div>
                    </aside>
    </main>
</template>
<script lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { X } from 'lucide-vue-next';
import { GET_TICKET_PRICES } from '@/graphql/ticket-prices';
import { useQuery } from '@vue/apollo-composable';
import Ticket from '@/components/Ticket.vue';

export default {
    components: {
        Ticket,
        X,
    },
    setup() {
        const ticketPrices = ref();
        const soldTickets = ref<any>([]);
        const toPayPrice = ref<number>(0);
        const { result } = useQuery(GET_TICKET_PRICES);
        const isTickets = ref<boolean>(false);
        const setAmountToNull = ref<boolean>(false);
        
        watch(result, (value) => {
            console.log(value.ticketPrices);
            ticketPrices.value = value.ticketPrices;

            soldTickets.value = ticketPrices.value.map((ticket: any) => {
                return {
                    id: ticket.id,
                    amount: 0,
                    price: ticket.price,
                    name: ticket.name,
                };
            });
        });

        const handleWatchCount = (payload: any) => {
            soldTickets.value.map((ticket: any) => {
                if (ticket.id === payload.id) {
                    if (payload.amount === 0) {
                        ticket.amount = 0;
                    } else if (payload.amount > ticket.amount) {
                        ticket.amount++;
                    } else if (payload.amount < ticket.amount) {
                        ticket.amount--;
                    }
                }
            });

            console.log(soldTickets.value)
        };

        const handleSetAmountToNull = (setAmountToNull: any) => {
            console.log('setAmountToNull in tickets', setAmountToNull)
            if (setAmountToNull) setAmountToNull.value = false;
        }

        const calcTotalPrice = () => {
            isTickets.value = true;
            let totalPrice = 0;
            soldTickets.value.forEach((ticket: any) => {
                totalPrice += ticket.amount * ticket.price;
            });
            toPayPrice.value = Math.round(totalPrice * 100) / 100;

            if (toPayPrice.value === 0) {
                isTickets.value = false;
            }
        };

        watchEffect(() => {
            if (soldTickets) {
                calcTotalPrice();
            }
        });

        const handleDeleteTicketAmount = () => {
            soldTickets.value.map((ticket: any) => {
                ticket.amount = 0;
            });
            setAmountToNull.value = true;
        };

        return {
            isTickets,
            setAmountToNull,
            soldTickets,
            ticketPrices,
            toPayPrice,

            handleDeleteTicketAmount,
            handleSetAmountToNull,
            handleWatchCount,
        };
    },
};

</script>