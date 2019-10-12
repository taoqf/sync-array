# Arry operation

Sync funcitons for Array.

Void Excepton `Maximum call stack size exceeded`

## Installation

```sh
yarn add sync-array
```

or

```sh
npm i --save sync-array
```

## Examples

```ts
import array from 'sync-array';
// import forEach from 'sync-array/foreach';
// const { forEach, map, every, filter, some, reduce, reduceRight } = require('sync-array').default;

function sleep(timeout: number){
	return new Promise<void>((resolve)=>{
		setTimeout(resolve, timeout);
	});
}

const arr = [1000, 500, 100];

arr.forEach(async (it)=>{
	await sleep(it);
	console.log(it);
});

// 100
// 500
// 1000

array.forEach(arr, async (it)=>{
	await sleep(it);
	console.log(it);
});
// 1000
// 500
// 100

```
