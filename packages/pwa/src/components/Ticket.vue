<template>
    <section class="flex justify-between w-[600px] h-[160px] px-8 py-6 bg-white rounded-md">
        <div class="h-full">
            <h5 class="h5 mb-3">{{ ticketPrice.name }}</h5>
            <p>€ <span>{{ ticketPrice.price }}</span></p>
            <!-- {{ setAmountToNull }} -->
        </div>
        <div class="flex items-end justify-center w-1/3 gap-2">
            <button @click="removeTicket"
                class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">
                -
            </button>
            <div class="flex justify-center items-center px-3 py-2 bg-white text-primary-green">{{ count }}</div>
            <button @click="addTicket"
                class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">
                +
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
    props: ['ticketPrice', 'setAmountToNull'],
    setup(props, { emit }) {
        const count = ref<number>(0);

        const addTicket = () => {
            count.value += 1;
        };

        const removeTicket = () => {
            if (count.value > 0) {
                count.value -= 1;
            }
        };

        const handleCountChange = () => {
            const payload = {
                id: props.ticketPrice.id,
                totalPrice: props.ticketPrice,
                amount: count.value,
            };
            emit('watchCount', payload);

            if (props.setAmountToNull) {
                count.value = 0;
                emit('setAmountToNull', false);
            }
        };

        watch(() => props.setAmountToNull,
            (newVal) => {
                // console.log('setAmountToNull in child', newVal);
                if (newVal) handleCountChange();
            },
            { immediate: true }
        );

        watch(count, (value) => {
            handleCountChange();
        });

        return {
            count,

            addTicket,
            removeTicket,
        };
    },
};
</script>
