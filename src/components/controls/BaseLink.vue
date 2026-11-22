<script setup lang="ts">
defineProps<{
    href?: string
}>()
</script>

<template>
    <a :href="href"
        class="text-lime-500 decoration-dotted underline hover:text-neutral-50 border-2 border-transparent focus-visible:border-lime-500 outline-0 transition-colors">
        <slot />
    </a>
</template>