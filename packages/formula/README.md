# @chemistry/formula
[![npm version](https://badge.fury.io/js/%40chemistry%2Fcrystal.svg)](https://badge.fury.io/js/%40chemistry%2Fformula)
[![Build Status](https://travis-ci.com/chemistry/chemical-libraries.svg?branch=master)](https://travis-ci.org/chemistry/chemical-libraries)
[![codecov](https://codecov.io/gh/chemistry/chemical-libraries/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chemical-libraries)
[![License: MIT](https://img.shields.io/badge/License-MIT-gren.svg)](https://opensource.org/licenses/MIT)

Library for working with chemical formula

## Install
```bash
npm install @chemistry/formula
```

## Include following clases:
  * Formula

## Getting started:
```javascript
import { Formula } from "@chemistry/formula";

const formula = Formula.parse('C2H5OH');
console.log(formula); // { C: 2, H: 6, O:1 }

const str = Formula.convertToString(formula);
console.log(str); // C2H6O
```

## Commands:
  * Build project: `npm run build`
