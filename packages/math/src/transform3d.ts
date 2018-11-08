import { EPSILON,  ICloneable, IEquatable } from "@chemistry/common";
import { Quaternion } from "./quaternion";
import { Vec3 } from "./vec3";

/**
 * Class to work with Matrix4x4 (When normalized have proberty  A^-1 = A^t)
 * (used for transformation in 3D)
 * |  0  4  8  12  |   |  RS R  R  T  |
 * |  1  5  9  13  |   |  R  RS R  T  |
 * |  2  6  10 14  | = |  R  R  RS T  |
 * |  3  7  11 15  |   |  0  0  0  1  |
 */
export class Transform3D implements ICloneable<Transform3D> {

    public static equals(matrix1: Transform3D, matrix2: Transform3D): boolean {
        return (Math.abs(matrix1.elements[0] - matrix2.elements[0]) < EPSILON)
            && (Math.abs(matrix1.elements[1] - matrix2.elements[1]) < EPSILON)
            && (Math.abs(matrix1.elements[2] - matrix2.elements[2]) < EPSILON)
            && (Math.abs(matrix1.elements[3] - matrix2.elements[3]) < EPSILON)
            && (Math.abs(matrix1.elements[4] - matrix2.elements[4]) < EPSILON)
            && (Math.abs(matrix1.elements[5] - matrix2.elements[5]) < EPSILON)
            && (Math.abs(matrix1.elements[6] - matrix2.elements[6]) < EPSILON)
            && (Math.abs(matrix1.elements[7] - matrix2.elements[7]) < EPSILON)
            && (Math.abs(matrix1.elements[8]  - matrix2.elements[8]) < EPSILON)
            && (Math.abs(matrix1.elements[9]  - matrix2.elements[9]) < EPSILON)
            && (Math.abs(matrix1.elements[10] - matrix2.elements[10]) < EPSILON)
            && (Math.abs(matrix1.elements[11] - matrix2.elements[11]) < EPSILON)
            && (Math.abs(matrix1.elements[12]  - matrix2.elements[12]) < EPSILON)
            && (Math.abs(matrix1.elements[13]  - matrix2.elements[13]) < EPSILON)
            && (Math.abs(matrix1.elements[14] - matrix2.elements[14]) < EPSILON)
            && (Math.abs(matrix1.elements[15] - matrix2.elements[15]) < EPSILON);
    }

    /**
     * Return Transformation from Scale
     */
    public static fromScale(scale: number): Transform3D {
        return new Transform3D([scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, 1]);
    }

    /**
     * Return Transformation from Quaternion
     */
    public static fromQuaternion(quaternion: Quaternion): Transform3D {
        const elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        const x2 = quaternion.X() + quaternion.X();
        const y2 = quaternion.Y() + quaternion.Y();
        const z2 = quaternion.Z() + quaternion.Z();
        const xx = quaternion.X() * x2;
        const xy = quaternion.X() * y2;
        const xz = quaternion.X() * z2;
        const yy = quaternion.Y() * y2;
        const yz = quaternion.Y() * z2;
        const zz = quaternion.Z() * z2;
        const wx = quaternion.W() * x2;
        const wy = quaternion.W() * y2;
        const wz = quaternion.W() * z2;
        elements[3] = elements[7] = elements[11] = elements[12] = elements[13] = elements[14] = 0; elements[15] = 1;
        elements[0] = 1 - (yy + zz);    elements[4] = xy + wz;    elements[8] = xz - wy;
        elements[1] = xy - wz;    elements[5] = 1 - (xx + zz); elements[9] = yz + wx;
        elements[2] = xz + wy;    elements[6] = yz - wx;  elements[10] = 1 - (xx + yy);
        return new Transform3D(elements);
    }

