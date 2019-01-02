# @chemistry/crystal

[![npm version](https://badge.fury.io/js/%40chemistry%2Fcrystal.svg)](https://badge.fury.io/js/%40chemistry%2Fcrystal)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Library for working with crystal structure (periodic molecule)

## Install
```bash
npm install @chemistry/crystal
```

## Include following clases:
  * UnitCell

## Getting started:
```javascript
import { UnitCell } from "@chemistry/crystal";

const v = UnitCell.getVolume({ a: 2, b: 3, c: 4, alpha: 90, beta: 90, gamma: 90 });

// 24
console.log(v);
```

## Commands:
  * Build project: `npm run build`
