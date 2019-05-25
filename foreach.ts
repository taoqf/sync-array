export async function chain(...args: Array<(...params: any[]) => Promise<any>>): Promise<any> {
	if (args.length > 0) {
		const fun = args.shift();
		if (!fun) {
			return [];
		}

		await fun();
		return await chain(...args);
	}
}

export default function forEach<T>(arr: T[], callback: (it: T, i?: number, arr?: T[]) => unknown) {
	const funcs = arr.map((it, i, _arr) => {
		return async () => {
			await callback(it, i, _arr);
		};
	});
	return chain(...funcs);
}
