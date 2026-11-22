<script setup lang="ts">
import Logo from "./assets/images/logo.svg";
import CornerBracket from "./components/backdrop/CornerBracket.vue";
import BaseCheckbox from "./components/controls/BaseCheckbox.vue";
import BaseLink from "./components/controls/BaseLink.vue";
import PanelHead from "./components/controls/PanelHead.vue";
import TextField from "./components/fields/TextField.vue";
import ReadoutOperator from "./components/readout/ReadoutOperator.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <header class="flex flex-col gap-4">
      <div class="flex justify-between items-center preset-6 uppercase">
        <img :src="Logo" alt="Neoncore" />
        <span>0/5 ready</span>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1.5">
          <h1 class="preset-1__mobile text-neutral-100">
            <span aria-hidden="true" class="text-lime-500 pr-1">//</span>Join
            the Nexus
          </h1>
          <p class="preset-6 uppercase">Initialize your NEONCORE identity</p>
        </div>
        <ReadoutOperator />
      </div>
    </header>
    <main class="relative">
      <CornerBracket class="absolute" />
      <CornerBracket class="absolute rotate-180 bottom-0 right-0" />
      <form class="bg-neutral-900 border border-neutral-700 px-2.5 py-4 flex flex-col gap-3">
        <PanelHead note="short" />
        <div class="flex flex-col gap-3">
          <TextField label="Callsign" name="callsign" placeholder="e.g. Vortex_07"
            hint="3–20 characters: letters, numbers, _ or -" type="text" />
          <TextField label="Email" name="email" placeholder="you@example.com" type="email" />
          <TextField label="Password" name="password" hint="At least 8 characters" type="password"
            :strength-level="0" />
          <TextField label="Confirm password" name="confirm-password" type="password" />
          <div class="preset-5 text-neutral-300 flex gap-1.5">
            <BaseCheckbox name="accept" id="accept" />
            <label for="accept">I accept the <BaseLink href="/">Terms</BaseLink> and
              <BaseLink href="/">Privacy Policy</BaseLink>.
            </label>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>
