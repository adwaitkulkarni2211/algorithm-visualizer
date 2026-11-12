# Algorithm Visualizer

An interactive React application that animates Merge, Quick, Bubble, Selection, and Insertion Sort.

## Requirements

- Node.js 20.19+ or 22.12+ (an active LTS release is recommended)
- npm

## Setup

```bash
npm install
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm start` | Alias for the Vite development server. |
| `npm test` | Run the Vitest suite once. |
| `npm run build` | Build the production site into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm audit` | Check the resolved dependency tree for published security advisories. |

The array-size and animation-delay controls are native keyboard-accessible range inputs. Controls are disabled while a sort is running.

For implementation details and maintenance guidance, see [the architecture reference](docs/architecture.md).
