<script setup lang="ts">
import gsap from 'gsap';
import { watch } from 'vue';

const props = defineProps<{
    label?: string
    status?: 'pending' | 'ok' | 'locked' | 'error'
    statusText?: string
}>()

watch(() => props.status, (newVal) => {
    if (newVal === 'error') {
        gsap.killTweensOf(`#${props.label}-readout-anim`)
        gsap.to(`#${props.label}-readout-anim`, { opacity: 0, duration: 0.1, repeat: 3, yoyo: true, ease: 'steps(1)' })
    }
})
</script>

<template>
    <span class="flex items-center gap-1.5 preset-6 uppercase">
        {{ label }}
        <hr class="flex-1 border-0 border-t border-dotted border-neutral-600" />
        <span :id="`${label}-readout-anim`"
            :class="{ 'text-neutral-400': status === 'pending', 'text-neutral-100': status === 'ok' || status === 'locked', 'text-red-400': status === 'error' }">
            {{ statusText }}
        </span>
    </span>
</template>