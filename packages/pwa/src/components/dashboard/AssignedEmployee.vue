<template>
    <div>
        <p>
            {{ employee }}
        </p>
    </div>
</template>

<script lang="ts">

export default {
    props: ['employee', 'onInput'],
    mounted() {
        console.log(this.employee);
        if (typeof this.onInput === 'function') {
            this.onInput();
        }
    },
}
</script>