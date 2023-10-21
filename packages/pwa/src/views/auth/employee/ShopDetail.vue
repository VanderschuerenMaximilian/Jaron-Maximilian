<template>
    <ProductPopup :selected-product="SelectedProduct" :is-open="popupIsOpen" @close="closePopup(SelectedProduct)" @product-submitted="handleProductSubmitted"></ProductPopup>
    <div v-if="popupIsOpen" class="absolute w-screen h-screen bg-black z-2 bg-opacity-60"></div>
    <section  v-if="firebaseUser" v-for="shop of result" class="flex justify-between">
        <aside>
            <div v-if="loading"></div>
            <div v-if="error"></div>
            <div v-else class="ml-4 mt-25">
                <div  class="flex flex-col gap-4">
                    <RouterLink :to="'/auth/employee/' + firebaseUser.uid + '/shops'">
                        <div class="flex border-4 border-primary-green hover:border-green-900 rounded-lg p-2 w-70 justify-center">
                            <ChevronLeft class="text-primary-green" />
                            <p class="text-primary-green pr-2">{{ name }}</p>
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

        <main class="mt-25 flex flex-wrap justify-center max-h-85vh overflow-auto max-w-70vw gap-5"> 
            <template v-for="product in shop.products">
                <div v-if="product.category === selectedCategory" :key="product.id">
                <div class="relative flex flex-col border-4 border-primary-green rounded-lg w-70 h-90 justify-center items-center gap-5">
                    <img :src="product.image" :alt="`${product.name} image`" class="h-30 mx-auto mt-[-40px]">
                    <div class="text-center">
                        <p class="font-bold text-5 max-w-65 overflow-hidden h-15 max-h-15">{{ product.name }}</p>
                        <p class="font-bold text-primary-green">{{ '€ ' + calculateProductPrice(product) }}</p>
                        <div v-if="product.ingredients != ''" class="flex flex-col">
                            <p>{{ getIngredientWithMinStock(product, soldProducts) + ' ' + 'Available' }}</p>
                            <!-- <p >{{ soldProductIngredients }}</p> -->
                        </div>
                        <div v-if="product.size.length > 1" class="flex justify-center gap-2">
                            <button v-for="size of product.size" @click="handleSizeClick(product, size)" 
                                :class="['w-10 h-10 rounded-full flex items-center justify-center bg-primary-green text-white font-bold', getSelectedClass(product.id, size)]">
                                {{ size[0] }}
                            </button>
                        </div>
                    </div>
                        <button v-if="product.size.length > 1" @click="HandleOrder(product)" class="absolute bottom-4 bg-primary-green mx-auto px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900">ADD TO CART</button>
                        <button v-else @click="openPopup(product)" class="absolute bottom-4 bg-primary-green mx-auto px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900">ADD TO CART</button>
                    </div>
                </div>
            </template>
        </main>


        <aside>
          <div class=" w-100 h-screen bg-slate-200 flex flex-col">
            <h3 class="h3 text-center mt-25">Food List</h3>
            <div  v-if="soldProducts.length > 0"  class="flex flex-col scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 mx-auto" ref="scrollContainer">
                <div v-for="soldProduct of soldProducts" class="flex relative w-90 bg-white items-center p-4 gap-3 rounded-2xl">
                    <div class="w-18 ">
                        <img :src="soldProduct.image" :alt="soldProduct.name + 'image'">
                    </div>
                    <div>
                        <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">{{ soldProduct.name }}</p>
                        <p v-show="soldProduct.category != 'Burgers'" class="text-3">{{ soldProduct.size }}</p>
                        <p v-if="soldProduct.sauce" class="text-3 font-bold mt-1">Sauce:</p>
                        <p class="text-3">{{ soldProduct.sauce }}</p>
                        <div class="flex flex-col justify-between">
                            <p v-if="soldProduct.toppings != ''" class="text-3 font-bold mt-1">Extras:</p>
                            <div class="flex gap-1">
                                <p class="text-3">{{ soldProduct.toppings.join(', ') }}</p>
                            </div>
                            <p v-if="soldProduct.removables != ''" class="text-3 font-bold mt-1">Removables:</p>
                            <div class="flex gap-1">
                                <p class="text-3">{{ soldProduct.removables.join(', ') }}</p>
                            </div>
                        </div>
                        <p class="text-3 text-primary-green font-bold mt-2">{{ "€ " + ((soldProduct.price + soldProduct.extraCost) * soldProduct.amount).toFixed(2) }}</p>
                    </div>
                    <div class="flex mt-8 absolute right-4 bottom-4">
                        <MinusCircle @click="handleMinusClick(soldProduct)" class="w-6 h-6 text-primary-green cursor-pointer select-none"/>
                        <p class="text-3 mx-1 my-auto">{{ soldProduct.amount }}</p>
                        <PlusCircle @click="handlePlusClick(soldProduct)" class="w-6 h-6 text-primary-green cursor-pointer select-none"/>
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
            </div>
          </div>
        </aside>
    </section> 
