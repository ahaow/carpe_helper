"use strict";
var FileCode;
(function (FileCode) {
    FileCode[FileCode["errorSize"] = 400] = "errorSize";
    FileCode[FileCode["errorFormat"] = 401] = "errorFormat";
    FileCode[FileCode["success"] = 200] = "success";
})(FileCode || (FileCode = {}));
const defaultFileFormat = {
    file: null,
    formats: [],
    sizeMax: 50,
};
/**
 *
 * @param defaultFileFormat
 * @returns
 */
const fileFormat = (defaultFileFormat) => {
    const { file, formats, sizeMax } = defaultFileFormat;
    if (!file) {
        throw new Error(`请传入file文件信息`);
    }
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
};
