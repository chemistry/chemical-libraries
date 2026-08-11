import { describe, expect, it } from 'vitest';
import { extractJsonPayload } from './check-pack.js';

const FILES = [{ path: 'package.json' }, { path: 'dist/index.js' }, { path: 'LICENSE' }];
const ARRAY_SHAPE = JSON.stringify([{ name: '@chemistry/common', files: FILES }]);
const OBJECT_SHAPE = JSON.stringify({ '@chemistry/common': { files: FILES, bundled: [] } });

describe('extractJsonPayload', () => {
  it('parses the npm <=11 array shape', () => {
    expect(extractJsonPayload(ARRAY_SHAPE)).toEqual(JSON.parse(ARRAY_SHAPE));
  });

  it('parses the npm >=12 object shape', () => {
    expect(extractJsonPayload(OBJECT_SHAPE)).toEqual(JSON.parse(OBJECT_SHAPE));
  });

  it('skips lifecycle noise before the payload', () => {
    const polluted = `npm notice run @chemistry/common@3.5.0 prepack\nnpm notice run tsc\n${OBJECT_SHAPE}`;
    expect(extractJsonPayload(polluted)).toEqual(JSON.parse(OBJECT_SHAPE));
  });

  it('ignores trailing noise, even when it contains brackets', () => {
    const polluted = `${ARRAY_SHAPE}\nnpm notice run rm -rf packages/*/dist\n[extra] trailing ] junk }`;
    expect(extractJsonPayload(polluted)).toEqual(JSON.parse(ARRAY_SHAPE));
  });

  it('skips non-JSON bracketed noise before the payload', () => {
    const polluted = `notice [pre] {junk} lines\n${OBJECT_SHAPE}\nnotice [post]`;
    expect(extractJsonPayload(polluted)).toEqual(JSON.parse(OBJECT_SHAPE));
  });

  it('is not confused by brackets inside JSON strings', () => {
    const tricky = JSON.stringify([{ files: [{ path: 'weird}].name[{.js' }] }]);
    expect(extractJsonPayload(`noise\n${tricky}\nnoise ]}`)).toEqual(JSON.parse(tricky));
  });

  it('returns null when no JSON value is present', () => {
    expect(extractJsonPayload('npm notice nothing here')).toBeNull();
    expect(extractJsonPayload('[unterminated')).toBeNull();
    expect(extractJsonPayload('{"also": "unterminated"')).toBeNull();
  });
});
