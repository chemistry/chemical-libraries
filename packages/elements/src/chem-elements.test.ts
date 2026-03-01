import { ChemElements } from './chem-elements.js';

describe('ChemElements', () => {
  it('should export class', () => {
    expect(ChemElements).toBeDefined();
  });

  describe('getById', () => {
    it('should return information by element ID', () => {
      const element = ChemElements.getById(1);

      expect(element!.symbol).toEqual('H');
    });

    it('should return null for wrong id', () => {
      const element = ChemElements.getById(201);

      expect(element).toBeNull();
    });
  });

  describe('getBySymbol', () => {
    it('should return information by element Name', () => {
      const element = ChemElements.getBySymbol('C');

      expect(element!.name).toEqual('Carbon');
    });

    it('should return null for wrong name', () => {
      const element = ChemElements.getBySymbol('WrongName');

      expect(element).toBeNull();
    });

    it('should work correctly with empty string', () => {
      expect(() => {
        const _element = ChemElements.getBySymbol(undefined as unknown as string);
      }).not.toThrow();
    });

    it('Should find element even it was incorrectly capitalized', () => {
      const element = ChemElements.getBySymbol('CA');

      expect(element).not.toBeNull();
    });
  });

  describe('getAllSymbols', () => {
    it('should return list with > 100 items', () => {
      const elements = ChemElements.getAllSymbols();
      expect(elements.length).toBeGreaterThan(100);
    });
    it('hydrogen should be first in a list', () => {
      const elements = ChemElements.getAllSymbols();
      expect(elements[0]).toEqual('H');
    });
  });

  describe('getAll', () => {
    it('should return list with > 100 items', () => {
      const elements = ChemElements.getAll();
      expect(elements.length).toBeGreaterThan(100);
    });
    it('hydrogen should be first in a list', () => {
      const elements = ChemElements.getAll();
      expect(elements[0].symbol).toEqual('H');
    });
  });

  describe('elements 113-118', () => {
    it('should include Nihonium (113)', () => {
      const el = ChemElements.getById(113);
      expect(el).not.toBeNull();
      expect(el!.symbol).toEqual('Nh');
      expect(el!.name).toEqual('Nihonium');
      expect(el!.mass).toEqual(286);
    });

    it('should include Flerovium (114)', () => {
      const el = ChemElements.getById(114);
      expect(el).not.toBeNull();
      expect(el!.symbol).toEqual('Fl');
      expect(el!.name).toEqual('Flerovium');
    });

    it('should include Oganesson (118)', () => {
      const el = ChemElements.getById(118);
      expect(el).not.toBeNull();
      expect(el!.symbol).toEqual('Og');
      expect(el!.name).toEqual('Oganesson');
      expect(el!.mass).toEqual(294);
    });

    it('should find superheavy elements by symbol', () => {
      expect(ChemElements.getBySymbol('Mc')!.name).toEqual('Moscovium');
      expect(ChemElements.getBySymbol('Lv')!.name).toEqual('Livermorium');
      expect(ChemElements.getBySymbol('Ts')!.name).toEqual('Tennessine');
    });
  });
});
