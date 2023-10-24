<template>
    <main class="w-full min-h-screen flex pt-[70px]">
        <section class="w-3/4 h-full pl-8">
            <h2 class="h2 my-8">Tickets</h2>
            <div class="flex flex-col gap-4">
                <!-- components -->
                <div class="flex justify-between w-[600px] h-[320px] px-8 py-6">
                    <div class="h-full">
                        <h5 class="h5 mb-3">Adult Ticket</h5>
                        <p><span>24.99</span>$</p>
                    </div>
                    <div class="flex items-center justify-center w-1/3 gap-2">
                        <button
                            class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">-</button>
                        <div class="flex justify-center items-center px-3 py-2 bg-white text-primary-green">2</div>
                        <button
                            class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">+</button>
                    </div>
                </div>
                <div class="flex justify-between w-[600px] h-[320px] px-8 py-6">
                    <div class="h-full">
                        <h5 class="h5 mb-3">Kid Ticket</h5>
                        <p><span>13.99</span>$</p>
                    </div>
                    <div class="flex items-center justify-center w-1/3 gap-2">
                        <button
                            class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">-</button>
                        <div class="flex justify-center items-center px-3 py-2 bg-white text-primary-green">1</div>
                        <button
                            class="flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-green hover:bg-primary-green transition-colors text-slate-100">+</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="h-full w-1/4 bg-slate-300 py-12 flex flex-col justify-between items-center">
            <h3 class="h3">Your Order</h3>
            <div class="h-[250px] w-full bg-slate-200">
                Here will the order of the tickes come
            </div>
            <button class="bg-secondary-green hover:bg-primary-green transition-colors px-4 py-2 rounded-md">Order</button>
        </section>
    </main>
</template>