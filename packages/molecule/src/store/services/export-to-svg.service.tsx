import type React from 'react';
import { ChemElements } from '@chemistry/elements';
import type { SvgExportOptions } from '../../models.js';
import type { IMoleculeState } from '../reducer.js';

function getAtomsSVG(molecule: IMoleculeState, options: SvgExportOptions): React.JSX.Element {
  const atomsView = Object.keys(molecule.atoms).map((atomId: string) => {
    const atom = molecule.atoms[atomId];
    const { x, y, type } = atom;
    const color = getAtomColor(type, options);

    return (
      <text key={atomId} x={x} y={y} fill={color} textAnchor="middle" alignmentBaseline="middle">
        {type}
      </text>
    );
  });
  return <g>{atomsView}</g>;
}

function getAtomColor(atomType: string, options: SvgExportOptions) {
  if (!options.colorElements) {
    return 'black';
  }
  const chemElementData = ChemElements.getBySymbol(atomType);
  return chemElementData ? chemElementData.color2 : 'black';
}

function getSVGStyles(drawOptions: SvgExportOptions): React.JSX.Element {
  const textStyle = `
        .c-molsvg text {
            font-size: ${drawOptions.fontSize};
            line-height: ${drawOptions.fontSize};
            font-weight: normal;
            font-family: ${drawOptions.fontFamily};
        }
    `;
  return <style>{textStyle}</style>;
}

export const exportMoleculeToSVG = ({
  molecule,
  options,
}: {
  molecule: IMoleculeState;
  options: SvgExportOptions;
}): React.JSX.Element => {
  return (
    <svg className="c-molsvg">
      {getSVGStyles(options)}
      {getAtomsSVG(molecule, options)}
    </svg>
  );
};
