"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function chain_some(...args) {
    if (args.length > 0) {
        const fun = args.shift();
        if (!fun) {
            return false;
        }
        const ret = await fun();
        if (!!ret) {
            return true;
        }
        return await chain_some(...args);
    }
    else {
        return false;
    }
}
function some(arr, callback) {
    const funcs = arr.map((it, i, _arr) => {
        return async () => {
            return await callback(it, i, _arr);
        };
    });
    return chain_some(...funcs);
}
exports.default = some;
