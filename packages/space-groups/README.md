# @chemistry/space-groups

[![npm](https://img.shields.io/npm/v/@chemistry/space-groups)](https://www.npmjs.com/package/@chemistry/space-groups)

All 230 crystallographic space groups with symmetry operations.

## Installation

```bash
npm install @chemistry/space-groups
```

## Usage

```typescript
import { SpaceGroup } from '@chemistry/space-groups';

const sg = SpaceGroup.getById(225);
// { id: 225, hm: "F m -3 m", hs: "-F 4 2 3", o: 24, s: [...192 symmetry operations] }

const all = SpaceGroup.getAll();
// Array of 230 space groups
```

## Features

- All 230 space groups (ITA standard)
- Hermann-Mauguin and Hall symbols
- Symmetry operations for each group
- Lookup by ID or symbol
- Isomorphic — works in Node.js and browsers

## License

MIT
