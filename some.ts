async function chain_some(...args: Array<() => Promise<boolean>>): Promise<boolean> {
	if (args.length > 0) {
		const [fun, ...other] = args;
		if (!fun) {
			return false;
		}

		const ret = await fun();
		if (!!ret) {
			return true;
		}
		return await chain_some(...other);
	} else {
		return false;
	}
}

export default function some<T>(arr: T[], callback: (it: T, i?: number, arr?: T[]) => boolean | Promise<boolean>) {
	const funcs = arr.map((it, i, _arr) => {
		return async () => {
			return await callback(it, i, _arr);
		};
	});
	return chain_some(...funcs);
}
