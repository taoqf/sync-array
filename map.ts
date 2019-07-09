async function chain_map<T>(...args: Array<() => Promise<T>>): Promise<T[]> {
	if (args.length > 0) {
		const [fun, ...other] = args;
		if (!fun) {
			return [];
		}

		const ret = await fun();
		return [ret].concat(await chain_map(...other));
	} else {
		return [];
	}
}

export default function map<T, P>(arr: T[], callback: (it: T, i?: number, arr?: T[]) => P | Promise<P>) {
	const funcs = arr.map((it, i, _arr) => {
		return async () => {
			return await callback(it, i, _arr);
		};
	});
	return chain_map(...funcs);
}
