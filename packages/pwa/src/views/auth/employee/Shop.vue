<template>
  <section>
    <div>
      <h2 class="h2-green pt-25 text-center">Restaurants</h2>
      <div class="flex flex-wrap gap-8 mt-8 justify-center mx-auto max-w-400 ">
        <router-link v-for="restaurant in restaurants" :key="restaurant.id" :to="'shop/' + restaurant.id">
          <div class="w-[418px] h-[236px] rounded-3xl border-primary-green border-6 relative overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: 'url(' + restaurant.imageUrl + ')' }"></div>
            <div class="absolute flex bottom-6 w-full p-4 justify-center bg-primary-green opacity-90">
              <div class="text-white font-bold">
                <p>{{ restaurant.name }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();

    // Sample restaurant data
    const restaurants = ref([
      { id: 1, name: 'Boomerang Snack', imageUrl: 'https://www.bellewaerde.be/sites/default/files/styles/1280x670/public/entertainment/2022-08/boomerang-snack_1.jpg?itok=Opke8azA' },
      { id: 2, name: 'Frituur', imageUrl: 'https://www.bellewaerde.be/sites/default/files/styles/1280x670/public/entertainment/2022-08/friterie.jpg?itok=_czIbAEl' },
      { id: 3, name: 'Fish Corner', imageUrl: 'https://www.bellewaerde.be/sites/default/files/styles/1280x670/public/entertainment/2022-08/fish-corner.jpg?itok=S_fImvWG' }
      // Add more restaurants as needed
    ])

    const goToShopDetail = (id:any) => {
      router.push(`/shop/${id}`);
    }

    return {
      restaurants,
      goToShopDetail,
    }
  },
}
</script>

<style>
.blur-background {
  backdrop-filter: blur(10px);
  /* Adjust the blur radius as needed */
  -webkit-backdrop-filter: blur(10px);
  /* For Safari */
}
</style>
