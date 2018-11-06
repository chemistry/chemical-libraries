import { Vec3 } from "./vec3";

describe("Vec3", () => {
    it("should create instance", () => {
        const sut = new Vec3(0, 0, 0);
        expect(sut).toBeDefined();
    });

    it("should define: toString", () => {
        const sut = new Vec3(0, 0, 0);
        expect(sut.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should define: length", () => {
         const sut = new Vec3(1, 2, 3);
         expect(sut.length).toEqual(Math.sqrt(14));
    });

    it("should define: lengthPow2", () => {
        const sut = new Vec3(1, 2, 3);
        expect(sut.lengthPow2).toEqual(14);
    });

    it("should define: avg", () => {
        const vec = new Vec3(1, 2, 3);
        expect(vec.avg).toEqual(2);
    });

    it("should define: add", () => {
       const vec1 = new Vec3(1, 2, 3);
       const vec2 = new Vec3(-1, -2, -3);
       const res = vec1.add(vec2);

       expect(res === vec1).toBeFalsy();
       expect(res.toString()).toEqual("(0.000,0.000,0.000)");
   });

    it("should define: static add", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = new Vec3(-1, -2, -3);
        const v = Vec3.add(vec1, vec2);

        expect(v.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should define: sub", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = new Vec3(1, 2, 3);
        const v = vec1.sub(vec2);

        expect(v === vec1).toBeFalsy();
        expect(v.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should define: static sub", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = new Vec3(1, 2, 3);
        const v = Vec3.sub(vec1, vec2);

        expect(v.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should define: static dot", () => {
        const vec1 = new Vec3(1, 0, 0);
        const vec2 = new Vec3(0, 1, 1);
        const res = vec1.dot(vec2);

        expect(res).toEqual(0);
    });

    it("should define: static dot", () => {
        const vec1 = new Vec3(1, 0, 0);
        const vec2 = new Vec3(0, 1, 1);
        const res = Vec3.dot(vec1, vec2);

        expect(res).toEqual(0);
    });

    it("should define: static cross", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = new Vec3(2, 4, 6);
        const res = Vec3.cross(vec1, vec2);

        expect(res.toString()).toEqual("(0.000,0.000,0.000)");
    });

    it("should define: equal", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = new Vec3(1, (1 / 3) * 6, 3);
        const res = vec1.equal(vec2);

        expect(res).toBeTruthy();
    });

    it("should define: static equal", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = new Vec3(1, (1 / 3) * 6, 3);
        const res = Vec3.equal(vec1, vec2);

        expect(res).toBeTruthy();
    });

    it("should define: clone", () => {
        const vec1 = new Vec3(1, 2, 3);
        const vec2 = vec1.clone();

        expect(Vec3.equal(vec1, vec2)).toBeTruthy();
        expect(vec1 === vec2).toBeFalsy();
    });

    it("should define: scale", () => {
        const vec1 = new Vec3(2, 4, 6);
        const res = vec1.scale(0.5);

        expect(res === vec1).toBeFalsy();
        expect(res.toString()).toEqual("(1.000,2.000,3.000)");
    });

    it("should define: normalize", () => {
        const vec1 = new Vec3(1, 2, 3);
        const res = vec1.normalize();

        expect(res === vec1).toBeFalsy();
        expect(res.toString()).toEqual("(0.267,0.535,0.802)");
    });

    it("should define: normalize which throw for zero length", () => {
        const vec1 = new Vec3(0, 0, 0);

        expect(() => {
            vec1.normalize();
        }).toThrowError("Can not normalize zero vector");
    });

    it("should define static decimal", () => {
        const vec1 = new Vec3(1.1, 2.2, 3.3);
        const res = Vec3.getDecimal(vec1);

        expect(res === vec1).toBeFalsy();
        expect(res.toString()).toEqual("(0.100,0.200,0.300)");
    });
});
