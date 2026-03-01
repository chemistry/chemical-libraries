# @chemistry/formula

[![npm version](https://badge.fury.io/js/%40chemistry%2Fformula.svg)](https://badge.fury.io/js/%40chemistry%2Fformula)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Library for parsing and formatting chemical formulas.

## Install

```bash
npm install @chemistry/formula
```

## Usage

```typescript
import { Formula } from '@chemistry/formula';

// Parse a chemical formula into element counts
const formula = Formula.parse('C2H5OH');
console.log(formula); // { C: 2, H: 6, O: 1 }

// Convert element counts back to a formula string
const str = Formula.convertToString(formula);
console.log(str); // C2H6O

// Calculate molecular weight
const weight = Formula.convertToWeight(formula);
console.log(weight); // 46.069...
```

## API

### `Formula.parse(formula: string): Record<string, number>`

Parses a chemical formula string and returns an object mapping element symbols to their counts.

### `Formula.convertToString(formula: Record<string, number>): string`

Converts an element count object back to a formatted formula string (Hill system order: C first, H second, then alphabetical).

### `Formula.convertToWeight(formula: Record<string, number>): number`

Calculates the molecular weight from an element count object using standard atomic masses.

## License

MIT
