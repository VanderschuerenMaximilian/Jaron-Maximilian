<script lang="ts">
import { provide } from 'vue';
import { RouterView } from 'vue-router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useGraphql from './composables/useGraphql';
import useLanguage from './composables/useLanguage';
import { useI18n } from 'vue-i18n'

export default {
  components: {
    RouterView
  },
  setup() {
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()
    
    // Makes everything accessible in the scope
    provide(DefaultApolloClient, apolloClient)

    setLocale(locale.value)

    return {}
  }
}
</script>

<template>
  <RouterView />
</template>

