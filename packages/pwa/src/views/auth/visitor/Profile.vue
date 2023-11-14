<template v-if="customPerson">
    <!-- TODO: add the alert(s) the person has made -->
    <main class="pt-[70px] pl-8 space-y-8">
        <h2 class="h2 mt-8">Your Tickets</h2>
        <div v-if="loading">
            <div v-for="ticket in loadingTickets" class="w-[600px] h-[160px] rounded-md bg-gray-200 animate-pulse">
            </div>
        </div>
        <div v-else class="flex justify-center w-full">
            <div class="space-y-4 h-[450px] overflow-y-scroll px-1">
                <OwnedTicket :ticket="ticket" v-for="ticket in result.ticketsByPersonId" />
            </div>
        </div>
        </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import { GET_TICKETS_BY_PERSON_ID } from '@/graphql/ticket.query';
import { useQuery } from '@vue/apollo-composable';
import useCustomPerson from '@/composables/useCustomPerson';
import OwnedTicket from '@/components/OwnedTicket.vue';

export default {
    components: {
        OwnedTicket,
    },
    setup() {
        const { customPerson } = useCustomPerson();
        const { result, loading } = useQuery(GET_TICKETS_BY_PERSON_ID, () => ({
            personId: customPerson.value?.id,
        }));
        const loadingTickets = ref<number[]>([1, 2])

        return {
            customPerson,
            loadingTickets,
            result,
            loading,
        }
    }
}
</script>