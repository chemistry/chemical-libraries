import { EPSILON,  ICloneable, IEquatable } from "@chemistry/common";

export interface IVec2 {
    x: number;
    y: number;
}

export class Vec2 implements IVec2, ICloneable<Vec2>, IEquatable<Vec2> {

    public static add(v1: Vec2, v2: Vec2): Vec2 {
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    }

    public static sub(v1: Vec2, v2: Vec2): Vec2 {
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    }

    public static dot(v1: Vec2, v2: Vec2): number {
        return (v1.x * v2.x +  v1.y * v2.y);
    }

    public static equals(v1: Vec2, v2: Vec2): boolean {
        return (Math.abs(v1.x - v2.x) < EPSILON)
            && (Math.abs(v1.y - v2.y) < EPSILON);
    }

    public static getDecimal(v1: Vec2): Vec2 {
        const x: number = v1.x - Math.floor(v1.x);
        const y: number = v1.y - Math.floor(v1.y);
        return new Vec2(x, y);
    }

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get lengthPow2(): number {
        return (this.x * this.x + this.y * this.y);
    }

    public get avg(): number {
        return (this.x + this.y) / 3;
    }

    public scale(num: number): Vec2 {
        return new Vec2(this.x * num, this.y * num);
    }

    public normalize() {
        const len = this.length;
        if (len === 0) {
            throw new Error("Can not normalize zero vector");
        } else {
            return new Vec2(this.x / len, this.y / len);
        }
    }

    public dot(vec: Vec2): number {
        return Vec2.dot(this, vec);
    }

    public sub(vec: Vec2): Vec2 {
        return Vec2.sub(this, vec);
    }

    public add(vector: Vec2): Vec2 {
        return Vec2.add(this, vector);
    }

    public equals(vec: Vec2) {
        return Vec2.equals(this, vec);
    }

    public clone() {
        return new Vec2(this.x, this.y);
    }

    public toString() {
        return "(" + this.x.toFixed(3) + "," + this.y.toFixed(3) + ")";
    }
}
