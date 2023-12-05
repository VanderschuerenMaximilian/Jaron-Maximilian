<template>
    <div v-if="!loading">
        <div v-if="!orderCompleted">
            <ProductPopup :selected-product="SelectedProduct" :is-open="popupIsOpen" :listExtras="listExtras" :listSauces="listSauces"  @close="closePopup()" @product-submitted="handleProductSubmitted"></ProductPopup>
            <div v-if="popupIsOpen" class="absolute w-screen h-screen bg-black z-2 bg-opacity-60"></div>
            <section  v-if="firebaseUser" v-for="shop of result" class="flex justify-between">

                <aside class="lg:hidden duration-200 drop-shadow-lg z-10" :class="isCategoryOpen?'-translate-x-15':'-translate-x-100'">
                    <div v-if="loading"> LOADING</div>
                    <div v-if="error"></div>
                    <div v-else class="absolute bg-slate-100 left-0 p-10 pt-20 mt-15 h-screen z-10">
                        <div  class="flex flex-col gap-4 ml-10">
                            <RouterLink :to="'/auth/employee/' + firebaseUser.uid + '/shops'">
                                <div class="flex border-4 border-primary-green hover:border-green-900 rounded-lg p-2 w-70 justify-center">
                                    <ChevronLeft class="text-primary-green" />
                                    <p class="text-primary-green pr-2">{{ shopName }}</p>
                                </div>  
                            </RouterLink>
                            <div v-if="loading">Loading...</div>
                            <div v-if="error">{{ error }}</div>
                            <div v-else class=" flex flex-col">
                                <button v-for="category of shop.category" :class="{ 'bg-primary-green': selectedCategory === category.name, 'bg-slate-200': selectedCategory !== category.name }" @click="handleClick(category.name)" class="w-70 h-40 border-primary-green hover:bg-primary-green hover:bg-opacity-60 bg-opacity-70 rounded-lg mb-4">
                                    <div class="flex flex-col h-full justify-center">
                                        <img :src="category.image" :alt="category.name + ' image'" class="h-20 mx-auto">
                                        <p class="text-center font-bold text-6">{{category.name}}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
                <ChevronRightCircle class="lg:hidden absolute left-4 top-25 cursor-pointer select-none color-primary-green w-8 h-8 duration-75 z-11" @click="closeCategories()"  :class="isCategoryOpen?'rotate-180':'rotate-0'"/>
                <aside class="hidden lg:flex">
                    <div v-if="loading"> LOADING</div>
                    <div v-if="error"></div>
                    <div v-else class="ml-4 mt-25">
                        <div class="flex flex-col gap-4">
                            <RouterLink :to="'/auth/employee/' + firebaseUser.uid + '/shops'">
                                <div class="flex border-4 border-primary-green hover:border-green-900 rounded-lg p-2 w-70 justify-center">
                                    <ChevronLeft class="text-primary-green" />
                                    <p class="text-primary-green pr-2">{{ shopName }}</p>
                                </div>  
                            </RouterLink>
                            <div v-if="loading">Loading...</div>
                            <div v-if="error">{{ error }}</div>
                            <div v-else class=" flex flex-col">
                                <button v-for="category of shop.category" :class="{ 'bg-primary-green': selectedCategory === category.name, 'bg-slate-200': selectedCategory !== category.name }" @click="handleClick(category.name)" class="w-70 h-40 border-primary-green hover:bg-primary-green hover:bg-opacity-60 bg-opacity-70 rounded-lg mb-4">
                                    <div class="flex flex-col h-full justify-center">
                                        <img :src="category.image" :alt="category.name + ' image'" class="h-20 mx-auto">
                                        <p class="text-center font-bold text-6">{{category.name}}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>


                <main class="mt-25 flex flex-wrap justify-center max-h-85vh overflow-auto max-w-full mx-auto lg:max-w-70vw gap-5 translate-x-[2px] px-15 lg:px-0"> 
                    <template v-for="product in shop.products">
                        <div v-if="product.category === selectedCategory" :key="product.id">
                            <div :class="{'relative': true,'flex': true,'flex-col': true,'border-4': true,'border-primary-green': true,'rounded-lg': true,'w-70': true,'h-90': true,'justify-center': true,'items-center': true,'gap-5': true,'cursor-pointer': getIngredientWithMinStock(product, soldProducts) >= 1,'cursor-not-allowed': getIngredientWithMinStock(product, soldProducts) < 1,'custom-class': getIngredientWithMinStock(product, soldProducts) >= 1}" :style="{ opacity: getIngredientWithMinStock(product, soldProducts) >= 1 ? '1' : '0.5' }">                    
                                <img :src="product.image" :alt="`${product.name} image`" class="h-30 mx-auto mt-[-40px]">
                            <div class="text-center">
                                <p class="font-bold text-5 max-w-65 overflow-hidden h-15 max-h-15">{{ product.name }}</p>
                                <p v-if="product.category === 'Drinks'" class="font-bold text-primary-green mt-[-20px]">{{ '€ ' + calculateProductPrice(product) }}</p>
                                <p v-else class="font-bold text-primary-green">{{ '€ ' + calculateProductPrice(product) }}</p>
                                <div v-if="product.ingredients != ''" class="flex flex-col">
                                    <div v-if="getIngredientWithMinStock(product, soldProducts) >= 0.66 && getIngredientWithMinStock(product, soldProducts) < 1">
                                        <p>Only 1 small Available</p>
                                    </div>
                                    <div v-else>
                                        <p>{{ Math.floor(getIngredientWithMinStock(product, soldProducts)) + ' ' + 'Available' }}</p>
                                    </div>
                                </div>
                                <div v-if="product.size.length > 1">
                                    <div  class="flex justify-center gap-2">
                                        <button v-for="size of product.size" @click="handleSizeClick(product, size)" 
                                                :class="['w-10 h-10 rounded-full flex items-center justify-center bg-primary-green text-white font-bold', getSelectedClass(product.id, size)]">
                                            {{ size[0] }}
                                        </button>
                                    </div>
                                </div>

                            </div>
                                <div v-if="product.size.length > 1"  class="absolute bottom-4 mx-auto">
                                    <button v-if="Math.floor(getIngredientWithMinStock(product, soldProducts)) >= 1" @click="HandleOrder(product)" class="bg-primary-green px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900">ADD TO CART</button>
                                    <button v-else class="bg-primary-green px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900 cursor-not-allowed">ADD TO CART</button>
                                </div>
                                <div v-else class="absolute bottom-4 mx-auto">
                                    <button v-if="Math.floor(getIngredientWithMinStock(product, soldProducts)) >= 1" @click="openPopup(product)" class="bg-primary-green px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900">ADD TO CART</button>
                                    <button v-else class="bg-primary-green px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900 cursor-not-allowed">ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </main>

                <aside class="absolute right-0 lg:hidden duration-200 drop-shadow-lg z-10" :class="!isFoodListOpen?'-translate-x-100 hidden':'translate-x-0 flex'">
                <div class="w-95 h-screen bg-slate-200 flex flex-col">
                    <h3 class="h3 text-center mt-25">Food List</h3>
                    <div  v-if="soldProducts.length >= 1"  class="flex flex-col scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 mx-auto" ref="scrollContainer">
                        <div v-for="soldProduct of soldProducts" class="flex relative w-90 bg-white items-center p-4 gap-3 rounded-2xl">
                            <div class="w-18 ">
                                <img :src="soldProduct.image" :alt="soldProduct.name + 'image'">
                            </div>
                            <div>
                                <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">{{ soldProduct.productName }}</p>
                                <p v-show="soldProduct.category != 'Burgers'" class="text-3">{{ soldProduct.size }}</p>
                                <p v-if="soldProduct.sauce" class="text-3 font-bold mt-1">Sauce:</p>
                                <p v-if="soldProduct.sauce != ''" class="text-3">{{ typeof soldProduct.sauce === 'string' ? soldProduct.sauce : soldProduct.sauce?.name }}</p>
                                <p v-else v-if="soldProduct.category === 'Burgers'" class="text-3">No Sauce</p>
                                <div class="flex flex-col justify-between">
                                    <p v-if="soldProduct.toppings.length > 0" class="text-3 font-bold mt-1">Extras:</p>
                                    <div class="flex gap-1" v-for="topping of soldProduct.toppings">
                                        <p class="text-3">{{ topping.name }}</p>
                                    </div>
                                    <p v-if="soldProduct.removables.length > 0" class="text-3 font-bold mt-1">Removables:</p>
                                    <div class="flex gap-1">
                                        <p class="text-3">{{ soldProduct.removables.join(', ') }}</p>
                                    </div>
                                </div>
                                <p class="text-3 text-primary-green font-bold mt-2">{{ "€ " + ((soldProduct.price + soldProduct.extraCost) * soldProduct.amount).toFixed(2) }}</p>
                            </div>
                            <div class="flex mt-8 absolute right-4 bottom-4">
                                <MinusCircle v-if="soldProduct.amount == 1" @click="handleMinusClick(soldProduct)" class="w-6 h-6 text-primary-green cursor-pointer select-none opacity-50"/>
                                <MinusCircle v-else @click="handleMinusClick(soldProduct)" class="w-6 h-6 text-primary-green cursor-pointer select-none"/>
                                <p class="text-3 mx-1 my-auto">{{ soldProduct.amount }}</p>
                                <div v-if="soldProduct.size != 'Small'" class="w-6 h-6 text-primary-green cursor-pointer select-none">
                                    <PlusCircle v-if="getIngredientWithMinStock(soldProduct, soldProducts) >= 1 && isStockAvailable && checkSauces(soldProduct, listSauces) && checkToppings(soldProduct) > 0" @click="handlePlusClick(soldProduct)"/>
                                    <PlusCircle v-else class="w-6 h-6 text-primary-green cursor-not-allowed select-none opacity-50"/>
                                </div>
                                <div v-else class="w-6 h-6 text-primary-green cursor-pointer select-none">
                                    <PlusCircle v-if="getIngredientWithMinStock(soldProduct, soldProducts) >= 0.8 && isStockAvailable" @click="handlePlusClick(soldProduct)"/>
                                    <PlusCircle v-else class="w-6 h-6 text-primary-green cursor-not-allowed select-none opacity-50"/>
                                    </div>
                                </div>
                            <X class="absolute top-4 right-4 cursor-pointer" @click="handleDeleteSoldProduct(soldProduct)"/>
                        </div> 
                    </div>
                    <div v-else class="">
                        <p class="text-center mt-8">No items in cart</p>
                    </div>


                    <div class="mt-auto p-6">
                    <hr class="border-t-2 border-dotted border-black">
                    <div class="flex justify-between font-bold py-4">
                        <p>Total:</p>
                        <p>{{"€ " + totalPrice.toFixed(2) }}</p>
                    </div>
                    <button @click="handleCheckout" class="w-85 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900">Chekout</button>
                    <p v-if="isCartEmpty" class="absolute right-20 text-red-600 font-medium select-none ">There are no items in the cart</p> 
                    </div>
                </div>
                </aside>
                <ChevronLeftCircle class="lg:hidden absolute right-4 top-25 cursor-pointer select-none color-primary-green w-8 h-8 duration-75 z-11"  @click="closeFoodList()" :class="isFoodListOpen?'rotate-180':'rotate-0'"/>
                <aside class="hidden lg:flex">
                <div class=" w-100 h-screen bg-slate-200 flex flex-col">
                    <h3 class="h3 text-center mt-25">Food List</h3>
                    <div  v-if="soldProducts.length >= 1"  class="flex flex-col scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 mx-auto" ref="scrollContainer">
                        <div v-for="soldProduct of soldProducts" class="flex relative w-90 bg-white items-center p-4 gap-3 rounded-2xl">
                            <div class="w-18 ">
                                <img :src="soldProduct.image" :alt="soldProduct.name + 'image'">
                            </div>
                            <div>
                                <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">{{ soldProduct.productName }}</p>
                                <p v-show="soldProduct.category != 'Burgers'" class="text-3">{{ soldProduct.size }}</p>
                                <p v-if="soldProduct.sauce" class="text-3 font-bold mt-1">Sauce:</p>
                                <p v-if="soldProduct.sauce != ''" class="text-3">{{ typeof soldProduct.sauce === 'string' ? soldProduct.sauce : soldProduct.sauce?.name }}</p>
                                <p v-else v-if="soldProduct.category === 'Burgers'" class="text-3">No Sauce</p>
                                <div class="flex flex-col justify-between">
                                    <p v-if="soldProduct.toppings.length > 0" class="text-3 font-bold mt-1">Extras:</p>
                                    <div class="flex gap-1" v-for="topping of soldProduct.toppings">
                                        <p class="text-3">{{ topping.name }}</p>
                                    </div>
                                    <p v-if="soldProduct.removables.length > 0" class="text-3 font-bold mt-1">Removables:</p>
                                    <div class="flex gap-1">
                                        <p class="text-3">{{ soldProduct.removables.join(', ') }}</p>
                                    </div>
                                </div>
                                <p class="text-3 text-primary-green font-bold mt-2">{{ "€ " + ((soldProduct.price + soldProduct.extraCost) * soldProduct.amount).toFixed(2) }}</p>
                            </div>
                            <div class="flex mt-8 absolute right-4 bottom-4">
                                <MinusCircle v-if="soldProduct.amount == 1" @click="handleMinusClick(soldProduct)" class="w-6 h-6 text-primary-green cursor-pointer select-none opacity-50"/>
                                <MinusCircle v-else @click="handleMinusClick(soldProduct)" class="w-6 h-6 text-primary-green cursor-pointer select-none"/>
                                <p class="text-3 mx-1 my-auto">{{ soldProduct.amount }}</p>
                                <div v-if="soldProduct.size != 'Small'" class="w-6 h-6 text-primary-green cursor-pointer select-none">
                                    <PlusCircle v-if="getIngredientWithMinStock(soldProduct, soldProducts) >= 1 && isStockAvailable && checkSauces(soldProduct, listSauces) && checkToppings(soldProduct) > 0" @click="handlePlusClick(soldProduct)"/>
                                    <PlusCircle v-else class="w-6 h-6 text-primary-green cursor-not-allowed select-none opacity-50"/>
                                </div>
                                <div v-else class="w-6 h-6 text-primary-green cursor-pointer select-none">
                                    <PlusCircle v-if="getIngredientWithMinStock(soldProduct, soldProducts) >= 0.8 && isStockAvailable" @click="handlePlusClick(soldProduct)"/>
                                    <PlusCircle v-else class="w-6 h-6 text-primary-green cursor-not-allowed select-none opacity-50"/>
                                    </div>
                                </div>
                            <X class="absolute top-4 right-4 cursor-pointer" @click="handleDeleteSoldProduct(soldProduct)"/>
                        </div> 
                    </div>
                    <div v-else class="">
                        <p class="text-center mt-8">No items in cart</p>
                    </div>


                    <div class="mt-auto p-6">
                    <hr class="border-t-2 border-dotted border-black">
                    <div class="flex justify-between font-bold py-4">
                        <p>Total:</p>
                        <p>{{"€ " + totalPrice.toFixed(2) }}</p>
                    </div>
                    <button @click="handleCheckout" class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900">Chekout</button>
                    <p v-if="isCartEmpty" class="absolute right-20 text-red-600 font-medium select-none ">There are no items in the cart</p> 
                    </div>
                </div>
                </aside>

            </section> 
        </div>
        <div v-else class="overflow-hidden">
            <Loader2 class="flex w-30 h-screen justify-center mx-auto animate-spin text-primary-green"/>
        </div>
    </div>
    <div v-else>
        <section class="flex justify-between animate-pulse">
            <aside>
                <div class="ml-4 mt-25">
                    <div  class="flex flex-col gap-4">
                        <div class="flex relative bg-gray-200 rounded-lg p-2 w-70 justify-center h-10"></div>  
                        <div class="flex flex-col gap-4">
                            <div class="bg-gray-200 h-50 rounded-lg"></div>
                            <div class="bg-gray-200 h-50 rounded-lg"></div>
                            <div class="bg-gray-200 h-50 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </aside>
            <main class="mt-25">
                <div class="flex flex-wrap justify-center max-h-85vh overflow-auto max-w-70vw gap-5">
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                    <div class="bg-gray-200 w-65 h-80 rounded-lg"></div>
                </div>
            </main>
            <aside>
                <div class=" w-100 h-screen bg-gray-200 flex flex-col"></div>
            </aside>
        </section>
    </div>

