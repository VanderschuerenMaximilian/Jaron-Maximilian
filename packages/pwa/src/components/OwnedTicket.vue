<template>
    <section @click="openPopUp" class="flex sm:flex-row flex-col sm:items-start items-center justify-between sm:w-[600px] w-fit sm:h-[160px] h-[320px] px-8 py-6 bg-white rounded-md hover:cursor-pointer">
            <div class="">
                <h5 class="h5 mb-3 sm:text-start text-center">{{ ticket.name }}</h5>
                <p class="sm:text-start text-center">Valid on: <span class="font-semibold">{{ usableDate }}</span></p>
            </div>
            <div class="sm:w-[100px] w-full h-full flex items-center justify-center"> 
                <img :src="ticket.qrCode" alt="QrCode of the ticket">
            </div>
    </section>
    <div v-if="showPopUp" class="z-50 absolute w-full h-[97.8%] top-0 left-0 bg-black bg-opacity-60 flex justify-center items-center">
        <div class="flex flex-col gap-4 justify-center items-end p-5 bg-black w-fit rounded-xl">
            <div class="cursor-pointer rounded-full p-2 hover:bg-slate-100 hover:bg-opacity-30 transition-colors">
                <X @click="closePopUp" class="scale-125 text-slate-100"/>
            </div>
            <div class="sm:min-w-[400px] sm:h-[400px] h-[300px] bg-white p-1 rounded-lg">
                <img :src="ticket.qrCode" alt="QrCode of the ticket"
                class="w-full h-full">
            </div>
            <div class="w-full flex flex-col justify-center items-center">
                <h5 class="h4 text-slate-100">{{ ticket.name }}</h5>
                <p class="text-xs text-slate-100">{{ ticket.id }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';
export default {
    props: ['ticket'],
    components: {
        X,
    },
    setup(props) {
        const ticket = ref(props.ticket);
        const showPopUp = ref<boolean>(false);
        const handleExpireDate = (inputDateString: string) => {
            const inputDate = new Date(inputDateString);

            // Date options (English month)
            const dateOptions = { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' };
            const dateString = inputDate.toLocaleDateString('en-US', dateOptions as Intl.DateTimeFormatOptions);

            // Time options
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Paris' };
            const timeString = inputDate.toLocaleTimeString('en-US', timeOptions as Intl.DateTimeFormatOptions);

            return dateString;
        }

        const openPopUp = () => {
            showPopUp.value = true;
        }

        const closePopUp = () => {
            showPopUp.value = false;
        }

        const usableDate = ref<String>(handleExpireDate(ticket.value.usableOn));

        return {
            usableDate,
            showPopUp,
            ticket,

            closePopUp,
            openPopUp,
        }
    }
}
</script>