import { JNMol } from "@chemistry/common";
import { createStore } from "redux";
import { reducer } from "./store";

export class Molecule {
    private state = createStore(reducer);

    // constructor() { }

    public getJNMol(): JNMol {
        return this.state.getState();
    }
}