</template>

<script lang="ts">
import ProductPopup from '../../../components/ProductPopup.vue';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, ChevronUp, X, MinusCircle, PlusCircle } from 'lucide-vue-next';
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
        PlusCircle
    },
    setup() {
        const soldProducts = ref<ISoldProduct[]>([]);
        const selectedSizes :any = ref({});   
        const router = useRouter()
        const id : any = ref<string>('')
        const name : any = ref<string>('')
        const scrollContainer = ref<HTMLElement | null>(null);
        let selectedCategory = ref();
        const SelectedProduct = ref({}) as any;
        const productObject = ref({}) as any;
        let soldProductIngredients: { [key: string]: number } = {};
        let productIngredients: { [key: string]: number } = {};
        const isAtTop = ref(true);
        const totalPrice = ref(0);
        let popupIsOpen = ref(false);
        const openPopup = ( product :any ) => {
            popupIsOpen.value = true;
            SelectedProduct.value = product;
        };
        const closePopup = () => {
            popupIsOpen.value = false;
        };

        
        const handleMinusClick = (product : any) => {
            if (product.amount > 1) {
                product.amount--;
            }
            calculateTotalPrice();
        };
        const handlePlusClick = (product : any) => {
            if (product.amount < 99) {
                product.amount++;
            }
            calculateTotalPrice();
        };
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
            const defaultSize = 'Medium'; // Set your desired default size here
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
                extraCost: 0,
            };
            // @ts-ignore
            soldProducts.value.push(newSoldProduct);
            calculateTotalPrice();
        };
        const handleProductSubmitted = (product : any) => {
            soldProducts.value.push(product);
            closePopup();
            calculateTotalPrice();
        };
        const handleDeleteSoldProduct = (product: ISoldProduct) => {
            const index = soldProducts.value.indexOf(product);
            
            if (index !== -1) {
                soldProducts.value.splice(index, 1);
            }
            calculateTotalPrice();
            getIngredientWithMinStock(product, soldProducts.value)
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
                name.value = router.currentRoute.value.params.shopId
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
        const handleCheckout = () => {
            if (soldProducts.value.length > 0) {
                const order = {
                    shopId: name.value,
                    totalPrice: totalPrice.value,
                    soldProducts: soldProducts.value.map((product) => ({
                        productName: product.productName,
                        price: (product.price + product.extraCost),
                        size: product.size,
                        sauce: product.sauce,
                        amount: product.amount,
                        removeables: product.removables,
                        extras: product.toppings,
                        })),
                };
                mutate({ orderInput: order }).catch((error) => {
                    console.log(error);
                });
            };
        };
        const getIngredientWithMinStock = (product: any, soldProducts: any) => {
            // TODO: Controle op zetten dat je geen prodct niet meer kan bestellen als de ingredienten op zijn en ook niet meer de amount kan verhogen
            soldProductIngredients = {}
            for (let soldProduct of soldProducts) {
                for (let ingredient of soldProduct.ingredients) {
                    soldProductIngredients[ingredient.name] = (soldProductIngredients[ingredient.name] || 0) + soldProduct.amount;
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
                
                if (stock < minStock) {
                    minStock = stock;
                }
            }
            console.log(productIngredients)
            console.log(minStock)
            return minStock;
        };

        const { result, loading, error } = useQuery(GET_SHOP, {name: name});
        const { mutate, loading: loadingOrder, onDone } = useMutation<SoldProduct>(CREATE_ORDER);
        const localIngredientStocks = ref<{ [productId: string]: number }>({});

        

        watchEffect(() => {
            if (result.value) {
            selectedCategory.value = result.value.shopByName.category[0].name
            }
        });
        return {
            id,
            name,
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
