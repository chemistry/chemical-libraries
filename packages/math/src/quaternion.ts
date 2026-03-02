import { EPSILON, ICloneable, IEquatable } from '@chemistry/common';
import { Matrix3x3 } from './matrix3x3.js';
import { Vec3 } from './vec3.js';

/**
 * Simple Class to work with Quaternion
 */
export class Quaternion implements ICloneable<Quaternion>, IEquatable<Quaternion> {
  /**
   * Get Quaternion from Axis angle
   */
  public static fromAxisAngle(axis: Vec3, angle: number): Quaternion {
    const f = angle * 0.5;
    const pt = axis.scale(Math.sin(f));
    return new Quaternion(pt.x, pt.y, pt.z, Math.cos(f));
  }

  public static equals(q1: Quaternion, q2: Quaternion): boolean {
    return (
      Math.abs(q1.data[0] - q2.data[0]) < EPSILON &&
      Math.abs(q1.data[1] - q2.data[1]) < EPSILON &&
      Math.abs(q1.data[2] - q2.data[2]) < EPSILON &&
      Math.abs(q1.data[3] - q2.data[3]) < EPSILON
    );
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

  public get length(): number {
    return Math.sqrt(
      this.data[0] * this.data[0] +
        this.data[1] * this.data[1] +
        this.data[2] * this.data[2] +
        this.data[3] * this.data[3]
    );
  }

  public normalize(): Quaternion {
    const len = this.length;
    if (len === 0) {
      throw new Error('Can not normalize zero quaternion');
    }
    return new Quaternion(
      this.data[0] / len,
      this.data[1] / len,
      this.data[2] / len,
      this.data[3] / len
    );
  }

  public conjugate(): Quaternion {
    return new Quaternion(-this.data[0], -this.data[1], -this.data[2], this.data[3]);
  }

  public multiply(q: Quaternion): Quaternion {
    const [x1, y1, z1, w1] = this.data;
    const [x2, y2, z2, w2] = q.data;
    return new Quaternion(
      w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
      w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
      w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2,
      w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2
    );
  }

  public rotateVec3(v: Vec3): Vec3 {
    const qv = new Quaternion(v.x, v.y, v.z, 0);
    const result = this.multiply(qv).multiply(this.conjugate());
    return new Vec3(result.X(), result.Y(), result.Z());
  }

  public toMatrix3x3(): Matrix3x3 {
    const [x, y, z, w] = this.data;
    return new Matrix3x3([
      1 - 2 * (y * y + z * z),
      2 * (x * y - z * w),
      2 * (x * z + y * w),
      2 * (x * y + z * w),
      1 - 2 * (x * x + z * z),
      2 * (y * z - x * w),
      2 * (x * z - y * w),
      2 * (y * z + x * w),
      1 - 2 * (x * x + y * y),
    ]);
  }

  public clone(): Quaternion {
    return new Quaternion(this.data[0], this.data[1], this.data[2], this.data[3]);
  }

  public equals(q: Quaternion): boolean {
    return Quaternion.equals(this, q);
  }

  public toString(): string {
    return (
      '(' +
      this.data[0].toFixed(3) +
      ',' +
      this.data[1].toFixed(3) +
      ',' +
      this.data[2].toFixed(3) +
      ',' +
      this.data[3].toFixed(3) +
      ')'
    );
  }
}
