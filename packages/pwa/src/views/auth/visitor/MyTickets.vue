<template v-if="customPerson">
    <main class="pt-[70px] min-h-screen flex sm:pl-8 px-4">
        <h2 class="h2 absolute top-24">{{ customPerson?.fullName }}</h2>
        <template v-if="loading">
            <section class="flex flex-col items-center justify-center w-full gap-3">
                <div class="space-y-4 sm:h-[450px] h-[500px] overflow-y-scroll px-1">
                    <div v-for="ticket in loadingTickets" class="w-[600px] h-[160px] rounded-md bg-gray-200 animate-pulse">
                    </div>
                </div>
            </section>
        </template>
        <template v-else>
            <section class="flex flex-col items-center justify-center w-full gap-3">
                <template v-if="myTickets && myTickets.length > 0">
                    <div class="space-y-4 sm:h-[450px] h-[500px] overflow-y-scroll px-1">
                        <OwnedTicket :ticket="ticket" v-for="ticket in myTickets" />
                    </div>
                </template>
                <template v-else>
                    <h5 class="h5">{{ $t('tickets.notickets') }}</h5>
                </template>
            </section>
        </template>
    </main>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { GET_TICKETS_BY_PERSON_ID } from '@/graphql/ticket.query';
import { ADDED_TICKETS } from '@/graphql/ticket.subscription';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import useCustomPerson from '@/composables/useCustomPerson';
import OwnedTicket from '@/components/OwnedTicket.vue';
import type { Ticket as ITicket } from '@/interfaces/ITicket';

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
        const myTickets = ref<ITicket[] | undefined>([]);

        watch(loading, () => {
            myTickets.value = result.value?.ticketsByPersonId;
        }, { immediate: true });

        watch(addedTickets, (data) => {
            if (data) {
                const tickets = data.ticketsAdded;
                tickets.map((ticket: ITicket) => {
                    if (myTickets.value) {
                        myTickets.value.push(ticket);
                    }
                });
            }
        })

        return {
            customPerson,
            loading,
            loadingTickets,
            myTickets,
        }
    }
}
</script>