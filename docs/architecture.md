# Repository Architecture

## Purpose and maintenance rule

This document is the repository's canonical technical reference. Before an LLM inspects or changes this repository, it should read `docs/architecture.md` first, then inspect the relevant source files to confirm the current implementation. When a repository change affects behavior, architecture, dependencies, commands, or constraints described here, update this document in the same change. Keep descriptions factual: this document records what the code does, including known limitations, and is not a substitute for the source of truth when code has changed.

The project is a browser-based sorting algorithm visualizer. It displays a generated array as vertical bars, animates five sorting algorithms, and presents pseudocode and time-complexity summaries alongside the visualization. It is a client-side single-page React app; there is no backend, persistence layer, router, or API.

## Technology and runtime

- React 19.3.1 with function components and hooks.
- Vite 8 with `@vitejs/plugin-react`; its root `index.html` is the application entry, and npm resolves dependencies through `package-lock.json`.
- Native range inputs provide the array-size and delay controls.
- Tests use Vitest, jsdom, and React Testing Library.
- Web Vitals reporting is not configured.
- `index.html` supplies the root element and includes manifest/favicon metadata and a Microsoft Clarity script. The referenced static assets live in `public/`.

Useful commands, run from the repository root:

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies from the lockfile. |
| `npm run dev` | Start the Vite development server. |
| `npm start` | Alias for the Vite development server. |
| `npm test` | Run the Vitest/React Testing Library suite once. |
| `npm run build` | Create a production bundle in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Verification baseline

The Vite migration was verified on 2026-11-12 with Node 26.13.1 and npm 11.20.0:

| Command | Result |
| --- | --- |
| `npm test` | Passed: 1 test file and 6 tests, including visualizer rendering and each sorter completing at zero delay. |
| `npm run build` | Passed: Vite produced the production bundle in `dist/`. |
| `npm audit` | Passed: 0 vulnerabilities; no remaining advisories require a dependency-path rationale. |

## Application structure and data flow

`src/index.jsx` mounts `<App />` into `#root` inside `React.StrictMode` using `createRoot`. `src/App.jsx` is a thin shell that renders `OptionsBar`. The main application state and algorithm selection live in `src/components/OptionsBar.jsx`.

`OptionsBar` owns:

| State | Initial value | Meaning |
| --- | --- | --- |
| `arr` | `[]`, then generated on mount | Array of `{ num, idx }` items shared with the selected algorithm. |
| `arrSize` | `100` | Requested number of bars. |
| `currSort` | `0` | Selected algorithm index: Merge, Quick, Bubble, Selection, Insertion. |
| `doSort` | `false` | Starts the selected component's asynchronous sorting animation and disables controls while it runs. |
| `delay` | `5` ms | Pause used by the algorithms between visible steps. |

On mount and whenever `arrSize` changes, `generateRandomArray` builds `arrSize` objects. Each `num` is an integer from 0 through 999, and `idx` is the item's original position and stable React key. The Random button invokes the same generator. The size slider is configured for 0–200 in steps of 10. The delay slider is configured for 0–500 ms in steps of 5. The handlers also clamp values, with a delay upper clamp of 1000 ms (above the slider's reachable maximum). The `timeout` function returns a Promise resolved by `setTimeout` using the current delay; each sorter awaits it to pace its animation.

The selected sorter receives `arrayProp`, `doSort`, `setDoSort`, and `timeout`. The selected sorter renders the chart and algorithm information. Array regeneration or size change passes a new `arrayProp`; each non-merge sorter copies that prop into local array state in an effect, while Merge Sort uses `masterArr` for the displayed intermediate state and synchronizes it from `arrayProp` in an effect. Sorters set `doSort` back to false after their asynchronous algorithm completes. Controls and algorithm tabs are disabled or ignored while sorting; the active sorter is selected by conditional rendering, so changing algorithms unmounts the prior algorithm component.

## Visualization and algorithm behavior

