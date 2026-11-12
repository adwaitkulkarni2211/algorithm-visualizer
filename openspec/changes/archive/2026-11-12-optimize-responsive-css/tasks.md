# Tasks

## 1. Baseline and markup preparation

- [x] 1.1 Record the current non-blank CSS line counts for `index.css` (13), `OptionsBar.css` (334), and `style.css` (117) as the baseline; verify the numbers match the codebase before making any changes.
- [x] 1.2 Add `className="slider-value"` to the two `<p>` elements in `src/components/OptionsBar.jsx` (the array-size value and the delay-ms label); verify `npm test` still passes and that sort state and control values are unchanged at runtime.
- [x] 1.3 Optionally move the static `paddingLeft: '1rem'` inline style from both `<p>` elements into `.slider-value { padding-left: 1rem }` in `OptionsBar.css`; verify appearance is unchanged.

## 2. Rewrite OptionsBar.css

- [x] 2.1 Extract the shared base rules (once, outside any media query) for `#nav-container`, `#sort-options`, `.sort-option`, `#chart-options`, `.btn`, `.btn:disabled`, `#delay-container, #arrSize-container`, `.slider`, and `.slider-label`; verify they contain only the declarations that do not change across viewports.
- [x] 2.2 Add `.slider-value { display: none }` to the mobile base so slider value labels are hidden on narrow viewports; verify they are hidden below the tablet breakpoint and that no other paragraph or text elements are hidden.
- [x] 2.3 Write a `@media (min-width: 37.5rem)` tablet override that reveals `.slider-value` and adjusts any control sizing appropriate to intermediate widths; verify controls reflow without overflow on 568px and 768px viewports.
- [x] 2.4 Write a `@media (min-width: 60rem)` desktop override that restores the side-by-side `#nav-container` layout and full-size button/font values; verify the desktop hierarchy matches the original at 1024px, 1440px, and 2560px.
- [x] 2.5 Remove the dead `.slider` and `.slider-label` declarations that are duplicated inside Band 1 (the global copies at the bottom of the original file are the keeper; remove the in-band dead copies); verify `.slider` and `.slider-label` still apply correctly.
- [x] 2.6 Remove all fixed `vh` heights from `#nav-container`; verify the bar grows to its content and does not clip in a 568×320 (landscape) viewport.
- [x] 2.7 Confirm no upper viewport cap exists (`max-width: 2000px` is gone) and that the desktop styles apply cleanly at 2560px.

## 3. Rewrite style.css

- [x] 3.1 Merge `#code` and `#tc` into a single grouped selector `#code, #tc` with their shared 8 declarations; verify both panels retain equivalent desktop styling.
- [x] 3.2 Remove the `::-webkit-scrollbar` and `::-webkit-scrollbar-thumb` blocks duplicated inside the `max-width: 1200px` query; verify scrollbar styling is unchanged (the base declarations above the query remain).
- [x] 3.3 Collapse the `max-width: 1200px` query to contain only the 3 declarations that actually change: `justify-content: flex-start` on `#barchart-container`, the reduced `font-size` on `#code, #tc`, and `overflow-y: auto` on `#code-tc`; verify long preformatted code lines do not widen a 320px document.

## 4. Review index.css

- [x] 4.1 Confirm that the `background-color: #1f2937` on the `body` rule in `index.css` makes the same declaration on `.container`, `#barchart-container`, and `#code-tc` redundant where inheritance is unambiguous; remove those child-element redundancies if safe, or note why they must stay (e.g. the `.container` background is load-visible before React mounts); verify background color is unchanged across all panels.

## 5. Verify and measure

- [x] 5.1 Run `npm test` after all CSS changes and resolve any regressions; verify the full test suite passes.
- [x] 5.2 Run `npm run build` and verify it succeeds without warnings that prevent deployment.
- [x] 5.3 Inspect the visualizer at 320×568, 568×320, 768×1024, 1024×768, 1440×900, and 2560×1440 plus widths around 37.5rem and 60rem transitions; verify no document-level horizontal overflow, all controls are reachable, local overflow works only in the sort selector, barchart container, and code panels, and the desktop visual hierarchy is preserved.
- [x] 5.4 Count final non-blank CSS lines across `index.css`, `OptionsBar.css`, and `style.css`; verify duplicated breakpoint blocks have been removed and record the reduction against the 464-line baseline (target: approximately 285 lines).

## Workflow follow-up

- Review the responsive behavior and CSS reduction before archiving the change.
- Archive the change after implementation and verification tasks are complete.
