<script setup lang="ts">
defineProps<{
    strengthLevel?: 0 | 1 | 2 | 3 | 4
}>()
</script>

<template>
    <div class="grid grid-rows-1 grid-cols-4 gap-0.5">
        <div class="h-0.5"
            :class="{ 'bg-neutral-700': Number(strengthLevel) < 1, 'bg-red-400': Number(strengthLevel) === 1, 'bg-amber-400': Number(strengthLevel) === 2, 'bg-lime-500': Number(strengthLevel) >= 3 }" />
        <div class="h-0.5"
            :class="{ 'bg-neutral-700': Number(strengthLevel) < 2, 'bg-amber-400': Number(strengthLevel) === 2, 'bg-lime-500': Number(strengthLevel) >= 3 }" />
        <div class="h-0.5"
            :class="{ 'bg-neutral-700': Number(strengthLevel) < 3, 'bg-lime-500': Number(strengthLevel) >= 3 }" />
        <div class="h-0.5"
            :class="{ 'bg-neutral-700': Number(strengthLevel) < 4, 'bg-lime-500': Number(strengthLevel) >= 4 }" />
    </div>
</template>