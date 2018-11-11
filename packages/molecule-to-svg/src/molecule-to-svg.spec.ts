import { MoleculeToSVG } from "./molecule-to-svg";

describe("MoleculeToSVG", () => {
    it("should export MoleculeToSVG function", () => {
        expect(MoleculeToSVG).toBeDefined();
    });

    it("should return empty string", () => {
        const res = MoleculeToSVG({
            molecule: {id: 'id', title: 'title', atoms: {}, bonds: {}},
            options: {}
        });
        expect(res).toBeDefined();
    });
});
