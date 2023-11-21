<template>
    <main class="pt-[70px]">
        {{ currentUrl }}
    </main>
</template>

<script lang="ts">
export default {
    data() {
        return {
            currentUrl: '',
        }
    },
    mounted() {
        this.currentUrl = window.location.href;
    },
    setup() {
        return {}
    }
}
</script>