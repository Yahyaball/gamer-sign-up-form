<script setup lang="ts">
import Eye from '../../assets/images/icon-eye.svg'
import EyeOff from '../../assets/images/icon-eye-off.svg'
import { ref } from 'vue';

const isVisible = ref(false)
const statusMessage = ref('')
const emit = defineEmits(['toggle'])

function toggleVisibility() {
    isVisible.value = !isVisible.value
    statusMessage.value = isVisible.value ? 'Password shown' : 'Password hidden'
    emit('toggle')
}
</script>

<template>
    <button type="button"
        class="group not-disabled:cursor-pointer size-5 flex items-center justify-center border-2 focus-visible:border-lime-500 border-transparent outline-none disabled:opacity-75 transition-colors"
        @click="toggleVisibility()">
        <img :src="isVisible ? EyeOff : Eye" alt="Show password"
            class="group-not-disabled:hover:brightness-150 transition-all">
    </button>
    <p class="sr-only" aria-live="polite">{{ statusMessage }}</p>
</template>