`src/components/Barchart.js` maps each item to a bar. Bar height is proportional to its numeric value (`num * 0.25` pixels); width, margin, and whether values are printed inside bars vary by array length. `idx` provides the bar key and links highlights to the same item even when sorting reorders it. The visual states are: active items in white, pivot in red, completed items in light green, and other items in indigo. The sorter components pass arrays of active and sorted items, plus a pivot item where applicable.

The five implementations are independent React components in `src/components/`:

- **Merge Sort (`MergeSort.js`)**: recursive divide and conquer. It merges sorted halves and updates `masterArr` to show intermediate merged regions. Active comparisons are highlighted. Its displayed time complexity is O(N log N) for best, average, and worst cases.
- **Quick Sort (`QuickSort.js`)**: recursive partitioning using the high item as pivot. It mutates a working array, publishes snapshots to local state during partitioning, and highlights the pivot and active positions. Its displayed complexities are O(N log N) best/average and O(N²) worst.
- **Bubble Sort (`BubbleSort.js`)**: adjacent comparisons and swaps across repeated passes. It highlights each compared pair and marks the suffix as sorted after each pass. Displayed complexity is O(N²) for all cases.
- **Selection Sort (`SelectionSort.js`)**: scans each remaining suffix for a minimum, swaps it into the next output position, and marks the prefix sorted. Displayed complexity is O(N²) for all cases.
- **Insertion Sort (`InsertionSort.js`)**: moves each item left through adjacent swaps until it reaches its sorted position, marking the prefix sorted. Displayed best case is O(N), average/worst are O(N²).

All algorithms sort ascending by `num`. Sorter state and working arrays are local to the selected component; there is no shared algorithm engine or step/event abstraction. The sort loops await the injected timeout to create animation pauses and call React state setters for frames. The pseudocode and complexity panels are hard-coded in each algorithm component rather than generated from the implementation.

## Styling and page layout

- `src/index.css` provides global page defaults: zero body margin, system sans-serif type, and dark background.
- `src/App.css` contains base code-font styling.
- `src/components/OptionsBar.css` styles the navigation/controls and uses viewport-width media queries to adjust layout and font/button sizing down to mobile widths.
- `src/components/style.css` styles the chart, bar container, pseudocode and complexity cards, plus a breakpoint at 1200 px. The chart can scroll horizontally when bars do not fit.
- Most selectors are global ID selectors (including repeated IDs inside a bar map), so component styles are not scoped or CSS-module isolated.

## Repository map

| Path | Responsibility |
| --- | --- |
| `src/index.jsx` | React DOM entry point. |
| `src/App.jsx` | App shell. |
| `src/components/OptionsBar.jsx` | Controls, top-level state, random data generation, algorithm selection, animation delay. |
| `src/components/Barchart.jsx` | Bar rendering, sizing, and color highlighting. |
| `src/components/{MergeSort,QuickSort,BubbleSort,SelectionSort,InsertionSort}.jsx` | Algorithm execution, per-algorithm animation state, pseudocode, complexity text. |
| `src/components/OptionsBar.css`, `src/components/style.css` | Responsive controls and visualization styling. |
| `src/App.test.jsx`, `src/setupTests.js` | Vitest render and sorter-completion checks plus matcher setup. |
| `index.html` | Vite HTML entry shell. |
| `public/` | Manifest, icons, and robots file. |
| `Dockerfile`, `nginx.conf`, `.dockerignore` | Multi-stage containerization build and Nginx SPA routing. |
| `terraform/` | Terraform infrastructure managing GCP APIs, Artifact Registry, Cloud Run v2, and IAM. |
| `.github/workflows/deploy.yml` | GitHub Actions automated test, build, and Cloud Run deployment pipeline. |
| `openspec/`, `.agents/skills/` | OpenSpec configuration and repository-local OpenSpec workflow skills. |
| `README.md` | Setup requirements and Vite/Vitest command reference. |

## Cloud Hosting and CI/CD Architecture

