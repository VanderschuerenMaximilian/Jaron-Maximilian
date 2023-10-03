<template>
    <div class="">
        <AppHeaderVue />
        <RouterView />
        <AppFooterVue />
    </div>
</template>

<script lang="ts">
import AppHeaderVue from '../generic/AppHeader.vue';
import AppFooterVue from '../generic/AppFooter.vue';
export default {
    components: {
        AppHeaderVue,
        AppFooterVue,
    },
    setup() {
        return {}
    }
}
</script>