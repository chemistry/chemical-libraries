import { ChemElements } from '@chemistry/elements';

const ELEMENTS: string[] = ChemElements.getAllSymbols();
const ELEMENTS_LIST = ELEMENTS.slice(0)
  .sort((a, b) => b.length - a.length)
  .join('|');
const FORMULA_QUERY_REGEX_STR = `(${ELEMENTS_LIST}){1,1}([*0-9]{0,20})`;

export interface ChemComposition {
  [element: string]: number;
}

export class Formula {
  public static parse(formula: string): ChemComposition {
    let found: RegExpExecArray | null;
    const formulaObj: ChemComposition = {};
    const FORMULA_QUERY_REGEX = new RegExp(FORMULA_QUERY_REGEX_STR, 'g');

    while ((found = FORMULA_QUERY_REGEX.exec(formula))) {
      const element = found[1];
      const count = found[2] === '' ? 1 : parseFloat(found[2]);

      if (formulaObj[element]) {
        formulaObj[element] = formulaObj[element] + count;
      } else {
        formulaObj[element] = count;
      }
    }

    return formulaObj;
  }

  public static convertToWeight(formula: ChemComposition): number {
    let weight = 0;
    for (const element of Object.keys(formula)) {
      const info = ChemElements.getBySymbol(element);
      if (info) {
        weight += formula[element] * info.mass;
      }
    }
    return Math.round(weight * 1000) / 1000;
  }

  public static convertToString(formula: ChemComposition): string {
    const formulaDataArray = Object.keys(formula)
      .filter((key) => {
        return ELEMENTS.includes(key);
      })
      .map((key) => {
        return {
          element: key,
          count: formula[key],
        };
      });

    // sorted formula
    formulaDataArray.sort((a, b) => {
      return elementCompare(a.element, b.element);
    });

    return formulaDataArray
      .map((item) => {
        return item.element + (item.count === 1 ? '' : item.count);
      })
      .join('');
  }
}

function elementCompare(a: string, b: string): number {
  if (a === 'C' || a === 'H' || b === 'C' || b === 'H') {
    const a1 = ['H', 'C'].indexOf(a); // C => 2, H=> 1, ? =>-1
    const b1 = ['H', 'C'].indexOf(b); // C => 2, H=> 1, ? =>-1

    if (a1 === b1) {
      return 0;
    }
    return a1 > b1 ? -1 : 1;
  }

  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}
