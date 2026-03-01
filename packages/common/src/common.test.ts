import { EPSILON } from './common.js';

describe('Common', () => {
  it('should export EPSILON close to zerro', () => {
    expect(EPSILON).toBeCloseTo(0);
  });
});
