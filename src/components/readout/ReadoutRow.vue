<script setup lang="ts">
defineProps<{
    label?: string
    status?: 'pending' | 'ok' | 'locked' | 'error'
    statusText?: string
}>()
</script>

<template>
    <span class="flex items-center gap-1.5 preset-6 uppercase">
        {{ label }}
        <hr class="flex-1 border-0 border-t border-dotted border-neutral-600" />
        <span
            :class="{ 'text-neutral-400': status === 'pending', 'text-neutral-100': status === 'ok' || status === 'locked', 'text-red-400': status === 'error' }">
            {{ statusText }}
        </span>
    </span>
</template>