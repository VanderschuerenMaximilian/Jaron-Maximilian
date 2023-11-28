<template>
    <main v-if="firebaseUser" class="flex flex-col pl-20 pr-4 pt-12 bg-slate-100 flex-1 rounded-l-3xl h-screen overflow-y-auto">
        <div v-if="isOrderChanged" class="absolute z-50 left-1/2 transform -translate-x-30 top-20">
            <div class="border-2 border-primary-green bg-primary-green bg-opacity-25 py-3 px-6 rounded-md max-w-lg flex flex-col gap-2">
                <X @click="isOrderChanged = false" class="absolute right-4 h-6 top-1/2 -translate-y-3 text-primary-green cursor-pointer" />
                <p class="text-primary-green font-semibold pr-6">Stock has been successfully updated. You can view the modified products in the <RouterLink to="storeManagement" class="cursor-pointer underline">'Stock Adjustments'</RouterLink> section.</p>
            </div>
        </div>
        <!-- Alert message -->
        <div class="hidden">
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div class="w-96 bg-white p-8 rounded-md shadow-lg ml-100">
                    <div class="flex items-center mb-4">
                        <AlertTriangle class="w-10 h-10 text-red-500 mr-2" />
                        <p class="text-lg font-semibold">Warning</p>
                    </div>
                    <p class="mb-4">Proceeding will result in the loss of unsaved stocks. Are you sure you want to continue?</p>
                    <div class="flex justify-between">
                        <button class="px-10 py-2 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600">ACCEPT</button>
                        <button class="px-10 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End alert message -->
        
        <DashboardTitle currentRoute="Stocks" />
        <section class="flex justify-between mb-5 w-19/20">
            <select v-model="selectedFacility" v-for="facility in facilityNames" @change="handleFacilityChange(selectedFacility)" class="px-2 mt-2 border-3 border-primary-green bg-slate-100 text-primary-green font-medium hover:border-green-900 rounded-md cursor-pointer h-10">
                <option v-for="item in facility" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>
            <button @click="refilEverything(stocks.stocksByFacilityName, mainStocks.stocksByFacilityName)" class="px-2 mt-2 border-3 border-primary-green text-primary-green font-medium hover:primary-green rounded-md cursor-pointer h-10 hover:bg-primary-green hover-text-white">Refill everything</button>
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
                                    <div class="absolute h-full opacity-30" :style="{ width: (checkedStocks[item.name] / item.maxStock) * 100 + '%', background: calculateColor(checkedStocks[item.name] + item.pending, item.maxStock) }"></div>
                                    <div class="absolute h-full" :style="{ width: (checkedStocks[item.name] / item.maxStock) * 100 + '%', background: calculateColor(item.stock + item.pending, item.maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{ checkedStocks[item.name] + ' ' + item.unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ item.maxStock }}</span></p>
                            </div>
                        </td>
                        <td v-if="selectedFacility === 'Main Stock'" class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full opacity-30" :style="{ width: (checkedStocks[item.name] / mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock) * 100 + '%', background: calculateColor(checkedStocks[item.name], mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock) }"></div>
                                    <div class="absolute h-full" :style="{ width: (mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock / mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock) * 100 + '%', background: calculateColor(mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock, mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{checkedStocks[item.name] + ' ' + mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock }}</span></p>
                            </div>                            
                        </td>
                        <td v-else class="py-1 px-4 w-45">
                            <div class="flex-col mt-2">
                                <div class="relative h-6 mx-auto rounded-full overflow-hidden flex items-center bg-white">
                                    <div class="absolute h-full" :style="{ width: ((mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock - checkedStocks[item.name] + item.stock) / mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock) * 100 + '%', background: calculateColor((mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock) - checkedStocks[item.name], mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock) }"></div>
                                    <p class="absolute w-full text-center font-medium">{{(mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock - checkedStocks[item.name] + item.stock) + ' ' + mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].unit }}</p>
                                </div>
                                <p class="text-3">Maximum stock: <span class="font-medium">{{ mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].maxStock }}</span></p>
                            </div>  
                        </td>
                        <td class="py-4 px-4 flex justify-center">
                            <div class="flex items-center">
                                <div v-if="selectedFacility !== 'Main Stock'">
                                    <input v-if="item.maxStock > mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock" type="number" v-model="selectedStocks[item.name]" :min="item.stock + item.pending" :max="mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock + item.stock" step="9" class="w-20 bg-white pl-3 py-1 rounded-l-lg" :class="getButtonClass(item.name, stock)">
                                    <input v-else type="number" v-model="selectedStocks[item.name]" :min="item.stock + item.pending" :max="item.maxStock" step="10" class="w-20 bg-white pl-3 py-1 rounded-l-lg" :class="getButtonClass(item.name, stock)">
                                </div>
                                <input v-else type="number" v-model="selectedStocks[item.name]" :min="item.stock" :max="item.maxStock" step="100" class="w-20 bg-white pl-3 py-1 rounded-l-lg" :class="getButtonClass(item.name, stock)">
                                <button @click="changeStock(item, mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock)" class="w-22 py-1 bg-primary-green text-center rounded-r-lg font-medium text-white hover-bg-secondary-green" :class="getButtonClass(item.name, stock)">Change</button>
                            </div>
                        </td>
                        <td class="px-4">
                            <button @click="refillStock(item, mainStocks.stocksByFacilityName.filter((ingredient:StockItem) => ingredient.name === item.name)[0].stock)" class="bg-primary-green p-2 rounded-lg font-medium text-white hover:bg-secondary-green">Refill Stock</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <button @click="handleSaveStock(stocks.stocksByFacilityName)" class="absolute right-10 bottom-10 py-4 px-8 bg-primary-green text-white font-bold rounded-lg text-5 drop-shadow-lg hover:bg-secondary-green">Save Stock</button>
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
import { useMutation, useQuery } from '@vue/apollo-composable'
import {  
    GET_STOCKS_BY_FACILITYNAME,
    GET_FACILITYNAMES,
    UPDATE_STOCK_WITH_PENDING,
} from '@/graphql/stock.query'
import { CREATE_TASK } from '@/graphql/task.mutation'
import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'
import { AlertTriangle, X } from 'lucide-vue-next';
import useFirebase from '@/composables/useFirebase'
import { ref, watchEffect, type Ref, watch } from 'vue'
import { isTypeSystemDefinitionNode } from 'graphql';
import useCustomPerson from '@/composables/useCustomPerson';
//@ts-ignore
import { StockItems }  from '@/interfaces/StockItems';

