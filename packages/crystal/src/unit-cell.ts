import {
    UnitCellNeggliReduction,
} from "./unit-cell-neggli-reduction";

export interface UnitCellParams {
    a: number;
    b: number;
    c: number;
    alpha: number;
    beta: number;
    gamma: number;
}

export class UnitCell {

    public static getVolume({ a, b, c, alpha, beta, gamma }: UnitCellParams): number {
        const pAlpha = alpha * Math.PI / 180;
        const pBeta  = beta  * Math.PI / 180;
        const pGamma = gamma * Math.PI / 180;
        const v = (Math.sqrt(1 - Math.cos(pAlpha) * Math.cos(pAlpha) - Math.cos(pBeta) * Math.cos(pBeta)
          - Math.cos(pGamma) * Math.cos(pGamma) + 2 * Math.cos(pAlpha) * Math.cos(pBeta) * Math.cos(pGamma)));

        return v * a * b * c;
    }

    public static getOrthMatrix({ a, b, c, alpha, beta, gamma }: UnitCellParams): number[] {
        const pAlpha = alpha * Math.PI / 180;
        const pBeta  = beta  * Math.PI / 180;
        const pGamma = gamma * Math.PI / 180;
        const v = (Math.sqrt(1 - Math.cos(pAlpha) * Math.cos(pAlpha) - Math.cos(pBeta) * Math.cos(pBeta)
          - Math.cos(pGamma) * Math.cos(pGamma) + 2 * Math.cos(pAlpha) * Math.cos(pBeta) * Math.cos(pGamma)));

        const aa = (Math.sin(pAlpha) / a / v);
        const bb = (Math.sin(pBeta) / b / v);
        const cc = (Math.sin(pGamma) / c / v);
        const alphaa = (Math.acos((Math.cos(pBeta) * Math.cos(pGamma)
          - Math.cos(pAlpha)) / Math.sin(pBeta) / Math.sin(pGamma)));
        const betaa = (Math.acos((Math.cos(pAlpha) * Math.cos(pGamma)
          - Math.cos(pBeta)) / Math.sin(pAlpha) / Math.sin(pGamma)));
        const gammaa = (Math.acos((Math.cos(pAlpha) * Math.cos(pBeta)
          - Math.cos(pGamma)) / Math.sin(pAlpha) / Math.sin(pBeta)));

        return [
              a, b * Math.cos(pGamma), c * Math.cos(pBeta),
              0, b * Math.sin(pGamma), -c * Math.sin(pBeta) * Math.cos(alphaa),
              0, 0, 1 / cc,
          ];
    }

     public static reduceUnitCell({ a, b, c, alpha, beta, gamma }: UnitCellParams): UnitCellParams {
        return UnitCellNeggliReduction.reduceUnitCell({ a, b, c, alpha, beta, gamma });
     }
}