    public static fromMultiplication(transform1: Transform3D, transform2: Transform3D): Transform3D {
        const m1 = transform1.elements;
        const m2 = transform2.elements;

        return new Transform3D([
            m1[0] * m2[0] + m1[1] * m2[4] + m1[2] * m2[8] + m1[3] * m2[12],
            m1[0] * m2[1] + m1[1] * m2[5] + m1[2] * m2[9] + m1[3] * m2[13],
            m1[0] * m2[2] + m1[1] * m2[6] + m1[2] * m2[10] + m1[3] * m2[14],
            m1[0] * m2[3] + m1[1] * m2[7] + m1[2] * m2[11] + m1[3] * m2[15],
            m1[4] * m2[0] + m1[5] * m2[4] + m1[6] * m2[8] + m1[7] * m2[12],
            m1[4] * m2[1] + m1[5] * m2[5] + m1[6] * m2[9] + m1[7] * m2[13],
            m1[4] * m2[2] + m1[5] * m2[6] + m1[6] * m2[10] + m1[7] * m2[14],
            m1[4] * m2[3] + m1[5] * m2[7] + m1[6] * m2[11] + m1[7] * m2[15],
            m1[8] * m2[0] + m1[9] * m2[4] + m1[10] * m2[8] + m1[11] * m2[12],
            m1[8] * m2[1] + m1[9] * m2[5] + m1[10] * m2[9] + m1[11] * m2[13],
            m1[8] * m2[2] + m1[9] * m2[6] + m1[10] * m2[10] + m1[11] * m2[14],
            m1[8] * m2[3] + m1[9] * m2[7] + m1[10] * m2[11] + m1[11] * m2[15],
            m1[12] * m2[0] + m1[13] * m2[4] + m1[14] * m2[8] + m1[15] * m2[12],
            m1[12] * m2[1] + m1[13] * m2[5] + m1[14] * m2[9] + m1[15] * m2[13],
            m1[12] * m2[2] + m1[13] * m2[6] + m1[14] * m2[10] + m1[15] * m2[14],
            m1[12] * m2[3] + m1[13] * m2[7] + m1[14] * m2[11] + m1[15] * m2[15],
        ]);
    }

    /**
     * Return Transformation by Translation
     */
   public static fromTranslation(translation: Vec3): Transform3D {
       return new Transform3D([
           1, 0, 0, 0,
           0, 1, 0, 0,
           0, 0, 1, 0,
           translation.x,
           translation.y,
           translation.z,
           1,
       ]);
   }

   /**
    * Return Transformation from rootation about an axis
    */
    public static fromRotation(axis: Vec3, angle: number): Transform3D {
        const quat = Quaternion.fromAxisAngle(axis, angle);
        return Transform3D.fromQuaternion(quat);
    }

    protected elements: number[];

    constructor(elements?: number[]) {
        if (elements && elements.length) {
            if (elements.length !== 16) {
                throw new Error ("Wrong array length. expected 16");
            }
            this.elements = elements.slice(0);
            return;
        }

        this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    public toString(): string {
        return "(" + this.elements.slice(0, 16).map((element) => element.toFixed(3)) + ")";
    }

   /**
    * Set value to specified element of the matrix
    */
    public set(row: number, col: number, value: number) {
        if ((row > 4) || (row < 0) || (col > 4) || (col < 0)) {
           throw new Error("Incorrect coeficients");
        }
        this.elements[row + col * 4] = value;
    }

   /**
    * Return specified element of the matrix
    */
    public get(row: number, col: number): number {
        if ((row > 4) || (row < 0) || (col > 4) || (col < 0)) {
            throw new Error("Incorrect coeficients");
        }
        return this.elements[row + col * 4];
    }

    /**
     *  Multipy vector to the Matrix
     */
    public project(position: Vec3): Vec3 {
        const x = this.elements[0] * position.x + this.elements[4] * position.y + this.elements[8]  * position.z + this.elements[12];
        const y = this.elements[1] * position.x + this.elements[5] * position.y + this.elements[9]  * position.z + this.elements[13];
        const z = this.elements[2] * position.x + this.elements[6] * position.y + this.elements[10] * position.z + this.elements[14];
        return new Vec3(x, y, z);
    }

    public rotate(axis: Vec3, angle: number): Transform3D {
        const quat = Quaternion.fromAxisAngle(axis, angle);
        const x = Transform3D.fromQuaternion(quat);
        return Transform3D.fromMultiplication(this, x);
    }
    /**
     * Add translational component to current transformation
     */
    public translate(vec: Vec3): Transform3D {
        const m = this.elements;
        return new Transform3D([m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10],
                                m[11], (m[12] + vec.x), (m[13] + vec.y), (m[14] + vec.z), m[15]]);
    }

    /**
     * Extract translational component of the transformation
     */
    public extractTranslation(): Vec3 {
       return new Vec3 (
           this.elements[12],
           this.elements[13],
           this.elements[14],
       );
    }

