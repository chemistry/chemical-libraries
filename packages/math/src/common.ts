export const EPSILON = 0.00000001;

export interface IEquatable<T> {
    equal(other: T): boolean;
}

export interface IClonable<T> {
    clone(): T;
}
