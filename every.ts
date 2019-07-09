async function chain_every(...args: Array<() => Promise<boolean>>): Promise<boolean> {
	if (args.length > 0) {
		const [fun, ...rest] = args;
		if (!fun) {
			return true;
		}

		const ret = await fun();
		if (!ret) {
			return false;
		}
		return await chain_every(...rest);
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