    public extractScale(): number {
        const m = this.elements;
        const t = new Transform3D([m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], 0, 0, 0, 1]);
        const vec = t.project(new Vec3(1, 1, 1));
        return vec.length / Math.sqrt(3);
    }

    /**
     * Return Inverse to current transformation (by inverting matrix)
     * (allow to unproject vectors)
     */
    public inverse() {
        let i;
        let det;
        const r = new Array(16);
        const m = this.elements;

        r[0] =  m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11]
            + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
        r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11]
            - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
        r[2] =  m[1] * m[6]  * m[15] - m[1] * m[14] * m[7]  - m[2] * m[5] * m[15] + m[2] * m[13] * m[7]
            + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
        r[3] = -m[1] * m[6]  * m[11] + m[1] * m[10] * m[7]  + m[2] * m[5] * m[11] - m[2] * m[9]  * m[7]
            - m[3] * m[5] * m[10] + m[3] * m[9]  * m[6];
        r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11]
            - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
        r[5] =  m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11]
            + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
        r[6] = -m[0] * m[6]  * m[15] + m[0] * m[14] * m[7]  + m[2] * m[4] * m[15] - m[2] * m[12] * m[7]
            - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
        r[7] =  m[0] * m[6]  * m[11] - m[0] * m[10] * m[7]  - m[2] * m[4] * m[11] + m[2] * m[8]  * m[7]
            + m[3] * m[4] * m[10] - m[3] * m[8]  * m[6];
        r[8] =  m[4]  * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11]
            + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
        r[9] = -m[0]  * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11]
            - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
        r[10] = m[0]  * m[5] * m[15] - m[0] * m[13] * m[7]  - m[1] * m[4] * m[15] + m[1] * m[12] * m[7]
            + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
        r[11] = -m[0] * m[5] * m[11] + m[0] * m[9]  * m[7]  + m[1] * m[4] * m[11] - m[1] * m[8]  * m[7]
            - m[3] * m[4] * m[9]  + m[3] * m[8]  * m[5];
        r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10]
            - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
        r[13] = m[0] * m[9] * m[14]  - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10]
            + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
        r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6]  + m[1] * m[4] * m[14] - m[1] * m[12] * m[6]
            - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
        r[15] = m[0] * m[5] * m[10]  - m[0] * m[9]  * m[6]  - m[1] * m[4] * m[10] + m[1] * m[8]  * m[6]
            + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];
        det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
        for (i = 0; i < 16; i++) {
            r[i] /= det;
        }
        return new Transform3D(r);
    }

    /**
     * Return determinant of transformation matrix
     */
    public determinant() {
        const value = this.get(0, 3) * this.get(1, 2) * this.get(2, 1) * this.get(3, 0)
            - this.get(0, 1) * this.get(1, 3) * this.get(2, 1) * this.get(3, 0)
            - this.get(0, 3) * this.get(1, 1) * this.get(2, 2) * this.get(3, 0)
            + this.get(0, 1) * this.get(1, 3) * this.get(2, 2) * this.get(3, 0)
            + this.get(0, 1) * this.get(1, 1) * this.get(2, 3) * this.get(3, 0)
            - this.get(0, 1) * this.get(1, 2) * this.get(2, 3) * this.get(3, 0)
            - this.get(0, 3) * this.get(1, 2) * this.get(2, 0) * this.get(3, 1)
            + this.get(0, 1) * this.get(1, 3) * this.get(2, 0) * this.get(3, 1)
            + this.get(0, 3) * this.get(1, 0) * this.get(2, 2) * this.get(3, 1)
            - this.get(0, 0) * this.get(1, 3) * this.get(2, 2) * this.get(3, 1)
            - this.get(0, 1) * this.get(1, 0) * this.get(2, 3) * this.get(3, 1)
            + this.get(0, 0) * this.get(1, 2) * this.get(2, 3) * this.get(3, 1)
            + this.get(0, 3) * this.get(1, 1) * this.get(2, 0) * this.get(3, 2)
            - this.get(0, 1) * this.get(1, 3) * this.get(2, 0) * this.get(3, 2)
            - this.get(0, 3) * this.get(1, 0) * this.get(2, 1) * this.get(3, 2)
            + this.get(0, 0) * this.get(1, 3) * this.get(2, 1) * this.get(3, 2)
            + this.get(0, 1) * this.get(1, 0) * this.get(2, 3) * this.get(3, 2)
            - this.get(0, 0) * this.get(1, 1) * this.get(2, 3) * this.get(3, 2)
            - this.get(0, 1) * this.get(1, 1) * this.get(2, 0) * this.get(3, 3)
            + this.get(0, 1) * this.get(1, 2) * this.get(2, 0) * this.get(3, 3)
            + this.get(0, 1) * this.get(1, 0) * this.get(2, 1) * this.get(3, 3)
            - this.get(0, 0) * this.get(1, 2) * this.get(2, 1) * this.get(3, 3)
            - this.get(0, 1) * this.get(1, 0) * this.get(2, 2) * this.get(3, 3)
            + this.get(0, 0) * this.get(1, 1) * this.get(2, 2) * this.get(3, 3);
        return value;
    }
    /**
     * Clone current transformation
     */
    public clone(): Transform3D {
        return new Transform3D(this.elements);
    }

    public equals(transform: Transform3D): boolean {
        return Transform3D.equals(this, transform);
    }
}
