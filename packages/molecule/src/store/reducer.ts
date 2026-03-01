import type { JNMol } from '@chemistry/common';
import { MoleculeDataFormat } from '../models.js';
import type { MoleculeAction } from './actions.js';
import { ActionTypes } from './constants.js';
import { isValidJnmol } from './helpers/index.js';

export interface IMoleculeState extends JNMol {
  id: string;
  title: string;
  atoms: {
    [id: string]: { x: number; y: number; z: number; type: string };
  };
  bonds: {
    [id: string]: { atom1: string; atom2: string; order: number };
  };
}

const initialState: IMoleculeState = {
  id: '',
  title: '',
  atoms: {},
  bonds: {},
};

export const reducer = (
  state: IMoleculeState = initialState,
  action: MoleculeAction
): IMoleculeState => {
  switch (action.type) {
    case ActionTypes.MOLECULE_LOAD: {
      const { data, format } = action.payload;
      if (format === MoleculeDataFormat.jnmol) {
        if (isValidJnmol(data)) {
          return data as IMoleculeState;
        }
        throw new Error('incorrect data JNMOL format');
      }
      throw new Error(format + ' is not supported');
    }

    default:
      return state;
  }
};
