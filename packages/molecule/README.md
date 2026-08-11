# @chemistry/molecule

[![npm](https://img.shields.io/npm/v/@chemistry/molecule)](https://www.npmjs.com/package/@chemistry/molecule)

Molecule data structure — load, manipulate, and export molecular data.

## Installation

```bash
npm install @chemistry/molecule
```

## Usage

```typescript
import { Molecule, MoleculeDataFormat } from '@chemistry/molecule';

const mol = new Molecule();
mol.load(jnmolData, MoleculeDataFormat.jnmol);

const atomCount = mol.getAtomCount();
const bondCount = mol.getBondCount();

const svg = await mol.toSVG({ colorElements: true, fontSize: 14 });
```

`toSVG` returns an SVG string — no React or DOM required.

## Features

- Molecule data structure with atoms and bonds
- JNMol format loading
- SVG export for 2D visualization
- Molecule state management via store
- Isomorphic — works in Node.js and browsers

## License

MIT
