import cloneDeep from './cloneDeep';
import dataType from './dataType';
import debounce from './debounce';
import throttle from './throttle';
declare const lib: {
    cloneDeep: typeof cloneDeep;
    fileFormat: (defaultFileFormat: import("./fileFormat").fileForMatProps) => Promise<unknown>;
    dataType: typeof dataType;
    debounce: typeof debounce;
    throttle: typeof throttle;
};
export default lib;
