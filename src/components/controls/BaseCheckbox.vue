<script setup lang="ts">
import { ref } from 'vue';
import Tick from '../../assets/images/icon-tick-16.svg'

defineProps<{
    name?: string
    id?: string
    invalid?: boolean
}>()

const isChecked = ref(false)
</script>

<template>
    <div class="size-3 relative">
        <input type="checkbox" :name="name" :id="name" class="size-[inherit] cursor-pointer opacity-0 peer"
            :aria-invalid="invalid" v-model="isChecked">
        <div
            class="absolute top-0 size-[inherit] bg-neutral-950 border-neutral-600 pointer-events-none border peer-hover:border-neutral-300 peer-focus-visible:border-lime-500 transition-colors peer-checked:bg-lime-500 peer-checked:border-lime-500 peer-checked:peer-hover:border-lime-500 peer-aria-invalid:border-red-400 peer-checked:peer-aria-invalid:border-lime-500">
        </div>
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 border-2 border-transparent peer-focus-visible:border-lime-500 pointer-events-none" />
        <img v-if="isChecked" :src="Tick" alt=""
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    </div>
</template>