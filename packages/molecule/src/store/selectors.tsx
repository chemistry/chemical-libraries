import type React from 'react';
import { defaultSvgOptions, type SvgExportOptions } from '../models';
import type { IMoleculeState } from './reducer';
import { exportMoleculeToSVG, getDefaultMoleculeCamera, projectMolecule } from './services';

export const exportMolecule = (molecule: IMoleculeState, _format: string): IMoleculeState => {
  return molecule;
};

export const exportToSVG = (
  molecule: IMoleculeState,
  drawOptions: SvgExportOptions
): React.JSX.Element => {
  const options = {
    ...defaultSvgOptions,
    ...drawOptions,
  };
  const camera = getDefaultMoleculeCamera();
  const mol = projectMolecule({ molecule, camera });
  return exportMoleculeToSVG({ molecule: mol, options });
};
