# @chemistry/molecule

[![npm](https://img.shields.io/npm/v/@chemistry/molecule)](https://www.npmjs.com/package/@chemistry/molecule)

Molecule data structure — load, manipulate, and export molecular data.

## Installation

```bash
npm install @chemistry/molecule
```

## Usage

```typescript
import { Molecule } from '@chemistry/molecule';

const mol = Molecule.fromJNMol(jnmolData);
const atoms = mol.getAtoms();
const bonds = mol.getBonds();
```

## Features

- Molecule data structure with atoms and bonds
- JNMol format loading
- SVG export for 2D visualization
- Molecule state management via store
- Isomorphic — works in Node.js and browsers

## License

MIT
