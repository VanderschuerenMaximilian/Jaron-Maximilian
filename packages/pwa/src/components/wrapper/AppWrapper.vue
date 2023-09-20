<template>
    <div class="flex flex-col gap-8 items-center">
        <AppHeaderVue />
        <RouterView />
        <AppFooterVue />
    </div>
    <!-- TODO: geeft de mogelijkheid om de header & footer aan of uit te zetten -->
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