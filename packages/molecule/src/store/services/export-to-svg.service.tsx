import { Element } from "@chemistry/elements";
import * as React from "react";
import { SvgExportOptions } from "../../models";
import {
    IMoleculeState,
} from "../reducer";

function getAtomsSVG(molecule: IMoleculeState, options: SvgExportOptions): JSX.Element {
    const atomsView = Object.keys(molecule.atoms).map((atomId: string) => {
        const atom = molecule.atoms[atomId];
        const { x, y, type } =  atom;
        const color = getAtomColor(type, options);

        return (<text
          key={atomId}
          x={x}
          y={y}
          fill={color}
          textAnchor="middle"
          alignmentBaseline="middle"
        >{type}</text>);
    });
    return (<g>{atomsView}</g>);
}

function getAtomColor(atomType: string, options: SvgExportOptions) {
    if (!options.colorElements) {
        return "black";
    }
    const chemElementData = Element.getElementByName(atomType);
    return chemElementData ? chemElementData.color2 : "black";
}

function getSVGStyles(drawOptions: SvgExportOptions): JSX.Element {
    const textStyle = `
        .c-molsvg text {
            font-size: ${drawOptions.fontSize};
            line-height: ${drawOptions.fontSize};
            font-weight: normal;
            font-family: ${drawOptions.fontFamily};
        }
    `;
    return (
        <style>{textStyle}</style>
    );
}

export const exportMoleculeToSVG = ({
  molecule, options,
}: { molecule: IMoleculeState, options: SvgExportOptions }): JSX.Element => {
    return (
        <svg className="c-molsvg">
            { getSVGStyles(options) }
            { getAtomsSVG(molecule, options) }
        </svg>
    );
};
