# rule-lab2.md: Rules for Lab 2 Homeworks (HW1 Data-Grid, HW2 Audio Queue, HW3 Flash-Sale)

> Read this file before proposing any code change.
> Motto: *AI generates code. The developer proves it is correct.*

## 0. SCOPE GUARD (highest priority)

- Build the **MINIMUM** that satisfies the homework's listed requirements. Nothing more.
- Do NOT add features, options, themes, settings, animations, or abstractions that are not
  requested. No routing, no backend, no global state library, no extra pages.
- Sample data: ~20 items is enough.
- Prefer the simplest code that works and is easy to explain in a 3-minute live defense.
- If something is not in the task's WBS entry, **ask before adding it.**
- Never add a dependency. If one seems necessary, STOP and ask.

## 1. Stack

- React + TypeScript (`strict`) + Vite, function components and hooks only.
- Plain CSS with custom properties. ESLint (`react-hooks` plugin) + Prettier. Git.
- No UI kits, no CSS frameworks (Bootstrap/Tailwind), no jQuery, no class components.
- Forbidden libraries per homework: HW1 grid/table libraries; HW2 audio libraries;
  HW3 timer/countdown/state-machine libraries.
- Run through the Vite dev server (never `file:///`).

## 2. Banned Patterns

| Banned | Use instead |
|---|---|
| `var` | `const` / `let` |
| `keypress`, `e.keyCode` | `keydown` + `e.key` |
| `innerHTML`, `dangerouslySetInnerHTML` | JSX text / `textContent` |
| `<div onClick>` as a button | `<button type="button">` |
| `key={index}`, `key={Math.random()}` | `key={item.id}` |
| Hooks inside `if` / loops / nested functions | Top level only |
| Mutating props/state (`data.sort()`) | Copy first (`[...data].sort()`) |
| `setInterval` tick accumulation for countdowns | `targetTime - Date.now()` |
| `outline: none` without a replacement | Visible focus style |
| `any` to silence the compiler | Proper types or `unknown` + narrowing |

## 3. HTML and Accessibility (from Lab 1)

- `<html lang="en">`, viewport meta, exactly one `<h1>`, sequential headings.
- Landmarks (`<header>`, `<nav>`, `<main>`), no div-soup; first focusable element is a skip link.
- Every form control has a visible `<label for>`; placeholders are not labels.
- Tabular data uses `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`.
- Everything works with keyboard only; focus is always visible; never trap focus.
- Contrast: text >= 4.5:1, UI components >= 3:1. Never convey information by color alone.
- Announce async results (sort, filter, page, track change, sale status) via a polite
  `aria-live` region. Do not put `aria-live` on a per-second countdown.
- Images (if any) have `alt`, `width`, `height`.

## 4. CSS

- Reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
- Colors and spacing are CSS custom properties under `:root`. **No hardcoded hex in component rules.**
- Flexbox for 1-D layout, Grid for 2-D layout, `gap` instead of child margins.
- Mobile-first: works at **375px** with no horizontal page scroll (wide tables scroll inside
  their own container).
- Reserve space for async content so layout does not shift (CLS = 0).

## 5. TypeScript and React

1. **Contract first:** write and commit types before implementation.
2. Mutually exclusive states use **discriminated unions**, not boolean flag combinations.
3. Components are pure: UI = f(props, state). Props flow down and are never mutated.
4. **Derive, don't store:** sorted/filtered/paginated rows and formatted time are computed
   from the minimal source of truth.
5. Every effect that creates a resource (timer, rAF, listener, `AbortController`, audio node)
   returns a cleanup function.
6. High-frequency work (60fps drawing, audio frames) must **not** drive React state. Use refs and
   `requestAnimationFrame`; keep state for rare changes (playing/paused, current track).
7. Do not use `memo` / `useMemo` / `useCallback` unless profiling shows a real problem.
8. Keep pure logic (sort, filter, paginate, state transitions) in plain functions separate
   from components so it can be tested and explained alone.

## 6. Security

- Render all data as text, never as HTML. Test with `<img src=x onerror=alert(1)>`.
- Never build a `RegExp` from raw user input without escaping. No `eval`.
- Prevent double submission/double click with explicit state.

