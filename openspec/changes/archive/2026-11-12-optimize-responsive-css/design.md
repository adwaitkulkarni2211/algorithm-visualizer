# Design

## Context

See `proposal.md` for motivation. The current layout is styled across four CSS files: `index.css` (13 non-blank lines), `App.css` (empty), `OptionsBar.css` (334 non-blank lines), and `style.css` (117 non-blank lines). Of the 464 total non-blank CSS lines, the majority are structural duplicates introduced by the current 5-band media-query strategy.

**Current OptionsBar.css band structure:**

```
Band 1: min-width 1048px,  max-width 2000px   <- capped, unstyled above 2000px
Band 2: min-width  834px,  max-width 1048px
Band 3: min-width  791px,  max-width  834px
Band 4: min-width  750px,  max-width  791px
Band 5:            0px,  max-width  750px      <- only band with column layout
```

**Selectors repeated verbatim in all 5 bands** (identical declarations, only some values differ):

| Selector | Properties that change across bands | Properties that never change |
|---|---|---|
| `#nav-container` | `height` (5vh / 10vh / 9vh), `flex-direction` (row / column at Band 4+5) | `display:flex`, `background-color`, `padding` |
| `#sort-options` | `font-size` (1rem → 0.6rem) | `display:flex`, `color` |
| `#chart-options` | — (all identical) | `width:50vw`, `display:flex`, `justify-content`, `align-items` |
| `.sort-option` | — (all identical) | `margin-right`, `padding`, `border-radius`, `cursor` |
| `.btn` | `height`, `width`, `font-size` | `background-color`, `border`, `border-radius`, `color`, `cursor` |
| `.btn:disabled` | — (all identical) | `opacity:50%` |
| `#delay-container` / `#arrSize-container` | — (always identical to each other) | `display:flex`, `justify-content`, `align-items`, `color` |

**Additional duplication:**
- `.slider` and `.slider-label` are declared inside Band 1 and again as global rules (lines 374–389). The global copy always wins; the Band 1 copy is dead code.
- In `style.css`: `#code` and `#tc` share all 8 declarations. The `max-width: 1200px` override block repeats the entire base section verbatim, changing only `justify-content` on `#barchart-container`, `font-size` on the two panels, and `overflow-y` on `#code-tc`. `::-webkit-scrollbar` is declared three times across the two files.
- `p { display: none }` appears in Bands 2–5 of `OptionsBar.css`. It hides the two `<p>` slider value elements (array size number and "ms" delay label), which is intentional on narrow viewports to save space. Using a global `p` selector is fragile because any future `<p>` rendered inside the nav would silently disappear.

## Goals / Non-Goals

**Goals:**

- Reduce CSS to a mobile-first cascade with shared base rules and focused responsive overrides using two non-overlapping `min-width` transitions.
- Extract the properties that actually change across breakpoints into overrides; keep everything else in the base.
- Eliminate all identified dead code and duplicate declarations.
- Replace the global `p { display: none }` with a targeted `.slider-value` class so slider labels are hidden on mobile with no risk of hiding unrelated elements.
- Make breakpoints continuous and valid above 2000px.
- Keep all CSS authoring within the existing files; no new stylesheet is introduced.
- Target: approximately 285 non-blank CSS lines (from 464), a ~38% reduction.

**Non-Goals:**

- Redesigning the color palette, button treatments, chart rendering, or sorting workflow.
- Changing sort algorithms, array generation, animation timing behavior, public APIs, or dependencies.
- Adding a CSS framework, CSS-in-JS library, or visual-regression service.
- Guaranteeing an optimized arrangement below 320 CSS pixels; supported layouts begin at that width.
- Removing `index.css`'s `background-color` body rule (it is the correct global default; the redundant child-element copies may be removed where inheritance is unambiguous).

## Decisions

### 1. Mobile-first cascade with two semantic layout transitions

Shared component rules are declared once at the narrowest supported viewport. A tablet transition near `37.5rem` (600px) increases available control space. A desktop transition near `60rem` (960px) restores the side-by-side navigation groups. Breakpoints use non-overlapping `min-width` queries with no upper cap, replacing the current 5-band structure.

Exact pixel values may be adjusted during visual verification if a control's intrinsic size requires it, but only within the intent of the two transitions.

**Alternative considered:** Retain the five fixed bands and only deduplicate declarations. This reduces lines but keeps the narrow-width overflow, short-height clipping, and 2000px wide-screen gap.

