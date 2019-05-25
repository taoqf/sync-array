async function chain_every(...args: Array<(...params: any[]) => Promise<unknown>>): Promise<boolean> {
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
	} else {
		return true;
	}
}

export default function every<T>(arr: T[], callback: (it: T, i?: number, arr?: T[]) => boolean | Promise<boolean>) {
	const funcs = arr.map((it, i, _arr) => {
		return async () => {
			return await callback(it, i, _arr);
		};
	});
	return chain_every(...funcs);
}
