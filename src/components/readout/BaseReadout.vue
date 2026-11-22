<script setup lang="ts">
import ReadoutRow from './ReadoutRow.vue';

</script>

<template>
    <div class="flex flex-col pt-3 border-t border-neutral-700">
        <span class="preset-6 flex justify-between uppercase">
            Operator ID
            <span>0/5 ready</span>
        </span>
        <span class="preset-2 uppercase pt-1">Unassigned</span>
        <div class="pt-2 flex flex-col gap-1">
            <ReadoutRow label="callsign" status="pending" status-text="pending" />
            <ReadoutRow label="email" status="pending" status-text="pending" />
            <ReadoutRow label="password" status="pending" status-text="pending" />
            <ReadoutRow label="confirm" status="pending" status-text="pending" />
            <ReadoutRow label="terms" status="pending" status-text="required" />
        </div>
    </div>
</template>