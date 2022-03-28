declare type format = string;
export interface fileForMatProps {
    file: File | null;
    formats: Array<format>;
    sizeMax: number;
}
/**
 *
 * @param defaultFileFormat
 * @returns
 */
declare const fileFormat: (defaultFileFormat: fileForMatProps) => Promise<unknown>;
export default fileFormat;
