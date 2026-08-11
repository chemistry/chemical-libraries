import { defaultSvgOptions, type SvgExportOptions } from '../models.js';
import type { IMoleculeState } from './reducer.js';
import {
  exportMoleculeToSVG,
  getDefaultMoleculeCamera,
  projectMolecule,
} from './services/index.js';

export const exportToSVG = (molecule: IMoleculeState, drawOptions: SvgExportOptions): string => {
  const options = {
    ...defaultSvgOptions,
    ...drawOptions,
  };
  const camera = getDefaultMoleculeCamera();
  const mol = projectMolecule({ molecule, camera });
  return exportMoleculeToSVG({ molecule: mol, options });
};
