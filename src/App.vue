<script setup lang="ts">
import Logo from "./assets/images/logo.svg";
import HexCheck from "./assets/images/icon-hex-check.svg";
import CornerBracket from "./components/backdrop/CornerBracket.vue";
import BaseButton from "./components/controls/BaseButton.vue";
import BaseCheckbox from "./components/controls/BaseCheckbox.vue";
import BaseLink from "./components/controls/BaseLink.vue";
import PanelHead from "./components/controls/PanelHead.vue";
import TextField from "./components/fields/TextField.vue";
import ReadoutOperator from "./components/readout/ReadoutOperator.vue";
import PatternBackdrop from './assets/images/pattern-backdrop.svg'
import BaseReadout from "./components/readout/BaseReadout.vue";
import type { FieldName, FieldState, FieldStatus } from "./types/readout.ts";
import { computed, nextTick, ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";
import { useForm } from "vee-validate";
import type { Options } from 'check-password-strength';
import { passwordStrength } from "check-password-strength";
import HintField from "./components/fields/HintField.vue";

const rawSchema = z.object({
  callsign: z.string('Use at least 3 characters').regex(/^[A-Za-z0-9_-]+$/, 'Use only letters, numbers, _ or -').min(3, 'Use at least 3 characters').max(20, 'Should not more than 20 characters'),
  email: z.email('Enter a valid email, like you@example.com'),
  password: z.string('Use at least 8 characters').min(8),
  confirm: z.string().min(8),
  terms: z.literal(true, 'Accept the terms to continue')
})

const schema = toTypedSchema(rawSchema)

const { errors, handleSubmit, defineField, submitCount, isFieldValid } = useForm({
  validationSchema: schema,
  validateOnMount: true
})

const [callsign, callsignAttrs] = defineField('callsign')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirm, confirmAttrs] = defineField('confirm')
const [terms, termsAttrs] = defineField('terms')

const confirmSchema = computed(() => z.string('Use at least 8 characters').min(8).refine(v => v === password.value, "Passwords don't match"))

const confirmResult = computed(() => confirmSchema.value.safeParse(confirm.value))

const zodResult = computed(() => rawSchema.safeParse({
  callsign: callsign.value,
  email: email.value,
  password: password.value,
  confirm: confirm.value,
  terms: terms.value
}))

const zodIssue = (name: FieldName) => zodResult.value.success ? undefined : zodResult.value.error.issues.find((issue) => issue.path[0] === name)

const zodValid = (name: FieldName) => !zodIssue(name)

const errorText = (name: FieldName, fallback?: string): string | undefined => {
  const issue = zodIssue(name)
  if (!issue) return fallback
  if (issue.code === 'invalid_format') return 'malformed'
  if (issue.code === 'too_small' || issue.code === 'invalid_type') return `too short`
  if (issue.code === 'too_big') return `too long`
  if (issue.code === 'invalid_value') return 'required'
  return fallback ?? issue.message
}

const isLoading = ref(false)
const passwordShown = ref(false)
const confirmShown = ref(false)
const submitted = ref(false)

const statusFor = (valid: boolean, error?: string): FieldStatus => {
  if (submitCount.value > 0 && error) return 'error'
  if (submitted.value) return 'locked'
  return valid ? 'ok' : 'pending'
}

const fieldState = (
  valid: boolean,
  error: string | undefined,
  labels: { ok: string, pending: string, locked?: string, error?: string }
): FieldState => {
  const status = statusFor(valid, error)
  return { status, text: status === 'error' ? error ?? labels.error ?? 'invalid' : labels[status] ?? status }
}

const fields = computed<Partial<Record<FieldName, FieldState>>>(() => ({
  callsign: fieldState(zodValid('callsign'), errorText('callsign'), { ok: 'ok', pending: 'pending', locked: 'locked' }),
  email: fieldState(zodValid('email'), errorText('email'), { ok: 'ok', pending: 'pending', locked: 'locked' }),
  password: fieldState(zodValid('password'), errorText('password'), { ok: 'ok', pending: 'pending', locked: 'locked' }),
  confirm: fieldState(confirmResult.value.success, confirmResult.value.error?.issues[0]?.code === 'custom' ? 'mismatch' : errorText('confirm'), { ok: 'ok', pending: 'pending', locked: 'locked' }),
  terms: fieldState(zodValid('terms'), errorText('terms'), { ok: 'ok', pending: 'required', locked: 'locked' }),
}))

