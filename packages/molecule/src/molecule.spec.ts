import { MoleculeDataFormat } from "./models";
import { Molecule } from "./molecule";

const ACETONE = {
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

describe("Molecule", () => {
    let sut: Molecule;

    it("should export class definition", () => {
        expect(Molecule).toBeDefined();
    });

    beforeEach(() => {
        sut = new Molecule();
    });

    it("should be able to create instance", () => {
        expect(sut).toBeDefined();
    });

    describe("JNMol", () => {
        it("should return empty JNMol for new molecule", () => {
            const mol = new Molecule();
            const res = mol.export(MoleculeDataFormat.jnmol);
            expect(res).toEqual({ id: "", title: "", atoms: {}, bonds: {} });
        });
    });

    describe("getAtomCount", () => {
        it("should be able to get atomCount", () => {
            const atomCount = sut.getAtomCount();
            expect(atomCount).toEqual(0);
        });
    });

    describe("getBondCount", () => {
        it("should be able to get getBondCount", () => {
            const bondCount = sut.getBondCount();
            expect(bondCount).toEqual(0);
        });
    });

    describe("load", () => {
        it("should be able to load molecule", () => {
            sut.load(ACETONE, MoleculeDataFormat.jnmol);
            expect(sut.getAtomCount()).toEqual(4);
            expect(sut.getBondCount()).toEqual(3);
        });

        it("should throw for incorrect data format", () => {
            expect(() => {
                sut.load(ACETONE, "unknown-format" as any);
            }).toThrow();
        });

        it("should throw when title is missing in jnmol format", () => {
            expect(() => {
                sut.load({}, MoleculeDataFormat.jnmol);
            }).toThrow();
        });
    });

    describe("noActions", () => {
        it("should ignore unknown actions", () => {
            const state1 = (sut as any).state;
            (sut as any).store.dispatch({ type: "UNKNOWN ACTION "});
            const state2 = (sut as any).state;

            expect(state1).toBe(state2);
        });
    });

    describe("toSVG", () => {
        it("should export ACETONE", () => {
            sut.load(ACETONE, MoleculeDataFormat.jnmol);
            const svg = sut.toSVG();
            expect(svg).toMatchSnapshot();
        });
    });
});
