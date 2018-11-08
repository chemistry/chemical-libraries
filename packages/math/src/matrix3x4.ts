import { EPSILON,  ICloneable, IEquatable } from "@chemistry/common";
import { Vec3 } from "./vec3";

/**
 * Simple Class to work with special type of matrix.
 * | x1 x2  x3  x4 |
 * | x5 x6  x7  x8 |
 * | x8 x10 x11 x12|
 * | 0  0   0   1  |
 */
export class Matrix3x4 implements ICloneable<Matrix3x4>, IEquatable<Matrix3x4>  {

    public static add(matrix1: Matrix3x4, matrix2: Matrix3x4): Matrix3x4 {
        const m1 = matrix1.elements;
        const m2 = matrix2.elements;
        return new Matrix3x4([
            m1[0]  +  m2[0],
            m1[1]  +  m2[1],
            m1[2]  +  m2[2],
            m1[3]  +  m2[3],
            m1[4]  +  m2[4],
            m1[5]  +  m2[5],
            m1[6]  +  m2[6],
            m1[7]  +  m2[7],
            m1[8]  +  m2[8],
            m1[9]  +  m2[9],
            m1[10] +  m2[10],
            m1[11] +  m2[11],
        ]);
    }

    public static sub(matrix1: Matrix3x4, matrix2: Matrix3x4): Matrix3x4 {
        const m1 = matrix1.elements;
        const m2 = matrix2.elements;
        return new Matrix3x4([
            m1[0]  -  m2[0],
            m1[1]  -  m2[1],
            m1[2]  -  m2[2],
            m1[3]  -  m2[3],
            m1[4]  -  m2[4],
            m1[5]  -  m2[5],
            m1[6]  -  m2[6],
            m1[7]  -  m2[7],
            m1[8]  -  m2[8],
            m1[9]  -  m2[9],
            m1[10] -  m2[10],
            m1[11] -  m2[11],
        ]);
    }