</template>

<script lang="ts">
import ProductPopup from '../../../components/ProductPopup.vue';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, ChevronUp, X, MinusCircle, PlusCircle, Loader2, ChevronLeftCircle, ChevronRightCircle   } from 'lucide-vue-next';
import type { SoldProduct as ISoldProduct, SoldProduct } from '../../../interfaces/ISoldProduct';
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_SHOP, CREATE_ORDER } from '../../../graphql/shop.query'
import useFirebase from '@/composables/useFirebase';

const { firebaseUser } = useFirebase()

export default {
    components: {
        ProductPopup,
        ChevronLeft,
        ChevronDown,
        ChevronUp,
        X,
        MinusCircle,
        PlusCircle,
        Loader2,
        ChevronLeftCircle,
        ChevronRightCircle
    },
    setup() {
        const shopName : any = ref<string>('')
        const { result, loading, error } = useQuery(GET_SHOP, {name: shopName});
        const { mutate, loading: loadingOrder, onDone } = useMutation<SoldProduct>(CREATE_ORDER);
        const soldProducts = ref<ISoldProduct[]>([]);
        const selectedSizes :any = ref({});   
        const router = useRouter()
        const id : any = ref<string>('')
        const scrollContainer = ref<HTMLElement | null>(null);
        let selectedCategory = ref();
        const SelectedProduct = ref({}) as any;
        const productObject = ref({}) as any;
        let soldProductIngredients: { [key: string]: number } = {};
        let productIngredients: { [key: string]: number } = {};
        const isAtTop = ref(true);
        const totalPrice = ref(0);
        let popupIsOpen = ref(false);
        const listExtras = ref({}) as any;
        const listSauces = ref({}) as any
        const isStockAvailable = ref(true)
        const orderCompleted = ref(false)
        const isCartEmpty = ref(false)
        const isCategoryOpen = ref(false)
        const isFoodListOpen = ref(false)
        const openPopup = ( product :any ) => {
            popupIsOpen.value = true;
            SelectedProduct.value = product;
        };
        const closePopup = () => {
            popupIsOpen.value = false;
        };
        const closeCategories = () => {
            isCategoryOpen.value = !isCategoryOpen.value
            isFoodListOpen.value = false
        }   
        const closeFoodList = () => {
            isFoodListOpen.value = !isFoodListOpen.value
            isCategoryOpen.value = false
        }

        
        const handleMinusClick = (product : any) => {
            if (product.amount > 1) {
                product.amount--;
            }
            isStockAvailable.value = true
            calculateTotalPrice();
        };
        const handlePlusClick = (soldProduct : any) => {
            isStockAvailable.value = true
            soldProduct.amount++;
            calculateTotalPrice();
        };
        const checkSauces = (soldProduct: any, listSauces: any[]): boolean => {
            const matchingSauce = (listSauces as any[]).filter(sauce => sauce.ingredient === soldProduct.sauce?.name)[0];

            return (
                matchingSauce?.ingredient === undefined ||
                (matchingSauce?.stock || 0) >= 25
            );
        };

        const checkToppings = (soldProduct: any) => {
            let soldProductIngredients = soldProduct.toppings;
            let listToppingsStocks = GetListExtras(soldProducts.value);
            let kleinsteWaarde = 0;
            if (listToppingsStocks.length > 0 && soldProductIngredients.length > 0) {
                let matchingIngredients = listToppingsStocks.filter(ingredient => {
                    let matchingProduct = soldProductIngredients.find((product: { name: any; }) => product.name === ingredient.ingredient);
                    return matchingProduct !== undefined;
                    });                

                if (matchingIngredients.length > 0) {
                    kleinsteWaarde = Math.min(...matchingIngredients.map(ingredient => ingredient.stock));
                    return kleinsteWaarde;
                } else {
                    return 99;
                }
            } else {
                return 99;
            }
        }


        const GetListExtras = (soldProducts: any) => {
            let listToppingsStocks = [];
            for (let soldProduct of soldProducts) {
                for (let topping of soldProduct.toppings) {
                    const existingIngredientIndex = listToppingsStocks.findIndex(item => item.ingredient === topping.name);
                    const reduction = 1 * soldProduct.amount;
                    if (existingIngredientIndex !== -1) {
                        listToppingsStocks[existingIngredientIndex].stock -= reduction;
                    } else {
                        listToppingsStocks.push({ ingredient: topping.name, stock: topping.stock - reduction });
                    }
                }
            }
            listExtras.value = listToppingsStocks
            return listToppingsStocks;
        };

        const GetListSauces = (soldProducts: any) => {
            let listSauceStocks = [];            
            for (let soldProduct of soldProducts) {
                const existingIngredientIndex = listSauceStocks.findIndex(item => item.ingredient === soldProduct.sauce.name);
                const reduction = 25 * soldProduct.amount;
                if (existingIngredientIndex !== -1) {
                    listSauceStocks[existingIngredientIndex].stock -= reduction;
                } else {
                    listSauceStocks.push({ ingredient: soldProduct.sauce.name, stock: soldProduct.sauce.stock - reduction });
                }
            }
            listSauces.value = listSauceStocks
            return listSauceStocks;
        }

        const calculateProductPrice = (product : any) => {
            let newPrice = product.price;
            const sizeModifier = product.sizeModifier;
            if (selectedSizes.value[product.id] === 'Large') {
                newPrice += sizeModifier;
            } else if (selectedSizes.value[product.id] === 'Small') {
                newPrice -= sizeModifier;
            }
            newPrice = parseFloat(newPrice.toFixed(2));
            return newPrice;
        };

        const HandleOrder = (product: any) => {
            isCartEmpty.value = false
            const defaultSize = 'Medium';
            const sizePrice = selectedSizes.value[product.id] || defaultSize;
            let newPrice = product.price;
            if (sizePrice === 'Large') {
                newPrice += 1;
            } else if (sizePrice === 'Small') {
                newPrice -= 1;
            }
            newPrice = parseFloat(newPrice.toFixed(2));
            
            
            const newSoldProduct = {
                productName: product.name,
                image: product.image,
                price: newPrice,
                amount: 1,
                size: sizePrice,
                sauce: '',
                toppings: [],
                removables: [],
                ingredients: product.ingredients,
                extraCost: 0,
            };

            updateSoldProducts(newSoldProduct, false);  
            calculateTotalPrice();
        };

        const updateSoldProducts = (newSoldProduct: any, state: boolean) => {
            for (let i = 0; i < soldProducts.value.length; i++) {
                const soldProduct = soldProducts.value[i]; 
                console.log(soldProduct.name)
                if (
                    soldProduct.name === newSoldProduct.name &&
                    soldProduct.productName === newSoldProduct.productName &&
                    (soldProduct.size === newSoldProduct.size || state) &&
                    JSON.stringify(soldProduct.sauce) === JSON.stringify(newSoldProduct.sauce) &&
                    JSON.stringify(soldProduct.toppings) === JSON.stringify(newSoldProduct.toppings) &&
                    JSON.stringify(soldProduct.removables) === JSON.stringify(newSoldProduct.removables)
                ) {
                    soldProducts.value[i].amount += 1;
                    return true;
                }
            }

            soldProducts.value.push(newSoldProduct);

            return false;
        };

        const handleProductSubmitted = (product : any) => {
            updateSoldProducts(product, true);  
            isCartEmpty.value = false
            closePopup();
            calculateTotalPrice();
        };

        const handleDeleteSoldProduct = (product: ISoldProduct) => {
            const index = soldProducts.value.indexOf(product);
            if (index !== -1) {
                soldProducts.value.splice(index, 1);
            }
            calculateTotalPrice();
        };
        const calculateTotalPrice = () => {
            let total = 0;
            soldProducts.value.forEach((soldProduct) => {
                total += (soldProduct.price + soldProduct.extraCost) * soldProduct.amount;
            });
            totalPrice.value = total;
        };
        onMounted(() => {
            if (router.currentRoute.value.params.id) {
                shopName.value = router.currentRoute.value.params.shopName
            }
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', handleScroll);
            }
        });
        onUnmounted(() => {
            if (scrollContainer.value) {
                scrollContainer.value.removeEventListener('scroll', handleScroll);
            }
        });
        const handleScroll = () => {
            if (scrollContainer.value) {
                isAtTop.value = scrollContainer.value.scrollTop === 0;
            }
        };
        const handleClick = (category : any) => {
            selectedCategory.value = category;
        }
        const handleSizeClick = (product: any, size:any) => {
            selectedSizes.value = {
                ...selectedSizes.value,
                [product.id]: size
            };
        };
        const getSelectedClass = (productId: string | number, size: string) => {
            return selectedSizes.value[productId] === size || (!selectedSizes.value[productId] && size === 'Medium') 
            ? 'bg-opacity-100' 
            : 'bg-opacity-50';
        };
        const handleCheckout = async () => {
            if (soldProducts.value.length >= 1) {
                orderCompleted.value = true

                const order = {
                    shopName: shopName.value,
                    totalPrice: totalPrice.value,
                    soldProducts: soldProducts.value.map((product) => ({
                        productName: product.productName,
                        price: product.price + product.extraCost,
                        size: product.size,
                        //@ts-ignore
                        sauce: product.sauce.name !== undefined ? product.sauce.name : "No Sauce",
                        amount: product.amount,
                        removeables: product.removables.map((removable) => removable),
                        //@ts-ignore 
                        extras: product.toppings.map((extra) => extra.name),
                    })),
                };
                await mutate({ orderInput: order }).catch((error) => {
                    console.log(error);
                });
                await setTimeout(() => {
                    location.reload();
                }, 3000);
            }
            else {
                isCartEmpty.value = true
            }
        };
        const getIngredientWithMinStock = (product: any, soldProducts: any) => {
            GetListExtras(soldProducts)
            GetListSauces(soldProducts)
            soldProductIngredients = {}
            let size = selectedSizes.value[product.id]
            for (let soldProduct of soldProducts) {
                for (let ingredient of soldProduct.ingredients) {
                    if (soldProduct.size === "Medium") {
                        soldProductIngredients[ingredient.name] = (soldProductIngredients[ingredient.name] || 0) + (product.ingredients.find((item: { name: any; }) => item.name === ingredient.name)?.stockReduction * soldProduct.amount);
                    }
                    if (soldProduct.size === "Large") {
                        soldProductIngredients[ingredient.name] = (soldProductIngredients[ingredient.name] || 0) + (product.ingredients.find((item: { name: any; }) => item.name === ingredient.name)?.stockReduction * soldProduct.amount) + 50 * soldProduct.amount;
                    }
                    if (soldProduct.size == "Small") {
                        soldProductIngredients[ingredient.name] = (soldProductIngredients[ingredient.name] || 0) + (product.ingredients.find((item: { name: any; }) => item.name === ingredient.name)?.stockReduction * soldProduct.amount) - 50 * soldProduct.amount;
                    }
                }
                for (let extra of soldProduct.toppings) {
                    soldProductIngredients[extra] = (soldProductIngredients[extra] || 0) + (product.ingredients.find((item: { name: any; }) => item.name === extra)?.stockReduction * soldProduct.amount);
                }
                for (let removable of soldProduct.removables) {
                    soldProductIngredients[removable] = (soldProductIngredients[removable] || 0) - (product.ingredients.find((item: { name: any; }) => item.name === removable)?.stockReduction * soldProduct.amount);
                }
            }
            productIngredients = {}
            for (let ingredient of product.ingredients) {
                productIngredients[ingredient.name] = ingredient.stock
            }
            for (let ingredientName in productIngredients) {
                let stock = productIngredients[ingredientName];
                if (soldProductIngredients[ingredientName]) {
                    stock -= soldProductIngredients[ingredientName];
                }
                productIngredients[ingredientName] = stock;
            }
            let minStock = Infinity;
            for (let ingredientName in productIngredients) {
                    let stock = productIngredients[ingredientName];
                    let reduction;

                    if(size === "Small") {
                        reduction = -50;
                    } else if(size === "Large") {
                        reduction = 50;
                    } else {
                        reduction = 0;
                    }
                    let ingredient = product.ingredients.find((item: { name: string; }) => item.name === ingredientName);
                    if (ingredient) {
                        minStock = minStock === undefined ? stock / (ingredient.stockReduction + reduction) : Math.min(minStock, stock / (ingredient.stockReduction + reduction));
                    }
                }
            return minStock;
        };

        watchEffect(() => {
            if (result.value) {
            selectedCategory.value = result.value.shopByName.category[0].name
            }
        });
        return {
            id,
            shopName,
            scrollContainer,
            isAtTop, 
            handleClick,
            selectedCategory,
            openPopup, 
            popupIsOpen,
            closePopup,
            SelectedProduct,
            soldProducts,
            handleMinusClick,
            handlePlusClick,
            handleProductSubmitted,
            totalPrice,
            handleDeleteSoldProduct,
            result,
            loading,
            loadingOrder,
            mutate,
            error,
            firebaseUser,
            calculateProductPrice,
            HandleOrder,
            handleSizeClick,
            selectedSizes,
            getSelectedClass,
            handleCheckout,
            getIngredientWithMinStock,
            productObject,
            soldProductIngredients,
            orderCompleted,
            listExtras,
            listSauces,
            isStockAvailable,
            checkToppings,
            isCartEmpty,
            checkSauces,
            ChevronLeftCircle,
            ChevronRightCircle,
            isCategoryOpen,
            isFoodListOpen,
            closeCategories,
            closeFoodList
        }
    },
}
</script>

<style>
  /* width */
::-webkit-scrollbar {
  width: 6px;
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
