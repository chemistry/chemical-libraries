import { ChemElements } from "./chem-elements";

describe("ChemElements", () => {
    it("should export class", () => {
        expect(ChemElements).toBeDefined();
    });

    describe("getById", () => {
        it("should return information by element ID", () => {
            const element = ChemElements.getById(1);

            expect(element.symbol).toEqual("H");
        });

        it("should return null for wrong id", () => {
            const element = ChemElements.getById(201);

            expect(element).toBeNull();
        });
    });

    describe("getBySymbol", () => {
        it("should return information by element Name", () => {
            const element = ChemElements.getBySymbol("C");

            expect(element.name).toEqual("Carbon");
        });

        it("should return null for wrong name", () => {
            const element = ChemElements.getBySymbol("WrongName");

            expect(element).toBeNull();
        });

        it("should work correctly with empty string", () => {
            expect(() => {
                const element = ChemElements.getBySymbol(undefined);
            }).not.toThrow();
        });

        it("Should find element even it was incorrectly capitalized", () => {
            const element = ChemElements.getBySymbol("CA");

            expect(element).not.toBeNull();
        });
    });

    describe("getAllSymbols", () => {
        it("should return list with > 100 items", () => {
            const elements = ChemElements.getAllSymbols();
            expect(elements.length).toBeGreaterThan(100);
        });
        it("hydrogen should be first in a list", () => {
            const elements = ChemElements.getAllSymbols();
            expect(elements[0]).toEqual("H");
        });
    });

    describe("getAll", () => {
        it("should return list with > 100 items", () => {
            const elements = ChemElements.getAll();
            expect(elements.length).toBeGreaterThan(100);
        });
        it("hydrogen should be first in a list", () => {
            const elements = ChemElements.getAll();
            expect(elements[0].symbol).toEqual("H");
        });
    });
});
