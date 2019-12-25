# @chemistry/math
[![npm version](https://badge.fury.io/js/%40chemistry%2Fmath.svg)](https://badge.fury.io/js/%40chemistry%2Fmath)
[![Build Status](https://travis-ci.com/chemistry/chemical-libraries.svg?branch=master)](https://travis-ci.org/chemistry/chemical-libraries)
[![codecov](https://codecov.io/gh/chemistry/chemical-libraries/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chemical-libraries)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Simple linear algebra Math library to support [chemistry js project](http://vreshch.com/chemistry-js.html)

## Install
```bash
npm install @chemistry/math
```

## Include following clases:
  * Vec3
  * Matrix3x3
  * Matrix3x4
  * Transform3d
  * Quaternion

## Getting started:
```javascript
import { V, ChemElementData } from '@chemistry/math';
const matrix = new Matrix3x3([1, 0, 0,  0, 2, 0,  0, 0, 3]);
const vector = new Vec3(2, 3, 1);

const res = matrix.project(vector);
// (2.00, 6.00, 3.00)
console.log(res);
```

## Commands:
  * Build project: `npm run build`
