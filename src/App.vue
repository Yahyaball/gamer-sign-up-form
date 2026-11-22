<script setup lang="ts">
import Logo from "./assets/images/logo.svg";
import CornerBracket from "./components/backdrop/CornerBracket.vue";
import BaseButton from "./components/controls/BaseButton.vue";
import BaseCheckbox from "./components/controls/BaseCheckbox.vue";
import BaseLink from "./components/controls/BaseLink.vue";
import PanelHead from "./components/controls/PanelHead.vue";
import TextField from "./components/fields/TextField.vue";
import ReadoutOperator from "./components/readout/ReadoutOperator.vue";
import PatternBackdrop from './assets/images/pattern-backdrop.svg'
</script>

<template>
  <div
    class="relative flex flex-col gap-[clamp(2rem,1.523rem+2.036vw,2.5rem)] w-full max-w-70 lg:flex-row lg:max-w-140 lg:gap-10">
    <header
      class="flex flex-col gap-[clamp(2rem,1.523rem+2.036vw,2.5rem)] lg:flex-1 lg:basis-[calc(50%-40px)] lg:justify-center">
      <div class="flex justify-between items-center preset-6 uppercase">
        <img :src="Logo" alt="Neoncore" />
        <span>0/5 ready</span>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1.5">
          <h1 class="preset-1__mobile md:preset-1__tablet lg:preset-1 text-neutral-100">
            <span aria-hidden="true" class="text-lime-500 pr-1">//</span>Join
            the Nexus
          </h1>
          <p class="preset-6 uppercase">Initialize your NEONCORE identity</p>
        </div>
        <ReadoutOperator />
      </div>
    </header>
    <main class="relative lg:flex-1 lg:basis-[calc(42.857%-40px)]">
      <CornerBracket class="absolute" />
      <CornerBracket class="absolute rotate-180 bottom-0 right-0" />
      <form
        class="bg-neutral-900 border border-neutral-700 px-[clamp(1.25rem,0.057rem+5.089vw,2.5rem)] py-[clamp(2rem,1.523rem+2.036vw,2.5rem)] flex flex-col gap-3">
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
        <BaseButton type="submit">
          Initialize account
        </BaseButton>
        <p class="text-center preset-5">
          Already an operator? <BaseLink href="/">Log in</BaseLink>
        </p>
      </form>
    </main>
    <img :src="PatternBackdrop" alt=""
      class="absolute -bottom-4.75 max-lg:left-1/2 max-lg:-translate-x-1/2 min-w-100 pointer-events-none select-none -z-50 lg:bottom-1/2 lg:translate-y-1/2 lg:-right-60">
  </div>
</template>
