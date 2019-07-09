"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function chain(pre, ...args) {
    if (args.length > 0) {
        const clone = [...args];
        const fun = clone.pop();
        if (!fun) {
            return pre;
        }
        const val = await fun(pre);
        return chain(val, ...clone);
    }
    else {
        return pre;
    }
}
exports.chain = chain;
function reduceRight(arr, callback, initialValue) {
    const funcs = arr.map((it, i, _arr) => {
        return async (p) => {
            return await callback(p, it, i, _arr);
        };
    });
    return chain(initialValue, ...funcs);
}
exports.default = reduceRight;
