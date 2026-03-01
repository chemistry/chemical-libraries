# Common Chemical Libraries

[![release version](https://img.shields.io/github/v/release/chemistry/chemical-libraries?color=green.svg)](https://github.com/chemistry/chemical-libraries/releases)
[![GitHub Build Status](https://github.com/chemistry/chemical-libraries/workflows/CI/badge.svg)](https://github.com/chemistry/chemical-libraries/actions?query=workflow%3ACI)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Open Cheminformatics Libraries written in TypeScript and working both in browser and server side (Node.js)

## Packages

- [@chemistry/common](https://github.com/chemistry/chemical-libraries/tree/master/packages/common) - common interfaces
- [@chemistry/elements](https://github.com/chemistry/chemical-libraries/tree/master/packages/elements) - chemical elements table information
- [@chemistry/formula](https://github.com/chemistry/chemical-libraries/tree/master/packages/formula) - utils for parsing chemical formula
- [@chemistry/math](https://github.com/chemistry/chemical-libraries/tree/master/packages/math) - linear algebra support
- [@chemistry/molecule](https://github.com/chemistry/chemical-libraries/tree/master/packages/molecule) - molecule basic class
- [@chemistry/space-groups](https://github.com/chemistry/chemical-libraries/tree/master/packages/space-groups) - space groups list

## Getting started

```typescript
import { ChemElement } from '@chemistry/elements';

const hydrogen = ChemElement.getById(1);
console.log(hydrogen);
//   { id: 1, symbol: "H", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 1.00794, name: "Hydrogen", posX: 1, posY: 1, color: "#FFFFFF", color2: "#808080" }

const carbon = ChemElement.getBySymbol('C');
console.log(carbon);
//   { id: 6, symbol: "C", RCow: 0.77, RVdW: 1.7, maxBonds: 4, mass: 12.0107, name: "Carbon", posX: 2, posY: 14, color: "#909090", color2: "#000000" }
```

## Technical description

- npm workspaces monorepo
- TypeScript 5.9, ESM-only output
- Vitest for testing
- ESLint + Prettier
- Isomorphic (Node.js & browsers)
- Automated release pipeline via GitHub Actions

## Development

```bash
npm install
npm run build
```

## Commands

- `npm run verify` - type-check + lint + format check + test + build
- `npm run test` - run unit tests
- `npm run lint` - run linter
- `npm run format` - format code with Prettier
- `npm run build` - build all packages
- `npm run clean` - remove dist and coverage

## License

This project is licensed under the MIT license, Copyright (c) 2019 Volodymyr Vreshch.
For more information see [LICENSE.md](https://github.com/chemistry/chemical-libraries/blob/master/LICENSE.md).
