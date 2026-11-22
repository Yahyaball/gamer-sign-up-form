<script setup lang="ts">
defineProps<{
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
}>()
</script>

<template>
    <button :type="type"
        class="relative cursor-pointer preset-5__bold text-neutral-950 px-2 py-1.5 bg-lime-500 not-disabled:hover:shadow-button-hover not-disabled:hover:bg-neutral-50 transition-all outline-0 group disabled:cursor-wait disabled:bg-neutral-900 disabled:border disabled:border-lime-500 disabled:text-lime-500"
        :disabled="loading">
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-transparent pointer-events-none group-focus-visible:border-lime-500 size-[calc(100%+0.5rem)] transition-colors" />
        <slot />
    </button>
</template>