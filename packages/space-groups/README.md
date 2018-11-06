# @crystallography/space-groups

[![npm version](https://badge.fury.io/js/%40crystallography%2Fspace-groups.svg)](https://badge.fury.io/js/%40crystallography%2Fspace-groups)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/crystallography/space-groups/branch/master/graph/badge.svg)](https://codecov.io/gh/crystallography/space-groups)

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
