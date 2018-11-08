import { Matrix3x3 } from "./matrix3x3";
import { Vec3 } from "./vec3";

describe("Matrix3x3", () => {
    it("should create instance", () => {
        const sut = new Matrix3x3();
        expect(sut).toBeDefined();
    });

    it("should create E matrix be default", () => {
        const mat = new Matrix3x3();
        expect(mat.toString()).toEqual("(1.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,1.000)");
    });

    it("should accept array in constructor", () => {
        const mat = new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        expect(mat.toString()).toEqual("(1.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,1.000)");
    });

    it("should define setters", () => {
        const mat = new Matrix3x3();
        mat.set(0, 0, 0);
        mat.set(1, 1, 0);
        mat.set(2, 2, 0);
        expect(mat.toString()).toEqual("(0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000)");
    });

    it("should throw when setters params is wrong", () => {
        const mat = new Matrix3x3();
        expect(() => {
            mat.set(10, 0, 0);
        }).toThrow();
    });

    it("should define getters", () => {
        const mat = new Matrix3x3();
        mat.set(0, 0, 0);
        mat.set(1, 1, 0);
        mat.set(2, 2, 0);
        expect(mat.get(0, 0) + mat.get(1, 1) + mat.get(2, 2)).toEqual(0);
    });

    it("should throw when getters params is wrong", () => {
        const mat = new Matrix3x3();
        expect(() => {
            mat.get(10, 0);
        }).toThrow();
    });

    it("should scale by scalar", () => {
        const mat = new Matrix3x3();
        const res = mat.scale(2);
        expect(res.toString()).toEqual("(2.000,0.000,0.000,0.000,2.000,0.000,0.000,0.000,2.000)");
    });

    it("should project by vector", () => {
        const mat = new Matrix3x3();
        const vec = new Vec3(0, 0, 0);

        const res = mat.project(vec);
        expect(res.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should multiply by matrix", () => {
        const mat1 = new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        const mat2 = new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        const res = mat1.multiply(mat2);
        expect(res.toString()).toEqual("(1.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,1.000)");
    });

    it("should define determinant such |A|*f = |A*f|", () => {
        const a = new Matrix3x3([Math.random(), Math.random(), Math.random(), Math.random(),
                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        const f = (Math.random() * (10 - 1) + 1);
        const det1 = a.determinant() * f * f * f;
        const det2  = (a.scale(f)).determinant();

        expect((det1 - det2) / det1).toBeCloseTo(0);
    });

    it("should define determinant such |A*B| = |A|*|B|", () => {
        const a = new Matrix3x3([Math.random(), Math.random(), Math.random(), Math.random(),
                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        const b = new Matrix3x3([Math.random(), Math.random(), Math.random(), Math.random(),
                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        const deta = a.determinant();
        const detb = b.determinant();
        const ab = a.multiply(b);
        const detab = ab.determinant();

        expect((deta * detb - detab) / detab).toBeCloseTo(0);
    });

    it("should throw when inversing zero det matrix", () => {
        const Z = new Matrix3x3([0, 0, 0, 0, 0, 0, 0, 0, 0]);

        expect(() => {
            Matrix3x3.inverse(Z);
        }).toThrow();
    });

    it("should define inverse method such that (A* (A^-1) == E)", () => {
        const a = new Matrix3x3([Math.random(), Math.random(), Math.random(), Math.random(),
                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        const b = Matrix3x3.inverse(a);
        const ab = a.multiply(b);
        const E = new Matrix3x3();

        expect(E.equals(ab)).toBeTruthy();
    });

    it("should define clone method", () => {
        const a = new Matrix3x3([Math.random(), Math.random(), Math.random(), Math.random(),
                    Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        const b = a.clone();

        expect(a === b).toBeFalsy();
        expect(a.equals(b)).toBeTruthy();
    });

});
