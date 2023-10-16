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
                                    <h3 class="h3">{{ selectedProduct.name }}</h3>
                                    <p class="text-slate-500">{{ selectedProduct.description }}</p>
                                    <p class="font-bold text-primary-green">{{ '€ ' + selectedProduct.price }}</p>
                                </div>
                                <img :src="selectedProduct.image" alt="Burger image" class="w-30 h-30">
                            </div>
                            <div class="flex flex-col h-500 max-h-46vh overflow-auto px-4 mt-1">
                                <h6 v-if="selectedProduct.category !== 'Burgers'" class="h6">Size:</h6>
                                <select v-if="selectedProduct.category !== 'Burgers'" v-model="selectedSize" class="p-2 mt-2 border-3 border-primary-green hover:border-green-900 rounded-md cursor-pointer">
                                    <option v-for="size in selectedProduct.size" :key="size" :value="size">{{ size }}</option>
                                </select>
                                <h6 v-if="selectedProduct.category === 'Burgers'" class="h6 mt-4">Sauce:</h6>
                                <select v-if="selectedProduct.category === 'Burgers'" v-model="selectedSauce" class="p-2 mt-2 border-3 border-primary-green hover:border-green-900 rounded-md cursor-pointer">
                                    <option v-for="sauce in selectedProduct.sauce" :key="sauce" :value="sauce">{{ sauce }}</option>
                                </select>
                                <h6 v-if="selectedProduct.category == 'Burgers'" class="h6 mt-4">Extras (+ € 0.50):</h6>
                                <div class="flex flex-col">
                                    <label v-for="extra in selectedProduct.extra" :key="extra" class="flex items-center mt-1 cursor-pointer select-none">
                                        <input type="checkbox" v-model="selectedToppings" :value="extra" class="mr-2 cursor-pointer">
                                        {{ extra }}
                                    </label>
                                </div>
                                <h6 v-if="selectedProduct.category == 'Burgers'" class="h6 mt-4">Removables:</h6>
                                <div class="flex flex-col">
                                    <label v-for="removable in selectedProduct.removable" :key="removable" class="flex items-center mt-1 cursor-pointer select-none">
                                        <input type="checkbox" v-model="selectedRemovables" :value="removable" class="mr-2 cursor-pointer">
                                        {{ removable }}
                                    </label>
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
import { X, ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref } from 'vue';
import { Product as IProduct } from '../interfaces/Product';

export default {
    components: {
        X,
        ChevronDown,
        ChevronUp,
    },
    setup() {
        const soldProducts = ref([
            { name: '', image: "", price: 0, amount: 1, size: '', category: '', sauce: '', toppings: [''], removables: [''], extraCost: 0 }
        ]);

        return {
            soldProducts,
        };
    },

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        selectedProduct: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selectedSize: "Medium",
            selectedSauce: 'Ketchup',
            selectedToppings: [],
            selectedRemovables: [],
        };
    },
    methods: {
        closePopup() {
            this.$emit('close');
        },
        handleData() {
            const soldProduct = {
                name: this.selectedProduct.name,
                image: this.selectedProduct.image,
                price: this.selectedProduct.price,
                amount: 1,
                size: this.selectedSize,
                category: this.selectedProduct.category,
                sauce: this.selectedSauce,
                toppings: this.selectedToppings,
                removables: this.selectedRemovables,
                extraCost: this.selectedToppings.length * 0.5,
            };

            this.$emit('product-submitted', soldProduct);
            this.clearForm();
        },
        clearForm() {
            this.selectedSize = "Medium";
            this.selectedSauce = 'Ketchup';
            this.selectedToppings = [];
            this.selectedRemovables = [];
        },
    },
};
</script>
