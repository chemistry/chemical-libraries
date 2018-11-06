import { EPSILON,  IClonable, IEquatable } from "./common";
import { Vec3 } from "./vec3";

export class Matrix3x3 implements IClonable<Matrix3x3>, IEquatable<Matrix3x3> {

    public static equal(m1: Matrix3x3, m2: Matrix3x3): boolean {
        return (Math.abs(m1.elements[0] - m2.elements[0]) < EPSILON)
            && (Math.abs(m1.elements[1] - m2.elements[1]) < EPSILON)
            && (Math.abs(m1.elements[2] - m2.elements[2]) < EPSILON)
            && (Math.abs(m1.elements[3] - m2.elements[3]) < EPSILON)
            && (Math.abs(m1.elements[4] - m2.elements[4]) < EPSILON)
            && (Math.abs(m1.elements[5] - m2.elements[5]) < EPSILON)
            && (Math.abs(m1.elements[6] - m2.elements[6]) < EPSILON)
            && (Math.abs(m1.elements[7] - m2.elements[7]) < EPSILON)
            && (Math.abs(m1.elements[8] - m2.elements[8]) < EPSILON);
    }

    public static inverse(matrix: Matrix3x3): Matrix3x3 {

        const d = matrix.determinant();
        if (d === 0) {
            throw new Error("Matrix not invertable");
        }

        return new Matrix3x3([
            (matrix.get(1, 1)  * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 1)) / d,
            (-matrix.get(0, 1) * matrix.get(2, 2) + matrix.get(0, 2) * matrix.get(2, 1)) / d,
            (matrix.get(0, 1)  * matrix.get(1, 2) - matrix.get(0, 2) * matrix.get(1, 1)) / d,
            (-matrix.get(1, 0) * matrix.get(2, 2) + matrix.get(1, 2) * matrix.get(2, 0)) / d,
            (matrix.get(0, 0)  * matrix.get(2, 2) - matrix.get(0, 2) * matrix.get(2, 0)) / d,
            (-matrix.get(0, 0) * matrix.get(1, 2) + matrix.get(0, 2) * matrix.get(1, 0)) / d,
            (matrix.get(1, 0)  * matrix.get(2, 1) - matrix.get(1, 1) * matrix.get(2, 0)) / d,
            (-matrix.get(0, 0) * matrix.get(2, 1) + matrix.get(0, 1) * matrix.get(2, 0)) / d,
            (matrix.get(0, 0)  * matrix.get(1, 1) - matrix.get(0, 1) * matrix.get(1, 0)) / d,
        ]);
    }

    // | 0 1 2 |
    // | 3 4 5 |
    // | 6 7 8 |
    protected elements: number[];

    constructor(elements?: number[]) {
        this.elements = (elements && elements.length === 9) ? elements.slice(0) : [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    /**
     * Set value to specified element of the matrix
     */
    public set(i: number, j: number, val: number) {
        if ((i > 3) || (i < 0) || (j > 3) || (j < 0)) {
            throw new Error("Wrong coefficients");
        }
        this.elements[i * 3 + j] = val;
    }

    /**
     * return specified element of the matrix
     */
    public get(i: number, j: number): number {
        if ((i > 3) || (i < 0) || (j > 3) || (j < 0)) {
            throw new Error("Wrong coefficients");
        }
        return this.elements[i * 3 + j];
    }

    public scale(mult: number): Matrix3x3 {
        return new Matrix3x3 ([
            this.elements[0] * mult,
            this.elements[1] * mult,
            this.elements[2] * mult,
            this.elements[3] * mult,
            this.elements[4] * mult,
            this.elements[5] * mult,
            this.elements[6] * mult,
            this.elements[7] * mult,
            this.elements[8] * mult,
        ]);
    }

    public project(mult: Vec3): Vec3 {
        return new Vec3 (
            this.elements[0] * mult.x +  this.elements[1] * mult.y + this.elements[2] * mult.z,
            this.elements[3] * mult.x +  this.elements[4] * mult.y + this.elements[5] * mult.z,
            this.elements[6] * mult.x +  this.elements[7] * mult.y + this.elements[8] * mult.z,
        );
    }

    /**
     * Returns matrix multiplication result to scalar, vector or another matrix
     */
    public multiply(mult: Matrix3x3): Matrix3x3 {
        return new Matrix3x3([
           this.elements[0] * mult.elements[0]  + this.elements[3] * mult.elements[1] + this.elements[6] * mult.elements[2],
           this.elements[1] * mult.elements[0]  + this.elements[4] * mult.elements[1] + this.elements[7] * mult.elements[2],
           this.elements[2] * mult.elements[0]  + this.elements[5] * mult.elements[1] + this.elements[8] * mult.elements[2],
           this.elements[0] * mult.elements[3]  + this.elements[3] * mult.elements[4] + this.elements[6] * mult.elements[5],
           this.elements[1] * mult.elements[3]  + this.elements[4] * mult.elements[4] + this.elements[7] * mult.elements[5],
           this.elements[2] * mult.elements[3]  + this.elements[5] * mult.elements[4] + this.elements[8] * mult.elements[5],
           this.elements[0] * mult.elements[6]  + this.elements[3] * mult.elements[7] + this.elements[6] * mult.elements[8],
           this.elements[1] * mult.elements[6]  + this.elements[4] * mult.elements[7] + this.elements[7] * mult.elements[8],
           this.elements[2] * mult.elements[6]  + this.elements[5] * mult.elements[7] + this.elements[8] * mult.elements[8],
       ]);
   }

    /**
     * Returns matrix determinant
     */
    public determinant(): number {
        let result = this.get(0, 0) * (this.get(1, 1) * this.get(2, 2) - this.get(2, 1) * this.get(1, 2));
        result -= this.get(1, 0) * (this.get(0, 1) * this.get(2, 2) - this.get(2, 1) * this.get(0, 2));
        result += this.get(2, 0) * (this.get(0, 1) * this.get(1, 2) - this.get(1, 1) * this.get(0, 2));
        return result;
    }

    /**
     * Clone the matrix
     */
    public clone(): Matrix3x3 {
        return new Matrix3x3(this.elements.slice(0));
    }

    /**
     * Compare 2 matrixes
     */
    public equal(matrix: Matrix3x3): boolean {
        return Matrix3x3.equal(this, matrix);
    }

    /**
     * Returns string representation of the matrix
     */
    public toString(): string {
         return "(" + [
             this.elements[0].toFixed(3),
             this.elements[1].toFixed(3),
             this.elements[2].toFixed(3),
             this.elements[3].toFixed(3),
             this.elements[4].toFixed(3),
             this.elements[5].toFixed(3),
             this.elements[6].toFixed(3),
             this.elements[7].toFixed(3),
             this.elements[8].toFixed(3),
         ].join(",") + ")";
    }
}