### Hosting Topology (Google Cloud Run)
The application is containerized and hosted on Google Cloud Platform (GCP) in region `asia-south1` (Mumbai) using Cloud Run v2.
- **Compute**: Cloud Run v2 (`algorithm-visualizer`) runs a lightweight Nginx container serving the static Vite build output from `/usr/share/nginx/html`.
- **Scale to Zero**: Scaled between 0 and 5 instances with `INGRESS_TRAFFIC_ALL` enabled. When idle, the service scales to 0 instances incurring zero compute charges.
- **Networking**: Cloud Run terminates managed HTTPS with automatic SSL certificates and forwards incoming traffic to container port 8080.
- **Routing**: `nginx.conf` routes unmatched client requests via `try_files $uri $uri/ /index.html` to support client-side Single Page Application behaviors and sets 1-year cache headers for immutable static assets.

### Infrastructure as Code (Terraform)
All GCP resources are declared and version-controlled under `terraform/`:
- **State Backend**: Remote state is stored in a dedicated Google Cloud Storage bucket `gs://algorithm-visualizer-adwait-tfstate` with state prefix `terraform/state`.
- **Managed Resources**:
  - GCP Service APIs: `run.googleapis.com`, `artifactregistry.googleapis.com`, `cloudbuild.googleapis.com`.
  - Artifact Registry Docker repository: `algorithm-visualizer-repo` in `asia-south1`.
  - Cloud Run v2 service: `algorithm-visualizer` with 512Mi memory and 1 vCPU limits.
  - IAM Member: `allUsers` granted `roles/run.invoker` for unauthenticated public web access.

### CI/CD Pipeline (GitHub Actions)
Continuous deployment is automated via `.github/workflows/deploy.yml`:
- **Trigger**: Pushes and merged pull requests to the `main` branch.
- **Jobs**:
  1. Checks out repository and installs Node.js 22.
  2. Runs automated tests (`npm test`).
  3. Authenticates to GCP using a dedicated Service Account (`github-deployer`) via secret `GCP_SA_KEY`.
  4. Configures Docker credentials for `asia-south1-docker.pkg.dev`.
  5. Builds and tags multi-stage Docker container with `${{ github.sha }}` and `latest`.
  6. Pushes image to Artifact Registry and updates the Cloud Run revision.

## Current limitations and implementation notes

These describe the present code and should be revisited if the implementation changes:

- The only editable array property is its size; there is no direct control over values, ascending/descending order, pause, cancellation, or manual stepping.
- An array size of zero is allowed. Bubble, Selection, and Quick Sort naturally perform no loop work for an empty array. Insertion Sort temporarily puts `undefined` in its sorted-highlight state, while Merge Sort's recursion has no empty-range base case (`lo > hi`) and can recurse indefinitely. Empty-array behavior should be handled before claiming zero-size support works across all sorts.
- Sorting logic is embedded in React components and mutates item order in working arrays. Animation timing is implemented with a shared timeout closure, and there is no cancellation/unmount cleanup abstraction.
- The code and UI have a few documentation/display mismatches: for example, Bubble Sort's pseudocode shows a different swap expression than its implementation, and Quick Sort's pseudocode loop bound differs from the implementation. Treat the JavaScript implementation as the executable behavior.
- `src/App.test.jsx` covers visualizer rendering, native-control defaults, and completion of each sorter at zero delay. There are no dedicated assertions for the intermediate algorithm frames.
- The HTML title and description identify the visualizer. The HTML also loads Clarity analytics, so the hosted app may make an external analytics request.

## Change guidance

When changing the app, preserve the `{ num, idx }` item shape or update every consumer (`OptionsBar`, all sorters, and `Barchart`) together. Keep the algorithm selector ordering aligned with its conditional rendering. If changing slider ranges, defaults, or delay semantics, update both the controls and the documented behavior here. If adding an algorithm, update the selection list, rendered component mapping, this architecture reference, and relevant tests. If changing the project tooling or scripts, update the technology and command sections. Keep this document aligned with observable behavior and implementation rather than intended future features.