    public static inverse(matrix: Matrix3x4): Matrix3x4 {
        const r = [];
        let i;
        let det;
        const m = matrix.elements.slice(0, 12);
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        r[0] =  m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15]
            + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];

        r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15]
        - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];

        r[2] =  m[1] * m[6]  * m[15] - m[1] * m[14] * m[7]  - m[2] * m[5] * m[15]
        + m[2] * m[13] * m[7]  + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];

        r[3] = -m[1] * m[6]  * m[11] + m[1] * m[10] * m[7]  + m[2] * m[5] * m[11]
        - m[2] * m[9]  * m[7]  - m[3] * m[5] * m[10] + m[3] * m[9]  * m[6];

        r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15]
        - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];

        r[5] =  m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15]
        + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];

        r[6] = -m[0] * m[6]  * m[15] + m[0] * m[14] * m[7]  + m[2] * m[4] * m[15]
        - m[2] * m[12] * m[7]  - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];

        r[7] =  m[0] * m[6]  * m[11] - m[0] * m[10] * m[7]  - m[2] * m[4] * m[11]
        + m[2] * m[8]  * m[7]  + m[3] * m[4] * m[10] - m[3] * m[8]  * m[6];

        r[8]  =  m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15]
        + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];

        r[9]  = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15]
        - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];

        r[10] =  m[0] * m[5] * m[15] - m[0] * m[13] * m[7]  - m[1] * m[4] * m[15]
        + m[1] * m[12] * m[7]  + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];

        r[11] = -m[0] * m[5] * m[11] + m[0] * m[9]  * m[7]  + m[1] * m[4] * m[11]
        - m[1] * m[8]  * m[7]  - m[3] * m[4] * m[9]  + m[3] * m[8]  * m[5];

        r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14]
        - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];

        r[13] =  m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14]
        + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];

        r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6]  + m[1] * m[4] * m[14]
        - m[1] * m[12] * m[6]  - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];

        r[15] =  m[0] * m[5] * m[10] - m[0] * m[9]  * m[6]  - m[1] * m[4] * m[10]
        + m[1] * m[8]  * m[6]  + m[2] * m[4] * m[9]  - m[2] * m[8]  * m[5];

        det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
        for (i = 0; i < 16; i++) {
            r[i] /= det;
        }
        return new Matrix3x4(r.slice(0, 12));
    }

    public static isE(matrix: Matrix3x4): boolean {
        return (Math.abs(matrix.elements[0] - 1) < EPSILON)
            && (Math.abs(matrix.elements[1] - 0) < EPSILON)
            && (Math.abs(matrix.elements[2] - 0) < EPSILON)
            && (Math.abs(matrix.elements[3] - 0) < EPSILON)
            && (Math.abs(matrix.elements[4] - 0) < EPSILON)
            && (Math.abs(matrix.elements[5] - 1) < EPSILON)
            && (Math.abs(matrix.elements[6] - 0) < EPSILON)
            && (Math.abs(matrix.elements[7] - 0) < EPSILON)
            && (Math.abs(matrix.elements[8]  - 0) < EPSILON)
            && (Math.abs(matrix.elements[9]  - 0) < EPSILON)
            && (Math.abs(matrix.elements[10] - 1) < EPSILON)
            && (Math.abs(matrix.elements[11] - 0) < EPSILON);
    }

    public static equals(matrix1: Matrix3x4, matrix2: Matrix3x4): boolean {
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
            && (Math.abs(matrix1.elements[11] - matrix2.elements[11]) < EPSILON);
    }

    protected elements: number[];

    constructor(elements?: number[]) {
        this.elements = (elements && elements.length === 12) ? elements.slice(0) : [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];
    }

    /**
     * Set value to specified element of the matrix
     */
    public set(i: number, j: number, val: number) {
        if ((i > 3) || (i < 0) || (j > 4) || (j < 0)) {
            throw new Error("Wrong coefficients");
        }
        this.elements[i * 4 + j] = val;
    }

    /**
     * return specified element of the matrix
     * @param  {Number} i row
     * @param  {Number} j column
     * @return {Number}
     */
    public get(i: number, j: number) {
        if ((i > 3) || (i < 0) || (j > 4) || (j < 0)) {
            throw new Error("Incorrect  coeficients");
        }
        return this.elements[i * 4 + j];
    }

    public add(matrix: Matrix3x4): Matrix3x4 {
        return Matrix3x4.add(this, matrix);
    }

    public sub(matrix: Matrix3x4): Matrix3x4 {
        return Matrix3x4.sub(this, matrix);
    }

    public translate(v: Vec3): Matrix3x4 {
        const elements = this.elements.slice(0);
        elements[3]  = elements[3] + v.x;
        elements[7]  = elements[7] + v.y;
        elements[11] = elements[11] + v.z;
        return new Matrix3x4(elements);
    }

    public scale(mult: number): Matrix3x4 {
        return new Matrix3x4([
            this.elements[0] * mult,
            this.elements[1] * mult,
            this.elements[2] * mult,
            this.elements[3] * mult,
            this.elements[4] * mult,
            this.elements[5] * mult,
            this.elements[6] * mult,
            this.elements[7] * mult,
            this.elements[8] * mult,
            this.elements[9] * mult,
            this.elements[10] * mult,
            this.elements[11] * mult,
        ]);
    }

    public project(mult: Vec3): Vec3 {
        return new Vec3(
            this.elements[0] * mult.x +  this.elements[1] * mult.y + this.elements[2] * mult.z  +  this.elements[3],
            this.elements[4] * mult.x +  this.elements[5] * mult.y + this.elements[6] * mult.z  +  this.elements[7],
            this.elements[8] * mult.x +  this.elements[9] * mult.y + this.elements[10] * mult.z  +  this.elements[11],
        );
    }

    public multiply(mult: Matrix3x4) {
        const elements = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        elements[0]  = mult.elements[0] * this.elements[0] + mult.elements[4] * this.elements[1] + mult.elements[8] *  this.elements[2];
        elements[1]  = mult.elements[1] * this.elements[0] + mult.elements[5] * this.elements[1] + mult.elements[9] *  this.elements[2];
        elements[2]  = mult.elements[2] * this.elements[0] + mult.elements[6] * this.elements[1] + mult.elements[10] * this.elements[2];
        elements[3]  = mult.elements[3] * this.elements[0] + mult.elements[7] * this.elements[1] + mult.elements[11] * this.elements[2]
            + this.elements[3];

        elements[4]  = mult.elements[0] * this.elements[4] + mult.elements[4] * this.elements[5] + mult.elements[8] *  this.elements[6];
        elements[5]  = mult.elements[1] * this.elements[4] + mult.elements[5] * this.elements[5] + mult.elements[9] *  this.elements[6];
        elements[6]  = mult.elements[2] * this.elements[4] + mult.elements[6] * this.elements[5] + mult.elements[10] * this.elements[6];
        elements[7]  = mult.elements[3] * this.elements[4] + mult.elements[7] * this.elements[5] + mult.elements[11] * this.elements[6]
            + this.elements[7];

        elements[8]  = mult.elements[0] * this.elements[8] + mult.elements[4] * this.elements[9] + mult.elements[8] *  this.elements[10];
        elements[9]  = mult.elements[1] * this.elements[8] + mult.elements[5] * this.elements[9] + mult.elements[9] *  this.elements[10];
        elements[10] = mult.elements[2] * this.elements[8] + mult.elements[6] * this.elements[9] + mult.elements[10] * this.elements[10];
        elements[11] = mult.elements[3] * this.elements[8] + mult.elements[7] * this.elements[9] + mult.elements[11] * this.elements[10]
            + this.elements[11];
        return new Matrix3x4(elements);
    }

    public inverse(): Matrix3x4 {
        return Matrix3x4.inverse(this);
    }

    public isE() {
        return Matrix3x4.isE(this);
    }

    public equals(matrix: Matrix3x4): boolean {
        return Matrix3x4.equals(this, matrix);
    }

    public clone(): Matrix3x4 {
        return new Matrix3x4(this.elements);
    }

    public toString(): string {
        return "(" + this.elements.slice(0, 12).map((element) => element.toFixed(3)) + ")";
    }

    /**
     * Return transformation matrix as symetry code (common in Crystallography)
     * e.g. 1-x,1-y,1-z
     */
    public toSymetryCode(): string {

        function formatSymNumber(num: number): string {
            return (Math.round(num * 1000) / 1000).toString();
        }
        function closeToOne(num: number) {
            return (Math.abs(num - 1) < 0.001);
        }

        function codePart1(x: number, y: number, z: number, l: number): string {
            const arr = [];

            if (x !== 0) {
                if (closeToOne(Math.abs(x))) {
                    arr.push(x > 0 ? "x" : "-x");
                } else {
                    arr.push(formatSymNumber(x) + "x");
                }
            }
            if (y !== 0) {
                if (closeToOne(Math.abs(y))) {
                    arr.push(y > 0 ? "y" : "-y");
                } else {
                    arr.push(formatSymNumber(y) + "y");
                }
            }
            if (z !== 0) {
                if (closeToOne(Math.abs(z))) {
                    arr.push(z > 0 ? "z" : "-z");
                } else {
                    arr.push(formatSymNumber(z) + "z");
                }
            }
            if (l !== 0) {
                arr.push(formatSymNumber(l));
            }

            return arr.reduce((curr, next) => {
                if (next && next.charAt(0) === "-") {
                    return curr + next;
                }
                if (curr === "") {
                    return next;
                }
                return curr + "+" + next;
            }, "");
        }
        const sx = codePart1(this.elements[0],  this.elements[1],  this.elements[2],  this.elements[3]);
        const sy = codePart1(this.elements[4],  this.elements[5],  this.elements[6],  this.elements[7]);
        const sz = codePart1(this.elements[8],  this.elements[9],  this.elements[10],  this.elements[11]);
        return sx + "," + sy + "," + sz;
    }

}
