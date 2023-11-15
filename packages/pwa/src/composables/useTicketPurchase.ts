import { GET_TICKET_PRICES } from "@/graphql/ticket-price.query";
import type { ITicketPrices } from "@/interfaces/ITicketPrices";
import type { ITicketPurchase } from "@/interfaces/ITicketPurchase";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";

const soldTickets = ref<ITicketPurchase[]>([]);
const toPay = ref<number>(0);
const isTickets = ref<boolean>(false);

export default () => {
    const { result, loading: ticketPriceLoading } = useQuery(GET_TICKET_PRICES);
    
    if (result.value) {
        soldTickets.value = result.value.ticketPrices.map((ticket: ITicketPrices) => {
            return {
                id: ticket.id,
                amount: 0,
                price: ticket.price,
                name: ticket.name,
            };
        });
    }

    const calcTotalPrice = () => {
        isTickets.value = true;
        let totalPrice = 0;
        soldTickets.value.forEach((ticket: ITicketPurchase) => {
            totalPrice += ticket.amount * ticket.price;
        });
        const price = Math.round(totalPrice * 100) / 100;

        if (price === 0) {
            isTickets.value = false;
        }

        toPay.value = price;
    };
    
    
    return {
        soldTickets,
        result,
        ticketPriceLoading,
        isTickets,
        toPay,

        calcTotalPrice,
    }
}