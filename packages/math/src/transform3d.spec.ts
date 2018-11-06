import { Transform3D } from "./transform3d";
import { Vec3 } from "./vec3";

describe("Transform3D", () => {

    it("should create instance", () => {
        const sut = new Transform3D();
        expect(sut).toBeDefined();
    });

    it("should create E matrix be default", () => {
        const mat = new Transform3D();
        expect(mat.toString()).toEqual("(1.000,0.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,0.000,1.000)");
    });

    it("should accept array in constructor", () => {
        const mat = new Transform3D([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2]);
        expect(mat.toString()).toEqual("(2.000,0.000,0.000,0.000,0.000,2.000,0.000,0.000,0.000,0.000,2.000,0.000,0.000,0.000,0.000,2.000)");
    });

    it("should throw when wrong input params length", () => {
        expect(() => {
            const mat = new Transform3D([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0]);
        }).toThrow();
    });

    it("should define setters", () => {
        const mat = new Transform3D();
        mat.set(0, 0, 0);
        mat.set(1, 1, 0);
        mat.set(2, 2, 0);
        expect(mat.toString()).toEqual("(0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,1.000)");
    });

    it("should throw when setters params is wrong", () => {
        const mat = new Transform3D();
        expect(() => {
            mat.set(10, 0, 0);
        }).toThrow();
    });

    it("should define getters", () => {
        const mat = new Transform3D();
        mat.set(0, 0, 0);
        mat.set(1, 1, 0);
        mat.set(2, 2, 0);
        expect(mat.get(0, 0) + mat.get(1, 1) + mat.get(2, 2)).toEqual(0);
    });

    it("should throw when getters params is wrong", () => {
        const mat = new Transform3D();
        expect(() => {
            mat.get(10, 0);
        }).toThrow();
    });

    it("should define transformation from scale", () => {
        const t = Transform3D.fromScale(20);
        expect(t.toString())
            .toEqual("(20.000,0.000,0.000,0.000,0.000,20.000,0.000,0.000,0.000,0.000,20.000,0.000,0.000,0.000,0.000,1.000)");
    });

    it("should project method & project to identity with E matrix", () => {
        const t = new Transform3D();
        const p2 = t.project(new Vec3(1, 2, 3));
        expect(p2.toString()).toEqual("(1.000,2.000,3.000)");
    });

    it("should scale method when multipy on scale matrix", () => {
        const t = Transform3D.fromScale(2);
        const p2 = t.project(new Vec3(1, 2, 3));
        expect(p2.toString()).toEqual("(2.000,4.000,6.000)");
    });

    it("shoud process rotation around Z axis", () => {
        let t: Transform3D = Transform3D.fromScale(1);
        t = t.rotate(new Vec3(0, 0, 1), (Math.PI / 8) );
        // Math.PI/8
        expect(t.toString())
            .toEqual("(0.924,-0.383,0.000,0.000,0.383,0.924,0.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,0.000,1.000)");
    });

    it("should create Transform 3D based on rotation around Z", () => {
        let t = Transform3D.fromScale(1);
        t = t.rotate(new Vec3(0, 0, 1), (Math.PI / 8) );
        // Math.PI/8
        expect(t.toString())
            .toEqual("(0.924,-0.383,0.000,0.000,0.383,0.924,0.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,0.000,1.000)");
    });

    it("should define static fromRotation method", () => {
        const t  = Transform3D.fromRotation(new Vec3(0, 0, 1), (Math.PI / 8));

        expect(t.toString())
            .toEqual("(0.924,-0.383,0.000,0.000,0.383,0.924,0.000,0.000,0.000,0.000,1.000,0.000,0.000,0.000,0.000,1.000)");
        // let quat = Quaternion.fromAxisAngle(axis, angle);
        // return Transform3D.fromQuaternion(quat);
    });

    it("should define static fromTranslation method", () => {
        const t  = Transform3D.fromTranslation(new Vec3(1, 2, 3));
        const p = t.project(new Vec3(1, 2, 3));

        expect(p.toString()).toEqual("(2.000,4.000,6.000)");
    });

    it("should define translate method", () => {
        let t = Transform3D.fromScale(2);
        t = t.translate(new Vec3(1, 2, 3));
        const v = t.project(new Vec3(1, 2, 3));

        expect(v.toString()).toEqual("(3.000,6.000,9.000)");
    });

    it("should define extractTranslation method oposite to translate", () => {
        let t = Transform3D.fromScale(3);
        t = t.translate(new Vec3(1, 2, 3));
        const v = t.extractTranslation();

        expect(v.toString()).toEqual("(1.000,2.000,3.000)");
    });

    // should define method
    it("should define extractScale mehod oposite to translate", () => {
        let t = Transform3D.fromScale(3);
        t = t.translate(new Vec3(1, 2, 3));
        const s = t.extractScale();

        expect(s).toBeCloseTo(3);
    });

    it("should define inverse method such that: (A* (A^-1) == E)", () => {
        const a = new Transform3D([Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), 1,
        ]);
        const b = a.inverse();
        const ab =  Transform3D.fromMultiplication(a, b);
        const E = new Transform3D();

        expect(E.equal(ab)).toBeTruthy();
    });

    it("should define determinant method", () => {
        const a = new Transform3D();
        expect(a.determinant()).toEqual(1);
    });

    it("should define clone method", () => {
        const a = new Transform3D();
        const b = a.clone();

        expect(a === b).toBeFalsy();
        expect(a.equal(b)).toBeTruthy();
    });
});
