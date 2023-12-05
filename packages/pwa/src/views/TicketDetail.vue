<template>
    <main class="pt-[70px]">
        {{ currentUrl }}
    </main>
</template>

<script lang="ts">
export default {
    setup() {
        const currentUrl = window.location.href;

        return {
            currentUrl,
        }
    }
}
</script>