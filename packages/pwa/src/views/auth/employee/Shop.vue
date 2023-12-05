<template>
  <section>
    <div>
      <div v-if="error"> Error</div>
      <div v-if="loading"> Loading...</div>
      <h2 class="h2-green pt-25 text-center">Restaurants</h2>
      <div v-if="result" class="flex flex-wrap gap-8 mt-8 justify-center mx-auto max-w-400 ">
        <router-link v-for="shop in result.shops" :key="shop.id" :to="'shop/' + shop.name">
          <div class="w-[350px] md:w-[418px] h-[236px] rounded-3xl border-primary-green border-6 relative overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: 'url(' + shop.image + ')' }"></div>
            <div class="absolute flex bottom-6 w-full p-4 justify-center bg-primary-green opacity-90">
              <div class="text-white font-bold">
                <p>{{ shop.name }}</p>
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
import { useQuery } from '@vue/apollo-composable'
import { GET_SHOPS } from '../../../graphql/shop.query'


export default {
  setup() {
    const router = useRouter();
    
    const { result, loading, error } = useQuery(GET_SHOPS)
    
    const goToShopDetail = (name:any) => {
      router.push(`/shop/${name}`);
    }


    return {
      goToShopDetail,
      result,
      loading,
      error
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
