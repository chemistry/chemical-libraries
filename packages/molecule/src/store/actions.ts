import { ActionTypes } from "./constants";

export function loadMolecule(data: any, format: string): LoadAction {
    return {
        type: ActionTypes.MOLECULE_LOAD,
        payload: { data, format },
    };
}

export interface LoadAction { type: ActionTypes.MOLECULE_LOAD; payload: { data: any, format: string }; }

export type MoleculeAction = LoadAction; /* | Other Action */
