<template>
    <DishPopup :selected-dish="SelectedDish" :is-open="popupIsOpen" @close="closePopup" @dish-submitted="handleDishSubmitted"></DishPopup>
    <div v-if="popupIsOpen" class="absolute w-screen h-screen bg-black z-2 bg-opacity-60"></div>
    <section class="flex justify-between">
        <aside>
            <div class="ml-4 mt-25" v-for="restaurant of filteredRestaurants" :key="restaurant.id">
                <div  class="flex flex-col gap-4">
                    <RouterLink to="/auth/shops">
                        <div class="flex border-4 border-primary-green hover:border-green-900 rounded-lg p-2 w-70 justify-center">
                            <ChevronLeft class="text-primary-green" />
                            <p class="text-primary-green pr-2" v-if="restaurant.id == id">{{ restaurant.name }}</p>
                        </div>  
                    </RouterLink>
                   <button v-for="category of categories" :class="{ 'bg-primary-green': selectedCategory === category.id, 'bg-slate-200': selectedCategory !== category.id }" @click="handleClick(category.id)" class="w-70 h-40 border-primary-green hover:bg-primary-green hover:bg-opacity-60 bg-opacity-70 rounded-lg">
                        <div class="flex flex-col h-full justify-center">
                            <img :src="category.image" :alt="category.name + ' image'" class="h-20 mx-auto">
                            <p class="text-center font-bold text-6">{{category.name}}</p>
                        </div>
                    </button>
                </div>
            </div>
        </aside>

        <main class="mt-25">
            <div class="flex flex-wrap gap-8 justify-center max-h-85vh overflow-auto max-w-60vw">
                <div v-for="dish of filteredDishes" :key="dish.id">
                    <div class="relative flex flex-col border-4 border-primary-green rounded-lg w-70 h-80 justify-center items-center gap-5 ">
                        <img :src="dish.image" :alt="`${dish.name} image`" class="h-30 mx-auto mt-[-40px]">
                        <div class="text-center">
                            <p class="font-bold text-5 max-w-65 overflow-hidden h-15 max-h-15">{{ dish.name }}</p>
                            <p class="font-bold text-primary-green">{{ '€ ' +  dish.price }}</p>
                        </div>
                        <button @click="openPopup(dish)" class="absolute bottom-4 bg-primary-green mx-auto px-8 py-2 rounded-full font-bold text-slate-100 hover:bg-green-900">ADD TO CART</button>
                    </div>
                </div>
            </div>      
        </main>

        <aside>

          <div class=" w-100 h-screen bg-slate-200 flex flex-col">
            <h3 class="h3 text-center mt-25">Food List</h3>
            <div  v-if="soldDishs.length > 0"  class="flex flex-col scroll max-h-60vh overflow-auto px-2 gap-4 mt-8 mx-auto" ref="scrollContainer">
                <div v-for="soldDish of soldDishs" class="flex relative w-90 bg-white items-center p-4 gap-3 rounded-2xl">
                    <img :src="soldDish.image" :alt="soldDish.name + 'image'" class="h-12">
                    <div>
                        <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">{{ soldDish.name }}</p>
                        <p v-if="soldDish.size != null" class="text-3">{{ soldDish.size }}</p>
                        <p class="text-3">{{ soldDish.sauce }}</p>
                        <div class="flex flex-col justify-between">
                            <p v-if="soldDish.toppings != ''" class="text-3 font-bold mt-1">Extras:</p>
                            <div class="flex gap-1">
                                <p class="text-3">{{ soldDish.toppings.join(', ') }}</p>
                            </div>
                            <p v-if="soldDish.removables != ''" class="text-3 font-bold mt-1">Removables:</p>
                            <div class="flex gap-1">
                                <p class="text-3">{{ soldDish.removables.join(', ') }}</p>
                            </div>
                        </div>
                        <p class="text-3 text-primary-green font-bold mt-2">{{ "€ " + ((soldDish.price + soldDish.extraCost) * soldDish.amount).toFixed(2) }}</p>
                    </div>
                    <div class="flex mt-8 absolute right-4 bottom-4">
                        <MinusCircle @click="handleMinusClick(soldDish)" class="w-6 h-6 text-primary-green cursor-pointer select-none"/>
                        <p class="text-3 mx-1 my-auto">{{ soldDish.amount }}</p>
                        <PlusCircle @click="handlePlusClick(soldDish)" class="w-6 h-6 text-primary-green cursor-pointer select-none"/>
                    </div>
                    <X class="absolute top-4 right-4 cursor-pointer" @click="handleDeleteSoldDish(soldDish)"/>
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
              <button class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6 hover:bg-green-900">Chekout</button>
            </div>
          </div>
        </aside>
    </section> 
</template>

