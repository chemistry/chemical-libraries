import { Vec3 } from "./vec3";
/**
 * Simple Class to work with Quaternion
 */
export class Quaternion {

    /**
     * Get Quaternion from Axis angle
     */
    public static fromAxisAngle(axis: Vec3, angle: number) {
        const f = angle * 0.5;
        const pt = axis.scale(Math.sin(f));
        return new Quaternion(pt.x, pt.y, pt.z, Math.cos(f));
    }

    protected data: number[];

    constructor(x: number, y: number, z: number, w: number) {
        this.data = [x, y, z, w];
    }

    /**
     * X Component
     */
    public X(): number {
        return this.data[0];
    }

    /**
     * Y Component
     */
    public Y(): number {
        return this.data[1];
    }

    /**
     * Z Component
     */
    public Z(): number {
        return this.data[2];
    }

    /**
     * W Component
     */
    public W(): number {
        return this.data[3];
    }
}
