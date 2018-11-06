# @crystallography/space-groups

[![npm version](https://badge.fury.io/js/%40crystallography%2Fspace-groups.svg)](https://badge.fury.io/js/%40crystallography%2Fspace-groups)
[![Build Status](https://travis-ci.com/chemistry/chem-ui-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-ui-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Crystallography: Space Groups list;

## Include following clases:
  * SpaceGroup
  * SpaceGroupData (json with information)

## How to use:
```javascript
import { SpaceGroup }  from 'space-groups';

const sg = SpaceGroup.getByHMName('P -1');

console.log(sg.id); // 2
console.log(sg.hermannMauguin); // P -1
console.log(sg.hallSymbol); // -P 1
console.log(sg.symetryList); // [ 'x,y,z', '-x,-y,-z' ]
console.log(sg.representativeOperations); // 1
console.log(sg.getCrystalSystem()); // Triclinic

```

## Commands:
  * Run unit tests: `npm run test`
  * Start TDD flow: `npm run tdd`
  * Run linter verification: `npm run lint`
  * Run linter verification & fix: `npm run lintfix`
  * Build project: `npm run build`
