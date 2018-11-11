import { JNMol } from "@chemistry/common";

interface IMolDrawOptions {
    lineWidth?: number;
    bondWidth?: number;
}

export function MoleculeToSVG({ molecule, options}: {
    molecule: JNMol, options: IMolDrawOptions,
}): string {
    return "";
}
