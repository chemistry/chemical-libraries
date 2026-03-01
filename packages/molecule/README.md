# @chemistry/molecule

[![npm version](https://badge.fury.io/js/%40chemistry%2Fmolecule.svg)](https://badge.fury.io/js/%40chemistry%2Fmolecule)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Library for working with molecular structures — add atoms, bonds, and export to SVG.

## Install

```bash
npm install @chemistry/molecule
```

## Usage

```typescript
import { Molecule } from '@chemistry/molecule';

// Load molecule from JNMol format
const mol = new Molecule();
mol.load({
  id: 'acetone',
  title: 'Acetone',
  atoms: {
    a1: { x: 0, y: 0, z: 0, type: 'C' },
    a2: { x: 1.2, y: 0, z: 0, type: 'C' },
    a3: { x: 2.4, y: 0, z: 0, type: 'O' },
  },
  bonds: {
    b1: { atom1: 'a1', atom2: 'a2', order: 1 },
    b2: { atom1: 'a2', atom2: 'a3', order: 2 },
  },
});

// Query molecule properties
console.log(mol.getAtomCount()); // 3
console.log(mol.getBondCount()); // 2

// Export to SVG string
const svg = mol.toSVG();
```

## API

### `new Molecule()`

Creates an empty molecule instance.

### `mol.load(data: unknown)`

Loads molecular data in JNMol format (atoms with x/y/z coordinates and type, bonds with atom references and order).

### `mol.getAtomCount(): number`

Returns the number of atoms in the molecule.

### `mol.getBondCount(): number`

Returns the number of bonds in the molecule.

### `mol.toSVG(options?: SvgExportOptions): string`

Renders the molecule as an SVG string. Accepts optional display options for bond length, colors, labels, etc.

## Peer Dependencies

- `react` (optional) — required only for SVG export functionality

## License

MIT
