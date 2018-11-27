import {
    IMoleculeState,
} from "../reducer";

interface AtomModel {
    x: number;
    y: number;
    z: number;
    type: string;
}

export interface ProjectInfo {
    scale: number;
    translation: {
        x: number;
        y: number;
    };
}

function projectAtom({
    atom,
    camera,
}: {
    atom: AtomModel
    camera: ProjectInfo,
}): AtomModel {
    const { x, y, z, type } = atom;
    return {
        x: x * camera.scale + camera.translation.x,
        y: y * camera.scale + camera.translation.y,
        z: z * camera.scale,
        type,
    };
}

export function projectMolecule({ molecule , camera }: {
    molecule: IMoleculeState, camera: ProjectInfo,
}): IMoleculeState {
    const newAtoms = Object.keys(molecule.atoms).reduce((acc, atomId) => {
        const atom = molecule.atoms[atomId];
        return {
            ...acc,
            [atomId]: projectAtom({ atom, camera }),
        };
    }, {});

    return {
        ...molecule,
        atoms: {
            ...newAtoms,
        },
    };
}

export function getDefaultMoleculeCamera(): ProjectInfo {
    return {
        scale: 40,
        translation: {
            x: 150,
            y: 50,
        },
    };
}
