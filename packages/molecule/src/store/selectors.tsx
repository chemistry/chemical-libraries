import { JNMol } from "@chemistry/common";
import { defaultSvgOptions, SvgExportOptions } from "../models";
import {
    IMoleculeState,
} from "./reducer";
import {
    exportMoleculeToSVG,
    getDefaultMoleculeCamera,
    projectMolecule,
} from "./services";

export const exportMolecule = (molecule: IMoleculeState, format: string): any => {
    return molecule;
};

export const exportToSVG = (molecule: IMoleculeState, drawOptions: SvgExportOptions): JSX.Element => {
    const options = {
        ...defaultSvgOptions,
        ...drawOptions,
    };
    const camera = getDefaultMoleculeCamera();
    const mol = projectMolecule({ molecule , camera });
    return exportMoleculeToSVG({ molecule: mol, options });
 };
