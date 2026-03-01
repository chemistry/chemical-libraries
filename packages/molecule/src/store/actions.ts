import type { MoleculeDataFormat } from '../models.js';
import { ActionTypes } from './constants.js';

export function loadMolecule(data: unknown, format: MoleculeDataFormat): LoadAction {
  return {
    type: ActionTypes.MOLECULE_LOAD,
    payload: { data, format },
  };
}

export interface LoadAction {
  type: ActionTypes.MOLECULE_LOAD;
  payload: { data: unknown; format: MoleculeDataFormat };
  [key: string]: unknown;
}

export type MoleculeAction = LoadAction; /* | Other Action */
