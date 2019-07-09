import test from 'ava';

import reduceRight from '../reduce-right';

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}


test('sync-array.reduceRight', async (t) => {
	async function fun1(p, c) {
		await sleep(1000);
		return p + c;
	}

	async function fun2(p, c) {
		await sleep(500);
		return p * c;
	}

	async function fun3(p, c) {
		await sleep(100);
		return p - c;
	}
	const funcs = [fun1, fun2, fun3];

	const v = await reduceRight([1, 2, 3], (p, c, i) => {
		return funcs[i](p, c);
	}, 4);
	t.is(v, 3);	// (4-3)*2+1=3
});
