<script setup lang="ts">
import Logo from './assets/images/logo.svg'
</script>

<template>
  <header class="flex flex-col gap-4">
    <div class="flex justify-between items-center preset-6 uppercase">
      <img :src="Logo" alt="Neoncore">
      <span>0/5 ready</span>
    </div>
    <div>
      <div class="flex flex-col gap-1.5">
        <h1 class="preset-1__mobile text-neutral-100">
          <span aria-hidden="true" class="text-lime-500 pr-1">//</span>Join the Nexus
        </h1>
        <p class="preset-6 uppercase">Initialize your NEONCORE identity</p>
      </div>
    </div>
  </header>
</template>
