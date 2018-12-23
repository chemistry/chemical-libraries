import { SpaceGroupsData } from "./space-group-data";

describe("SpaceGroupsData", () => {
    it("should export SpaceGroupsData", () => {
        expect(SpaceGroupsData).toBeDefined();
    });

    it("should export 530 different UC sets", () => {
        const sut = SpaceGroupsData;
        expect(sut.length).toEqual(530);
    });

    it("should export id as number", () => {
        for (const sgInfo of SpaceGroupsData) {
          expect(typeof sgInfo.id).toEqual("number");
        }
    });

    it("should export SG settings with id in range 1..230", () => {
        for (const sgInfo of SpaceGroupsData) {
          const sgId = sgInfo.id;
          expect((sgId >= 1 && sgId <= 230)).toEqual(true);
        }
    });

    it("should export o as number", () => {
        for (const sgInfo of SpaceGroupsData) {
          expect(typeof sgInfo.o).toEqual("number");
        }
    });
});
