import { Formula } from "./formula";

describe("Formula", () => {
    it("should be defined", () => {
        expect(Formula).toBeDefined();
    });

    describe("convertToString", () => {
        it("should return empty object for empty string", () => {
            const res = Formula.convertToString({});
            expect(res).toEqual("");
        });
        it("should calculate H2O case", () => {
            const res = Formula.convertToString({ H: 2, O: 1});
            expect(res).toEqual("H2O");
        });
        it("should remove unknown elements from object", () => {
            const res = Formula.convertToString({ H: 2, O: 1, X: 10});
            expect(res).toEqual("H2O");
        });
    });

    describe("parse", () => {
        it("should parse empty string", () => {
            const res = Formula.parse("");
            expect(res).toEqual({});
        });
        it("should parse H2O", () => {
            const res = Formula.parse("H2O");
            expect(res).toEqual({ H: 2, O: 1});
        });
        it("should parse C2H5OH", () => {
          const res = Formula.parse("C2H5OH");
          expect(res).toEqual({ C: 2, H: 6, O: 1});
        });

        it("should ignore spaces", () => {
            const res = Formula.parse("C2H5 OH");
            expect(res).toEqual({ C: 2, H: 6, O: 1});
        });

        it("should ignore unknown elements", () => {
            const res = Formula.parse("C2H5 OH X3");
            expect(res).toEqual({ C: 2, H: 6, O: 1});
        });

    });
});