<script lang="ts">
import DishPopup from '../../../components/DishPopup.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, ChevronUp, X, MinusCircle, PlusCircle } from 'lucide-vue-next';
import { SoldDish as ISoldDish } from '../../../interfaces/ISoldDish';
import { Dish as IDish } from '../../../interfaces/IDish';
export default {
    components: {
        DishPopup,
        ChevronLeft,
        ChevronDown,
        ChevronUp,
        X,
        MinusCircle,
        PlusCircle
    },
    setup() {
    // TODO: ophalen uit de database
        const restaurants = ref([
            { id: 1, name: 'Boomerang Snack', },
            { id: 2, name: 'Frituur', },
            { id: 3, name: 'Fish Corner', }
        ])

        // TODO: Dit moet je doen aan de hand van de dishes die je ophaalt uit de database
        const categories = ref([
            { id: 1, name: 'Burger', image: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png' },
            { id: 2, name: 'Drinks', image: 'https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png' }
        ])

        // TODO: ophalen uit de database
        const dishes = ref([
            { id: 1, name: 'Classic Cheeseburger', categoryId: 1, description: 'Special burger', price: 7.99, image: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png' },
            { id: 2, name: 'Veggie Burger', categoryId: 1, description: 'Special burger', price: 10.99, image: 'https://i.pinimg.com/originals/66/71/ed/6671eddc555209aab720cc321a76846f.png' },
            { id: 3, name: 'Spicy Chicken Burger', categoryId: 1, description: 'Special burger', price: 6.99, image: 'https://png.pngtree.com/png-clipart/20230423/original/pngtree-chicken-burger-png-image_9090795.png' },
            { id: 4, name: 'Barbecue Pulled Pork Burger', categoryId: 1, description: 'Special burger', price: 5.99, image: 'https://static.vecteezy.com/system/resources/previews/025/228/111/non_2x/tasty-pulled-pork-burger-on-transparent-background-png.png' },
            { id: 5, name: 'Hawaiian Teriyaki Burger', categoryId: 1, description: 'Special burger', price: 8.99, image: 'https://www.butterburgers.com.my/wp-content/uploads/2021/03/Big-Kahuna-Hawaiian-Teriyaki-Burger-Shadow.png' },
            { id: 6, name: 'Mediterranean Lamb Burger', categoryId: 1, description: 'Special burger', price: 7.99, image: 'https://static.vecteezy.com/system/resources/previews/027/145/474/original/delicious-greek-lamb-burger-isolated-on-transparent-background-png.png' },
            { id: 7, name: 'Classic Cola', categoryId: 2, description: 'Refreshing cola drink', price: 2.49, image: 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0de.png' },
            { id: 8, name: 'Lemonade Splash', categoryId: 2, description: 'Zesty lemonade', price: 3.99, image: 'https://pngimg.com/d/lemonade_PNG16937.png' },
            { id: 9, name: 'Iced Tea Delight', categoryId: 2, description: 'Cool and soothing iced tea', price: 2.99, image: 'https://freepngimg.com/save/35822-iced-tea-transparent/1200x1318' },
            { id: 11, name: 'Mango Tango Smoothie', categoryId: 2, description: 'Tropical mango smoothie', price: 5.99, image: 'https://ismoothiescafe.com/cdn/shop/products/Mango_tango_grande.png?v=1539789667' },
            { id: 12, name: 'Strawberry Bliss Shake', categoryId: 2, description: 'Creamy strawberry shake', price: 4.99, image: 'https://bahamabucks.com/wp-content/uploads/2021/02/Strawberry-Bliss-1000x1300-1.png' }
        ])

        const soldDishs = ref<ISoldDish[]>([]);
        const filteredDishes = computed(() => {
            return dishes.value.filter(dish => dish.categoryId === selectedCategory.value);
        });

        const router = useRouter()
        const id : any = ref<string>('')
        const scrollContainer = ref<HTMLElement | null>(null);
        const selectedCategory = ref(categories.value[0].id);
        const SelectedDish = ref({}) as any;
        const isAtTop = ref(true);
        const totalPrice = ref(0);
        let popupIsOpen = ref(false);

        
        const openPopup = ( dish :any ) => {
            popupIsOpen.value = true;
            SelectedDish.value = dish;
        };

        const closePopup = () => {
            popupIsOpen.value = false;
        };

        const handleMinusClick = (dish : any) => {
            if (dish.amount > 1) {
                dish.amount--;
            }
            calculateTotalPrice();
        };

        const handlePlusClick = (dish : any) => {
            if (dish.amount < 99) {
                dish.amount++;
            }
            calculateTotalPrice();
        };

        const handleDishSubmitted = (dish : any) => {
            soldDishs.value.push(dish);
            console.log(dishes.value);
            closePopup();
            calculateTotalPrice();
        };

        const handleDeleteSoldDish = (dish: ISoldDish) => {
            const index = soldDishs.value.indexOf(dish);

            if (index !== -1) {
                soldDishs.value.splice(index, 1);
            }
            calculateTotalPrice();
        };

        const calculateTotalPrice = () => {
            let total = 0;
            // get all the prices of the soldDishs and extraCosts and add them together and multiply by the amount of the dish and add them together
            soldDishs.value.forEach((soldDish) => {
                total += (soldDish.price + soldDish.extraCost) * soldDish.amount;
            });
            totalPrice.value = total;
        };

        onMounted(() => {
            if (router.currentRoute.value.params.id) {
                id.value = router.currentRoute.value.params.id
            }
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', handleScroll);
            }
        })

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

        const filteredRestaurants = computed(() => {
            return restaurants.value.filter(restaurant => restaurant.id == id.value)
        })

        return {
            id,
            restaurants,
            dishes,
            filteredDishes,
            categories,
            filteredRestaurants,
            scrollContainer,
            isAtTop, 
            handleClick,
            selectedCategory,
            openPopup, 
            popupIsOpen,
            closePopup,
            SelectedDish,
            soldDishs,
            handleMinusClick,
            handlePlusClick,
            handleDishSubmitted,
            totalPrice,
            handleDeleteSoldDish

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
