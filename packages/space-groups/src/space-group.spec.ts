import { SpaceGroup } from "./space-group";
import { SpaceGroupsData } from "./space-group-data";

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

        it("should return shallow copy of SG object", () => {
            const res1 = SpaceGroup.getById(2);
            res1.id = 900;
            const res = SpaceGroup.getById(2);

            expect(res.id).toEqual(2);
        });

        it("should return shallow copy of SG symetry operations", () => {
            const res1 = SpaceGroup.getById(2);
            res1.s = [];
            const res2 = SpaceGroup.getById(2);

            expect(res2.s.length).toEqual(2);
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

        it("should return recognize sg notation with double dot", () => {
            const res = SpaceGroup.getByHMName("P -1 :2");
            expect(res).toEqual(jasmine.objectContaining({
                hm: "P -1",
            }));
        });

        it("should return shallow copy of SG object", () => {
            const res1 = SpaceGroup.getByHMName("P -1");
            res1.id = 900;
            const res = SpaceGroup.getByHMName("P -1");

            expect(res.id).toEqual(2);
        });

        it("should return shallow copy of SG symetry operations", () => {
            const res1 = SpaceGroup.getByHMName("P -1");
            res1.s = [];
            const res2 = SpaceGroup.getByHMName("P -1");

            expect(res2.s.length).toEqual(2);
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

        it("should return shallow copy of SG object", () => {
            const res1 = SpaceGroup.getByHallName("-P 1");
            res1.id = 900;
            const res = SpaceGroup.getByHallName("-P 1");

            expect(res.id).toEqual(2);
        });

        it("should return shallow copy of SG symetry operations", () => {
            const res1 = SpaceGroup.getByHallName("-P 1");
            res1.s = [];
            const res2 = SpaceGroup.getByHallName("-P 1");

            expect(res2.s.length).toEqual(2);
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

    describe("getUnitCellCentring", () => {
        it("should define method", () => {
            expect(SpaceGroup.getUnitCellCentring).toBeDefined();
        });

        it("should detect centring for every of 530 settings", () => {
            for (const sgInfo of SpaceGroupsData) {
              expect(SpaceGroup.getUnitCellCentring(sgInfo)).not.toBe(null);
            }
        });

        it("should detect correct centring P-1 Unitcell", () => {
            const sg = SpaceGroup.getByHMName("P 21/c 1 1");
            const res = SpaceGroup.getUnitCellCentring(sg);

            expect(res).toEqual("P");
        });

        it("should return null for strange settings", () => {
          const res = SpaceGroup.getUnitCellCentring({} as any);

          expect(res).toEqual(null);
        });
    });

    describe("getCentringType", () => {
        it("should define method", () => {
            expect(SpaceGroup.getCentringType).toBeDefined();
        });

        it("should detect centring for every of 530 settings", () => {
            for (const sgInfo of SpaceGroupsData) {
              expect(SpaceGroup.getCentringType(sgInfo)).not.toBe(null);
            }
        });

        it("should detect correct centring P-1 Unitcell", () => {
            const sg = SpaceGroup.getByHMName("P 21/c 1 1");
            const res = SpaceGroup.getCentringType(sg);

            expect(res).toEqual("Primitive");
        });

        it("should return null for strange settings", () => {
          const res = SpaceGroup.getCentringType({} as any);

          expect(res).toEqual(null);
        });
    });

    describe("getUniqueSpaceGroupsList", () => {
        it("should define method", () => {
            expect(SpaceGroup.getUniqueSpaceGroupsList).toBeDefined();
        });

        it("should return array with 230 unique space groups", () => {
            const res = SpaceGroup.getUniqueSpaceGroupsList();
            expect(res.length).toEqual(230);
        });
    });
});
