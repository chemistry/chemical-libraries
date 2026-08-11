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
    it('should put hydrogen first when it is not the first key', () => {
      const res = Formula.convertToString({ O: 1, H: 2 });
      expect(res).toEqual('H2O');
    });
    it('should put carbon first when it is not the first key', () => {
      const res = Formula.convertToString({ O: 2, C: 1 });
      expect(res).toEqual('CO2');
    });
    it('should order glucose in Hill notation', () => {
      const res = Formula.convertToString({ O: 6, C: 6, H: 12 });
      expect(res).toEqual('C6H12O6');
    });
    it('should order sulfuric acid as H2O4S', () => {
      const res = Formula.convertToString({ S: 1, H: 2, O: 4 });
      expect(res).toEqual('H2O4S');
    });
    it('should order carbon-free formula alphabetically', () => {
      const res = Formula.convertToString({ O: 1, N: 2 });
      expect(res).toEqual('N2O');
    });
    it('should order permanganate alphabetically', () => {
      const res = Formula.convertToString({ K: 1, Mn: 1, O: 4 });
      expect(res).toEqual('KMnO4');
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

    it('should parse multi-digit counts', () => {
      const res = Formula.parse('C60');
      expect(res).toEqual({ C: 60 });
    });

    it('should prefer two-letter elements over single-letter ones', () => {
      const res = Formula.parse('CoO');
      expect(res).toEqual({ Co: 1, O: 1 });
    });

    it('should sum repeated elements of CH3COOH', () => {
      const res = Formula.parse('CH3COOH');
      expect(res).toEqual({ C: 2, H: 4, O: 2 });
    });
  });
});
