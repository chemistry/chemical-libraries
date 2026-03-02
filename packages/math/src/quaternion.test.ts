import { Quaternion } from './quaternion.js';
import { Vec3 } from './vec3.js';

describe('Quaternion', () => {
  it('should create instance', () => {
    const sut = new Quaternion(0, 0, 0, 1);
    expect(sut).toBeDefined();
  });

  it('should access components', () => {
    const sut = new Quaternion(1, 2, 3, 4);
    expect(sut.X()).toEqual(1);
    expect(sut.Y()).toEqual(2);
    expect(sut.Z()).toEqual(3);
    expect(sut.W()).toEqual(4);
  });

  describe('fromAxisAngle', () => {
    it('should create identity quaternion from zero angle', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), 0);
      expect(q.X()).toBeCloseTo(0);
      expect(q.Y()).toBeCloseTo(0);
      expect(q.Z()).toBeCloseTo(0);
      expect(q.W()).toBeCloseTo(1);
    });

    it('should create quaternion for 90 degrees around Z', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
      expect(q.W()).toBeCloseTo(Math.cos(Math.PI / 4));
      expect(q.Z()).toBeCloseTo(Math.sin(Math.PI / 4));
    });

    it('should create quaternion for 180 degrees around X', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(1, 0, 0), Math.PI);
      expect(q.X()).toBeCloseTo(1);
      expect(q.W()).toBeCloseTo(0);
    });
  });

  describe('length', () => {
    it('should return 1 for identity quaternion', () => {
      const q = new Quaternion(0, 0, 0, 1);
      expect(q.length).toBeCloseTo(1);
    });

    it('should calculate magnitude', () => {
      const q = new Quaternion(1, 2, 3, 4);
      expect(q.length).toBeCloseTo(Math.sqrt(30));
    });
  });

  describe('normalize', () => {
    it('should return unit quaternion', () => {
      const q = new Quaternion(1, 2, 3, 4).normalize();
      expect(q.length).toBeCloseTo(1);
    });

    it('should throw for zero quaternion', () => {
      const q = new Quaternion(0, 0, 0, 0);
      expect(() => q.normalize()).toThrowError('Can not normalize zero quaternion');
    });
  });

  describe('conjugate', () => {
    it('should negate xyz and keep w', () => {
      const q = new Quaternion(1, 2, 3, 4);
      const c = q.conjugate();
      expect(c.X()).toEqual(-1);
      expect(c.Y()).toEqual(-2);
      expect(c.Z()).toEqual(-3);
      expect(c.W()).toEqual(4);
    });
  });

  describe('multiply', () => {
    it('should return identity when multiplying by identity', () => {
      const q = new Quaternion(1, 2, 3, 4).normalize();
      const identity = new Quaternion(0, 0, 0, 1);
      const result = q.multiply(identity);
      expect(result.equals(q)).toBeTruthy();
    });

    it('should satisfy q * conjugate(q) = identity for unit quaternion', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 3);
      const result = q.multiply(q.conjugate());
      const identity = new Quaternion(0, 0, 0, 1);
      expect(result.equals(identity)).toBeTruthy();
    });
  });

  describe('rotateVec3', () => {
    it('should not change vector with identity quaternion', () => {
      const q = new Quaternion(0, 0, 0, 1);
      const v = new Vec3(1, 2, 3);
      const result = q.rotateVec3(v);
      expect(result.equals(v)).toBeTruthy();
    });

    it('should rotate X-axis 90 degrees around Z to get Y-axis', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
      const v = new Vec3(1, 0, 0);
      const result = q.rotateVec3(v);
      expect(result.equals(new Vec3(0, 1, 0))).toBeTruthy();
    });

    it('should rotate Y-axis 90 degrees around X to get Z-axis', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2);
      const v = new Vec3(0, 1, 0);
      const result = q.rotateVec3(v);
      expect(result.equals(new Vec3(0, 0, 1))).toBeTruthy();
    });
  });

  describe('toMatrix3x3', () => {
    it('should return identity matrix for identity quaternion', () => {
      const q = new Quaternion(0, 0, 0, 1);
      const m = q.toMatrix3x3();
      expect(m.get(0, 0)).toBeCloseTo(1);
      expect(m.get(1, 1)).toBeCloseTo(1);
      expect(m.get(2, 2)).toBeCloseTo(1);
      expect(m.get(0, 1)).toBeCloseTo(0);
      expect(m.get(0, 2)).toBeCloseTo(0);
      expect(m.get(1, 0)).toBeCloseTo(0);
    });

    it('should produce same rotation as rotateVec3', () => {
      const q = Quaternion.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);
      const v = new Vec3(1, 0, 0);
      const fromQuat = q.rotateVec3(v);
      const fromMatrix = q.toMatrix3x3().project(v);
      expect(fromQuat.equals(fromMatrix)).toBeTruthy();
    });
  });

  describe('clone', () => {
    it('should create equal but distinct quaternion', () => {
      const q = new Quaternion(1, 2, 3, 4);
      const c = q.clone();
      expect(q.equals(c)).toBeTruthy();
      expect(q === c).toBeFalsy();
    });
  });

  describe('equals', () => {
    it('should return true for identical quaternions', () => {
      const q1 = new Quaternion(1, 2, 3, 4);
      const q2 = new Quaternion(1, 2, 3, 4);
      expect(q1.equals(q2)).toBeTruthy();
    });

    it('should return false for different quaternions', () => {
      const q1 = new Quaternion(1, 2, 3, 4);
      const q2 = new Quaternion(5, 6, 7, 8);
      expect(q1.equals(q2)).toBeFalsy();
    });

    it('should work as static method', () => {
      const q1 = new Quaternion(1, 2, 3, 4);
      const q2 = new Quaternion(1, 2, 3, 4);
      expect(Quaternion.equals(q1, q2)).toBeTruthy();
    });
  });

  describe('toString', () => {
    it('should format components to 3 decimal places', () => {
      const q = new Quaternion(0, 0, 0, 1);
      expect(q.toString()).toEqual('(0.000,0.000,0.000,1.000)');
    });
  });
});
