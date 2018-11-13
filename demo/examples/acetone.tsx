export const ACETONE = {
    id: "3",
    title: "acetone",
    atoms: {
         "atom:1": { x: -0.7145, y: -0.4125, z: 0, type: "C" },
         "atom:2": { x: 0, y: 0, z: 0, type: "C" },
         "atom:3": { x: 0.7145, y: -0.4125, z: 0, type: "C" },
         "atom:4": { x: 0, y: 0.825, z: 0, type: "O" },
    },
    bonds: {
        "bond:1": { atom1: "atom:1", atom2: "atom:2", order: 1 },
        "bond:2": { atom1: "atom:2", atom2: "atom:3", order: 1 },
        "bond:3": { atom1: "atom:2", atom2: "atom:4", order: 2 },
    },
};
