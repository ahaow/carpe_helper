declare function asyncTo<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]>;
export default asyncTo;
