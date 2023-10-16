<template>
    <ProductPopup :selected-product="SelectedProduct" :is-open="popupIsOpen" @close="closePopup" @product-submitted="handleProductSubmitted"></ProductPopup>
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
              <button @click="handleChekout" class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900">Chekout</button>
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
import { SoldProduct as ISoldProduct } from '../../../interfaces/ISoldProduct';
import { Product as IProduct } from '../../../interfaces/IProduct';
import { useQuery } from '@vue/apollo-composable'
import { GET_SHOP, GET_SHOPS } from '../../../graphql/shop.query'
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
        // const products = ref([
        //     { id: 1, name: 'Classic Cheeseburger', categoryId: "Burgers", description: 'Special burger', price: 7.99, image: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png' },
        //     { id: 2, name: 'Veggie Burger', categoryId: "Burgers", description: 'Special burger', price: 10.99, image: 'https://i.pinimg.com/originals/66/71/ed/6671eddc555209aab720cc321a76846f.png' },
        //     { id: 3, name: 'Spicy Chicken Burger', categoryId: "Burgers", description: 'Special burger', price: 6.99, image: 'https://png.pngtree.com/png-clipart/20230423/original/pngtree-chicken-burger-png-image_9090795.png' },
        //     { id: 4, name: 'Barbecue Pulled Pork Burger', categoryId: "Burgers", description: 'Special burger', price: 5.99, image: 'https://static.vecteezy.com/system/resources/previews/025/228/111/non_2x/tasty-pulled-pork-burger-on-transparent-background-png.png' },
        //     { id: 5, name: 'Hawaiian Teriyaki Burger', categoryId: "Burgers", description: 'Special burger', price: 8.99, image: 'https://www.butterburgers.com.my/wp-content/uploads/2021/03/Big-Kahuna-Hawaiian-Teriyaki-Burger-Shadow.png' },
        //     { id: 6, name: 'Mediterranean Lamb Burger', categoryId: "Burgers", description: 'Special burger', price: 7.99, image: 'https://static.vecteezy.com/system/resources/previews/027/145/474/original/delicious-greek-lamb-burger-isolated-on-transparent-background-png.png' },
        //     { id: 7, name: 'Classic Cola', categoryId: "Drinks", description: 'Refreshing cola drink', price: 2.49, image: 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0de.png' },
        //     { id: 8, name: 'Lemonade Splash', categoryId: "Drinks", description: 'Zesty lemonade', price: 3.99, image: 'https://pngimg.com/d/lemonade_PNG16937.png' },
        //     { id: 9, name: 'Iced Tea Delight', categoryId: "Drinks", description: 'Cool and soothing iced tea', price: 2.99, image: 'https://freepngimg.com/save/35822-iced-tea-transparent/1200x1318' },
        //     { id: 11, name: 'Mango Tango Smoothie', categoryId: "Drinks", description: 'Tropical mango smoothie', price: 5.99, image: 'https://ismoothiescafe.com/cdn/shop/products/Mango_tango_grande.png?v=1539789667' },
        //     { id: 12, name: 'Strawberry Bliss Shake', categoryId: "Drinks", description: 'Creamy strawberry shake', price: 4.99, image: 'https://bahamabucks.com/wp-content/uploads/2021/02/Strawberry-Bliss-1000x1300-1.png' }
        // ])
        
        const soldProducts = ref<ISoldProduct[]>([]);
        const selectedSizes = ref({});   
        const router = useRouter()
        const id : any = ref<string>('')
        const name : any = ref<string>('')
        const scrollContainer = ref<HTMLElement | null>(null);
        let selectedCategory = ref();
        const SelectedProduct = ref({}) as any;
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
                name: product.name,
                image: product.image,
                price: newPrice,
                amount: 1,
                size: sizePrice, // Handle the case where selectedSizes.value[product.id] is undefined
                sauce: '',
                toppings: [],
                removables: [],
                extraCost: 0
            };

            soldProducts.value.push(newSoldProduct);
            calculateTotalPrice();
        };

        // TODO: Geef een default value aan de size
        // TODO: Zorg dat een size een afzonderlijke price heeft, zorg dat die in de soldProduct komt zodat je makkelijk de totale prijs kan berekenen


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
                name.value = router.currentRoute.value.params.id
            }
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', handleScroll);
            }

            // watch(result, () => {
            // if (result && result.shop && result.shop.products) {
            //     console.log('Producten:', result.shop.products);
            // }
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
        // Bij het klikken op een grootte, wordt deze toegewezen aan het desbetreffende product
            selectedSizes.value = {
                ...selectedSizes.value,
                [product.id]: size
            };
        };

        const getSelectedClass = (productId, size) => {
            // Controleer of de huidige grootte is geselecteerd voor het huidige product
            // Als er geen geselecteerde grootte is, gebruik dan 'Medium' als standaard
            return selectedSizes.value[productId] === size || (!selectedSizes.value[productId] && size === 'Medium') 
                ? 'bg-opacity-100' 
                : 'bg-opacity-50';
        };

        const handleChekout = () => {
            if (soldProducts.value.length > 0) {
                // TODO: POST dit naar de backend (de hele object moet in de order en iedere order moet nog eens afzonderlijk in de database)
                console.log(soldProducts.value);

                for (const product of soldProducts.value) {
                    product.shopName = name.value;
                    //TODO: Voeg dan in de Database een date toe
                    console.log(product);
                }
            } else {
                alert("Oops! Je kunt niet uitchecken met een lege winkelwagen. Voeg eerst wat lekkers toe!");
            }
        };


        const { result, loading, error } = useQuery(GET_SHOP, {name: name});
        watchEffect(() => {
            // Wacht tot result.value is ingevuld voordat je het print
            if (result.value) {
            selectedCategory.value = result.value.shopByName.category[0].name
            }
        });
        

        return {
            id,
            name,
            // products,
            // filteredProducts,
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
            error,
            firebaseUser,
            calculateProductPrice,
            HandleOrder,
            handleSizeClick,
            selectedSizes,
            getSelectedClass,
            handleChekout
            

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
