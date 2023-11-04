<template>
    <main v-if="firebaseUser" class="flex flex-col pl-20 pr-4 pt-12 bg-slate-100 flex-1 rounded-l-3xl h-screen overflow-y-auto">
        <DashboardTitle currentRoute="Stocks" />
        <section class="flex justify-between mb-5 w-19/20">
            <select v-model="selectedFacility" v-for="facility in facilityNames" @change="handleFacilityChange(selectedFacility)" class="px-2 mt-2 border-3 border-primary-green bg-slate-100 text-primary-green font-medium hover:border-green-900 rounded-md cursor-pointer h-10">
                <option v-for="item in facility" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>
            <button class="px-2 mt-2 border-3 border-primary-green text-primary-green font-medium hover:primary-green rounded-md cursor-pointer h-10 hover:bg-primary-green hover-text-white">Refill everything</button>
        </section>
        <section v-for="stock in stocks" class=" w-19/20">
            <table class="min-w-full text-center mb-10">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">No</th>
                        <th class="py-2 px-4 border-b">Ingredient</th>
                        <th class="py-2 px-4 border-b">Price</th>
                        <th v-if="selectedFacility !== 'Main Stock'" class="py-2 px-4 border-b">Shop stock</th>
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
                        <td v-if="selectedFacility !== 'Main Stock'" class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full opacity-30" :style="{ width: (checkedStocks[item.name] / item.maxStock) * 100 + '%', background: calculateColor(checkedStocks[item.name], item.maxStock) }"></div>
                                    <div class="absolute h-full" :style="{ width: (checkedStocks[item.name] / item.maxStock) * 100 + '%', background: calculateColor(item.stock, item.maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{ checkedStocks[item.name] + ' ' + item.unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ item.maxStock }}</span></p>
                            </div>
                        </td>
                        <td v-if="selectedFacility === 'Main Stock'" class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full opacity-30" :style="{ width: (checkedStocks[item.name] / mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock) * 100 + '%', background: calculateColor(checkedStocks[item.name], mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock) }"></div>
                                    <div class="absolute h-full" :style="{ width: (mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock / mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock) * 100 + '%', background: calculateColor(mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock, mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{checkedStocks[item.name] + ' ' + mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock }}</span></p>
                            </div>                            
                        </td>
                        <td v-else class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full" :style="{ width: ((mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock - checkedStocks[item.name]) / mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock) * 100 + '%', background: calculateColor((mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock) - checkedStocks[item.name], mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{(mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock - checkedStocks[item.name]) + ' ' + mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].maxStock }}</span></p>
                            </div>  
                        </td>
                        <td class="py-4 px-4 flex justify-center">
                            <div class="flex items-center">
                                <div v-if="selectedFacility !== 'Main Stock'">
                                    <input v-if="item.maxStock >= mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock" type="number" v-model="selectedStocks[item.name]" :min="item.stock" :max="mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock" step="100" class="w-20 bg-white pl-3 py-1 rounded-l-lg" :class="mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock - selectedStocks[item.name] >= 0 && item.stock <= selectedStocks[item.name]?'':'text-red-500'">
                                    <input v-else type="number" v-model="selectedStocks[item.name]" :min="item.stock" :max="item.stock" step="100" class="w-20 bg-white pl-3 py-1 rounded-l-lg" :class="selectedStocks[item.name] <= item.maxStock && selectedStocks[item.name] >= item.stock?'':'text-red-500'">
                                </div>
                                <input v-else type="number" v-model="selectedStocks[item.name]" :min="item.stock" :max="item.maxStock" step="100" class="w-20 bg-white pl-3 py-1 rounded-l-lg" :class="selectedStocks[item.name] <= item.maxStock && selectedStocks[item.name] >= item.stock?'':'text-red-500'">
                                <button @click="changeStock(item, mainStocks.stocksByFacilityName.filter(ingredient => ingredient.name === item.name)[0].stock)" class="w-22 py-1 bg-primary-green text-center rounded-r-lg font-medium text-white hover-bg-secondary-green">Change</button>
                            </div>
                        </td>
                        <td class="px-4">
                            <button class="bg-primary-green p-2 rounded-lg font-medium text-white hover:bg-secondary-green">Refill Stock</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <button @click="handleSaveStock" class="absolute right-10 bottom-10 py-4 px-8 bg-primary-green text-white font-bold rounded-lg text-5 drop-shadow-lg hover:bg-secondary-green">Save Stock</button>
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
    GET_STOCKS_BY_FACILITYNAME,
    GET_FACILITYNAMES,
    // @ts-ignore
} from '@/graphql/Stock.query'
import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'

