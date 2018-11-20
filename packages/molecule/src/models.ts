export enum MoleculeDataFormat {
    jmol = "jmol",
    jnmol = "jnmol",
}

export enum displayLabelsType {
    dispalyAllLabels = "dispalyAllLabels",
    hideAllCarbonLabels = "hideAllCarbonLabels",
    hideNonTerminalCarbonLabels = "hideNonTerminalCarbonLabels",
}

export interface SvgExportOptions {
    colorElements?: boolean;
    bondLength?: number;
    bondWidth?: number;
    bondSpacing?: number;
    bondShorerning?: number;
    fontFamily?: string;
    fontSize?: number;
    displayHydrogens?: boolean;
    displayLabels?: displayLabelsType;
}

export const defaultSvgOptions: SvgExportOptions  = {
    colorElements: true,
    bondLength: 40,
    bondWidth: 1,
    bondSpacing: 0.08,
    bondShorerning: 0,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 14,
    displayHydrogens: false,
    displayLabels: displayLabelsType.hideNonTerminalCarbonLabels,
};
