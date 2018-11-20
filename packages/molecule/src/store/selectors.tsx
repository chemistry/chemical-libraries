import { JNMol } from "@chemistry/common";
import { Element } from "@chemistry/elements";
// import { IVec2 } from "@chemistry/math";

import * as React from "react";
import { defaultSvgOptions, SvgExportOptions } from "../models";
import {
    IMoleculeState,
} from "./reducer";

export const exportMolecule = (molecule: IMoleculeState, format: string): any => {
    return molecule;
};

interface IVec2 {
    x: number;
    y: number;
}

function getAtomsSVG(molecule: IMoleculeState, options: SvgExportOptions, projectFn: (coords: IVec2) => IVec2): JSX.Element {
    const atomsView = Object.keys(molecule.atoms).map((atomId: string) => {
        const atom = molecule.atoms[atomId];
        const  { type } =  atom;
        const { x, y } = projectFn(atom);
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

export const exportToSVG = (molecule: IMoleculeState, drawOptions: SvgExportOptions): JSX.Element => {

    const options = {
        ...defaultSvgOptions,
        ...drawOptions,
    };

    const projectionInfo = getProjectionInfo();
    const projFn: (coords: IVec2) => IVec2 = project.bind(null, projectionInfo);

    return (
        <svg className="c-molsvg">
            { getSVGStyles(options) }
            { getAtomsSVG(molecule, options, projFn) }
        </svg>
    );
};

function getProjectionInfo(): ProjectInfo {
    return {
        scale: 40,
        translation: {
            x: 150,
            y: 50,
        },
    };
}

interface ProjectInfo {
    scale: number;
    translation: {
        x: number;
        y: number;
    };
}

function project(camera: ProjectInfo, { x, y }: IVec2): IVec2 {
    return {
        x: x * camera.scale + camera.translation.x,
        y: y * camera.scale + camera.translation.y,
    };
}
/*
function unproject(camera: ProjectInfo, { x, y }: IVec2): IVec2 {
    return {
        x: (x - camera.translation.x) / camera.scale,
        y: (y - camera.translation.y) / camera.scale,
    };
}
*/
