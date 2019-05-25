"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function chain(...args) {
    if (args.length > 0) {
        const fun = args.shift();
        if (!fun) {
            return [];
        }
        await fun();
        return await chain(...args);
    }
}
exports.chain = chain;
function forEach(arr, callback) {
    const funcs = arr.map((it, i, _arr) => {
        return async () => {
            await callback(it, i, _arr);
        };
    });
    return chain(...funcs);
}
exports.default = forEach;