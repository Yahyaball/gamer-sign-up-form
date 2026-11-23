<script setup lang="ts">
defineProps<{
    callsign?: string
    assigned?: boolean
}>()
</script>

<template>
    <p class="preset-6 flex pt-2 border-t border-neutral-700 justify-between">
        <span class="uppercase">Operator ID</span>
        <span :class="assigned ? 'text-neutral-100' : 'uppercase'">{{ callsign }}</span>
    </p>
</template>