import useFirebase from '@/composables/useFirebase'
import { ref, watchEffect } from 'vue'

const { firebaseUser } = useFirebase()


export default {
    components: {
        DashboardTitle,
    },
    data() {
        return {
            selectedFacility: 'Main Stock',
        };
    },
    methods: {
        calculateColor(stock: number, maxStock: number) {
            if (stock >= 0) {
                const sectionSize = maxStock / 3;
                const section = Math.floor(stock / sectionSize);
                if (section === 0) {
                    return '#FF000080';
                } else if (section === 1) {
                    return '#FFA50080';
                } else {
                    return '#00800080';
                }
            }            
        },
        changeStock(item: any, mainStock: number) {
            if (this.selectedFacility !== 'Main Stock') {
                console.log(mainStock - this.selectedStocks[item.name])
                if (mainStock - this.selectedStocks[item.name] >= 0) {
                    if (!isNaN(this.selectedStocks[item.name]) && this.selectedStocks[item.name] >= item.stock && this.selectedStocks[item.name] <= item.maxStock) {
                        console.log(`Changing stock for ${item.name} to ${this.selectedStocks[item.name]}`);
                        this.checkedStocks[item.name] = this.selectedStocks[item.name];

                    } else {
                        console.error(`Invalid stock value for ${item.name}`);
                    }
                }
                else {
                    console.error(`Invalid stock value for ${item.name} in de main stock`);
                }
            } 
            else {
                if (!isNaN(this.selectedStocks[item.name]) && this.selectedStocks[item.name] >= item.stock && this.selectedStocks[item.name] <= item.maxStock) {
                    console.log(`Changing stock for ${item.name} to ${this.selectedStocks[item.name]}`);
                    this.checkedStocks[item.name] = this.selectedStocks[item.name];

                } else {
                    console.error(`Invalid stock value for ${item.name}`);
                }
            }
        }
    },
    setup() {
        const selectedFacility = ref('Main Stock');
        const { loading: stocksLoading, result: stocks, error: stocksError, refetch: refetchStocks } = useQuery(GET_STOCKS_BY_FACILITYNAME, { facilityName: selectedFacility.value });
        const { loading: mainStockLoading, result: mainStocks, error: mainStocksError } = useQuery(GET_STOCKS_BY_FACILITYNAME, { facilityName: 'Main Stock' });
        const { loading: facilityNamesLoading, result: facilityNames, error: facilityNamesError} = useQuery(GET_FACILITYNAMES);
        const selectedStocks = ref<any>({});
        const checkedStocks = ref<any>({});

        const handleFacilityChange = (facilityName: string) => {
            refetchStocks({ facilityName });
            selectedStocks.value = {};
        };

        const handleSaveStock = () => {
            console.log(checkedStocks.value);
        };

        watchEffect(() => {
            if (stocks.value) {
                for (const item of stocks.value.stocksByFacilityName) {
                    selectedStocks.value[item.name] = item.stock;
                    checkedStocks.value[item.name] = item.stock;
                }
            }
        });


        return {
            stocksLoading,
            mainStockLoading,
            facilityNamesLoading,
            stocks,
            mainStocks,
            facilityNames,
            stocksError,
            mainStocksError,
            facilityNamesError,
            firebaseUser,
            selectedStocks,
            checkedStocks,
            handleFacilityChange,
            handleSaveStock,
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
