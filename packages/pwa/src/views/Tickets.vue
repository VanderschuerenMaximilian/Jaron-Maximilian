<template>
    <main class="w-full min-h-screen flex pt-[70px]">
        <h2 class="h2 z-50 absolute lg:left-1/6 left-1/2 -translate-x-1/2 top-24">Tickets</h2>
        <section v-if="!chooseDate" class="w-full flex lg:flex-row flex-col lg:items-stretch items-center lg:gap-0 gap-4">
            <section class="sm:w-3/4 w-full h-full sm:pl-8 sm:px-8 px-4 space-y-8 mt-36">
                <div class="flex flex-col gap-4">
                    <div v-if="ticketPriceLoading" class="flex flex-col gap-4 items-center">
                        <div v-for="ticket in loadingTickets" class="w-[600px] h-[160px] rounded-md bg-gray-200 animate-pulse">
                        </div>
                    </div>
                    <div class="flex justify-center" v-else v-for="ticket in result?.ticketPrices">
                        <Ticket :ticketPrice="ticket"/>
                    </div>
                </div>
            </section>
            <aside class="h-full lg:bg-slate-200 bg-slate-100 flex flex-col py-1 lg:w-fit w-full">
                <h3 class="h3 text-center mt-8 lg:block hidden">{{ $t('tickets.yourtickets') }}</h3>
                <div v-if="toPay > 0" class="lg:flex hidden flex-col items-center scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 w-full" ref="scrollContainer">
                    <SoldTicket v-for="soldTicket of soldTickets" :soldTicket="soldTicket"/>
                </div>
                <div v-else class="lg:block hidden">
                    <p class="text-center mt-8">{{ $t('tickets.notickets') }}</p>
                </div>

                <div class="mt-auto p-6 flex flex-col items-center">
                    <hr class="border-t-2 border-dotted border-black">
                    <div class="flex justify-between font-bold py-4 lg:px-0 px-12 lg:w-3/4 sm:w-1/2 w-full">
                        <p>{{ $t('tickets.total') }}</p>
                        <p>{{ "€ " + toPay }}</p>
                    </div>
                    <button @click="goToDate" :disabled="!isTickets" class="button-focus sm:w-90 w-72 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-secondary-green disabled:bg-opacity-60 disabled:cursor-not-allowed">{{ $t('tickets.next') }}</button>
                </div>
            </aside>
        </section>
        <section v-else class="mt-36 w-full flex justify-center">
            <button @click="returnToTickets" class="button-focus rounded-full absolute left-12 top-25 scale-150 cursor-pointer hover:scale-[180%] transition-transform">
                <MoveLeft />
            </button>
            <form @submit.prevent="handleCheckOut" class="flex flex-col items-center justify-between sm:w-fit w-84 h-3/4 bg-white py-8 px-6 rounded-md">

                <div class="flex flex-col w-full">
                    <label for="usableOn">{{ $t('tickets.date.label') }}</label>
                    <input type="date" name="usableOn" id="usableOn" v-model="newTicketData.usableOn" class="button-focus bg-light-slate sm:w-[498px] w-full py-2 px-3 rounded-md" :class="{ 'border-red-500 border-2': errorFields?.usableOn }">
                    <p v-if="errorFields?.usableOn && errorFields?.usableOn[0].fieldValue" class="text-red-500 text-sm">{{ errorFields.usableOn[0].message }}</p>
                </div>

                <div class="flex flex-col sm:w-fit w-full">
                    <lable for="email">{{ $t('tickets.email.label') }}</lable>
                    <input type="email" name="email" id="email" v-model="newTicketData.email" :placeholder="$t('tickets.email.placeholder')" class="button-focus bg-light-slate sm:w-[498px] w-full py-2 px-3 rounded-md" :class="{ 'border-red-500 border-2': errorFields?.email }">
                    <p v-if="errorFields?.email && errorFields?.email[0].fieldValue" class="text-red-500 text-sm">{{ errorFields?.email[0].message }}</p>
                    <p v-if="errorFields?.email && !errorFields?.email[0].fieldValue" class="text-red-500 text-sm">{{ errorFields?.email[0].message }}</p>
                </div>

                <button type="submit" :disabled="!pass" class="button-focus sm:w-90 w-full h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-opacity-60">
                    <Loader2 v-if="loading" class="w-6 h-6 text-slate-100 animate-spin mx-auto"/>
                    <span v-else>{{ $t('tickets.checkout') }}</span>
                </button>
            </form>
        </section>
    </main>
