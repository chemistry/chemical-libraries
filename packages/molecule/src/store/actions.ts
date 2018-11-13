import { MoleculeDataFormat } from "../models";
import { ActionTypes } from "./constants";

export function loadMolecule(data: any, format: MoleculeDataFormat): LoadAction {
    return {
        type: ActionTypes.MOLECULE_LOAD,
        payload: { data, format },
    };
}

export interface LoadAction { type: ActionTypes.MOLECULE_LOAD; payload: { data: any, format: MoleculeDataFormat }; }

export type MoleculeAction = LoadAction; /* | Other Action */
