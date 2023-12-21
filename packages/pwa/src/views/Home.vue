<template>
    <main class="pt-[70px] min-h-screen">
        <section class="relative w-full flex items-center justify-center">
            <div class="absolute z-10 space-y-4 flex flex-col justify-center items-center">
                <h1 class="md:text-6xl text-5xl font-bold text-slate-100 text-center">Welkom bij Bellewaerde</h1>
                <h3 class="md:text-3xl text-2xl text-slate-100 text-center">Waar Avontuur en Natuur Samenkomen</h3>
                <RouterLink to="/tickets" class="bg-primary-green text-xl font-bold w-fit text-slate-100 py-3 px-12 rounded-full
                transition-colors hover:bg-secondary-green
                focus:outline-none focus:ring-slate-100 focus:ring-2 focus:ring-offset-4 focus:ring-offset-primary-green focus:shadow-xl">
                        Koop Ticket
                </RouterLink>
            </div>
            <picture class="relative w-full h-[92vh] flex">
                <div class="absolute w-full h-full bg-black bg-opacity-35"></div>
                <img class="lg:w-full object-cover" src="../assets/home_page.jpg" alt="Home page image" />
            </picture>
        </section>
    </main>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    components: {
        RouterLink,
    },
    setup() {
        return {};
    },
};
</script>