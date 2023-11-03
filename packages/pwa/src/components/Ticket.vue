<template>
    <section class="flex justify-between w-[600px] h-[160px] px-8 py-6 bg-white rounded-md">
        <div class="h-full">
            <h5 class="h5 mb-3">{{ ticketPrice.name }}</h5>
            <p><span>{{ ticketPrice.price }}</span>$</p>
        </div>
        <div class="flex items-end justify-center w-1/3 gap-2">
            <button
                class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">-</button>
            <div class="flex justify-center items-center px-3 py-2 bg-white text-primary-green">2</div>
            <button
                class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">+</button>
        </div>
    </section>
</template>
<script lang="ts">
    export default {
        props: ['ticketPrice'],
        components: {
        },
        setup() {
            return {
            };
        },
    };
</script>