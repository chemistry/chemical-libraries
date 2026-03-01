import type { IMoleculeState } from './reducer.js';

export const exportMolecule = (molecule: IMoleculeState, _format: string): IMoleculeState => {
  return molecule;
};