</template>
<script lang="ts">
import { ref, watchEffect } from 'vue';
import { X, MoveLeft, Loader2 } from 'lucide-vue-next';
import { CREATE_TICKETS } from '@/graphql/ticket.mutation';
import { useMutation } from '@vue/apollo-composable';
import Ticket from '@/components/Ticket.vue';
import SoldTicket from '@/components/SoldTicket.vue';
import useCustomPerson from '@/composables/useCustomPerson';
import useTicketPurchase from '@/composables/useTicketPurchase';
import { RouterLink } from 'vue-router';
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import router from '@/bootstrap';

export default {
    components: {
        Ticket,
        SoldTicket,
        X,
        Loader2,
        MoveLeft,
        RouterLink,
    },
    setup() {
        const newTicketData = ref({
            usableOn: new Date().toISOString().split('T')[0],
            email: undefined,
        })
        const rules: Rules = {
            usableOn: {
                type: 'date',
                required: true,
                validator(rule, value, callback) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const inputDate = new Date(value);
                    if (inputDate < today) {
                        callback(new Error('You can\'t select a date in the past'));
                    } 
                    else {
                        callback();
                    }
                },
            },
            email: {
                type: 'email',
                required: true,
                validator(rule, value, callback) {
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
                        callback();
                    }
                    if (value === undefined) {
                        callback(new Error('Please enter an email address'));
                    }
                    else {
                        callback(new Error('Please enter a valid email address'));
                    }
                },
            },
        }
        const { pass, errorFields } = useAsyncValidator(newTicketData, rules)
        const { customPerson } = useCustomPerson();
        const { calcTotalPrice, soldTickets, result, ticketPriceLoading, isTickets, toPay } = useTicketPurchase();
        const loadingTickets = ref<number[]>([1,2])
        const chooseDate = ref<boolean>(false);
        const { mutate, loading, onDone } = useMutation(CREATE_TICKETS)

        watchEffect(() => {
            if (soldTickets) {
                calcTotalPrice();
            }
        });

        const handleDeleteTicketAmount = () => {
            soldTickets.value.map((ticket: any) => {
                ticket.amount = 0;
            });
        };

        const goToDate = () => {
            chooseDate.value = true;
        }

        const returnToTickets = () => {
            chooseDate.value = false;
        }

        const handleCheckOut = async () => {
            const tickets = ref<any>([]);
            soldTickets.value.map((ticket: any) => {
                for (let i = 0; i < ticket.amount; i++) {
                    tickets.value.push({
                        name: ticket.name,
                        price: ticket.price,
                        personId: customPerson.value?.id,
                        confimationEmail: newTicketData.value.email,
                        usableOn: newTicketData.value.usableOn, 
                    });
                }
            })
            
            mutate({
                ticketsInput: tickets.value,
            })
                
            soldTickets.value.map((ticket: any) => {
                ticket.amount = 0;
            });
        };

        onDone(() => {
            setTimeout(() => {
                if (customPerson.value) router.push(`/auth/visitor/${customPerson.value?.id}/mytickets`);
                else router.push('/')
            }, 1000);
        });

        return {
            chooseDate,
            customPerson,
            errorFields, 
            isTickets,
            loading,
            loadingTickets,
            newTicketData,
            pass,
            result,
            soldTickets,
            ticketPriceLoading,
            toPay,

            goToDate,
            handleCheckOut,
            handleDeleteTicketAmount,
            returnToTickets,
        };
    },
};
</script>