# Design

## Context

The app is a single-page React visualizer with no router, backend, or environment-variable usage. CRA serves the app from `public/index.html`; its template currently uses `%PUBLIC_URL%` for the favicon and manifest. Sorting implementations and their animation state live in independent components. See `proposal.md` for motivation and scope.

## Goals / Non-Goals

**Goals:** Replace the frozen build stack with a maintained, simple React build/test setup; update the dependency graph; preserve application behavior and static page integrations; provide repeatable install/build/test/audit checks.

**Non-Goals:** Change algorithm implementations, add features, alter visual design, change array ranges/defaults, or introduce analytics or performance reporting.

## Decisions

- **Use Vite with the React plugin.** It replaces CRA's webpack/Jest/Workbox dependency tree with an actively maintained build setup. Keep the existing `public/` assets and adapt the HTML entry point, favicon and manifest paths. Considered retaining `react-scripts` 5.0.1; rejected because it is deprecated, has no modern release path, and the lockfile audit reports vulnerabilities in its transitive tooling.
- **Use React and React DOM at the same current stable version.** Move the entry point to `createRoot`, required by React 19. Keep `StrictMode`; make effect callbacks synchronous wrappers that launch async work internally and preserve current sort triggers and state updates.
- **Replace `react-input-slider` with native range inputs.** The package has no release newer than 6.0.1. Preserve its current axes, min/max, steps, displayed values, disabled-while-sorting state, and track/thumb sizing as closely as possible while adding accessible labels.
- **Remove unused Web Vitals plumbing.** `reportWebVitals()` is called without a callback and reports no metrics. Remove the helper and package rather than updating a dormant callback API; do not add reporting behavior.
- **Use Vite-compatible test tooling and current Testing Library packages.** Replace the default CRA test assertion for a nonexistent “learn react” link with a basic app-render smoke check. Keep tests focused on compatibility and existing visible behavior.
- **Replace the lockfile from a clean dependency resolution and audit the resulting tree.** Fix vulnerabilities through supported package updates and the CRA replacement; avoid force overrides that leave incompatible transitive dependencies.

## Risks / Trade-offs

- [Vite serves a different development/build pipeline than CRA] → Update scripts and docs together; verify development startup and production build.
- [Native range controls can render differently across browsers] → Match dimensions and behavior with CSS and verify the controls in the app.
- [React 19 exposes deprecated mount APIs and invalid async effect returns] → Make narrowly scoped compatibility updates without changing algorithm ordering or timing semantics.
- [The old audit reports many transitive advisories] → Re-run `npm audit` against the new lockfile and record any remaining issues rather than assuming the migration clears all advisories.
- [Node/npm versions may differ across developer machines] → Document a supported Node LTS baseline and verify install/build/test against it.

## Migration Plan

1. Replace CRA dependencies/scripts with Vite and test tooling; update the HTML entry and public asset references.
2. Update React entry/effect compatibility, slider controls, and obsolete metrics wiring.
3. Update the stale smoke test and project documentation.
4. Resolve dependencies and regenerate `package-lock.json` from a clean install.
5. Run install, tests, production build, and `npm audit`; address findings within the new supported dependency graph.

Rollback is a source-control revert of the tooling/dependency change. No persisted data or deployment migration is involved.
