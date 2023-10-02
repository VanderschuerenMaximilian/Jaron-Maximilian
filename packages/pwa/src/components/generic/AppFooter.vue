<template>
    <section v-if="$route.meta.showFooter" class="bg-primary-green text-slate-100 w-full flex md:flex-row flex-col md:justify-between justify-center md:items-start items-center md:gap-0 gap-4 sm:px-20 px-8 py-16">
        <section class="max-w-md space-y-2">
            <h2 class="h2-white">Bellewaerde</h2>
            <p class="w-48">Waar avontuur en natuur samenkomen</p>
        </section>
        <section>
            <h5 class="h5-white mb-8">Alles over ons</h5>
            <ul class="space-y-2">
                <li><RouterLink to="/map" class="hover:underline">Attracties</RouterLink></li>
                <li><RouterLink to="/map" class="hover:underline">Dieren</RouterLink></li>
                <li><RouterLink to="/map" class="hover:underline">Natuur</RouterLink></li>
                <li><RouterLink to="/map" class="hover:underline">Restaurants</RouterLink></li>
                <li><RouterLink to="/events" class="hover:underline">Evenementen</RouterLink></li>
            </ul>
        </section>
        <section class="md:w-3/12 sm:w-1/2 w-3/4">
            <h5 class="h5-white mb-8">Contact</h5>
            <section>
                <div class="space-y-2 mb-8">
                    <p>Meenseweg 497 B-8902 Ieper</p>
                    <p>+32 (0)57 46 86 86</p>
                </div>
                <RouterLink to="/contact" class="bg-slate-100 w-fit text-primary-green py-3 px-4 rounded-full
                border-2 outline-primaty-green hover:bg-primary-green transition-colors hover:text-slate-100 hover:outline-slate-100">
                    CONTACTEER ONS
                </RouterLink>
            </section>
        </section>
    </section>
</template>