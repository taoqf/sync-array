import test from 'ava';

import every from '../every';

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

test('sync-array.every some', async (t) => {
	let v = 1;
	async function fun1() {
		await sleep(1000);
		v += 1;
		return true;
	}

	async function fun2() {
		await sleep(500);
		v *= 2;
		return false;
	}

	async function fun3() {
		await sleep(100);
		v -= 3;
		return true;
	}
	const funcs = [fun1, fun2, fun3];

	const ret = await every(funcs, (fun) => {
		return fun();
	});
	t.is(funcs.length, 3);
	t.is(ret, false);
	t.is(v, 4);	// (1+1)*2=1; not (1-3)*2=-4
});

test('sync-array.every none', async (t) => {
	let v = 1;
	async function fun1() {
		await sleep(1000);
		v += 1;
		return false;
	}

	async function fun2() {
		await sleep(500);
		v *= 2;
		return false;
	}

	async function fun3() {
		await sleep(100);
		v -= 3;
		return false;
	}
	const funcs = [fun1, fun2, fun3];

	const ret = await every(funcs, (fun) => {
		return fun();
	});
	t.is(ret, false);
	t.is(v, 2);	// (1+1)=2; not (1-3)=-2
});

test('sync-array.every every', async (t) => {
	let v = 1;
	async function fun1() {
		await sleep(1000);
		v += 1;
		return true;
	}

	async function fun2() {
		await sleep(500);
		v *= 2;
		return true;
	}

	async function fun3() {
		await sleep(100);
		v -= 3;
		return true;
	}
	const funcs = [fun1, fun2, fun3];

	const ret = await every(funcs, (fun) => {
		return fun();
	});
	t.is(ret, true);
	t.is(v, 1);	// (1+1)*2-3=1; not (1-3)*2+1=-3
});
