import { legacy_createStore as createStore } from 'redux';
import { MoleculeDataFormat } from './models.js';
import type { SvgExportOptions } from './models.js';
import { exportMolecule, type IMoleculeState, loadMolecule, reducer } from './store/index.js';
import { exportToSVG } from './store/svg-export.js';

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

  public toSVG(options: SvgExportOptions): Promise<string> {
    return Promise.resolve(exportToSVG(this.state, options));
  }
}
