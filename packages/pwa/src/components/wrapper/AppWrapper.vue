<template>
    <div class="flex flex-col gap-8 items-center">
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