# chem-js-lib
[![npm version](https://badge.fury.io/js/%40chemistry%2Felements.svg)](https://badge.fury.io/js/%40chemistry%2Felements)
[![Build Status](https://travis-ci.com/chemistry/chem-ui-lib.svg?branch=master)](https://travis-ci.org/chemistry/chem-ui-lib)
[![codecov](https://codecov.io/gh/chemistry/chem-js-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/chemistry/chem-js-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Open Cheminformatics Libraries written in JavaScript and working both in browser and server side (NodeJS)

## Solution include following libraries:
  * [@chemistry/elements](https://github.com/chemistry/chem-js-lib/tree/master/packages/elements)
  * [@chemistry/math](https://github.com/chemistry/chem-js-lib/tree/master/packages/math)
  * [@crystallography/space-groups](https://github.com/chemistry/chem-js-lib/tree/master/packages/space-groups)

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
