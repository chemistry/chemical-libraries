import { JNMol } from "@chemistry/common";
import { Action, AnyAction, combineReducers, Dispatch, Reducer } from "redux";
import { MoleculeDataFormat } from "../models";
import { MoleculeAction } from "./actions";
import { ActionTypes } from "./constants";
import { isValidJnmol } from "./helpers";

export interface IMoleculeState extends JNMol {
    id: string;
    title: string;
    atoms: {
        [id: string]: { x: number; y: number; z: number; type: string; },
    };
    bonds: {
        [id: string]: { atom1: string; atom2: string; order: number; },
    };
}

const initialState = {
    id: "",
    title: "",
    atoms: {},
    bonds: {},
};

export const reducer: Reducer<IMoleculeState> = (state = initialState, action: MoleculeAction) => {

    switch (action.type) {
        case ActionTypes.MOLECULE_LOAD:
            const { data, format} = action.payload;
            if (format === MoleculeDataFormat.jnmol) {
                if (isValidJnmol(data)) {
                    return data;
                }
                throw new Error("incorrect data JNMOL format");
            }
            throw new Error(format + " is not supported");

        default:
          return state;
    }
};
