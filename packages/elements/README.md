# @chemistry/elements

[![npm](https://img.shields.io/npm/v/@chemistry/elements)](https://www.npmjs.com/package/@chemistry/elements)

Periodic table data — element properties, atomic radii, colors, and more.

## Installation

```bash
npm install @chemistry/elements
```

## Usage

```typescript
import { ChemElements } from '@chemistry/elements';

const hydrogen = ChemElements.getById(1);
// { id: 1, symbol: "H", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 1.00794, name: "Hydrogen", ... }

const carbon = ChemElements.getBySymbol('C');
// { id: 6, symbol: "C", RCow: 0.77, RVdW: 1.7, maxBonds: 4, mass: 12.0107, name: "Carbon", ... }
```

## Features

- All 118 elements with properties
- Covalent and Van der Waals radii
- Atomic mass and max bonds
- Element colors for visualization
- Isomorphic — works in Node.js and browsers

## License

MIT
