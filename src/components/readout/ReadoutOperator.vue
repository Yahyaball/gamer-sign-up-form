<script setup lang="ts">
defineProps<{
    callsign?: string
}>()
</script>

<template>
    <p class="preset-6 flex pt-2 border-t border-neutral-700 justify-between">
        <span class="uppercase">Operator ID</span>
        <span class="uppercase">{{ callsign }}</span>
    </p>
</template>