## 7. State Machines (HW2, HW3)

- Model multi-step behavior as a finite state machine with a discriminated union.
- Write the allowed transitions in the WBS, implement them as a pure
  `transition(state, event) => state`, and reject illegal transitions.
- Async UI handles `IDLE | LOADING | SUCCESS | ERROR`; show a readable error with a retry button.

## 8. What Each Homework Requires (and nothing more)

**HW1: Accessible Data-Grid**
- Sorting, filtering, pagination; native `<table>` elements; sort buttons are real `<button>`s
  inside `<th>` with `aria-sort`.
- Arrow keys move between cells, Enter selects, Space toggles.
- WCAG 2.2 AA, 4.5:1 contrast, Lighthouse 100 (Accessibility + Best Practices).

**HW2: FIFO Audio Visualizer Queue**
- Web Audio `AnalyserNode` (FFT 256 or 512).
- FIFO queue for track download/decoding; `AbortController` cancels obsolete tasks; a late
  result never overwrites a newer selection.
- Clean up every `AudioBufferSourceNode` (`stop`, `disconnect`); resume `AudioContext` only after
  a user gesture.
- 60fps Canvas or SVG visualizer via `requestAnimationFrame`, no per-frame React state.

**HW3: Flash-Sale Engine (Vietnam 11.11 scenario)**
- Zero-drift countdown using `Date.now()` delta, not accumulated `setInterval`.
- Inventory state machine: reservation, lock expiry, checkout; optimistic lock with rollback;
  simulate the server with a Promise (delay + random failure).
- At least **8** atomic Conventional Commits and an `AI_FAILURE_AUDIT.md` with >= 3 defects.

## 9. AI Collaboration (Anti-Monolithic)

1. Write `TASK_DECOMPOSITION.md` **before** prompting. One-shot prompts are forbidden.
2. Per task: slice -> define the contract -> generate **ONE** isolated function/module ->
   verify independently (`git diff`, DevTools, tests).
3. Before coding, restate the contract and list assumptions. Ask when unclear.
4. Touch only the files listed in the task. No unrequested refactors.
5. The developer reviews every diff. Never accept unverified AI output.

Prompt template:
```
Read rule-lab2.md first.
Task: <T-xx title>
Contract: <paste contract>
Files you may touch: <list>
Do NOT: add dependencies, features beyond this task, or touch other files.
Restate the contract and list your assumptions before coding.
```

## 10. Git

- `git init` first. **One concern per commit**, Conventional Commits
  (`docs(spec)`, `feat(types)`, `feat(html)`, `feat(css)`, `feat(state)`, `feat(a11y)`,
  `fix(...)`, `docs(audit)`).
- No commit mixing CSS with logic or types with implementation.
- Be able to explain any line of your history.

## 11. Quality Gates

- Meets every listed requirement of the homework.
- Works at 375px, fully usable by keyboard, contrast verified.
- Lighthouse Accessibility and Best Practices at 100 where the homework requires it; CLS zero.
- Zero console errors, zero `innerHTML`, lint and typecheck clean, no unauthorized dependencies,
  no dead code or leftover `console.log`.

## 12. Live Defense and AI Failure Audit

- **Live defense (60-180 s):** the instructor changes one contract on your repo; you diagnose,
  edit, and verify in DevTools. Keep logic, markup, styles, and key handling in separate files so
  a change touches one place.
- **`AI_FAILURE_AUDIT.md`:** at least 3 AI-caused defects. Format:
  Defect -> AI output -> Risk -> How detected -> Fix.
- Typical AI mistakes to hunt: `innerHTML`; effects without cleanup; `key={index}`/random;
  `setInterval` drift; conditional hooks; `<div onClick>`; mutated props; race conditions
  from uncancelled async work; unrequested dependencies or features.

## 13. Definition of Done (per task)

- [ ] Meets the task's acceptance criteria, and adds nothing extra
- [ ] Lint and typecheck pass
- [ ] No banned pattern (section 2) in the `git diff`
- [ ] Checked at 375px and with keyboard only
- [ ] Committed atomically
- [ ] Developer can explain every line without the AI
