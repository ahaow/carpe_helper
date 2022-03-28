enum FileCode {
  errorSize = 400,
  errorFormat = 401,
  success = 200,
}
type format = string;

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
const fileFormat = (defaultFileFormat: fileForMatProps) => {
  const { file, formats, sizeMax } = defaultFileFormat;
  if (!file) {
    throw new Error(`请传入file文件信息`);
  } else {
    return new Promise((resolve, reject) => {
      const maxSize = sizeMax * 1048576;
      if (file) {
        if (file?.size > maxSize) {
          reject(FileCode.errorSize);
          return false;
        }
        const num = file.name.lastIndexOf(".");
        const str = file.name.substring(num);
        if (formats.indexOf(str)) {
          reject(FileCode.errorFormat);
          return false;
        }
        resolve(FileCode.success);
      }
    });
  }
};

export default fileFormat
