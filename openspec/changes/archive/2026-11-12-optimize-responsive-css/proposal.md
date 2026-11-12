# Proposal

## Why

The visualizer's CSS files account for 464 of 1,153 non-blank `src` lines — roughly 40% of the codebase — yet most of that is structural duplication rather than intentional styling. `OptionsBar.css` alone defines 5 overlapping `max-width`/`min-width` media-query bands and repeats the same 7 selector blocks verbatim in each, while `style.css` duplicates every base declaration inside a single `max-width: 1200px` override. The goal is to eliminate that duplication, bring all CSS files into a coherent mobile-first cascade, and address the specific layout defects the current structure causes — fixed `vh` heights that clip controls in landscape, a 2000px upper cap that leaves ultra-wide viewports unstyled, and a global `p { display: none }` selector that is fragile and cannot safely extend.

## What Changes

- Replace 5 overlapping `max-width`/`min-width` bands in `OptionsBar.css` with a mobile-first base and two continuous `min-width` transitions (narrow → tablet ~37.5rem, tablet → desktop ~60rem), with no upper viewport cap.
- Extract the 7 selector blocks that are repeated identically in every band (`#nav-container`, `#sort-options`, `.sort-option`, `#chart-options`, `.btn`, `.btn:disabled`, `#delay-container` / `#arrSize-container`) into shared base rules, overriding only the properties that actually differ between breakpoints.
- Remove the fixed `vh` heights on `#nav-container` so multi-row content is not clipped in short landscape viewports.
- Remove the dead `.slider` and `.slider-label` declarations duplicated inside Band 1 (the global copies at the bottom of the file already apply; the in-band copies are unreachable dead code).
- Merge `#delay-container` and `#arrSize-container` into a single grouped selector: they share the same 4 declarations in every band and have no diverging rules.
- Replace the global `p { display: none }` rule with `.slider-value { display: none }` scoped to the mobile base. Add `className="slider-value"` to the two `<p>` elements in `OptionsBar.jsx` that display the slider values (array size and delay ms). This preserves the established behavior — hiding both values on narrow viewports to save space — without hiding unrelated `<p>` elements. The class is revealed at the tablet breakpoint.
- Merge `#code` and `#tc` in `style.css` into a single grouped selector (`#code, #tc`): they share 8 declarations with no diverging rules.
- Remove the `::-webkit-scrollbar` block duplicated inside `style.css`'s `max-width: 1200px` query: the base declaration above it already applies globally and the in-query copy is redundant.
- Collapse `style.css`'s `max-width: 1200px` override block so it contains only the 3 declarations that actually change (`justify-content` on `#barchart-container`, `font-size` on the grouped code/tc selector, and `overflow-y` on `#code-tc`).
- Bring `index.css` into scope: its `background-color: #1f2937` body rule is partly redundant with the same value set on `.container`, `#barchart-container`, and `#code-tc`, but it is the correct global default; the redundant declarations on the child elements can be removed where the inheritance is unambiguous.
- Preserve the established visual language: color palette, sort controls, chart rendering, desktop side-by-side layout, and sorting algorithm behavior are unchanged.
- **No breaking changes.** No public APIs, dependencies, or sorting algorithm logic change.

## Capabilities

### New Capabilities

- `responsive-visualizer-layout`: The visualizer maintains an accessible, non-clipping layout for its controls, chart, and algorithm information across viewport widths, heights, and orientations.

### Modified Capabilities

- None.

## Impact

- **Affected source files:** `src/components/OptionsBar.css`, `src/components/style.css`, `src/index.css`, and the `<p className="slider-value">` attribute additions in `src/components/OptionsBar.jsx`.
- **Affected experience:** layout behavior at responsive breakpoints — the options bar, sort selector list, chart container, and code/time-complexity panels. The slider value labels (array size number and "ms" delay) continue to be hidden on narrow viewports, now via a targeted class rather than a global selector.
- **No changes to:** public APIs, npm dependencies, persisted data, sorting algorithm logic, or any component other than OptionsBar.
- **Estimated CSS reduction:** from 464 to approximately 285 non-blank CSS lines (~38% reduction in CSS, ~15% reduction in total src non-blank lines), with no behavioral change to desktop presentation or sort operation.
- **Verification:** existing automated test suite plus visual inspection at 320×568, 568×320, 768×1024, 1024×768, 1440×900, and 2560×1440, with widths probed around each responsive transition.
