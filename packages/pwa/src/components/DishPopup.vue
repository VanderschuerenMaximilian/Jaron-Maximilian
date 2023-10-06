<!-- Modal.vue -->
<template>
    <section v-if="isOpen" class="modal">
        <div class="modal-content">
            <div class="flex flex-col">
                <div class="flex absolute h-screen w-screen justify-center">
                    <div class="relative z-10 flex w-35vw h-70vh mt-45 bg-slate-100 border-t-14 border-primary-green rounded-lg">
                        <button @click="closePopup" class="absolute right-4 top-4">
                            <X class="w-6 h-6 text-primary-green hover:text-green-900" />
                        </button>
                        <div class="flex flex-col mx-auto w-27vw">
                            <div class="flex mt-7 gap-10 justify-center">
                                <div class="flex flex-col gap-2">
                                    <h3 class="h3">{{ selectedDish.name }}</h3>
                                    <p class="text-slate-500">Tomato, salad, onion, cheese, pickle.</p>
                                    <p class="font-bold text-primary-green">{{'€ ' + selectedDish.price }}</p>
                                </div>
                                <img :src="selectedDish.image"
                                    alt="Burger image" class="w-30 h-30">
                            </div>
                            <div class="flex flex-col max-h-46vh overflow-auto px-4 mt-4">
                                <h6 class="h6">Size:</h6>
                                <select v-model="selectedSize" class="p-2 mt-2 border-3 border-primary-green hover:border-green-900 rounded-md cursor-pointer">
                                    <option v-for="size of sizes" :value="size">{{ size }}</option>
                                </select>
                                <h6 class="h6 mt-4">Sauce:</h6>
                                    <select v-model="selectedSauce" class="p-2 mt-2 border-3 border-primary-green hover:border-green-900 rounded-md cursor-pointer">
                                        <option v-for="sauce of sauces" :value="sauce">{{ sauce }}</option>
                                    </select>
                                <h6 class="h6 mt-4">Extras (+ € 0,50):</h6>
                                <div class="flex flex-col">
                                    <template v-for="(topping, index) in toppingsToShow" :key="index">
                                        <label class="flex items-center mt-1 cursor-pointer select-none">
                                            <input type="checkbox" v-model="selectedToppings" :value="topping" class="mr-2 cursor-pointer">
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
                                <h6 class="h6 mt-4">Removables:</h6>
                                <div class="flex flex-col">
                                    <template v-for="(ingredient, index) in removablesToShow" :key="index">
                                    <label class="flex items-center mt-1 cursor-pointer select-none">
                                        <input type="checkbox" v-model="selectedRemovables" :value="ingredient" class="mr-2 cursor-pointer">
                                        {{ ingredient }}
                                    </label>
                                    </template>
                                    <div @click="toggleRemovablesDisplay" class="flex">
                                        <button class="text-primary-green mt-2 text-3">
                                        {{ showAllRemovables ? 'Show Less' : 'Show More' }}
                                        </button>
                                        <ChevronUp v-if="showAllRemovables" class="w-4 h-4 text-primary-green mt-2 cursor-pointer" />
                                        <ChevronDown v-else class="w-4 h-4 text-primary-green mt-2 cursor-pointer" />
                                    </div>
                                </div>

                            </div>
                            <button @click="handleData" class="bottom-4 bg-primary-green my-5 text-slate-200 mx-20 font-bold py-3 rounded-lg hover:bg-green-900">Add to card</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { X, ChevronDown , ChevronUp, MinusCircle, PlusCircle } from 'lucide-vue-next';
import { ref } from 'vue';
import { Dish as IDish } from '../interfaces/Dish';

export default {
    components: {
    X,
    ChevronDown,
    ChevronUp,
    MinusCircle,
    PlusCircle,

},
    setup() {
        const soldDishs = ref([
            { name: '', image: "", price: 0 , amount: 1 , size: '', sauce: '', toppings: [''], removables: [''], extraCost: 0 }
        ])

        const handleMinusClick = () => {
            if (soldDishs.value.amount > 1) {
                soldDishs.value.amount--;
            }
        }

        const handlePlusClick = () => {
            if (soldDishs.value.amount < 10) {
                soldDishs.value.amount++;
            }

        }

        return {
            soldDishs,
            handleMinusClick,
            handlePlusClick,
        };
    },

    props: {
        ['isOpen']: {
            type: Boolean,
            required: true,
        },
        selectedDish: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selectedSize: 'small', // Default size
            selectedSauce: 'ketchup', // Default sauce
            selectedToppings: [], // Array to store selected toppings
            selectedRemovables: [], // Array to store selected toppings
            sizes: ['small', 'medium', 'large'], // List of available sizes
            sauces: ['ketchup', 'mayonaise', 'mosterd', 'barbecuesaus', 'specialsaus'], // List of available sauces
            toppings: ['Tomato', 'Salad', 'Onion', 'Cheese', 'Pickle'], // List of available toppings
            removables: ['Tomato', 'Salad', 'Onion', 'Cheese', 'Pickle'], // List of available toppings
            extraCost: 0, // Extra cost for toppings
            toppingsToShow : [''], // Toppings to display
            removablesToShow : [''], // Toppings to display
            showAllToppings: false, // Flag to toggle between showing all and showing limited toppings
            showAllRemovables: false, // Flag to toggle between showing all and showing limited toppings
            toppingsToShowCount: 3, // Number of toppings to show initially
            removablesToShowCount: 3, // Number of toppings to show initially
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
        toggleRemovablesDisplay() {
            this.showAllRemovables = !this.showAllRemovables;
            this.updateRemovablesToShow();
        },
        updateRemovablesToShow() {
            if (this.showAllRemovables) {
                this.removablesToShow = this.removables;
            } else {
                this.removablesToShow = this.removables.slice(0, this.removablesToShowCount);
            }
        },
        handleData() {
            const soldDish = {
                name: this.selectedDish.name,
                image: this.selectedDish.image,
                price: this.selectedDish.price,
                amount: 1,
                size: this.selectedSize,
                sauce: this.selectedSauce,
                toppings: this.selectedToppings,
                removables: this.selectedRemovables,
                // TODO: Calculate extra cost based on selected toppings and ingredients price in database (for now, just use a fixed value)
                extraCost: this.selectedToppings.length * 0.5,
            };

            this.$emit('dish-submitted', soldDish);
            console.log(soldDish);
            this.clearForm();

        },

        clearForm() {
            // Clear the form fields or set them to default values
            this.selectedSize = 'small';
            this.selectedSauce = 'ketchup';
            this.selectedToppings = [];
            this.selectedRemovables = [];
            this.showAllToppings = false;
            this.showAllRemovables = false;

            // You may also need to reset other form-related data
            // based on your specific implementation
        },
    },
    mounted() {
        this.updateToppingsToShow(); // Toon initiële toppings
        this.updateRemovablesToShow(); // Toon initiële toppings
    },
};
</script>