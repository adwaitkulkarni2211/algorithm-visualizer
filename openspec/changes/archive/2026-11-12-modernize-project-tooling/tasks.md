# Tasks

## 1. Replace the build and test toolchain

- [x] 1.1 Replace `react-scripts` with Vite and the React plugin, update package scripts and Vite configuration, and verify a clean dependency install succeeds.
- [x] 1.2 Convert the CRA HTML template to Vite's entry format, preserve favicon, manifest, Clarity and public asset references, and verify the app shell loads in development.
- [x] 1.3 Update React, React DOM and Testing Library dependencies to compatible current stable releases, regenerate the lockfile, and verify `npm ls --depth=0` reports no missing or invalid direct dependencies.

## 2. Update app compatibility without changing behavior

- [x] 2.1 Switch `src/index.js` to `createRoot` and refactor async sorter effects into valid effect callbacks, preserving sort triggers and animation timing; verify all five sorters still start and complete.
- [x] 2.2 Replace `react-input-slider` with accessible native range controls, preserve existing values/ranges/steps/disabled behavior, and verify size and delay controls update as before.
- [x] 2.3 Remove unused Web Vitals wiring and dependency, and verify app startup produces no obsolete metric API errors.

## 3. Update tests and project documentation

- [x] 3.1 Replace the CRA starter assertion with a visualizer render smoke test and verify it passes under the new test runner.
- [x] 3.2 Update README setup and command documentation plus `docs/architecture.md` toolchain details, and verify every documented command matches `package.json` scripts.

## 4. Validate the migrated project

- [x] 4.1 Run the full test suite and production build, fix compatibility issues without changing sorting behavior, and record successful command results.
- [x] 4.2 Run `npm audit` on the regenerated lockfile, resolve supported fixes, and document any remaining advisories with their dependency paths and rationale.
