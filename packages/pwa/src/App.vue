<script lang="ts">
import { provide } from 'vue';
import { RouterView } from 'vue-router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useGraphql from './composables/useGraphql';

export default {
  components: {
    RouterView
  },
  setup() {
    const { apolloClient } = useGraphql()
    
    // Makes everything accessible in the scope
    provide(DefaultApolloClient, apolloClient)

    return {}
  }
}
</script>

<template>
  <RouterView />
</template>

