# @chemistry/space-groups

[![npm version](https://badge.fury.io/js/%40chemistry%2Fspace-groups.svg)](https://badge.fury.io/js/%40chemistry%2Fspace-groups)
[![Build Status](https://travis-ci.com/chemistry/chemical-libraries.svg?branch=master)](https://travis-ci.org/chemistry/chemical-libraries)
[![codecov](https://codecov.io/gh/chemistry/chemical-libraries/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chemical-libraries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Crystallography: Space Groups Dictionary

## Install
```bash
npm install @chemistry/space-groups
```

## Getting started:
### SpaceGroupData
```javascript
import { SpaceGroupData }  from '@chemistry/space-groups';
/*
  id: Space Group number
  hm: Hermann Mauguin Symbol
  hs: Hall Symbol
  o: Representative Operations
  s: Symetry List
*/
const sg = SpaceGroupData[2];
// -> {id: 2, hm: "P -1", hs: "-P 1", o: 1, s: ["x,y,z", "-x,-y,-z"]}
console.log(sg);
```
### SpaceGroup

```javascript
import { SpaceGroup }  from '@chemistry/space-groups';

const sg = SpaceGroup.getByHMName('P -1');

console.log(sg);
// -> {id: 2, hm: "P -1", hs: "-P 1", o: 1, s: ["x,y,z", "-x,-y,-z"]}
console.log(SpaceGroup.getCrystalSystem(sg));
// -> Triclinic
```

## Commands:
  * Build project: `npm run build`
