<template>
    <section class="mb-8">
        <h2 class="h2 mb-1">Dashboard</h2>
        <div class="flex gap-1">
            <p class="text-sm">Dashboard</p>
            <p class="text-sm font-semibold">></p>
            <p class="text-sm">{{ currentRoute }}</p>
        </div>
    </section>
</template>

<script lang="ts">
export default {
    props: {
        currentRoute: {
            type: String,
            required: true,
        },
    }
}
</script>