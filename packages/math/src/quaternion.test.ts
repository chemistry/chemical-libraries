import { Quaternion } from './quaternion.js';
import { Vec3 } from './vec3.js';

describe('Quaternion', () => {
  it('should create instance', () => {
    const q = new Quaternion(0, 0, 0, 1);
    expect(q).toBeDefined();
  });

  it('should return correct X component', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.X()).toEqual(1);
  });

  it('should return correct Y component', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.Y()).toEqual(2);
  });

  it('should return correct Z component', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.Z()).toEqual(3);
  });

  it('should return correct W component', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.W()).toEqual(4);
  });

  it('should create identity quaternion from zero rotation', () => {
    const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), 0);
    expect(q.X()).toBeCloseTo(0);
    expect(q.Y()).toBeCloseTo(0);
    expect(q.Z()).toBeCloseTo(0);
    expect(q.W()).toBeCloseTo(1);
  });

  it('should create quaternion from 90 degree rotation around Z', () => {
    const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
    expect(q.X()).toBeCloseTo(0);
    expect(q.Y()).toBeCloseTo(0);
    expect(q.Z()).toBeCloseTo(Math.sin(Math.PI / 4));
    expect(q.W()).toBeCloseTo(Math.cos(Math.PI / 4));
  });

  it('should create quaternion from 180 degree rotation around X', () => {
    const q = Quaternion.fromAxisAngle(new Vec3(1, 0, 0), Math.PI);
    expect(q.X()).toBeCloseTo(1);
    expect(q.Y()).toBeCloseTo(0);
    expect(q.Z()).toBeCloseTo(0);
    expect(q.W()).toBeCloseTo(0);
  });

  it('should create quaternion from rotation around arbitrary axis', () => {
    const axis = new Vec3(1, 1, 0).normalize();
    const q = Quaternion.fromAxisAngle(axis, Math.PI / 3);
    const halfAngle = Math.PI / 6;
    expect(q.X()).toBeCloseTo(axis.x * Math.sin(halfAngle));
    expect(q.Y()).toBeCloseTo(axis.y * Math.sin(halfAngle));
    expect(q.Z()).toBeCloseTo(0);
    expect(q.W()).toBeCloseTo(Math.cos(halfAngle));
  });
});
