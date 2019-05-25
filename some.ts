async function chain_some(...args: Array<(...params: any[]) => Promise<any>>): Promise<any> {
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
