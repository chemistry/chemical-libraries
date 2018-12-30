# @chemistry/elements

[![npm version](https://badge.fury.io/js/%40chemistry%2Felements.svg)](https://badge.fury.io/js/%40chemistry%2Felements)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Library that contains information about elements In periodic table: Number, Symbol, Name, Mass, max Bonds Count, Covalent & van der Waals Radius, typical color;

## Include following clases:
  * ChemElement
  * ChemElementData

## How to use:
```javascript
import { ChemElement, ChemElementData } from '@chemistry/elements';

const hydrogen = ChemElement.getById(1);
console.log(hydrogen);
//   { id: 1, symbol: "H", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 1.00794, name: "Hydrogen", posX: 1, posY: 1, color: "#FFFFFF", color2: "#808080" }

const carbon = ChemElement.getBySymbol('C');
console.log(carbon);
//   { id: 6, symbol: "C", RCow: 0.77, RVdW: 1.7, maxBonds: 4, mass: 12.0107, name: "Carbon", posX: 2, posY: 14, color: "#909090", color2: "#000000" }

const elementsList = ChemElement.getAllSymbols();
console.log(elementsList);
// [H, He, Li, Be, B, C, N, O, F, Ne, .... ]

// Print out all list of elements
console.log(ChemElementData[9]);
// { id: 7, symbol: "N", RCow: 0.75, RVdW: 1.6, maxBonds: 4, mass: 14.0067, name: "Nitrogen", posX: 2, posY: 15, color: "#3050F8", color2: "#304FF7" }
```

## Contain following info about Carbon:
  * Number in periodic table: 6
  * Symbol of Element: C
  * Element name: Carbon
  * Element mass: 12.0107
  * Covalent Radius of element: 0.77
  * van der Waals radius of the element: 1.7
  * Element max Bonds: 4
  * Element color: 909090
  * Element color dark: 000000
  * Position X in periodic Table: 2
  * Position Y in periodic Table: 14
  *
## Commands:
  * Build project: `npm run build`
