import asyncTo from './asyncTo';
import cloneDeep from './cloneDeep';
import dataType from './dataType';
declare const lib: {
    asyncTo: typeof asyncTo;
    cloneDeep: typeof cloneDeep;
    fileFormat: (defaultFileFormat: import("./fileFormat").fileForMatProps) => Promise<unknown>;
    dataType: typeof dataType;
};
export default lib;
