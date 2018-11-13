import { JNMol } from "@chemistry/common";
import { createStore } from "redux";
import { MoleculeDataFormat } from "./models";
import {
    exportMolecule,
    exportToSVG,
    IMoleculeState,
    loadMolecule,
    reducer,
} from "./store";

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

    public load(data: any, format: MoleculeDataFormat = MoleculeDataFormat.jnmol) {
        this.store.dispatch(loadMolecule(data, format));
    }

    public export(format: MoleculeDataFormat = MoleculeDataFormat.jnmol): any {
        return exportMolecule(this.state, format);
    }

    public toSVG(): JSX.Element {
        return exportToSVG(this.state);
    }
}
