import test from 'ava';

import some from '../some';

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

test('sync-array.some some', async (t) => {
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

	const ret = await some(funcs, (fun) => {
		return fun();
	});
	t.is(ret, true);
	t.is(v, 2);	// (1+1); not (1-3)=-2
});

test('sync-array.some none', async (t) => {
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

	const ret = await some(funcs, (fun) => {
		return fun();
	});
	t.is(ret, false);
	t.is(v, 1);	// (1+1)*2-3=1; not (1-3)*2+1=-3
});

test('sync-array.some every', async (t) => {
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

	const ret = await some(funcs, (fun) => {
		return fun();
	});
	t.is(ret, true);
	t.is(v, 2);	// (1+1)=2; not (1-3)=-2
});
