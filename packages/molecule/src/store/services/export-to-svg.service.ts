import { ChemElements } from '@chemistry/elements';
import type { SvgExportOptions } from '../../models.js';
import type { IMoleculeState } from '../reducer.js';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAtomsSVG(molecule: IMoleculeState, options: SvgExportOptions): string {
  const atomsView = Object.keys(molecule.atoms).map((atomId: string) => {
    const { x, y, type } = molecule.atoms[atomId];
    const color = escapeXml(getAtomColor(type, options));

    return (
      `<text x="${x}" y="${y}" fill="${color}" text-anchor="middle" ` +
      `alignment-baseline="middle">${escapeXml(type)}</text>`
    );
  });
  return `<g>${atomsView.join('')}</g>`;
}

function getAtomColor(atomType: string, options: SvgExportOptions): string {
  if (!options.colorElements) {
    return 'black';
  }
  const chemElementData = ChemElements.getBySymbol(atomType);
  return chemElementData ? chemElementData.color2 : 'black';
}

function getSVGStyles(drawOptions: SvgExportOptions): string {
  const textStyle = `
        .c-molsvg text {
            font-size: ${drawOptions.fontSize};
            line-height: ${drawOptions.fontSize};
            font-weight: normal;
            font-family: ${drawOptions.fontFamily};
        }
    `;
  return `<style>${escapeXml(textStyle)}</style>`;
}

export const exportMoleculeToSVG = ({
  molecule,
  options,
}: {
  molecule: IMoleculeState;
  options: SvgExportOptions;
}): string => {
  return `<svg class="c-molsvg">${getSVGStyles(options)}${getAtomsSVG(molecule, options)}</svg>`;
};
