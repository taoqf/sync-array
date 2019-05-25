import test from 'ava';

import forEach from '../foreach';

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}


test('sync-array.forEach', async (t) => {
	let v = 1;
	async function fun1() {
		await sleep(1000);
		v += 1;
	}

	async function fun2() {
		await sleep(500);
		v *= 2;
	}

	async function fun3() {
		await sleep(100);
		v -= 3;
	}
	const funcs = [fun1, fun2, fun3];

	await forEach(funcs, (fun) => {
		return fun();
	});
	t.is(v, 1);	// (1+1)*2-3=1; not (1-3)*2+1=-3
});
