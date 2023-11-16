<template>
    <main class="w-full min-h-screen flex pt-[70px]">
        <h2 class="h2 z-50 absolute left-24 top-24">Tickets</h2>
        <div v-if="!customPerson" class="absolute z-50 left-5/12 transform -translate-x-1/2 top-24">
            <div class="border-2 border-red-600 bg-red-500 bg-opacity-25 py-3 px-6 rounded-md max-w-lg flex flex-col gap-2">
                <p class="text-red-600 font-semibold">You are not logged in! To be able to buy tickets please <RouterLink to="/login" class="underline cursor-pointer hover:font-extrabold">log in</RouterLink>.</p>
                <RouterLink to="register" class="text-red-600 text-sm hover:underline cursor-pointer w-fit">Don't have an account?</RouterLink>
            </div>
        </div>
        <section v-if="!chooseDate" class="w-full flex">
            <section class="w-3/4 h-full pl-8 space-y-8 mt-36">
                <div class="flex flex-col gap-4">
                    <div v-if="ticketPriceLoading" class="flex flex-col gap-4 items-center">
                        <div v-for="ticket in loadingTickets" class="w-[600px] h-[160px] rounded-md bg-gray-200 animate-pulse">
                        </div>
                    </div>
                    <div class="flex justify-center" v-else v-for="ticket in result.ticketPrices">
                        <Ticket :ticketPrice="ticket"/>
                    </div>
                </div>
            </section>
            <aside>
                        <div class=" w-100 h-full bg-slate-200 flex flex-col py-1">
                            <h3 class="h3 text-center mt-8">Your Tickets</h3>
                            <div v-if="toPay > 0" class="flex flex-col scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 mx-auto" ref="scrollContainer">
                                <div v-for="soldTicket of soldTickets">
                                    <SoldTicket :soldTicket="soldTicket"/>
                                </div> 
                            </div>
                            <div v-else class="">
                                <p class="text-center mt-8">No items in cart</p>
                            </div>

                            <div class="mt-auto p-6">
                            <hr class="border-t-2 border-dotted border-black">
                            <div class="flex justify-between font-bold py-4">
                                <p>Total:</p>
                                <p>{{ "€ " + toPay }}</p>
                            </div>
                            <button @click="goToDate" class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900">Next</button>
                            <p v-if="!isTickets" class="absolute right-20 text-red-600 font-medium select-none">There are no tickets selected.</p> 
                        </div>
                    </div>
            </aside>
        </section>
        <section v-else class="mt-36 w-full flex justify-center">
            <MoveLeft @click="returnToTickets" class="absolute left-12 top-25 scale-150 cursor-pointer"/>
            <form @submit.prevent="handleCheckOut" class="flex flex-col items-center justify-between w-fit h-3/4 bg-white py-8 px-6 rounded-md">
                <div class="flex flex-col">
                    <label for="usableOn">Please select the day you want to visit</label>
                    <input type="date" name="usableOn" id="usableOn" v-model="newTicketData.usableOn" class="bg-[#E7E7E7] w-[498px] py-2 px-3 rounded-md" :class="{ 'border-red-500': errorFields?.usableOn }">
                    <p v-if="errorFields?.description && errorFields?.description[0].fieldValue" class="text-red-500 text-sm">{{ errorFields.description[0].message }}</p>
                </div>

                <div class="flex flex-col">
                    <lable for="email">Your email to update you?</lable>
                    <input type="email" name="email" id="email" v-model="newTicketData.email" placeholder="example@email.com" class="bg-[#E7E7E7] w-[498px] py-2 px-3 rounded-md" :class="{ 'border-red-500': errorFields?.email }">
                    <p v-if="errorFields?.description && errorFields?.description[0].fieldValue" class="text-red-500 text-sm">{{ errorFields.description[0].message }}</p>
                </div>

                <button type="submit" :disabled="!customPerson && !pass" class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900 disabled:cursor-not-allowed disabled:hover:bg-opacity-60">
                    <Loader2 v-if="loading" class="w-6 h-6 text-slate-100 animate-spin"/>
                    <span v-else>Checkout</span>
                </button>
            </form>
        </section>
    </main>
</template>
<script lang="ts">
import { ref, watchEffect } from 'vue';
import { X, MoveLeft } from 'lucide-vue-next';
import { CREATE_TICKETS } from '@/graphql/ticket.mutation';
import { useMutation } from '@vue/apollo-composable';
import Ticket from '@/components/Ticket.vue';
import SoldTicket from '@/components/SoldTicket.vue';
import useCustomPerson from '@/composables/useCustomPerson';
import useTicketPurchase from '@/composables/useTicketPurchase';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { RouterLink } from 'vue-router';
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import router from '@/bootstrap';

export default {
    components: {
        Ticket,
        SoldTicket,
        X,
        MoveLeft,
        RouterLink,
    },
    setup() {
        const newTicketData = ref({
            usableOn: new Date(),
            email: '',
        })
        const rules: Rules = {
            usableOn: {
                type: 'date',
                required: true,
            },
            email: {
                type: 'email',
                required: true,
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
            if (customPerson.value) {
                const tickets = ref<any>([]);
                soldTickets.value.map((ticket: any) => {
                    for (let i = 0; i < ticket.amount; i++) {
                        const qrCode = useQRCode(`https://aa59-178-51-40-7.ngrok-free.app/ticket_detail?id=${customPerson.value?.id}&ticketId=${ticket.id}`, {
                            size: 200,
                            level: 'M',
                            margin: 0,
                            color: '#000000',
                            background: '#ffffff',
                            mime: 'image/png',
                        })
                        
                        tickets.value.push({
                            name: ticket.name,
                            price: ticket.price,
                            personId: customPerson.value?.id,
                            qrCode: qrCode,
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
            }
        };

        onDone((result) => {
            console.log(result);
            router.push(`/auth/visitor/${customPerson.value?.id}`);
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