import { EPSILON,  ICloneable, IEquatable } from "@chemistry/common";

export class Vec3 implements ICloneable<Vec3>, IEquatable<Vec3> {

    public static add(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    public static sub(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    public static dot(v1: Vec3, v2: Vec3): number {
        return (v1.x * v2.x +  v1.y * v2.y + v1.z * v2.z);
    }

    public static cross(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }

    public static equals(v1: Vec3, v2: Vec3): boolean {
        return (Math.abs(v1.x - v2.x) < EPSILON)
            && (Math.abs(v1.y - v2.y) < EPSILON)
            && (Math.abs(v1.z - v2.z) < EPSILON);
    }

    public static getDecimal(v1: Vec3): Vec3 {
        const x: number = v1.x - Math.floor(v1.x);
        const y: number = v1.y - Math.floor(v1.y);
        const z: number = v1.z - Math.floor(v1.z);
        return new Vec3(x, y, z);
    }

    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public get lengthPow2(): number {
        return (this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public get avg(): number {
        return (this.x + this.y + this.z) / 3;
    }

    public scale(num: number): Vec3 {
        return new Vec3(this.x * num, this.y * num, this.z * num);
    }

    public normalize() {
        const len = this.length;
        if (len === 0) {
            throw new Error("Can not normalize zero vector");
        } else {
            return new Vec3(this.x / len, this.y / len, this.z / len);
        }
    }

    public dot(vec: Vec3): number {
        return Vec3.dot(this, vec);
    }

    public sub(vec: Vec3): Vec3 {
        return Vec3.sub(this, vec);
    }

    public add(vector: Vec3): Vec3 {
        return Vec3.add(this, vector);
    }

    public equals(vec: Vec3) {
        return Vec3.equals(this, vec);
    }

    public clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    public toString() {
        return "(" + this.x.toFixed(3) + "," + this.y.toFixed(3) + "," + this.z.toFixed(3) + ")";
    }
}
