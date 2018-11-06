# @chemistry/elements

[![npm version](https://badge.fury.io/js/%40chemistry%2Felements.svg)](https://badge.fury.io/js/%40chemistry%2Felements)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Library that contains information about elements In periodic table: Number, Symbol, Name, Mass, max Bonds Count, Covalent & van der Waals Radius, typical color;


## Include following clases:
  * Elements

## How to use:
```javascript
import { Element } from 'elements';
let hydrogen = Element.getElementById(1);
console.log('Element #1 name:', hydrogen.name); // Hydrogen

let carbon = Element.getElementByName('C');
console.log('Carbon Covalent radius:', carbon.RCow); // 0.77
```
## Commands:
  * Run unit tests: `npm run test`
  * Start TDD flow: `npm run tdd`
  * Run linter verification: `npm run lint`
  * Run linter verification & fix: `npm run lintfix`
  * Build project: `npm run build`
