import { Molecule } from "./molecule";

describe("Molecule", () => {
    it("should export class definition", () => {
        expect(Molecule).toBeDefined();
    });

    it("should be able to create instance", () => {
        const res = new Molecule();
        expect(res).toBeDefined();
    });

    describe("JNMol", () => {
        it("should return empty JNMol for new molecule", () => {
            const mol = new Molecule();
            const res = mol.getJNMol();
            expect(res).toEqual({
                id: "",
                title: "",
                atoms: {},
                bonds: {},
            });
        });
    });
});
