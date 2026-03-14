# @chemistry/formula

[![npm](https://img.shields.io/npm/v/@chemistry/formula)](https://www.npmjs.com/package/@chemistry/formula)

Chemical formula parser — parse, stringify, and calculate molecular weight.

## Installation

```bash
npm install @chemistry/formula
```

## Usage

```typescript
import { Formula } from '@chemistry/formula';

const parsed = Formula.parse('C2H5OH');
// { C: 2, H: 6, O: 1 }

const weight = Formula.convertToWeight(parsed);
// 46.069

const str = Formula.stringify(parsed);
// "C2H6O"
```

## Features

- Parse chemical formulas into element counts
- Calculate molecular weight
- Stringify parsed formulas back to string
- Isomorphic — works in Node.js and browsers

## License

MIT
