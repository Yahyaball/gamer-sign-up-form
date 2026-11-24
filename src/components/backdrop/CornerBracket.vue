<script setup lang="ts">
defineProps<{
    bottom?: boolean
}>()
</script>

<template>
    <div class="pointer-events-none border-lime-500 size-3"
        :class="bottom ? 'border-b-2 border-r-2' : 'border-t-2 border-l-2'" />
</template>