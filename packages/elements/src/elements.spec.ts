import { Element } from "./elements";

describe("Element", () => {
    it("should export class", () => {
        expect(Element).toBeDefined();
    });

    it("should return information by element ID", () => {
        const element = Element.getElementById(1);

        expect(element.symbol).toEqual("H");
    });

    it("should return null for wrong id", () => {
        const element = Element.getElementById(201);

        expect(element).toBeNull();
    });

    it("should return information by element Name", () => {
        const element = Element.getElementByName("C");

        expect(element.name).toEqual("Carbon");
    });

    it("should return null for wrong name", () => {
        const element = Element.getElementByName("WrongName");

        expect(element).toBeNull();
    });

    it("should return Elemnts list", () => {
        const elements = Element.getAllList();
        expect(elements.length).toBeGreaterThan(100);
    });
});
