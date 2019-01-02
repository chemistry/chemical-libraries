# @chemistry/common

[![npm version](https://badge.fury.io/js/%40chemistry%2Fcommon.svg)](https://badge.fury.io/js/%40chemistry%2Fcommon)
[![Build Status](https://travis-ci.com/chemistry/chem-js-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-js-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Common data format and interfaces used by the library

## Install
```bash
npm install @chemistry/common
```

## Data Formats
  * JMol
  * JNMol

###  Jmol data format example
```javascript
  {
      id: '1',
      title: 'cyclohexane',
      atoms: [
          [1.9050, -0.7932, 0.0000, 'C'],
          [1.9050, -2.1232, 0.0000, 'C'],
          [0.7531, -0.1282, 0.0000, 'C'],
          [0.7531, -2.7882, 0.0000, 'C'],
          [-0.3987, -0.7932, 0.0000, 'C'],
          [-0.3987, -2.1232, 0.0000, 'C']
      ],
      bonds: [
        [2,  1,  1],
        [3,  1,  1],
        [4,  2,  1],
        [5,  3,  1],
        [6,  4,  1],
        [6,  5,  1]
      ]
  }
```

###  JNmol data format example
```javascript
  {
      id: '1',
      title: 'cyclohexane',
      atoms: {
          'atom:1': { x: 1.9050, y: -0.7932, z: 0.0000, type: 'C' },
          'atom:2': { x: 1.9050, y: -2.1232, z: 0.0000, type: 'C' },
          'atom:3': { x: 0.7531, y: -0.1282, z: 0.0000, type: 'C' },
          'atom:4': { x: 0.7531, y: -2.7882, z: 0.0000, type: 'C'},
          'atom:5': { x: -0.3987, y: -0.7932, z: 0.0000, type: 'C' },
          'atom:6': { x: -0.3987, y: -2.1232, z: 0.0000, type: 'C' }
      },
      bonds: {
          'bond:1': { atom1: 'atom:2', atom2: 'atom:1', order: 1 },
          'bond:2': { atom1: 'atom:3', atom2: 'atom:1', order: 1 },
          'bond:3': { atom1: 'atom:4', atom2: 'atom:2', order: 1 },
          'bond:4': { atom1: 'atom:5', atom2: 'atom:3', order: 1 },
          'bond:5': { atom1: 'atom:6', atom2: 'atom:4', order: 1 },
          'bond:6': { atom1: 'atom:6', atom2: 'atom:5', order: 1 }
      }
  }
```

## Declarated interfaces:
  * ICloneable
  * IEquatable

## Commands:
  * Build project: `npm run build`
