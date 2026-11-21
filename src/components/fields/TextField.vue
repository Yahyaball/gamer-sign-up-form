<script setup lang="ts">
import { ref } from 'vue';
import TickTwenty from '../../assets/images/icon-tick-20.svg'
import HintField from './HintField.vue';
import RevealButton from './RevealButton.vue';
import StrengthMeter from './StrengthMeter.vue';

defineProps<{
    label?: string,
    name?: string,
    placeholder?: string,
    hint?: string,
    type?: string,
    valid?: boolean,
    error?: string,
    locked?: boolean,
    strengthLevel?: 0 | 1 | 2 | 3 | 4,
}>()

const passwordShown = ref(false)
</script>

<template>
    <div class="flex flex-col gap-1">
        <label :for="name" class="preset-6 uppercase text-neutral-300"><span aria-hidden="true"
                class="text-lime-500 pr-1">></span>{{ label }}</label>
        <div
            class="relative shadow-well bg-neutral-950 border border-neutral-600 has-aria-invalid:border-red-400 preset-4 transition-colors hover:border-neutral-300 has-[input:focus-visible]:border-lime-500 outline-0 text-neutral-100 flex items-center">
            <div
                class="absolute size-[calc(100%+0.75rem)] pointer-events-none border-2 -m-0.75 border-transparent has-[+input:focus-visible]:border-lime-500 transition-colors" />
            <input :id="name" :name="name" :type="type === 'password' ? (passwordShown ? 'text' : 'password') : type"
                :placeholder="placeholder"
                class="py-1.5 px-2 outline-0 placeholder:text-neutral-500 disabled:text-neutral-300 flex-1 w-full"
                :aria-invalid="error ? true : false"
                :aria-describedby="`${name}-hint ${strengthLevel ? 'password-strength' : ''}`" :disabled="locked" />
            <img v-if="valid" :src="TickTwenty" alt="valid" :class="strengthLevel !== undefined ? undefined : 'pr-2'">
            <RevealButton v-if="type === 'password'" @toggle="passwordShown = !passwordShown" />
        </div>
        <StrengthMeter v-if="strengthLevel !== undefined" :strength-level="strengthLevel" />
        <HintField :name="name" :error="error ? true : false" :hint="hint" :password="strengthLevel ? true : false"
            :strength="strengthLevel" />
    </div>
</template>