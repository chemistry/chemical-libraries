import { Formula } from './formula.js';

describe('Formula', () => {
  it('should be defined', () => {
    expect(Formula).toBeDefined();
  });

  describe('convertToWeight', () => {
    it('should return 0 for empty composition', () => {
      const res = Formula.convertToWeight({});
      expect(res).toEqual(0);
    });
    it('should calculate weight for H2O', () => {
      const res = Formula.convertToWeight({ H: 2, O: 1 });
      expect(res).toEqual(18.015);
    });
    it('should calculate weight for ethanol C2H6O', () => {
      const res = Formula.convertToWeight({ C: 2, H: 6, O: 1 });
      expect(res).toEqual(46.068);
    });
    it('should ignore unknown elements', () => {
      const res = Formula.convertToWeight({ H: 2, O: 1, X: 10 });
      expect(res).toEqual(18.015);
    });
  });

  describe('convertToString', () => {
    it('should return empty object for empty string', () => {
      const res = Formula.convertToString({});
      expect(res).toEqual('');
    });
    it('should calculate H2O case', () => {
      const res = Formula.convertToString({ H: 2, O: 1 });
      expect(res).toEqual('H2O');
    });
    it('should remove unknown elements from object', () => {
      const res = Formula.convertToString({ H: 2, O: 1, X: 10 });
      expect(res).toEqual('H2O');
    });
  });

  describe('parse', () => {
    it('should parse empty string', () => {
      const res = Formula.parse('');
      expect(res).toEqual({});
    });
    it('should parse H2O', () => {
      const res = Formula.parse('H2O');
      expect(res).toEqual({ H: 2, O: 1 });
    });
    it('should parse C2H5OH', () => {
      const res = Formula.parse('C2H5OH');
      expect(res).toEqual({ C: 2, H: 6, O: 1 });
    });

    it('should ignore spaces', () => {
      const res = Formula.parse('C2H5 OH');
      expect(res).toEqual({ C: 2, H: 6, O: 1 });
    });

    it('should ignore unknown elements', () => {
      const res = Formula.parse('C2H5 OH X3');
      expect(res).toEqual({ C: 2, H: 6, O: 1 });
    });
  });
});
