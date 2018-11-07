export const EPSILON = 0.00000001;

export interface IEquatable<T> {
    equals(other: T): boolean;
}

export interface ICloneable<T> {
    clone(): T;
}

/* tslint:disable:interface-name */
export type JMolAtom = Array<[number, number, number, string] | [number, number, number, string, boolean, string]>;
export type JMolBond = Array<[number, number, number]>;

export interface JMol {
    atoms: JMolAtom;
    bonds: JMolBond;
    id: string;
    title: string;
}

export interface JNMolAtom {
    x: number;
    y: number;
    z: number;
    type: string;
}

export interface JNMolBond {
    atom1: string;
    atom2: string;
    order: number;
}

export interface JNMol {
    id: string;
    title: string;
    atoms: {
        [id: string]: JNMolAtom,
    };
    bonds: {
        [id: string]: JNMolBond,
    };
}
