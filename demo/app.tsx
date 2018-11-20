import * as React from "react";
import * as ReactDOM from  "react-dom";
import { Molecule, MoleculeDataFormat } from '../packages/molecule/src';
import { ACETONE } from './examples';

export class MoleculeWrap extends React.Component {

    render() {
        const molecule = new Molecule();
        molecule.load(ACETONE, MoleculeDataFormat.jnmol);
        return (
            <div>
                <h1>Molecule to SVG demo:</h1>
                <div style={{ border: "1px solid" }}>{molecule.toSVG({})}</div>
            </div>
        );
    }
}

ReactDOM.render(
    (<MoleculeWrap />),
    document.getElementById('app') as HTMLElement
);
