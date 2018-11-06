import { SpaceGroupsData } from "./space-group-data";

export class SpaceGroup {

    public static getById(id: number): SpaceGroup {

        for (const sg of SpaceGroupsData) {
            if (parseInt(sg.id, 10) === id) {
                return new SpaceGroup(sg);
            }
        }

        return null;
    }

    public static getByHMName(hmName: string): SpaceGroup {

        const replaceAll = (str: string, find: string, replace: string) => {
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replace);
        };

        hmName = replaceAll(hmName, " ", "");
        // -P 1 (1/2*x+1/2*y,1/2*x-1/2*y,-z)

        const regEx = /^([^\(\)]+)\(.+\).*$/;
        const match = regEx.exec(hmName);
        if (match) {
            hmName = match[1];
        }

        hmName = hmName.trim();

        for (const sg of SpaceGroupsData) {
            if (replaceAll(sg.hm, " ", "").toUpperCase() === hmName.toUpperCase()) {
                return new SpaceGroup(sg);
            }
        }

        return null;
    }

    public static getByHallName(hallName: string): SpaceGroup {

        const replaceAll = (str: string, find: string, replace: string) => {
            return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replace);
        };
        let hall = replaceAll(hallName, " ", "");

        const regEx = /^([^\(\)]+)\(.+\).*$/;
        const match = regEx.exec(hall);
        if (match) {
            hall = match[1];
        }

        for (const sg of SpaceGroupsData) {
            if (replaceAll(sg.hs, " ", "").toUpperCase() === hall.toUpperCase()) {
                return new SpaceGroup(sg);
            }
        }

        return null;
    }

    public readonly id: number;

    public readonly hermannMauguin: string;

    public readonly hallSymbol: string;

    public readonly symetryList: string[];

    public readonly representativeOperations: number;

    constructor(data: {
        id: string, hm: string, hs: string, s: string[], o: string,
    }) {
        this.id = parseInt(data.id, 10);
        this.hermannMauguin = data.hm;
        this.hallSymbol = data.hs;
        this.symetryList = data.s;
        this.representativeOperations = parseInt(data.o, 10);
    }

    public getCrystalSystem() {

        if (this.id >= 1 && this.id <= 2) {
            return "Triclinic";
        }
        if (this.id >= 3 && this.id <= 15) {
            return "Monoclinic";
        }
        if (this.id >= 16 && this.id <= 74) {
            return "Orthorhombic";
        }
        if (this.id >= 75 && this.id <= 142) {
            return "Tetragonal";
        }
        if (this.id >= 143 && this.id <= 167) {
            return "Trigonal";
        }
        if (this.id >= 168 && this.id <= 194) {
            return "Hexagonal";
        }
        if (this.id >= 195 && this.id <= 230) {
            return "Cubic";
        }
        throw new Error("Error in Space Group id");
    }
}
