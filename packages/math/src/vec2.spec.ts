import { Vec2 } from "./vec2";

describe("Vec2", () => {
    it("should create instance", () => {
        const sut = new Vec2(0, 0);
        expect(sut).toBeDefined();
    });

    it("should define: toString", () => {
        const sut = new Vec2(0, 0);
        expect(sut.toString()).toEqual("(0.000,0.000)");
    });

    it("should define: length", () => {
         const sut = new Vec2(1, 2);
         expect(sut.length).toEqual(Math.sqrt(5));
    });

    it("should define: lengthPow2", () => {
        const sut = new Vec2(1, 2);
        expect(sut.lengthPow2).toEqual(5);
    });

    it("should define: avg", () => {
        const vec = new Vec2(1, 3);
        expect(vec.avg).toEqual(1 + (1 / 3));
    });

    it("should define: add", () => {
       const vec1 = new Vec2(1, -2);
       const vec2 = new Vec2(-1, 3);
       const res = vec1.add(vec2);

       expect(res === vec1).toBeFalsy();
       expect(res.toString()).toEqual("(0.000,1.000)");
   });

    it("should define: static add", () => {
        const vec1 = new Vec2(1, -2);
        const vec2 = new Vec2(-1, 3);
        const v = Vec2.add(vec1, vec2);

        expect(v.toString()).toEqual("(0.000,1.000)");
    });

    it("should define: sub", () => {
        const vec1 = new Vec2(1, 2);
        const vec2 = new Vec2(1, 2);
        const v = vec1.sub(vec2);

        expect(v === vec1).toBeFalsy();
        expect(v.toString()).toEqual("(0.000,0.000)");
    });

    it("should define: static sub", () => {
        const vec1 = new Vec2(1, 2);
        const vec2 = new Vec2(1, 2);
        const v = Vec2.sub(vec1, vec2);

        expect(v.toString()).toEqual("(0.000,0.000)");
    });

    it("should define: static dot", () => {
        const vec1 = new Vec2(1, 0);
        const vec2 = new Vec2(0, 1);
        const res = vec1.dot(vec2);

        expect(res).toEqual(0);
    });

    it("should define: static dot", () => {
        const vec1 = new Vec2(1, 0);
        const vec2 = new Vec2(0, 1);
        const res = Vec2.dot(vec1, vec2);

        expect(res).toEqual(0);
    });

    it("should define: equals", () => {
        const vec1 = new Vec2(1, 2);
        const vec2 = new Vec2(1, (1 / 3) * 6);
        const res = vec1.equals(vec2);

        expect(res).toBeTruthy();
    });

    it("should define: static equals", () => {
        const vec1 = new Vec2(1, 2);
        const vec2 = new Vec2(1, (1 / 3) * 6);
        const res = Vec2.equals(vec1, vec2);

        expect(res).toBeTruthy();
    });

    it("should define: clone", () => {
        const vec1 = new Vec2(1, 2);
        const vec2 = vec1.clone();

        expect(Vec2.equals(vec1, vec2)).toBeTruthy();
        expect(vec1 === vec2).toBeFalsy();
    });

    it("should define: scale", () => {
        const vec1 = new Vec2(2, 4);
        const res = vec1.scale(0.5);

        expect(res === vec1).toBeFalsy();
        expect(res.toString()).toEqual("(1.000,2.000)");
    });

    it("should define: normalize", () => {
        const vec1 = new Vec2(1, 3);
        const res = vec1.normalize();

        expect(res === vec1).toBeFalsy();
        expect(res.toString()).toEqual("(0.316,0.949)");
    });

    it("should define: normalize which throw for zero length", () => {
        const vec1 = new Vec2(0, 0);

        expect(() => {
            vec1.normalize();
        }).toThrowError("Can not normalize zero vector");
    });
});
