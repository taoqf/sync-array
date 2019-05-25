"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const every_1 = __importDefault(require("./every"));
const foreach_1 = __importDefault(require("./foreach"));
const map_1 = __importDefault(require("./map"));
const some_1 = __importDefault(require("./some"));
exports.default = {
    every: every_1.default,
    forEach: foreach_1.default,
    map: map_1.default,
    some: some_1.default
};
