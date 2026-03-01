import { ChemElementData, ChemElementInfo } from './chem-elements-data';

export class ChemElements {
  public static getById(id: number): ChemElementInfo | null {
    for (const el of ChemElementData) {
      if (el.id === id) {
        return el;
      }
    }
    return null;
  }

  public static getBySymbol(symbol: string): ChemElementInfo | null {
    const str = (symbol || '').replace(/[^a-z]/gim, '').toLowerCase();
    const f = str.charAt(0).toUpperCase() + str.slice(1);

    for (const el of ChemElementData) {
      if (el.symbol === f) {
        return el;
      }
    }
    return null;
  }

  public static getAll(): ChemElementInfo[] {
    return ChemElementData.filter((el) => {
      return el.symbol !== 'Q' && el.symbol !== 'D';
    });
  }

  public static getAllSymbols(): string[] {
    return ChemElements.getAll().map((el) => {
      return el.symbol;
    });
  }
}
