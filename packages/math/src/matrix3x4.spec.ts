import { Matrix3x4 } from "./matrix3x4";
import { Vec3 } from "./vec3";

describe("Matrix3x4", () => {
    it("should create instance", () => {
        const sut = new Matrix3x4();
        expect(sut).toBeDefined();
    });

    it("should create E matrix be default", () => {
        const mat = new Matrix3x4();
        expect(mat.toString()).toEqual("(1.000,0.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,0.000,1.000,0.000)");
    });

    it("should accept array in constructor", () => {
        const mat = new Matrix3x4([2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0]);
        expect(mat.toString()).toEqual("(2.000,0.000,0.000,0.000,2.000,0.000,0.000,0.000,2.000,0.000,0.000,0.000)");
    });

    it("should define setters", () => {
        const mat = new Matrix3x4();
        mat.set(0, 0, 0);
        mat.set(1, 1, 0);
        mat.set(2, 2, 0);
        expect(mat.toString()).toEqual("(0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000)");
    });

    it("should throw when setters params is wrong", () => {
        const mat = new Matrix3x4();
        expect(() => {
            mat.set(10, 0, 0);
        }).toThrow();
    });

    it("should define getters", () => {
        const mat = new Matrix3x4();
        mat.set(0, 0, 0);
        mat.set(1, 1, 0);
        mat.set(2, 2, 0);
        expect(mat.get(0, 0) + mat.get(1, 1) + mat.get(2, 2)).toEqual(0);
    });

    it("should throw when getters params is wrong", () => {
        const mat = new Matrix3x4();
        expect(() => {
            mat.get(10, 0);
        }).toThrow();
    });

    it("should scale by scalar", () => {
        const mat = new Matrix3x4();
        const res = mat.scale(2);
        expect(res.toString()).toEqual("(2.000,0.000,0.000,0.000,0.000,2.000,0.000,0.000,0.000,0.000,2.000,0.000)");
    });

    it("should project by vector", () => {
        const mat = new Matrix3x4();
        const vec = new Vec3(0, 0, 0);

        const res = mat.project(vec);
        expect(res.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should be true:  A*c+B*c = (A+B)*c  for any A,B,c", () => {
        let c = new Vec3(Math.random(), Math.random(), Math.random());
        let a = new Matrix3x4([Math.random(), Math.random(), Math.random(),
                Math.random(), Math.random(), Math.random(), Math.random(),
                Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        const b = new Matrix3x4([Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
        c = c.normalize();
        let r1 = a.project(c);
        const r2 = b.project(c);
        r1 = r1.add(r2);
        a = a.add(b);
        let l1 = a.project(c);
        l1 = l1.sub(r1);
        expect(l1.length).toBeCloseTo(0);
    });

    it("should define sub method", () => {
        const mat1 = new Matrix3x4();
        const mat2 = new Matrix3x4();
        const mat3 = mat1.sub(mat2);

        expect(mat3.toString()).toEqual("(0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000)");
    });

    it("should multiply by matrix", () => {
        const mat1 = new Matrix3x4([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
        const mat2 = new Matrix3x4([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
        const res = mat1.multiply(mat2);
        expect(res.toString()).toEqual("(1.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000)");
    });

    it("should define clone method", () => {
        const a = new Matrix3x4([Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random()]);
        const b = a.clone();

        expect(a === b).toBeFalsy();
        expect(a.equals(b)).toBeTruthy();
    });

    it("should define translate method", () => {
        const mat1 = new Matrix3x4([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
        const mat2 = mat1.translate(new Vec3(1, 2, 3));

        expect(mat1 === mat2).toBeFalsy();
        expect(mat1.equals(mat2)).toBeFalsy();

        const mat3 = mat2.translate(new Vec3(-1, -2, -3));
        expect(mat1.equals(mat3)).toBeTruthy();
    });

    it("should define isE method", () => {
        const mat1 = new Matrix3x4();
        expect(mat1.isE()).toBeTruthy();
    });

    it("should define to symetry code", () => {
        const mat1 = new Matrix3x4();
        const mat1b = mat1.scale(2.2);
        const mat2 = mat1b.translate(new Vec3(1.1, 0, 0));
        expect(mat2.toSymetryCode()).toEqual("2.2x+1.1,2.2y,2.2z");
    });

    it("should define to symetry code", () => {
        const mat1 = new Matrix3x4();
        const mat1b = mat1.scale(2);
        const mat2 = mat1b.translate(new Vec3(1, 0, 0));
        expect(mat2.toSymetryCode()).toEqual("2x+1,2y,2z");
    });

    it("should not add extra '1'", () => {
        const mat1 = new Matrix3x4();

        expect(mat1.toSymetryCode()).toEqual("x,y,z");
    });

    it("should work well with negative numbers", () => {
        const mat1 = new Matrix3x4();
        mat1.set(0, 1, -1);
        mat1.set(0, 0, -1);
        mat1.set(1, 2, -1);
        const mat1b = mat1.scale(-1);
        const mat2 = mat1b.translate(new Vec3(-1.1, 2, 0));
        expect(mat2.toSymetryCode()).toEqual("x+y-1.1,-y+z+2,-z");
    });

    it("should define inverse method such that (A* (A^-1) == E)", () => {
        const a = new Matrix3x4([Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
        ]);
        const b = a.inverse();
        const ab = a.multiply(b);

        expect(ab.isE()).toBeTruthy();
    });
});
