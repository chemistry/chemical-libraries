# chem-js-lib
[![npm version](https://badge.fury.io/js/%40chemistry%2Felements.svg)](https://badge.fury.io/js/%40chemistry%2Felements)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Open Cheminformatics Libraries written in JavaScript and working both in browser and server side (NodeJS)

## Solution include following libraries:
  * [@chemistry/common](https://github.com/chemistry/chem-js-lib/tree/master/packages/common) - common interfaces
  * [@chemistry/elements](https://github.com/chemistry/chem-js-lib/tree/master/packages/elements) - chemical elements table information
  * [@chemistry/formula](https://github.com/chemistry/chem-js-lib/tree/master/packages/formula) - utils for parsing chemical formula
  * [@chemistry/math](https://github.com/chemistry/chem-js-lib/tree/master/packages/math) - linear algebra support
  * [@chemistry/molecule](https://github.com/chemistry/chem-js-lib/tree/master/packages/molecule) - molecule basic class
  * [@chemistry/space-groups](https://github.com/chemistry/chem-js-lib/tree/master/packages/space-groups) - space groups list

## Getting started:
Example of @chemistry/elements usecase;
```javascript
import { ChemElement, ChemElementData } from '@chemistry/elements';

const hydrogen = ChemElement.getById(1);
console.log(hydrogen);
//   { id: 1, symbol: "H", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 1.00794, name: "Hydrogen", posX: 1, posY: 1, color: "#FFFFFF", color2: "#808080" }

const carbon = ChemElement.getBySymbol('C');
console.log(carbon);
//   { id: 6, symbol: "C", RCow: 0.77, RVdW: 1.7, maxBonds: 4, mass: 12.0107, name: "Carbon", posX: 2, posY: 14, color: "#909090", color2: "#000000" }
```

## Technical description (all libraries):
  * Typescript 3.1 (export typings)
  * Isomorphic (can be used with node & with browsers)
  * Compiled as UMD module (can be used as CommonJS, AMD & direct module include syntax)
  * Build with TDD in mind (tests with jest)
  * 100% code coverage

## Development Quick Start
```bash
npm install
npm run bootstrap
npm run build
```

## Commands:
  * Run unit tests: `npm run test`
  * Start TDD flow: `npm run tdd`
  * Run linter verification: `npm run lint`
  * Run linter verification & fix: `npm run lintfix`
  * Build project: `npm run build`
  * Publish new version: `npm run do-publish`

## License
  This project is licensed under the MIT license, Copyright (c) 2018 Volodymyr Vreshch.
  For more information see [LICENSE.md](https://github.com/chemistry/chem-js-lib/blob/master/LICENSE.md).
