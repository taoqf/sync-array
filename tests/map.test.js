import test from 'ava';

import map from '../map';

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}


test('sync-array.map', async (t) => {
	let v = 1;
	async function fun1() {
		await sleep(1000);
		v += 1;
		return 1;
	}

	async function fun2() {
		await sleep(500);
		v *= 2;
		return 2;
	}

	async function fun3() {
		await sleep(100);
		v -= 3;
		return 3;
	}
	const funcs = [fun1, fun2, fun3];

	const ret = await map(funcs, (fun) => {
		return fun();
	});
	t.deepEqual(ret, [1, 2, 3]);
	t.is(v, 1);	// (1+1)*2-3=1; not (1-3)*2+1=-3
});
