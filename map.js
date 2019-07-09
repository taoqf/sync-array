"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function chain_map(...args) {
    if (args.length > 0) {
        const [fun, ...other] = args;
        if (!fun) {
            return [];
        }
        const ret = await fun();
        return [ret].concat(await chain_map(...other));
    }
    else {
        return [];
    }
}
function map(arr, callback) {
    const funcs = arr.map((it, i, _arr) => {
        return async () => {
            return await callback(it, i, _arr);
        };
    });
    return chain_map(...funcs);
}
exports.default = map;
