import { SpaceGroup } from "./space-group";

describe("SpaceGroups", () => {
    it("should export SpaceGroup class", () => {
        expect(SpaceGroup).toBeDefined();
    });

    describe("getById", () => {
        it("should return null for incorrect space group number", () => {
            const res = SpaceGroup.getById(300);
            expect(res).toEqual(null);
        });

        it("should return P-1 for #2", () => {
            const res = SpaceGroup.getById(2);
            expect(res).toEqual(jasmine.objectContaining({
                hm: "P -1",
            }));
        });
    });

    describe("getByHMName", () => {
        it("should return null for incorrect space group name", () => {
            const res = SpaceGroup.getByHMName("WRONG-NAME");
            expect(res).toEqual(null);
        });

        it("should return sg based on Hermann Mauguin notation", () => {
            const res = SpaceGroup.getByHMName("P -1");
            expect(res).toEqual(jasmine.objectContaining({
                hm: "P -1",
            }));
        });

        it("should ignore additional information", () => {
            const res = SpaceGroup.getByHMName("P -1 (1/2*x+1/2*y,1/2*x-1/2*y,-z)");
            expect(res).toEqual(jasmine.objectContaining({
                hm: "P -1",
            }));
        });

        it("should find sg with when spaces removed", () => {
            const res = SpaceGroup.getByHMName("P  -1");
            expect(res).toEqual(jasmine.objectContaining({
                hm: "P -1",
            }));
        });
    });

    describe("getByHallName", () => {
        it("should return null for wrong Hall Name", () => {
            const res = SpaceGroup.getByHallName("WRONG-NAME");
            expect(res).toEqual(null);
        });

        it("should return sg based on Hall name", () => {
            const res = SpaceGroup.getByHallName("-P 1");
            expect(res).toEqual(jasmine.objectContaining({
                hs: "-P 1",
            }));
        });

        it("should process sg info with additional information", () => {
            const res = SpaceGroup.getByHallName("-P 1(1/2*x+1/2*y,1/2*x-1/2*y,-z)");
            expect(res).toEqual(jasmine.objectContaining({
                hs: "-P 1",
            }));
        });
    });

    describe("getCrystalSystem", () => {
        it("should return null for wrorg sg id", () => {
            const v = SpaceGroup.getById(2);
            (v as any).id = 300;
            const res = SpaceGroup.getCrystalSystem(v);
            expect(res).toEqual(null);
        });

        it("should give Triclinic for P1", () => {
            const sg = SpaceGroup.getByHMName("P 1");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Triclinic");
        });

        it("should give Monoclinic for P 21/c", () => {
            const sg = SpaceGroup.getByHMName("P 21/c 1 1");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Monoclinic");
        });

        it("should give Orthorhombic for P 21 21 21", () => {
            const sg = SpaceGroup.getByHMName("P 21 21 21");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Orthorhombic");
        });

        it("should give Tetragonal for P 4", () => {
            const sg = SpaceGroup.getByHMName("P 4");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Tetragonal");
        });

        it("should give Trigonal for P 3", () => {
            const sg = SpaceGroup.getByHMName("P 3");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Trigonal");
        });

        it("should give Trigonal for P 6", () => {
            const sg = SpaceGroup.getByHMName("P 6");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Hexagonal");
        });

        it("should give Trigonal for P 2 3", () => {
            const sg = SpaceGroup.getByHMName("P 2 3");
            const res = SpaceGroup.getCrystalSystem(sg);

            expect(res).toEqual("Cubic");
        });
    });
});