const strengthOptions: Options<string> = [
  { id: 0, minDiversity: 0, minLength: 0, value: '' },
  { id: 1, minDiversity: 0, minLength: 1, value: 'Weak' },
  { id: 2, minDiversity: 2, minLength: 8, value: 'Fair' },
  { id: 3, minDiversity: 3, minLength: 10, value: 'Good' },
  { id: 4, minDiversity: 4, minLength: 12, value: 'Strong' },
]

const strengthResult = computed(() => {
  return passwordStrength(password.value ?? '', strengthOptions)
})

const strengthLevel = computed(() => (strengthResult.value.id) as 0 | 1 | 2 | 3 | 4)

const fieldRefs = new Map<string, { focus: () => void }>()
const bindField = (name: string) => (el: any) => { if (el) fieldRefs.set(name, el) }
const submitMessage = ref('')

const onSubmit = handleSubmit(() => {
  const delay = Math.floor(Math.random() * 4001) + 1000
  if (!confirmResult.value.success) {
    submitMessage.value = "Passwords don't match"
    nextTick(() => fieldRefs.get('confirm')?.focus())
    return
  }
  submitMessage.value = ''
  isLoading.value = true
  passwordShown.value = false
  confirmShown.value = false
  setTimeout(() => {
    submitted.value = true
    isLoading.value = false
  }, delay)
},
  ({ errors }) => {
    const fieldOrder = ['callsign', 'email', 'password', 'confirm', 'terms'] as const
    const invalid = fieldOrder.filter((name) =>
      name === 'confirm' ? !confirmResult.value.success : !!errors[name]
    )
    if (invalid[0]) nextTick(() => fieldRefs.get(invalid[0])?.focus())
    submitMessage.value = `${invalid.length} fields need attention`
  }
)

const total = computed(() => Object.values(fields.value ?? {}).length)
const readyCount = computed(() => Object.values(fields.value ?? {}).filter(state => state.status === 'ok' || state.status === 'locked').length)

const goToLogin = () => {
  window.location.assign('/')
}
</script>

