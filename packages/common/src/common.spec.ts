import { EPSILON } from "./common";

describe("Common", () => {
    it("should export EPSILON close to zerro", () => {
        expect(EPSILON).toBeCloseTo(0);
    });
});
