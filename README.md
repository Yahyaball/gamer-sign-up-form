# Gamer Sign-Up Form — NEONCORE

A Vue 3 build of the Frontend Mentor Gamer Sign-Up Form challenge. The form validates a callsign, email, password, password confirmation, and terms acceptance; shows password strength and reveal controls; and moves through submitting and success states with keyboard and screen reader support.

## Built With

- Vue 3 with `<script setup>` and TypeScript
- Vite 8 for the development server and production build
- Tailwind CSS 4 for styling and responsive layout
- Vee Validate and `@vee-validate/zod` for form state, touched fields, and validation messages
- Zod 4 for schema validation
- `check-password-strength` for the live strength meter
- GSAP for entrance, shake, scramble, and text animations, with reduced-motion handling
- No backend: a valid submit waits briefly with a timeout, then shows the success panel

## Getting Started

```bash
npm install
npm run dev
```

To type-check and build for production:

```bash
npm run build
```

## What I learned

- A field can be **invalid** without being **checked**. The form only shows a message after blur or submit, then re-checks on every keystroke once checked. I used `isFieldTouched`, `submitCount`, and a small `wasChecked()` helper to control that.
- Vee Validate's `defineField` gives attribute objects that have to reach the real input with `v-bind="inputAttrs"`. Without that, blur handling and `aria-invalid` never reach the DOM.
- Zod's object-level `.refine()` is skipped when other fields are invalid, so a password-confirmation check placed there did not run reliably. A field-level computed schema fixed that without disturbing the rest of the form.
- Trimming is a rule, not a habit: only the callsign should be trimmed. Eight spaces should count as an eight-character password.
- `aria-describedby` can point to a hidden element, so using `v-show` for the terms hint keeps the ID target in the DOM while still hiding it visually until submit.
- Moving focus to the success heading needs three pieces together: a template ref, `tabindex="-1"`, and `nextTick()` so Vue has rendered the new panel first.
- Keyboard-only and screen-reader testing catch things that looking at the page cannot. DevTools inspection of `id` and `aria-describedby` was especially useful.
- `npm run build` is not just a final step; it caught TypeScript mistakes early while I was changing validation logic.

## Continued development

- Route a mismatch-only submit through the same invalid-submit path as every other invalid field, so it announces the field count, focuses the first invalid field, and stays consistent with the rest of the form.
- Add automated tests for the Zod schemas and the validation-timing rules.
- Keep testing with keyboard only and with a screen reader in more than one browser.
- Extract the repeated field-wrapper and blur logic into a composable if more fields are added.
- Deploy the project and ask for a review in the Frontend Mentor community.

## AI collaboration

I used an AI assistant as a mentor rather than as a way to skip the work. It helped me debug by explaining the reason behind validation timing, Vee Validate attribute forwarding, Zod refine behavior, ARIA description targets, and focus management. It usually gave hints or one small step at a time, then I tested the result in the browser and with `npm run build`.

I also pushed back when its static reading did not match what I heard with a screen reader. In those moments we re-checked the actual code together instead of assuming either side was right. That habit — test, inspect, then decide — became one of the most useful things I learned in this project. The final implementation and decisions are mine.
