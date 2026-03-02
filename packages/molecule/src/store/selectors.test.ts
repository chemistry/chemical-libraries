import { MoleculeDataFormat } from '../models.js';
import type { IMoleculeState } from './reducer.js';
import { exportMolecule, selectAtomCount, selectBondCount } from './selectors.js';

const sampleState: IMoleculeState = {
  id: 'mol-1',
  title: 'Water',
  atoms: {
    a1: { x: 0, y: 0, z: 0, type: 'O' },
    a2: { x: 1, y: 0, z: 0, type: 'H' },
    a3: { x: -1, y: 0, z: 0, type: 'H' },
  },
  bonds: {
    b1: { atom1: 'a1', atom2: 'a2', order: 1 },
    b2: { atom1: 'a1', atom2: 'a3', order: 1 },
  },
};

describe('selectors', () => {
  describe('exportMolecule', () => {
    it('should export jnmol format as deep copy', () => {
      const result = exportMolecule(sampleState, MoleculeDataFormat.jnmol);
      expect(result).toEqual(sampleState);
      expect(result).not.toBe(sampleState);
      expect(result.atoms).not.toBe(sampleState.atoms);
    });

    it('should throw for unsupported format', () => {
      expect(() => exportMolecule(sampleState, MoleculeDataFormat.jmol)).toThrowError(
        'jmol is not supported'
      );
    });
  });

  describe('selectAtomCount', () => {
    it('should return number of atoms', () => {
      expect(selectAtomCount(sampleState)).toEqual(3);
    });

    it('should return 0 for empty atoms', () => {
      expect(selectAtomCount({ ...sampleState, atoms: {} })).toEqual(0);
    });
  });

  describe('selectBondCount', () => {
    it('should return number of bonds', () => {
      expect(selectBondCount(sampleState)).toEqual(2);
    });

    it('should return 0 for empty bonds', () => {
      expect(selectBondCount({ ...sampleState, bonds: {} })).toEqual(0);
    });
  });
});
