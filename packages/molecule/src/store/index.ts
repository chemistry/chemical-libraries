import { JNMol } from "@chemistry/common";
import { Action, AnyAction, combineReducers, Dispatch, Reducer } from "redux";

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

export const reducer: Reducer<IMoleculeState> = (state = initialState, action) => {
    return state;
};
