import test from 'ava';

import filter from '../filter';

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

test('sync-array.filter sync', async (t) => {
	const ret = await filter([1, 2, 3], (it) => {
		return it > 1;
	});
	t.is(ret.length, 2);
	t.is(ret[0], 2);
	t.is(ret[1], 3);
});

test('sync-array.filter async', async (t) => {
	const ret = await filter([1, 2, 3], async (it) => {
		await sleep(100);
		return it > 1;
	});
	t.is(ret.length, 2);
	t.is(ret[0], 2);
	t.is(ret[1], 3);
});

test('sync-array.filter empty', async (t) => {
	const ret = await filter([1, 2, 3], async (it) => {
		await sleep(100);
		return it > 3;
	});
	t.is(ret.length, 0);
});

test('sync-array.filter empty array', async (t) => {
	const ret = await filter([], async (it) => {
		await sleep(100);
		return it > 3;
	});
	t.is(ret.length, 0);
});

test('sync-array.filter empty reject promise', async (t) => {
	const ret = await filter([1, 2, 3], async (it) => {
		// await sleep(100);
		if (it === 2) {
			throw Error('test');
		}
		return it > 1;
	});
	t.is(ret.length, 1);
	t.is(ret[0], 3);
});
