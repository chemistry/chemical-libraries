# @chemistry/math

[![npm](https://img.shields.io/npm/v/@chemistry/math)](https://www.npmjs.com/package/@chemistry/math)

Linear algebra library for 3D chemistry — vectors, matrices, quaternions, and transforms.

## Installation

```bash
npm install @chemistry/math
```

## Usage

```typescript
import { Vec3, Matrix3x3, Quaternion, Transform3D } from '@chemistry/math';

const v = new Vec3(1, 2, 3);
const normalized = v.normalize();

const m = Matrix3x3.identity();
const transformed = m.multiplyVec3(v);

const q = new Quaternion(0, 0, 0, 1);
const rotated = q.rotate(v);
```

## Features

- `Vec2` / `Vec3` — 2D and 3D vector operations
- `Matrix3x3` / `Matrix3x4` — matrix operations and transformations
- `Quaternion` — quaternion math for rotations
- `Transform3D` — combined translation, rotation, and scale
- Isomorphic — works in Node.js and browsers

## License

MIT
