<script setup lang="ts">
defineProps<{
    note: 'full' | 'short'
}>()
</script>

<template>
    <p class="flex justify-between pb-2 border-b border-neutral-700 preset-6 uppercase">
        <span class="text-neutral-100">New operator</span>
        <span class="md:hidden">All required</span>
        <span class="max-md:hidden">All fields required</span>
    </p>
</template>