### 2. `.slider-value` class replaces `p { display: none }`

The two `<p>` elements that display slider values (`{arrSize}` and `{delay} ms`) in `OptionsBar.jsx` receive `className="slider-value"`. The CSS hides `.slider-value` in the mobile base and reveals it at the tablet breakpoint. This exactly preserves the original behavior — hiding both values on narrow viewports to save space — while scoping the rule to only those elements.

The `paddingLeft: '1rem'` inline style on both `<p>` elements is a fixed spacing value unrelated to sort state, so it may optionally be moved into `.slider-value { padding-left: 1rem }` to remove the last inline style from the control markup; this is a minor cleanup that does not change appearance.

**Alternative considered:** Scope via `#nav-container p { display: none }`. This requires zero JSX changes but still uses a generic element selector that could hide future `<p>` content added inside the nav. The `.slider-value` class is unambiguous and already pre-authorized by the original design decision.

**Alternative considered:** Replace `<p>` with `<output>`. Semantically ideal (`<output>` is designed for computed values), but changes the element type, which is a larger markup touch than the class addition and offers no advantage in this context.

### 3. Merge equivalent selectors before adding abstractions

Identical selector pairs (`#code` and `#tc`; `#delay-container` and `#arrSize-container`) are merged into grouped selectors. `::-webkit-scrollbar` is declared once globally and removed from the `max-width: 1200px` override. Palette values are not extracted to custom properties because the reduction in source lines would be negligible and the existing palette is already consistent without them.

**Alternative considered:** Introduce CSS custom properties for palette values. The application has a small self-contained stylesheet; the overhead of `var()` throughout does not improve maintainability at this scale.

### 4. Content-driven block size; overflow explicitly contained

The fixed `vh` heights on `#nav-container` are removed so multi-row content in short landscape viewports is not clipped. The sort selector, bar chart, and preformatted code panels own their horizontal `overflow-x: auto`. The document does not receive broad horizontal scrolling.

**Alternative considered:** Preserve `vh` heights and add document scrolling. This does not prevent clipped controls and makes it ambiguous which region the user must scroll.

### 5. Markup changes are narrowly coupled to styling

The only JSX change is adding `className="slider-value"` to two `<p>` elements. No event handlers, state transitions, or sort logic change. No new component is introduced.

## Risks / Trade-offs

- [Refactor changes declaration order and cascade precedence] → Compare the desktop layout before and after; retain component-level selector scope; test each supported viewport.
- [A control's intrinsic width can exceed a guessed breakpoint] → Test intermediate widths; use wrapping and local scrolling rather than relying on breakpoint values alone.
- [Chart and code overflow rules can create nested scroll regions] → Restrict horizontal scrolling to only the three named regions (sort selector, barchart container, code panels); do not add vertical scroll containers unless required by present behavior.
- [Inline styles in JSX constrain CSS ownership] → Preserve them where they represent runtime values (`backgroundColor`, `color` on sort options are runtime state); only the static `paddingLeft` on `.slider-value` is a candidate for moving to CSS.
- [Source-line reduction does not imply a proportional production-byte reduction] → Vite already minifies and tree-shakes; treat maintainability and reliable reflow as the primary outcome.

## Migration Plan

1. Add `className="slider-value"` to the two `<p>` elements in `OptionsBar.jsx`; verify sort state and control values are unchanged.
2. Rewrite `OptionsBar.css`: extract base rules, write two `min-width` overrides, remove dead `.slider` block from Band 1, merge `#delay-container` and `#arrSize-container`, replace `p { display: none }` with `.slider-value { display: none }` in the mobile base.
3. Rewrite `style.css`: merge `#code` and `#tc`, remove duplicate `::-webkit-scrollbar` block, collapse the `max-width: 1200px` query to its three actual overrides.
4. Review `index.css`: confirm whether redundant `background-color` declarations on child elements can be removed given the body rule.
5. Run `npm test` and `npm run build`.
6. Inspect the responsive matrix: 320×568, 568×320, 768×1024, 1024×768, 1440×900, 2560×1440, plus widths around each responsive transition.
7. Confirm no document-level horizontal overflow and that all controls remain operable at every target size.
8. Count final non-blank CSS lines and compare with baseline of 464.
9. Roll back by reverting all changed files if visual parity or interaction availability is not achieved.
