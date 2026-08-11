#!/usr/bin/env node

/**
 * smoke.mjs
 *
 * Runtime counterpart to consumer.ts: imports every published package by bare
 * specifier through the real exports map and asserts the barrel symbols exist.
 *
 * Usage: node tools/consumer-check/smoke.mjs
 */

import assert from 'node:assert/strict';

const EXPECTED = [
  ['@chemistry/common', { EPSILON: 'number' }],
  ['@chemistry/elements', { ChemElements: 'function', ChemElementData: 'object' }],
  ['@chemistry/formula', { Formula: 'function' }],
  ['@chemistry/math', { Vec3: 'function', Quaternion: 'function' }],
  [
    '@chemistry/molecule',
    { Molecule: 'function', exportToSVG: 'function', defaultSvgOptions: 'object' },
  ],
  ['@chemistry/space-groups', { SpaceGroup: 'function', SpaceGroupsData: 'object' }],
];

for (const [specifier, symbols] of EXPECTED) {
  const mod = await import(specifier);

  for (const [name, kind] of Object.entries(symbols)) {
    assert.equal(
      typeof mod[name],
      kind,
      `${specifier}: expected export "${name}" to be a ${kind}, got ${typeof mod[name]}`
    );
  }

  console.log(`✔ ${specifier} — ${Object.keys(symbols).join(', ')}`);
}

console.log('\nConsumer smoke passed.');
