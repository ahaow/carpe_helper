declare enum FileCode {
    errorSize = 400,
    errorFormat = 401,
    success = 200
}
declare type format = string;
interface fileForMatProp {
    file: File | null;
    formats: Array<format>;
    sizeMax: number;
}
declare const defaultFileFormat: fileForMatProp;
/**
 *
 * @param defaultFileFormat
 * @returns
 */
declare const fileFormat: (defaultFileFormat: fileForMatProp) => Promise<unknown>;
