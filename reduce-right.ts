export async function chain<T>(pre: T, ...args: Array<(previousValue: T) => Promise<T>>): Promise<T> {
	if (args.length > 0) {
		const clone = [...args];
		const fun = clone.pop();
		if (!fun) {
			return pre;
		}

		const val = await fun(pre);
		return chain(val, ...clone);
	} else {
		return pre;
	}
}

export default function reduceRight<T, U>(arr: T[], callback: ((previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U | Promise<U>), initialValue: U): Promise<U> {
	const funcs = arr.map((it, i, _arr) => {
		return async (p: U) => {
			return await callback(p, it, i, _arr);
		};
	});
	return chain(initialValue, ...funcs);
}
