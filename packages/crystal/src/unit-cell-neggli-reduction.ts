import {
  UnitCellParams,
} from "./unit-cell";
/*
  Unit cell reduction algo were implemented based on following references
    1) Krivy, Gruber; Acta Cryst. (1976). A32, 297 (Core algo implementation)
    2) O.V. Dolomanov & others; J. Appl. Cryst. (2003). 36, 955  (Example of program)
    3) R.W. Grosse-Kunstleve & others; Acta Cryst. A (2004), A60, 1-6 (Modification to algo were taken into account)
*/
interface  CellNiggliForm {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
}
export class UnitCellNeggliReduction {

  public static reduceUnitCell({ a, b, c, alpha, beta, gamma }: UnitCellParams): UnitCellParams {

          let cell: CellNiggliForm = {
              A: a * a,
              B: b * b,
              C: c * c,
              D: 2 * b * c * Math.cos(alpha * Math.PI / 180),
              E: 2 * a * c * Math.cos(beta * Math.PI / 180),
              F: 2 * a * b * Math.cos(gamma * Math.PI / 180),
          };

          cell = this.reduceCellFromNeggli(cell);

          const aF = Math.sqrt(cell.A);
          const bF = Math.sqrt(cell.B);
          const cF = Math.sqrt(cell.C);

          return {
              a: aF,
              b: bF,
              c: cF,
              alpha: (Math.acos(cell.D / ( 2 * bF * cF)) * 180 / Math.PI),
              beta: (Math.acos(cell.E / ( 2 * aF * cF)) * 180 / Math.PI),
              gamma: (Math.acos(cell.F / ( 2 * aF * bF)) * 180 / Math.PI),
          };
      }

      private static reduceCellFromNeggli(inCell: CellNiggliForm): CellNiggliForm {

          const cell = inCell;
          const MAX_ITER = 100;
          let i = 0;
          while (i < MAX_ITER)  {
              i++;
              if (this.step1(cell)) {
                  // console.info('step #1 took place', cell);
              }

              if (this.step2(cell)) {
                  // console.info('step #2 took place:', cell);
                  continue;
              }

              if (this.step3_4(cell)) {
                  // console.info('step #3_4 took place', cell);
              }

              if (this.step5(cell)) {
                  // console.info('step #5 took place', cell);
                  continue;
              }

              if (this.step6(cell)) {
                  // console.info('step #6 tool place', cell);
                  continue;
              }

              if (this.step7(cell)) {
                  // console.info('step #7 tool place', cell);
                  continue;
              }

              if (this.step8(cell)) {
                  // console.info('step #8 tool place', cell);
                  continue;
              }

              break;
          }
          // if (i > 98 ) {
          // Sometimes (< 1%) it goes to infinite loop,
          // e.g. when monoclinic angle close to 90
          // in that case jumping between 3_4 and 7 case
          // console.log('MAX ITER REACHED', uc);
          // }
          return cell;
      }

      private static step1(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;
          if (
              isGrater(A, B) ||
              (isEquals(A, B) && isGrater(Math.abs(D), Math.abs(E)))
          ) {
              // (A,D) <-> (B,E)
              cell.A = B;
              cell.B = A;
              cell.D = E;
              cell.E = D;
              return true;
          }
          return false;
      }

      private static step2(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;
          if (
              isGrater(B, C) ||
              (isEquals(B, C) && isGrater(Math.abs(E), Math.abs(F)))
          ) {
              // (B,E) <-> (C,F)
              cell.B = C;
              cell.C = B;
              cell.E = F;
              cell.F = E;
              return true;
          }
          return false;
      }

      private static step3_4(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;
          if (
              (D > 0 && E > 0 && F  > 0) ||
              (D > 0 && E < 0 && F  < 0) ||
              (D < 0 && E > 0 && F  < 0) ||
              (D < 0 && E < 0 && F  > 0)
          ) {
              cell.D = Math.abs(D);
              cell.E = Math.abs(E);
              cell.F = Math.abs(F);
          } else {
              cell.D = -1 * Math.abs(D);
              cell.E = -1 * Math.abs(E);
              cell.F = -1 * Math.abs(F);
          }

          return true;
      }

      private static step5(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;
          if (
                isGrater(Math.abs(D), B) ||
                (isEquals(D,  B) && isNegative(E + E - F)) ||
                (isEquals(D, -B) && isNegative(F))
          ) {
              if (D > 0) {
                  cell.C += B - D;
                  cell.D -= B + B;
                  cell.E -= F;
              } else {
                  cell.C += B + D;
                  cell.D += B + B;
                  cell.E += F;
              }
              return true;
          }
          return false;
      }

      private static step6(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;

          if (
                isGrater(Math.abs(E), A) ||
                (isEquals(E,  A) && isNegative(D + D - F)) ||
                (isEquals(E, -A) && isNegative(F))
          ) {
              if (E > 0) {
                  cell.C += A - E;
                  cell.D -= F;
                  cell.E -= A + A;
              } else {
                  cell.C += A + E;
                  cell.D += F;
                  cell.E += A + A;
              }
              return true;
          }

          return false;
      }

      private static step7(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;
          if (
                isGrater(Math.abs(F), A) ||
                (isEquals(F,  A) && isNegative(D + D - E)) ||
                (isEquals(F, -A) && isNegative(E))
          ) {
              if (F > 0) {
                  cell.B += A - F;
                  cell.D -= E;
                  cell.F -= A + A;
              } else {
                  cell.B += A + F;
                  cell.D += E;
                  cell.F += A + A;
              }
              return true;
          }
          return false;
      }

      private static step8(cell: CellNiggliForm): boolean {
          const { A, B, C, D, E, F } = cell;
          if (
              isNegative(D + E + F + A + B)  ||
              (isEquals(D + E + F + A + B, 0) && isGrater(A + A + E + E + F, 0))
          ) {
              cell.C += A + B + D + E + F;
              cell.D += B + B + F;
              cell.E += A + A + F;
              return true;
          }

          return false;
      }
}
/*
    Following numerically stable comparisons implemented based
    on methodoloy described by Grosse-Kunstleve
*/
const EPSILON = 10E-5;

function isEquals(A: number, B: number) {
    const diff = A - B;
    return (Math.abs(diff) < EPSILON);
}

function isGrater(A: number, B: number) {
    return (A - B) > EPSILON;
}

function isNegative(A: number) {
    return A < EPSILON;
}
