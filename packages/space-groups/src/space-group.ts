import { SpaceGroupInfo, SpaceGroupsData } from "./space-group-data";

export enum CrystalSystem {
    Triclinic = "Triclinic",
    Monoclinic = "Monoclinic",
    Orthorhombic = "Orthorhombic",
    Tetragonal = "Tetragonal",
    Trigonal = "Trigonal",
    Hexagonal = "Hexagonal",
    Cubic = "Cubic",
}

export enum UnitCellCentring {
    P = "P", // Primitive
    A = "A", // Base Centered on A faces only
    B = "B", // Base Centered on B faces only
    C = "C", // Base Centered on C faces only
    I = "I", // Body Centered
    F = "F", // Face Centered
    R = "R", // Rhombohedral
}

export enum UnitCellCentringType {
    Primitive = "Primitive",
    BaseCentered = "BaseCentered",
    BodyCentered = "BodyCentered",
    FaceCentered = " FaceCentered",
}

function replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replace);
}

export class SpaceGroup {

    public static getById(id: number): SpaceGroupInfo {
        for (const sg of SpaceGroupsData) {
            if (sg.id === id) {
                return { ...sg, s: sg.s.slice(0) };
            }
        }

        return null;
    }

    public static getByHMName(hmName: string): SpaceGroupInfo {

        hmName = replaceAll(hmName, " ", "");
        // -P 1 (1/2*x+1/2*y,1/2*x-1/2*y,-z)

        const regEx = /^([^\(\)]+)\(.+\).*$/;
        const match = regEx.exec(hmName);
        if (match) {
            hmName = match[1];
        }

        hmName = hmName.trim().toUpperCase();

        for (const sg of SpaceGroupsData) {
            if (replaceAll(sg.hm, " ", "").toUpperCase() === hmName) {
                return { ...sg, s: sg.s.slice(0) };
            }
        }

        return null;
    }

    public static getByHallName(hallName: string): SpaceGroupInfo {

        let hall = replaceAll(hallName, " ", "");

        const regEx = /^([^\(\)]+)\(.+\).*$/;
        const match = regEx.exec(hall);
        if (match) {
            hall = match[1];
        }
        hall = hall.toUpperCase();

        for (const sg of SpaceGroupsData) {
            if (replaceAll(sg.hs, " ", "").toUpperCase() === hall) {
                return { ...sg, s: sg.s.slice(0) };
            }
        }

        return null;
    }

    public static getCrystalSystem(sg: SpaceGroupInfo): CrystalSystem {
        if (sg.id >= 1 && sg.id <= 2) {
            return CrystalSystem.Triclinic;
        }
        if (sg.id >= 3 && sg.id <= 15) {
            return CrystalSystem.Monoclinic;
        }
        if (sg.id >= 16 && sg.id <= 74) {
            return CrystalSystem.Orthorhombic;
        }
        if (sg.id >= 75 && sg.id <= 142) {
            return CrystalSystem.Tetragonal;
        }
        if (sg.id >= 143 && sg.id <= 167) {
            return CrystalSystem.Trigonal;
        }
        if (sg.id >= 168 && sg.id <= 194) {
            return CrystalSystem.Hexagonal;
        }
        if (sg.id >= 195 && sg.id <= 230) {
            return CrystalSystem.Cubic;
        }
        return null;
    }

    public static getUnitCellCentring(sg: SpaceGroupInfo): UnitCellCentring {
        const hermannMauguinName = sg.hm || "";
        const laticeType = hermannMauguinName[0];

        if (laticeType === "P") {
            return UnitCellCentring.P;
        }
        if (laticeType === "A") {
            return UnitCellCentring.A;
        }
        if (laticeType === "B") {
            return UnitCellCentring.B;
        }
        if (laticeType === "C") {
            return UnitCellCentring.C;
        }
        if (laticeType === "I") {
            return UnitCellCentring.I;
        }
        if (laticeType === "F") {
            return UnitCellCentring.F;
        }
        if (laticeType === "R") {
            return UnitCellCentring.R;
        }

        return null;
    }

    public static getCentringType(sg: SpaceGroupInfo): UnitCellCentringType {
      const ucc = SpaceGroup.getUnitCellCentring(sg);
      if (ucc === UnitCellCentring.P) {
          return UnitCellCentringType.Primitive;
      }
      if (
          ucc === UnitCellCentring.A ||
          ucc === UnitCellCentring.B ||
          ucc === UnitCellCentring.C
      ) {
          return UnitCellCentringType.BaseCentered;
      }
      if (ucc === UnitCellCentring.F) {
          return UnitCellCentringType.FaceCentered;
      }
      if (ucc === UnitCellCentring.I) {
          return UnitCellCentringType.BodyCentered;
      }
      if (ucc === UnitCellCentring.R) {
          return UnitCellCentringType.Primitive;
      }

      return null;
    }

    public static getUniqueSpaceGroupsList(): Array<{id: number, hm: string, hs: string}> {
        const resList: Array<{id: number, hm: string, hs: string}>  = [];
        const isSGPushed = new Array(230);

        const lastSgId = -1;
        for (const sgInfo of SpaceGroupsData) {
            const sgId = sgInfo.id;
            if (!isSGPushed[sgId]) {
                isSGPushed[sgId] = true;
                resList.push({
                    id: sgInfo.id,
                    hm: sgInfo.hm,
                    hs: sgInfo.hs,
                });
            }
        }
        return resList;
    }
}
