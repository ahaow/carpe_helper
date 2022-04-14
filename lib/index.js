"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloneDeep_1 = __importDefault(require("./cloneDeep"));
const fileFormat_1 = __importDefault(require("./fileFormat"));
const dataType_1 = __importDefault(require("./dataType"));
const debounce_1 = __importDefault(require("./debounce"));
const throttle_1 = __importDefault(require("./throttle"));
const lib = {
    cloneDeep: cloneDeep_1.default,
    fileFormat: fileFormat_1.default,
    dataType: dataType_1.default,
    debounce: debounce_1.default,
    throttle: throttle_1.default
};
exports.default = lib;