<template>
  <div
    class="relative flex flex-col gap-[clamp(2rem,1.523rem+2.036vw,2.5rem)] w-full max-w-70 lg:flex-row lg:max-w-140 lg:gap-10">
    <header
      class="flex flex-col gap-[clamp(2rem,1.523rem+2.036vw,2.5rem)] lg:flex-1 lg:basis-[calc(50%-40px)] lg:justify-center lg:gap-10">
      <div class="flex justify-between items-center preset-6 uppercase">
        <img :src="Logo" alt="Neoncore" />
        <span class="lg:hidden" :class="{ 'text-lime-500': readyCount === total || submitted }">{{ submitted ?
          'provisioned' : `${readyCount}/${total} ready` }}</span>
      </div>
      <div class="flex flex-col gap-3 lg:gap-8">
        <div class="flex flex-col gap-1.5">
          <h1 class="preset-1__mobile md:preset-1__tablet lg:preset-1 text-neutral-100">
            <span aria-hidden="true" class="text-lime-500 pr-1">//</span>Join
            the Nexus
          </h1>
          <p class="preset-6 uppercase">Initialize your NEONCORE identity</p>
        </div>
        <ReadoutOperator class="lg:hidden" :callsign="isFieldValid('callsign') ? callsign : 'Unassigned'"
          :assigned="isFieldValid('callsign')" />
        <BaseReadout class="max-lg:hidden" :fields="fields"
          :callsign="isFieldValid('callsign') ? callsign : 'Unassigned'" :provisioned="submitted" />
      </div>
    </header>
    <main class="relative lg:flex-1 lg:basis-[calc(42.857%-40px)]">
      <p v-if="submitted" role="status" aria-live="assertive" class="sr-only">Handshake completed</p>
      <p v-else role="alert" aria-live="assertive" class="sr-only">{{ submitMessage }}</p>
      <CornerBracket class="absolute" />
      <CornerBracket class="absolute rotate-180 bottom-0 right-0" />
      <div v-if="submitted"
        class="bg-neutral-900 border border-neutral-700 px-[clamp(1.25rem,0.057rem+5.089vw,2.5rem)] py-[clamp(2rem,1.523rem+2.036vw,2.5rem)] flex flex-col gap-4 md:min-h-90.5 justify-center">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-3 items-start">
            <img :src="HexCheck" alt="" class="-m-2">
            <h2 class="preset-2 uppercase text-neutral-100"><span aria-hidden="true"
                class="pr-1 text-lime-500">//</span>Handshake complete
            </h2>
          </div>
          <p class="preset-4">Operator <span class="text-lime-500">{{ callsign }}</span> provisioned. Your account is
            ready.</p>
        </div>
        <BaseButton tabindex="-1" type="button" @click="goToLogin">Continue to log in</BaseButton>
      </div>
      <form v-else novalidate @submit.prevent="onSubmit"
        class="bg-neutral-900 border border-neutral-700 px-[clamp(1.25rem,0.057rem+5.089vw,2.5rem)] py-[clamp(2rem,1.523rem+2.036vw,2.5rem)] flex flex-col gap-3">
        <PanelHead note="short" />
        <div class="flex flex-col gap-3">
          <TextField :ref="bindField('callsign')" label="Callsign" name="callsign" placeholder="e.g. Vortex_07"
            hint="3–20 characters: letters, numbers, _ or -" type="text" v-model="callsign" v-bind="callsignAttrs"
            :valid="isFieldValid('callsign')" :error="submitCount > 0 && errors.callsign ? errors.callsign : undefined"
            :locked="isLoading" />
          <TextField :ref="bindField('email')" label="Email" name="email" placeholder="you@example.com" type="email"
            v-model="email" v-bind="emailAttrs" :valid="isFieldValid('email')"
            :error="submitCount > 0 && errors.email ? errors.email : undefined" :locked="isLoading" />
          <TextField :ref="bindField('password')" label="Password" name="password" hint="At least 8 characters"
            type="password" :strength-level="strengthLevel" v-model="password" v-bind="passwordAttrs"
            :valid="isFieldValid('password')" :error="submitCount > 0 && errors.password ? errors.password : undefined"
            :locked="isLoading" v-model:show-password="passwordShown" />
          <TextField :ref="bindField('confirm')" label="Confirm password" name="confirm-password" type="password"
            v-model="confirm" v-bind="confirmAttrs" :valid="confirmResult.success"
            :error="submitCount > 0 ? confirmResult.error?.issues[0]?.message : undefined" :locked="isLoading"
            v-model:show-password="confirmShown" />
          <div class="flex flex-col gap-1">
            <div class="preset-5 text-neutral-300 flex gap-1.5">
              <BaseCheckbox :ref="bindField('terms')" name="accept" id="accept" v-model="terms" v-bind="termsAttrs"
                :invalid="submitCount > 0 && !!errors.terms" :locked="isLoading" />
              <label for="accept">I accept the <BaseLink href="/">Terms</BaseLink> and
                <BaseLink href="/">Privacy Policy</BaseLink>.
              </label>
            </div>
            <HintField v-if="submitCount > 0 && errors.terms"
              :error="submitCount > 0 && errors.terms ? errors.terms : undefined" name="accept" />
          </div>
        </div>
        <BaseButton type="submit" :loading="isLoading">
          {{ isLoading ? 'Submitting_' : 'Initialize account' }}
        </BaseButton>
        <p class="text-center preset-5">
          Already an operator? <BaseLink href="/">Log in</BaseLink>
        </p>
      </form>
    </main>
    <img :src="PatternBackdrop" alt=""
      class="absolute -bottom-4.75 max-lg:left-1/2 max-lg:-translate-x-1/2 min-w-100 pointer-events-none select-none -z-50 lg:bottom-1/2 lg:translate-y-1/2 lg:-right-60 max-md:hidden">
  </div>
</template>