const { firebaseUser } = useFirebase()
const { customPerson } = useCustomPerson()

export default {
    components: {
        DashboardTitle,
        AlertTriangle,
        X,
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
        getButtonClass(itemName: string, stocks: any) {
            const stock = stocks.find((stockItem: StockItem) => stockItem.name === itemName) as StockItem;
            const item = this.completedChanges.find((item: any) => item.name === itemName);
            if (item) {
                if (item.stock === this.selectedStocks[itemName]) {
                    return 'bg-opacity-30';
                }
                else {
                    return 'bg-opacity-100';
                }
            }
            return this.selectedStocks[itemName] === stock.stock ? 'bg-opacity-30' : 'bg-opacity-100';
        },
        changeStock(item: any, mainStock: number) {
            if (this.selectedFacility !== 'Main Stock') {
                if (mainStock + item.stock - this.selectedStocks[item.name] >= 0) {
                    if (!isNaN(this.selectedStocks[item.name]) && this.selectedStocks[item.name] >= item.stock && this.selectedStocks[item.name] <= item.maxStock) {
                        this.checkedStocks[item.name] = this.selectedStocks[item.name];
                        this.perviousStocks[item.name] = this.selectedStocks[item.name];
                        this.isStockChanged = true;
                        if (!this.completedChanges.includes(item.name)) {
                            this.completedChanges.push({"name": item.name, "stock": this.selectedStocks[item.name]});
                        }
                        else {
                            this.completedChanges.stock = this.selectedStocks[item.name];
                        }
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
                    this.checkedStocks[item.name] = this.selectedStocks[item.name];
                    this.isStockChanged = true;
                    this.perviousStocks[item.name] = this.selectedStocks[item.name];
                    if (this.completedChanges.length === 0) {
                        this.completedChanges.push({"name": item.name, "stock": this.selectedStocks[item.name]});
                    }
                    for (let i = 0; i < this.completedChanges.length; i++) {
                        if (this.completedChanges[i].name === item.name) {
                            this.completedChanges[i].stock = this.selectedStocks[item.name];
                        }
                        else {
                            this.completedChanges.push({"name": item.name, "stock": this.selectedStocks[item.name]});
                        }
                    }

                } else {
                    console.error(`Invalid stock value for ${item.name}`);
                }
            }
        },
        refillStock(item:any, bellewaerdeStock: number) {
            if (this.selectedFacility !== 'Main Stock') {
                if (bellewaerdeStock + item.stock < item.maxStock) {
                    this.selectedStocks[item.name] = item.stock + bellewaerdeStock;
                    this.checkedStocks[item.name] = item.stock + bellewaerdeStock;
                    this.perviousStocks[item.name] = item.stock + bellewaerdeStock;
                    this.isStockChanged = true;
                } else {
                    this.selectedStocks[item.name] = item.maxStock;
                    this.checkedStocks[item.name] = item.maxStock;
                    this.perviousStocks[item.name] = item.maxStock;
                    this.isStockChanged = true;
                }
            } else {
                this.selectedStocks[item.name] = item.maxStock;
                this.checkedStocks[item.name] = item.maxStock;
                this.perviousStocks[item.name] = item.maxStock;
                this.isStockChanged = true;
            }
        },
        refilEverything(stocks: StockItem[], mainStocks: StockItem[]) {
            for (const bellewaerdeItem of mainStocks) {
                if (this.selectedFacility === 'Main Stock') {
                this.selectedStocks[bellewaerdeItem.name] = bellewaerdeItem.maxStock;
                this.checkedStocks[bellewaerdeItem.name] = bellewaerdeItem.maxStock;
                this.perviousStocks[bellewaerdeItem.name] = bellewaerdeItem.maxStock;
                } else {
                const correspondingStock = stocks.find((stockItem: StockItem) => stockItem.name === bellewaerdeItem.name) as StockItem;

                if (correspondingStock.maxStock > bellewaerdeItem.stock + correspondingStock.stock) {
                    this.selectedStocks[bellewaerdeItem.name] = bellewaerdeItem.stock + correspondingStock.stock;
                    this.checkedStocks[bellewaerdeItem.name] = bellewaerdeItem.stock + correspondingStock.stock;
                    this.perviousStocks[bellewaerdeItem.name] = bellewaerdeItem.stock + correspondingStock.stock;
                } else {
                    this.selectedStocks[bellewaerdeItem.name] = correspondingStock.maxStock;
                    this.checkedStocks[bellewaerdeItem.name] = correspondingStock.maxStock;
                    this.perviousStocks[bellewaerdeItem.name] = correspondingStock.maxStock;
                }
                }
            }
            this.isStockChanged = true;
        },
    },
    setup() {
        const selectedFacility = ref('Main Stock');
        const { loading: stocksLoading, result: stocks, error: stocksError, refetch: refetchStocks } = useQuery(GET_STOCKS_BY_FACILITYNAME, { facilityName: selectedFacility.value });
        const { loading: mainStockLoading, result: mainStocks, error: mainStocksError } = useQuery(GET_STOCKS_BY_FACILITYNAME, { facilityName: 'Main Stock' });
        const { loading: facilityNamesLoading, result: facilityNames, error: facilityNamesError} = useQuery(GET_FACILITYNAMES);
        const { mutate: updateStockWithPendingMutation } = useMutation(UPDATE_STOCK_WITH_PENDING);      
        const { mutate: createTaskMutation } = useMutation(CREATE_TASK);
        const selectedStocks = ref<any>({});
        const checkedStocks = ref<any>({});
        const isStockChanged = ref(false);
        const isOrderChanged = ref(false);
        const completedChanges = ref<any>([]);

        let originalFacilityName = 'Main Stock';
        let perviousStocks = ref<any>({});
        let isFacilityChanged = ref(true);

        const handleFacilityChange = (newFacilityName: string) => {
            if (isStockChanged.value) {
                const confirmation = confirm('Are you sure you want to change facility? All unsaved changes will be lost.');
                if (confirmation) {
                    originalFacilityName = newFacilityName;
                    refetchStocks({ facilityName: newFacilityName });
                    selectedStocks.value = {};
                    isStockChanged.value = false;
                    isFacilityChanged.value = true;

                } else {
                    selectedFacility.value = originalFacilityName;
                    isFacilityChanged.value = false;
                }
            } else {
                refetchStocks({ facilityName: newFacilityName });
                selectedStocks.value = {};
                originalFacilityName = newFacilityName;
                isFacilityChanged.value = true;

            }
        };

        const handleSaveStock = async (stocks: any) => {
            //Alles met de main stock en de pending validation werkt normaal gezien
            //TODO: Fix dat als je in de Boomerang Snack zit dat je controle doet met de pending inbegrepen
            const stockDifference = [];
            if (selectedFacility.value === 'Main Stock') {
                for (const item of stocks) {
                    await stockDifference.push({
                        name: item.name,
                        difference: checkedStocks.value[item.name] - item.stock,
                    });    
                }
            }
            else {
                for (const item of stocks) {
                    await stockDifference.push({
                        name: item.name,
                        difference: checkedStocks.value[item.name] - item.stock - item.pending,
                    });    
                }
            }
            isOrderChanged.value = true;
            isStockChanged.value = false;

            try {
                await createTaskMutation({
                    createTaskInput: {
                        title: 'Stock adjustment',
                        description: 'A stock adjustment has been made.',
                        shopName: selectedFacility.value,
                        stockItems: stockDifference,
                    },
                    
                });
            } catch (error) {
                console.error(error);
            }

            // ❗❗❗ ERROR eruit halen als je de mutation wilt testen ❗❗❗
            await updateStockWithPendingMutation({
                facilityName: selectedFacility.value,
                ingredients: stockDifference,
            });

            await location.reload();
            
        };

        watchEffect(() => {
            if (!isFacilityChanged.value) {

                for (let itemName in checkedStocks.value) {
                    if (perviousStocks.value[itemName] !== undefined) {
                        checkedStocks.value[itemName] = perviousStocks.value[itemName];
                        selectedStocks.value[itemName] = perviousStocks.value[itemName];
                    }
                }

            }
            else {
                if (selectedFacility.value === 'Main Stock') { 
                    if (stocks.value) {
                        for (const item of stocks.value.stocksByFacilityName) {
                            selectedStocks.value[item.name] = item.stock;
                            checkedStocks.value[item.name] = item.stock;
                        }
                    }
                }
                else {
                    if (stocks.value) {
                        for (const item of stocks.value.stocksByFacilityName) {
                            selectedStocks.value[item.name] = item.stock + item.pending;
                            checkedStocks.value[item.name] = item.stock + item.pending;
                        }
                    }
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
            customPerson,
            selectedStocks,
            perviousStocks,
            checkedStocks,
            handleFacilityChange,
            handleSaveStock,
            isStockChanged,
            selectedFacility,
            isOrderChanged,
            completedChanges
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
