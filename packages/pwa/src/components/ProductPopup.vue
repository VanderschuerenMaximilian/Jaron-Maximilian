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
                                
                                <!-- {{ listExtras[0].filter(item => item.ingredient === 'Crispy bacon') }} -->
                                <h6 v-if="selectedProduct.category === 'Burgers'" class="h6 mt-4">Sauce:</h6>
                                <select v-if="selectedProduct.category === 'Burgers'" v-model="selectedSauce" class="p-2 mt-2 border-3 border-primary-green hover:border-green-900 rounded-md cursor-pointer">
                                    <option v-for="sauce in selectedProduct.sauce" :key="sauce" :value="sauce" :class="{ 'hidden': sauce.stock < 25 || isSauceAvailable(sauce) == false, 'bg-white': sauce.stock > 0 || isSauceAvailable(sauce) == true }">{{ sauce.name }}</option>
                                </select>

                                <!-- <div v-for="sauce in selectedProduct.sauce">
                                    <p>{{ isSauceAvailable(sauce) }}</p>
                                </div> -->


                                <!-- <div v-for="sauce in selectedProduct.sauce">
                                    <div v-if="getSauceStock(sauce.name) >= 25">{{ sauce.name }}</div>
                                    <div>{{ getSauceStock(sauce.name) }}</div>
                                </div>

                                <p>{{ listSauces }}</p> -->

                                

                                <!-- <p>{{ getSauceStock}}</p>
                                <p>{{ listSauces }}</p>
                                <p>{{ listExtras }}</p> -->
                                <!-- <p>{{ listSauces.filter(item => item.ingredient === sauce).map(item => item.stock)[0] !=0 }}</p> -->
                                <h6 v-if="selectedProduct.category == 'Burgers'" class="h6 mt-4">Extras (+ € 0.50):</h6>
                                <div  v-for="extra in selectedProduct.extra" class="flex flex-col">
                                    <label v-if="extra.stock >= extra.stockReduction && listExtras.filter(item => item.ingredient === extra.name).map(item => item.stock)[0] !=0" :key="extra.name" class="flex items-center mt-1 cursor-pointer select-none">
                                        <input v-if="extra.stock >= extra.stockReduction" type="checkbox" v-model="selectedToppings" :value="extra" class="mr-2 cursor-pointer">
                                        {{ extra.name }}
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

//TODO: wat ik eingelijk nog moet doen is de function moet eingelijk een list zijn dus die moet ik als ik het mee stuur met de popup een soldProducts meegeven zodat het een list doorstuur
// En dan moet ik die list gebruiken om te controleren of er nog genoeg stock is voor de saus en de toppings en dan moet ik die stock aanpassen

export default {
    components: {
        X,
        ChevronDown,
        ChevronUp,
    },
    setup() {
        const soldProducts = ref([
            { name: '', productId: "", image: "", price: 0, amount: 1, size: '', category: '', sauce: {}, toppings: {}, removables: [''], extraCost: 0, ingredients: [''] }
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
        listExtras: {
            type: Array,
            required: true,
        },
        listSauces: {
            type: Array,
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
            selectedSauce: [],
            selectedToppings: [],
            selectedRemovables: [],
        };
    },
    methods: {
        closePopup() {
            this.$emit('close');
        },
        handleData() {
            console.log(this.selectedSauce)
            if (this.selectedSauce.length === 0) {
                alert("Are you sure you don't want any sauce?");
            }
            else {
                const soldProduct = {
                    productName: this.selectedProduct.name,
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
                    ingredients: this.selectedProduct.ingredients,
                };
            
            this.$emit('product-submitted', soldProduct);
            this.clearForm();
        }
        },
        isSauceAvailable(sauce: any) {
            // console.log(sauce)
            // console.log("-------------------")
            // console.log(this.listSauces.filter(item => item.ingredient === sauce.name).map(item => item.stock)[0])
            if (sauce.stock <= 25 && this.listSauces.filter(item => item.ingredient === sauce.name).map(item => item.stock)[0] !== undefined || this.listSauces.filter(item => item.ingredient === sauce.name).map(item => item.stock)[0] < 25) {
                // Niet meer in stock
                return false;
            }
            else {
                return true;
            }
        },
        clearForm() {
            this.selectedSize = "Medium";
            this.selectedSauce = '';
            this.selectedToppings = [];
            this.selectedRemovables = [];
        },
    },
};
</script>
