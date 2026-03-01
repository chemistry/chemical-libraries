import type { MoleculeDataFormat } from '../models';
import { ActionTypes } from './constants';

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
