# Chemical Libraries

[![GitHub Release](https://img.shields.io/github/v/release/chemistry/chemical-libraries)](https://github.com/chemistry/chemical-libraries/releases)
[![CI](https://github.com/chemistry/chemical-libraries/workflows/CI/badge.svg)](https://github.com/chemistry/chemical-libraries/actions?query=workflow%3ACI)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Open-source cheminformatics libraries for JavaScript. Isomorphic — works in Node.js and browsers.

## Packages

| Package                                            | Description                                                 | npm                                                                                                                   |
| -------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [@chemistry/common](./packages/common)             | Common data formats and interfaces (JMol, JNMol)            | [![npm](https://img.shields.io/npm/v/@chemistry/common)](https://www.npmjs.com/package/@chemistry/common)             |
| [@chemistry/elements](./packages/elements)         | Periodic table — element properties, radii, colors          | [![npm](https://img.shields.io/npm/v/@chemistry/elements)](https://www.npmjs.com/package/@chemistry/elements)         |
| [@chemistry/formula](./packages/formula)           | Chemical formula parsing, stringification, molecular weight | [![npm](https://img.shields.io/npm/v/@chemistry/formula)](https://www.npmjs.com/package/@chemistry/formula)           |
| [@chemistry/math](./packages/math)                 | Linear algebra — Vec3, Matrix3x3, Transform3D, Quaternion   | [![npm](https://img.shields.io/npm/v/@chemistry/math)](https://www.npmjs.com/package/@chemistry/math)                 |
| [@chemistry/molecule](./packages/molecule)         | Molecule data structure, JNMol loading, SVG export          | [![npm](https://img.shields.io/npm/v/@chemistry/molecule)](https://www.npmjs.com/package/@chemistry/molecule)         |
| [@chemistry/space-groups](./packages/space-groups) | 230 crystallographic space groups with symmetry operations  | [![npm](https://img.shields.io/npm/v/@chemistry/space-groups)](https://www.npmjs.com/package/@chemistry/space-groups) |

## Quick Start

```bash
npm install @chemistry/elements
```

```typescript
import { ChemElements } from '@chemistry/elements';

const hydrogen = ChemElements.getById(1);
// { id: 1, symbol: "H", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 1.00794, name: "Hydrogen", ... }

const carbon = ChemElements.getBySymbol('C');
// { id: 6, symbol: "C", RCow: 0.77, RVdW: 1.7, maxBonds: 4, mass: 12.0107, name: "Carbon", ... }
```

```typescript
import { Formula } from '@chemistry/formula';

const parsed = Formula.parse('C2H5OH');
// { C: 2, H: 6, O: 1 }

const weight = Formula.convertToWeight(parsed);
// 46.069
```

```typescript
import { SpaceGroup } from '@chemistry/space-groups';

const sg = SpaceGroup.getById(225);
// { id: 225, hm: "F m -3 m", hs: "-F 4 2 3", o: 24, s: [...192 symmetry operations] }
```

## Tech Stack

- **Monorepo:** npm workspaces
- **Language:** TypeScript 5.9, strict mode, ESM-only
- **Testing:** Vitest, 70% coverage threshold
- **Linting:** ESLint flat config + typescript-eslint + Prettier
- **CI/CD:** GitHub Actions — automated weekly releases
- **Target:** ES2020, isomorphic (Node.js 20+ & modern browsers)

## Development

```bash
npm install
npm run build
npm run verify    # type-check + lint + format:check + test + build
```

## Commands

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run verify`       | Full validation pipeline                |
| `npm run build`        | Build all packages (dependency-ordered) |
| `npm run test`         | Run unit tests                          |
| `npm run lint`         | Lint source code                        |
| `npm run format`       | Format with Prettier                    |
| `npm run format:check` | Check formatting                        |
| `npm run type-check`   | TypeScript type checking                |
| `npm run clean`        | Remove dist and coverage                |

## License

MIT &copy; [Volodymyr Vreshch](https://vreshch.com)
