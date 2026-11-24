<script setup lang="ts">
import Eye from '../../assets/images/icon-eye.svg'
import EyeOff from '../../assets/images/icon-eye-off.svg'
import { ref } from 'vue';

const visible = defineModel<boolean>('visible', { default: false })
const statusMessage = ref('')

function toggleVisibility() {
    visible.value = !visible.value
    statusMessage.value = visible.value ? 'Password hidden' : 'Password shown'
}

defineProps<{
    disabled?: boolean
}>()
</script>

<template>
    <button type="button"
        class="group not-disabled:cursor-pointer size-5 flex items-center justify-center border-2 focus-visible:border-lime-500 border-transparent outline-none disabled:opacity-75 transition-colors"
        @click="toggleVisibility()" :disabled="disabled">
        <img :src="visible ? EyeOff : Eye" :alt="visible ? 'Hide password' : 'Show password'"
            class="group-not-disabled:hover:brightness-150 transition-all">
    </button>
    <p v-if="!disabled" class="sr-only" aria-live="polite">{{ statusMessage }}</p>
</template>