<script setup lang="ts">
import ReadoutRow from './ReadoutRow.vue';
import type { FieldName, FieldState } from '../../types/readout.ts';
import { computed, onMounted } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
    callsign?: string
    fields?: Partial<Record<FieldName, FieldState>>
    provisioned?: boolean
}>()

const total = computed(() => Object.values(props.fields ?? {}).length)
const readyCount = computed(() => Object.values(props.fields ?? {}).filter(state => state.status === 'ok' || state.status === 'locked').length)

onMounted(() => {
    gsap.from('.readout-anim', {
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(10)'
    })
})
</script>

<template>
    <div class="flex flex-col pt-3 border-t border-neutral-700">
        <span class="preset-6 flex justify-between uppercase readout-anim">
            Operator ID
            <span :class="{ 'text-lime-500': readyCount === total || provisioned }">{{ provisioned ? 'provisioned' :
                `${readyCount}/${total} ready` }}</span>
        </span>
        <span class="preset-2 pt-1 readout-anim"
            :class="fields?.callsign?.status === 'ok' || fields?.callsign?.status === 'locked' ? 'text-neutral-100' : 'uppercase'">{{
                callsign
            }}</span>
        <div class="pt-2 flex flex-col gap-1">
            <ReadoutRow v-for="(state, name) in fields" :key="name" :label="name" :status="state?.status"
                :status-text="state?.text" class="readout-anim" />
        </div>
    </div>
</template>