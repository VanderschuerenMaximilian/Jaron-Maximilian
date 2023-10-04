<!-- Modal.vue -->
<template>
    <section v-if="isOpen" class="modal">
        <div class="modal-content">
            <div class="flex flex-col">
                <div class="flex absolute h-screen w-screen justify-center">
                    <div class="relative z-10 flex w-50vw h-80vh mt-25 bg-slate-100 border-t-14 border-primary-green rounded-lg">
                        <button @click="closePopup" class="absolute right-4 top-4">
                            <X class="w-6 h-6 text-primary-green" />
                        </button>
                        <div class="flex flex-col mx-auto">
                            <div class="flex mt-7 gap-10 justify-center">
                                <div class="flex flex-col gap-2">
                                    <h3 class="h3">Classic Cheeseburger</h3>
                                    <p class="text-slate-500">Tomato, salad, onion, cheese, pickle.</p>
                                    <p class="font-bold text-primary-green">€7,99</p>
                                </div>
                                <img src="https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png"
                                    alt="Burger image" class="w-30 h-30">
                            </div>
                            <div class="flex flex-col max-h-46vh overflow-auto px-4 mt-4">
                                <h6 class="h6">Size:</h6>
                                <select v-model="selectedSize" class="p-2 mt-2 border-3 border-primary-green rounded-md">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                                <h6 class="h6 mt-4">Sauce:</h6>
                                    <select v-model="selectedSauce" class="p-2 mt-2 border-3 border-primary-green rounded-md">
                                        <option value="ketchup">Ketchup</option>
                                        <option value="mayonaise">Mayonaise</option>
                                        <option value="mosterd">Mosterd</option>
                                        <option value="barbecuesaus">Barbecuesaus</option>
                                        <option value="specialsaus">Specialsaus</option>
                                    </select>
                                <h6 class="h6 mt-4">Extras:</h6>
                                <div class="flex flex-col">
                                    <template v-for="(topping, index) in toppingsToShow" :key="index">
                                    <label class="flex items-center mt-1">
                                        <input type="checkbox" v-model="selectedToppings" :value="topping" class="mr-2">
                                        {{ topping }}
                                    </label>
                                    </template>
                                    <div @click="toggleToppingsDisplay" class="flex">
                                        <button class="text-primary-green mt-2 text-3">
                                        {{ showAllToppings ? 'Show Less' : 'Show More' }}
                                        </button>
                                        <ChevronUp v-if="showAllToppings" class="w-4 h-4 text-primary-green mt-2 cursor-pointer" />
                                        <ChevronDown v-else class="w-4 h-4 text-primary-green mt-2 cursor-pointer" />
                                    </div>
                                </div>
                                <h6 class="h6 mt-4">Choice burger:</h6>
                                <div class="flex flex-col">
                                    <template v-for="(ingredient, index) in ingredientsToShow" :key="index">
                                    <label class="flex items-center mt-1">
                                        <input type="checkbox" v-model="selectedIngredients" :value="ingredient" class="mr-2">
                                        {{ ingredient }}
                                    </label>
                                    </template>
                                    <div @click="toggleIngredientsDisplay" class="flex">
                                        <button class="text-primary-green mt-2 text-3">
                                        {{ showAllIngredients ? 'Show Less' : 'Show More' }}
                                        </button>
                                        <ChevronUp v-if="showAllIngredients" class="w-4 h-4 text-primary-green mt-2 cursor-pointer" />
                                        <ChevronDown v-else class="w-4 h-4 text-primary-green mt-2 cursor-pointer" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button class="absolute flex bottom-4 left-4 bg-primary-green mt-4">Add to cart</button>
                        <button class="absolute flex bottom-4 right-4 bg-primary-green mt-4 text-slate-200 font-bold py-3 px-24 rounded-lg">Add to card</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { X, ChevronDown , ChevronUp } from 'lucide-vue-next';

export default {
    components: {
        X,
        ChevronDown,
        ChevronUp,
    },

    props: ['isOpen'],
    data() {
        return {
            selectedSize: 'small', // Default size
            selectedSauce: 'ketchup', // Default sauce
            selectedToppings: [], // Array to store selected toppings
            selectedIngredients: [], // Array to store selected toppings
            toppings: ['Tomato', 'Salad', 'Onion', 'Cheese', 'Pickle'], // List of available toppings
            ingredients: ['Without tomato', 'without salad', 'without onion', 'without cheese', 'Without pickle'], // List of available toppings
            toppingsToShow : [''], // Toppings to display
            ingredientsToShow : [''], // Toppings to display
            showAllToppings: false, // Flag to toggle between showing all and showing limited toppings
            showAllIngredients: false, // Flag to toggle between showing all and showing limited toppings
            toppingsToShowCount: 3, // Number of toppings to show initially
            ingredientsToShowCount: 3, // Number of toppings to show initially
        };
    },
    methods: {
        closePopup() {
            this.$emit('close');
        },
        toggleToppingsDisplay() {
            this.showAllToppings = !this.showAllToppings;
            this.updateToppingsToShow();
        },
        updateToppingsToShow() {
            if (this.showAllToppings) {
                this.toppingsToShow = this.toppings;
            } else {
                this.toppingsToShow = this.toppings.slice(0, this.toppingsToShowCount);
            }
        },
        toggleIngredientsDisplay() {
            this.showAllIngredients = !this.showAllIngredients;
            this.updateIngredientsToShow();
        },
        updateIngredientsToShow() {
            if (this.showAllIngredients) {
                this.ingredientsToShow = this.ingredients;
            } else {
                this.ingredientsToShow = this.ingredients.slice(0, this.ingredientsToShowCount);
            }
        },
    },
    mounted() {
        this.updateToppingsToShow(); // Toon initiële toppings
        this.updateIngredientsToShow(); // Toon initiële toppings
    },
};
</script>