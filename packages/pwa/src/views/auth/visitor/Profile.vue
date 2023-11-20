<template v-if="customPerson">
    <!-- TODO: add the alert(s) the person has made -->
    <main class="pt-[70px] sm:pl-8 px-4 space-y-8">
        <h2 class="h2 mt-8">Your Tickets</h2>
        <div v-if="loading">
            <div v-for="ticket in loadingTickets" class="w-[600px] h-[160px] rounded-md bg-gray-200 animate-pulse">
            </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-full gap-3">
            <div v-if="newTickets.length > 0" class="max-w-2xl">
                <h3 class="h3-green mb-4 text-center">New Tickets!</h3>
                <div class="flex justify-center gap-2 w-1/2 h-fit">
                    <OwnedTicket :ticket="ticket" v-for="ticket in newTickets" />
                </div>
            </div>
            <div class="space-y-4 sm:h-[450px] h-[550px] overflow-y-scroll px-1">
                <OwnedTicket :ticket="ticket" v-for="ticket in myTickets" />
            </div>
        </div>
        </main>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { GET_TICKETS_BY_PERSON_ID } from '@/graphql/ticket.query';
import { ADDED_TICKETS } from '@/graphql/ticket.subscription';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import useCustomPerson from '@/composables/useCustomPerson';
import OwnedTicket from '@/components/OwnedTicket.vue';
import type { ITicket } from '@/interfaces/ITicket';

export default {
    components: {
        OwnedTicket,
    },
    
    setup() {
        const { customPerson } = useCustomPerson();
        const loadingTickets = ref<number[]>([1, 2])
        const { result, loading } = useQuery(GET_TICKETS_BY_PERSON_ID, () => ({
            personId: customPerson.value?.id,
        }));
        const { result: addedTickets } = useSubscription(ADDED_TICKETS, () => ({
            personId: customPerson.value?.id,
        }));
        const myTickets = computed(() => {
            return result.value?.ticketsByPersonId;
        });
        const newTickets = ref<ITicket[]>([]);

        watch(addedTickets, (data) => {
            setTimeout(() => {
                const tickets = data.ticketsAdded;
                tickets.map((ticket: ITicket) => {
                    newTickets.value.push(ticket);
                });
                console.log(newTickets.value);
            }, 3000);
        })

        return {
            customPerson,
            loading,
            loadingTickets,
            myTickets,
            newTickets,
        }
    }
}
</script>