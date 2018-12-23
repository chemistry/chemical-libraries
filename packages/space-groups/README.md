# @chemistry/space-groups

[![npm version](https://badge.fury.io/js/%40chemistry%2Fspace-groups.svg)](https://badge.fury.io/js/%40chemistry%2Fspace-groups)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Crystallography: Space Groups list;

## Include following clases:
  * SpaceGroup
  * SpaceGroupData (data in json format)

## How to use:
### SpaceGroupData
```javascript
import { SpaceGroupData }  from 'space-groups';
/*
  id: Space Group number
  hm: Hermann Mauguin Symbol
  hs: Hall Symbol
  o: Representative Operations
  s: Symetry List
*/
const sg = SpaceGroupData[2];
console.log(sg); // {id: 2, hm: "P -1", hs: "-P 1", o: 1, s: ["x,y,z", "-x,-y,-z"]}

```
### SpaceGroup

```javascript
import { SpaceGroup }  from 'space-groups';

const sg = SpaceGroup.getByHMName('P -1');

console.log(sg); // {id: 2, hm: 'P -1', hs: '-P 1',  o: 1, s: [ 'x,y,z', '-x,-y,-z' ] }
console.log(SpaceGroup.getCrystalSystem(sg)); // Triclinic
```

## Commands:
  * Build project: `npm run build`
