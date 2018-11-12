import { JNMol } from "@chemistry/common";
import { createStore } from "redux";
import { IMoleculeState, loadMolecule, reducer } from "./store";

export class Molecule {
    private store = createStore(reducer);

    private get state(): IMoleculeState {
        return this.store.getState();
    }

    public getAtomCount(): number {
        return Object.keys(this.state.atoms).length;
    }

    public getBondCount(): number {
        return Object.keys(this.state.bonds).length;
    }

    public load(data: any, format: string = "jmol") {
        this.store.dispatch(loadMolecule(data, format));
    }

    public getJNMol(): JNMol {
        return this.state;
    }
}
