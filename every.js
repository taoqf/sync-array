"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function chain_every(...args) {
    if (args.length > 0) {
        const fun = args.shift();
        if (!fun) {
            return true;
        }
        const ret = await fun();
        if (!ret) {
            return false;
        }
        return await chain_every(...args);
    }
    else {
        return true;
    }
}
function every(arr, callback) {
    const funcs = arr.map((it, i, _arr) => {
        return async () => {
            return await callback(it, i, _arr);
        };
    });
    return chain_every(...funcs);
}
exports.default = every;
