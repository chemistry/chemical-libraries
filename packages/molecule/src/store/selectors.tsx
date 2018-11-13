import { JNMol } from "@chemistry/common";
import * as React from "react";
import {
    IMoleculeState,
} from "./reducer";

export const exportMolecule = (molecule: IMoleculeState, format: string): any => {
    return molecule;
};

function getAtomsSVG(molecule: IMoleculeState, projectFn: (coords: IVec2) => IVec2): JSX.Element {
    const atomsView = Object.keys(molecule.atoms).map((atomId: string) => {
        const atom = molecule.atoms[atomId];
        const  { type } =  atom;
        const { x, y } = projectFn(atom);

        return (<text
          key={atomId}
          x={x}
          y={y}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
        >{type}</text>);
    });
    return (<g>{atomsView}</g>);
}

export const exportToSVG = (molecule: IMoleculeState): JSX.Element => {
    const projectionInfo = getProjectionInfo();
    const projFn: (coords: IVec2) => IVec2 = project.bind(null, projectionInfo);

    return (<svg>{
      getAtomsSVG(molecule, projFn)
    }</svg>);
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

interface IVec2 {
    x: number;
    y: number;
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

function unproject(camera: ProjectInfo, { x, y }: IVec2): IVec2 {
    return {
        x: (x - camera.translation.x) / camera.scale,
        y: (y - camera.translation.y) / camera.scale,
    };
}
