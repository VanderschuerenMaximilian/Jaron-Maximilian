<template>
    <DishPopup :is-open="popupIsOpen" @close="closePopup"></DishPopup>
    <div v-if="popupIsOpen" class="absolute w-screen h-screen bg-black z-2 bg-opacity-60"></div>
    <section class="flex justify-between">
        <aside>
            <div class="ml-4 mt-25" v-for="restaurant of filteredRestaurants" :key="restaurant.id">
                <div  class="flex flex-col gap-4">
                    <RouterLink to="/auth/shops">
                        <div class="flex border-4 border-primary-green rounded-lg p-2 w-70 justify-center">
                            <ChevronLeft class="text-primary-green" />
                            <p class="text-primary-green pr-2" v-if="restaurant.id == id">{{ restaurant.name }}</p>
                        </div>  
                    </RouterLink>
                   <button v-for="category of categories" :class="{ 'bg-primary-green': selectedCategory === category.id, 'bg-slate-200': selectedCategory !== category.id }" @click="handleClick(category.id)" class="w-70 h-40 border-primary-green bg-opacity-70 rounded-lg">
                        <div class="flex flex-col h-full justify-center">
                            <img :src="category.image" :alt="category.name + ' image'" class="h-20 mx-auto">
                            <p class="text-center font-bold text-6">{{category.name}}</p>
                        </div>
                    </button>
                </div>
            </div>
        </aside>

        <main class="mt-25">
            <div class="flex flex-wrap gap-8 justify-center max-h-85vh overflow-auto">
                <div v-for="dish of filteredDishes" :key="dish.id">
                    <div class="flex flex-col border-4 border-primary-green rounded-lg w-70 h-80 justify-center items-center gap-5">
                        <img :src="dish.image" :alt="`${dish.name} image`" class="h-30 mx-auto">
                        <div class="text-center">
                            <p class="font-bold text-5 max-w-65 overflow-hidden max-h-15">{{ dish.name }}</p>
                            <p class="font-bold text-primary-green">{{ dish.price }}</p>
                        </div>
                        <button @click="openMondal" class="bg-primary-green mx-auto px-8 py-2 rounded-full font-bold text-slate-100">ADD TO CART</button>
                    </div>
                </div>
            </div>      
        </main>

        <aside>
          <div class=" w-100 h-screen bg-slate-200 flex flex-col">
            <h3 class="h3 text-center mt-25">Food List</h3>
            <div class="flex flex-col scroll max-h-60vh overflow-auto gap-4 mt-8 mx-auto" ref="scrollContainer">

                <div class="flex w-90 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-12">
                    <div>
                        <p class="text-4 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                
                
            </div>
            <div class="mt-auto p-6">
              <hr class="border-t-2 border-dotted border-black">
              <div class="flex justify-between font-bold py-4">
                <p>Total:</p>
                <p>€ 53,01</p>
              </div>
              <button class="w-90 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6">Chekout</button>
            </div>
            <div v-if="isAtTop" class="absolute right-43 bottom-40 w-10 h-10 bg-primary-green flex items-center justify-center rounded-full bg-opacity-60 border-4 border-primary-green">
                <ChevronDown class="text-primary-green"/>
            </div>
            <div v-else class="absolute right-43 bottom-40 w-10 h-10 bg-primary-green flex items-center justify-center rounded-full bg-opacity-60 border-4 border-primary-green">
                <ChevronUp class="text-primary-green"/>
            </div>
          </div>
        </aside>
    </section> 
</template>

<script lang="ts">
import DishPopup from '../../../components/DishPopup.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, ChevronUp,  X } from 'lucide-vue-next';
export default {
    components: {
        DishPopup,
        ChevronLeft,
        ChevronDown,
        ChevronUp,
        X
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
            { id: 1, name: 'Classic Cheeseburger', categoryId: 1, description: 'Special burger', price: '€ 7,99', image: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png' },
            { id: 2, name: 'Veggie Burger', categoryId: 1, description: 'Special burger', price: '€ 10,99', image: 'https://i.pinimg.com/originals/66/71/ed/6671eddc555209aab720cc321a76846f.png' },
            { id: 3, name: 'Spicy Chicken Burger', categoryId: 1, description: 'Special burger', price: '€ 6,99', image: 'https://png.pngtree.com/png-clipart/20230423/original/pngtree-chicken-burger-png-image_9090795.png' },
            { id: 4, name: 'Barbecue Pulled Pork Burger', categoryId: 1, description: 'Special burger', price: '€ 5,99', image: 'https://static.vecteezy.com/system/resources/previews/025/228/111/non_2x/tasty-pulled-pork-burger-on-transparent-background-png.png' },
            { id: 5, name: 'Hawaiian Teriyaki Burger', categoryId: 1, description: 'Special burger', price: '€ 8,99', image: 'https://www.butterburgers.com.my/wp-content/uploads/2021/03/Big-Kahuna-Hawaiian-Teriyaki-Burger-Shadow.png' },
            { id: 6, name: 'Mediterranean Lamb Burger', categoryId: 1, description: 'Special burger', price: '€ 7,99', image: 'https://static.vecteezy.com/system/resources/previews/027/145/474/original/delicious-greek-lamb-burger-isolated-on-transparent-background-png.png' },
            { id: 7, name: 'Classic Cola', categoryId: 2, description: 'Refreshing cola drink', price: '€ 2,49', image: 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0de.png' },
            { id: 8, name: 'Lemonade Splash', categoryId: 2, description: 'Zesty lemonade', price: '€ 3,99', image: 'https://pngimg.com/d/lemonade_PNG16937.png' },
            { id: 9, name: 'Iced Tea Delight', categoryId: 2, description: 'Cool and soothing iced tea', price: '€ 2,99', image: 'https://freepngimg.com/save/35822-iced-tea-transparent/1200x1318' },
            { id: 11, name: 'Mango Tango Smoothie', categoryId: 2, description: 'Tropical mango smoothie', price: '€ 5,99', image: 'https://ismoothiescafe.com/cdn/shop/products/Mango_tango_grande.png?v=1539789667' },
            { id: 12, name: 'Strawberry Bliss Shake', categoryId: 2, description: 'Creamy strawberry shake', price: '€ 4,99', image: 'https://bahamabucks.com/wp-content/uploads/2021/02/Strawberry-Bliss-1000x1300-1.png' }
        ])

        // Make a computed property that filters the dishes based on the selected category
        const filteredDishes = computed(() => {
            return dishes.value.filter(dish => dish.categoryId === selectedCategory.value);
        });

        const router = useRouter()
        const id : any = ref<string>('')
        const scrollContainer = ref<HTMLElement | null>(null);
        const selectedCategory = ref(categories.value[0].id);
        const isAtTop = ref(true);
        let popupIsOpen = ref(false);

        
        const openMondal = () => {
            popupIsOpen.value = true;
            console.log(popupIsOpen.value)
        };

        const closePopup = () => {
            popupIsOpen.value = false;
            console.log(popupIsOpen.value)
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
            openMondal, 
            popupIsOpen,
            closePopup,

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
  background: #f1f1f1;
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
