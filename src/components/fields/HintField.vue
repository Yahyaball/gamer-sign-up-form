<script setup lang="ts">
import { computed } from 'vue';
import Alert from '../../assets/images/icon-alert.svg'

const props = defineProps<{
    name?: string,
    error?: boolean,
    hint?: string,
    password?: boolean,
    strength?: 0 | 1 | 2 | 3 | 4,
}>()

const textMap: Record<1 | 2 | 3 | 4, string> = {
    1: 'Weak',
    2: 'Fair',
    3: 'Good',
    4: 'Strong',
}

const strengthText = computed(() => {
    if (!props.strength) return undefined
    return textMap[props.strength]
})
</script>

<template>
    <div class="flex justify-between gap-1">
        <span class="preset-7 flex gap-1 items-center" :class="{ 'text-red-400': error }" :id="`${name}-hint`">
            <img v-if="error" :src="Alert" alt="">
            {{ error ? error : hint }}</span>
        <span v-if="password" class="preset-6 uppercase"
            :class="{ 'text-red-400': Number(strength) === 1, 'text-amber-400': Number(strength) === 2, 'text-lime-500': Number(strength) >= 3 }"
            id="password-strength">{{ strengthText }}</span>
    </div>
</template>