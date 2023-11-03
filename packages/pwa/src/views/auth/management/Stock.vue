<template>
    <main v-if="firebaseUser" class="flex flex-col pl-20 pr-4 pt-12 bg-slate-100 flex-1 rounded-l-3xl h-screen overflow-y-auto">
        <DashboardTitle currentRoute="Stocks" />
        <section class="flex justify-between mb-5 w-19/20">
            <select class="px-2 mt-2 border-3 border-primary-green bg-slate-100 text-primary-green font-medium hover:border-green-900 rounded-md cursor-pointer h-10">
                <option>Boomerang Snack</option>
                <option>Boomerang Snack</option>
                <option>Boomerang Snack</option>
                <option>Boomerang Snack</option>
                <option>Boomerang Snack</option>
            </select>
            <button class="px-2 mt-2 border-3 border-primary-green text-primary-green font-medium hover:border-green-900 rounded-md cursor-pointer h-10">Refill everything</button>
        </section>
        <section v-for="stock in stocks" class=" w-19/20">
            <table class="min-w-full text-center select-none mb-10">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">No</th>
                        <th class="py-2 px-4 border-b">Ingredient</th>
                        <th class="py-2 px-4 border-b">Price</th>
                        <th class="py-2 px-4 border-b">Shop stock</th>
                        <th class="py-2 px-2 border-b">Bellewaerde stock</th>
                        <th class="py-2 px-4 border-b">Change shop stock</th>
                        <th class="py-2 px-4 border-b">Fill shop stock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in stock" :key="index" :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'">
                        <td class="py-4 px-4">{{ index + 1 }}</td>
                        <td class="py-4 px-4 text-center">{{ item.name }}</td>
                        <td class="py-4 px-4">{{ "€ " + parseFloat(item.price).toFixed(2) }}</td>
                        <td class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full" :style="{ width: (item.stock / item.maxStock) * 100 + '%', background: calculateColor(item.stock, item.maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{ item.stock + ' ' + item.unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ item.maxStock }}</span></p>
                            </div>
                        </td>
                        <td class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full" :style="{ width: (item.stock / item.maxStock) * 100 + '%', background: calculateColor(item.stock, item.maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{ item.stock + ' ' + item.unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ item.maxStock }}</span></p>
                            </div>
                        </td>
                        <td class="py-4 px-4 flex justify-center">
                            <div class="flex items-center">
                                <input type="number" v-model="selectedStocks[item.name]" :min="item.stock" :max="item.maxStock" step="10" class="w-20 bg-white pl-3 py-1 rounded-l-lg">
                                <button @click="changeStock(item)" class="w-22 py-1 bg-primary-green text-center rounded-r-lg font-medium text-white">Change</button>
                            </div>
                        </td>
                        <td class="px-4">
                            <button class="bg-primary-green p-2 rounded-lg font-medium text-white">Refill Stock</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
</template>
<style>
.c-employees::-webkit-scrollbar {
    width: 4px;
}

.c-employees::-webkit-scrollbar-thumb {
    background: #c3c5c8;
    border-radius: 25px;
}
</style>
<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import {  
    ALL_STOCKS,
 } from '@/graphql/Stock.query'
import { ChevronDown } from 'lucide-vue-next'
import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'

import useFirebase from '@/composables/useFirebase'
import { ref, watchEffect } from 'vue'

const { firebaseUser } = useFirebase()

export default {
    components: {
    DashboardTitle,
},
methods: {
    calculateColor(stock: number, maxStock: number) {
        const sectionSize = maxStock / 3;
        const section = Math.floor(stock / sectionSize);
        if (section === 0) {
            return '#FF000080';
        } else if (section === 1) {
            return '#FFA50080';
        } else {
            return '#00800080';
        }
    },
    
    changeStock(item: any) {
        if (!isNaN(this.selectedStocks[item.name]) && this.selectedStocks[item.name] >= item.stock && this.selectedStocks[item.name] <= item.maxStock) {
            console.log(`Changing stock for ${item.name} to ${this.selectedStocks[item.name]}`);
        } else {
            console.error(`Invalid stock value for ${item.name}`);
        }
    },
    },
    setup() {
        const { loading: stocksLoading, result: stocks, error: stocksError } = useQuery(ALL_STOCKS)
        const selectedStocks = ref<any>({})

        watchEffect(() => {
            if (stocks && stocks.value) {
                for (const stock of stocks.value.stocks) {
                    selectedStocks.value[stock.name] = stock.stock;
                }
            }
        });
        
        return {
            stocksLoading,
            stocks,
            stocksError,
            firebaseUser,
            selectedStocks
        }
    }   
}
</script>

<style>
  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #F1F5F9;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #00733C;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00733C;
}
</style>
