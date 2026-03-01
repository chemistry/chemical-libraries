import type React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { MoleculeDataFormat } from './models.js';
import type { SvgExportOptions } from './models.js';
import { exportMolecule, type IMoleculeState, loadMolecule, reducer } from './store/index.js';

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

  public load(data: unknown, format: MoleculeDataFormat = MoleculeDataFormat.jnmol): void {
    this.store.dispatch(loadMolecule(data, format));
  }

  public export(format: MoleculeDataFormat = MoleculeDataFormat.jnmol): IMoleculeState {
    return exportMolecule(this.state, format);
  }

  public async toSVG(options: SvgExportOptions): Promise<React.JSX.Element> {
    const { exportToSVG } = await import('./store/svg-export.js');
    return exportToSVG(this.state, options);
  }
}
