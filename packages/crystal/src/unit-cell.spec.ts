import { UnitCell } from "./unit-cell";

describe("UnitCell", () => {
    it("should be defined", () => {
        expect(UnitCell).toBeDefined();
    });

    describe("getVolume", () => {
        it("should define method getVolume", () => {
            expect(UnitCell.getVolume).toBeDefined();
        });

        it("should retrurn correct volume for simplest orthorhombic case", () => {
            const res = UnitCell.getVolume({ a: 2, b: 3, c: 4, alpha: 90, beta: 90, gamma: 90 });
            expect(res).toBeCloseTo(24);
        });

        it("should calculate valume of triclinic settings as described for http://crystallography-online.com/structure/7012651", () => {
            const res =  UnitCell.getVolume({ a: 9.5489, b: 10.7797, c: 15.7127, alpha: 82.427, beta: 86.698, gamma: 71.158 });
            expect(Math.round(res)).toBe(1517);
        });
    });

    describe("getOrthMatrix", () => {
        it("should define method getOrthMatrix", () => {
            expect(UnitCell.getOrthMatrix).toBeDefined();
        });
        it("should correctly calculate transformation matrix for simplest orthorhombic case", () => {
            const res = UnitCell.getOrthMatrix({ a: 2, b: 4, c: 8, alpha: 90, beta: 90, gamma: 90 });
            const resRounded = res.map((num) => Math.round(num * 100) / 100 );
            expect(resRounded).toEqual([
                2, 0 , 0,
                0, 4, 0,
                0,  0, 8,
            ]);
        });
    });

    describe("reduceUnitCell", () => {
        it("should define method reduceUnitCell", () => {
            expect(UnitCell.reduceUnitCell).toBeDefined();
        });

        it("should convert primitive cell 1 1 1 - 90 90 90 to same", () => {
            const res = UnitCell.reduceUnitCell({
                a: 1,
                b: 1,
                c: 1,
                alpha: 90,
                beta: 90,
                gamma: 90,
            });
            expect(res).toEqual({
                a: 1,
                b: 1,
                c: 1,
                alpha: 90,
                beta: 90,
                gamma: 90,
            });
        });

        it("should convert UC as descibed in Article #1", () => {
            const res = UnitCell.reduceUnitCell({
                a: 3,
                b: Math.sqrt(27),
                c: 2,
                alpha: 103.91975,
                beta: 109.47123,
                gamma: 134.88211,
            });
            expect(res.a).toBeCloseTo(2);
            expect(res.b).toBeCloseTo(3);
            expect(res.c).toBeCloseTo(3);
            expect(res.alpha).toBeCloseTo(60);
            expect(res.beta).toBeCloseTo(75.522);
            expect(res.gamma).toBeCloseTo(70.5287);
        });

        it("should be able to convert more complex result", () => {
            const res = UnitCell.reduceUnitCell({
                a: 9.3991,
                b: 19.964,
                c: 10.132,
                alpha: 90,
                beta: 109.83,
                gamma: 90,
            });
            expect(isFinite(res.a)).toBeTruthy();
        });
    });
});
