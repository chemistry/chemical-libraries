import { MoleculeDataFormat } from '../models.js';
import type { IMoleculeState } from './reducer.js';

export const exportMolecule = (
  molecule: IMoleculeState,
  format: MoleculeDataFormat
): IMoleculeState => {
  if (format === MoleculeDataFormat.jnmol) {
    return JSON.parse(JSON.stringify(molecule)) as IMoleculeState;
  }
  throw new Error(format + ' is not supported');
};

export const selectAtomCount = (state: IMoleculeState): number => {
  return Object.keys(state.atoms).length;
};

export const selectBondCount = (state: IMoleculeState): number => {
  return Object.keys(state.bonds).length;
};
