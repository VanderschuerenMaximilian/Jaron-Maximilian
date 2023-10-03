<template>
    <section class="flex justify-between">
        <aside>
            <div class="ml-4 mt-4" v-for="restaurant of filteredRestaurants" :key="restaurant.id">
                <div class="flex flex-col gap-4">
                    <button>
                        <div class="flex border-4 border-primary-green rounded-lg p-2 w-80 justify-center">
                            <ChevronLeft class="text-primary-green" />
                            <p class="text-primary-green pr-2" v-if="restaurant.id == id">{{ restaurant.name }}</p>
                        </div>
                    </button>
                    <div class="w-80 h-50 border-primary-green bg-primary-green bg-opacity-70 rounded-lg">
                        <div class="flex flex-col h-full justify-center">
                            <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-30 mx-auto">
                            <p class="text-center font-bold text-6">Burger</p>
                        </div>
                    </div>
                    <div class="w-80 h-50 border-primary-green bg-[#D4D4D4] bg-opacity-70 rounded-lg">
                        <div class="flex flex-col h-full justify-center">
                            <img src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png" alt="Burger image" class="h-30 mx-auto">
                            <p class="text-center font-bold text-6">Drinks</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <main>
            midden       
        </main>
        <aside>
          <div class=" mt-1 w-110 h-92vh bg-slate-200 flex flex-col">
            <h3 class="h3 text-center mt-4">Food List</h3>
            <div class="flex flex-col scroll max-h-60vh overflow-auto gap-4 mt-8 mx-auto" ref="scrollContainer">
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
                        <p class="text-3">Special burger</p>
                        <p class="text-3 text-primary-green font-bold">€ 7,99</p>
                    </div>
                    <X class="absolute top-4 right-4"/>
                </div>
                <div class="flex w-100 h-25 bg-white items-center p-4 gap-3 rounded-2xl relative">
                    <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png" alt="Burger image" class="h-20">
                    <div>
                        <p class="text-5 font-bold max-w-55 whitespace-nowrap text-ellipsis overflow-hidden ...">Classic Cheeseburger sdfsf</p>
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
              <button class="w-100 h-15 bg-primary-green border rounded-lg drop-shadow-lg text-white font-bold text-6">Chekout</button>
            </div>
            <div v-if="isAtTop" class="absolute right-48 bottom-40 w-10 h-10 bg-primary-green flex items-center justify-center rounded-full bg-opacity-60 border-4 border-primary-green">
                <ChevronDown class="text-primary-green"/>
            </div>
            <div v-else class="absolute right-48 bottom-40 w-10 h-10 bg-primary-green flex items-center justify-center rounded-full bg-opacity-60 border-4 border-primary-green">
                <ChevronUp class="text-primary-green"/>
            </div>
          </div>
        </aside>
    </section> 
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronDown, ChevronUp,  X } from 'lucide-vue-next';
export default {
    components: {
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    X,
},
    setup() {
        const router = useRouter()
        const id : any = ref<string>('')
        const scrollContainer = ref<HTMLElement | null>(null);
        const isAtTop = ref(true);
        const restaurants = ref([
            { id: 1, name: 'Boomerang Snack', },
            { id: 2, name: 'Frituur', },
            { id: 3, name: 'Fish Corner',  }
        ])

        onMounted(() => {
            if (router.currentRoute.value.params.id) {
                id.value = router.currentRoute.value.params.id
            }
            if (scrollContainer.value) {
                scrollContainer.value.addEventListener('scroll', handleScroll);
                console.log(scrollContainer.value)
            }
        })

        onUnmounted(() => {
            if (scrollContainer.value) {
                scrollContainer.value.removeEventListener('scroll', handleScroll);
                console.log(scrollContainer.value)
            }
        });

        const handleScroll = () => {
            if (scrollContainer.value) {
                isAtTop.value = scrollContainer.value.scrollTop === 0;
            }
        };
        const filteredRestaurants = computed(() => {
            return restaurants.value.filter(restaurant => restaurant.id == id.value)
        })

        return {
            id,
            restaurants,
            filteredRestaurants,
            scrollContainer,
            isAtTop, 
        }
    },
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 00px; /* breedte van de scrollbar */

  }
</style>
