# Proposal

## Why

The project is returning to active use with an aging dependency tree, an obsolete Create React App build stack, and a lockfile audit reporting 93 vulnerabilities (including 9 critical and 43 high). A tooling and dependency refresh is needed to restore maintainability and reduce known dependency risk while preserving the visualizer's existing behavior.

## What Changes

- **BREAKING (developer workflow):** Replace Create React App / `react-scripts` with Vite and update the documented development, test, and production build commands.
- Upgrade React and React DOM to the current compatible stable release, along with the test libraries and other maintained direct dependencies.
- Replace the unmaintained `react-input-slider` package with accessible native range controls, preserving the current ranges, steps, values, and disabled state.
- Update React mounting and effects, and remove or modernize the unused Web Vitals helper without introducing new user-facing behavior.
- Refresh the lockfile and resolve dependency audit findings through supported dependency updates; rerun the audit after migration.
- Replace the stale starter test with a smoke test for the visualizer, and update the README and architecture guide to describe the actual setup.
- Preserve the five sorting algorithms, their ordering and animation behavior, array controls, chart presentation, and existing page content/analytics integration.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This change modernizes implementation and developer tooling without changing user-visible sorting behavior or adding system behavior. The change opts out of delta specs via `skip_specs: true`.

## Impact

- Build and project configuration: `package.json`, `package-lock.json`, Vite configuration, `index.html`, and `.gitignore`.
- React entry point and compatibility updates: `src/index.js`, sorter effect callbacks, and Web Vitals wiring.
- Slider controls and test setup: `src/components/OptionsBar.js`, associated styles, `src/App.test.js`, and test configuration.
- Project documentation: `README.md` and `docs/architecture.md`.
- Dependencies include React, React DOM, Vite and its React plugin, Testing Library packages, and removal/replacement of `react-scripts`, `react-input-slider`, and the unused metrics helper as appropriate.
