<template>
    <div v-if="this.$store.state.preloader" class="d-flex justify-content-center align-items-center bg-white w-100 h-100 position-absolute top-0 left-0">
        <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InlinePreloader',
    }
</script>

<style>

</style>