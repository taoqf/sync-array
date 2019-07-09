# Arry operation

Sync funcitons for Array.

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
// const { forEach, map, every, some, reduce, reduceRight } = require('sync-array').default;

function sleep(time: number){
	return new Promise<void>((resolve)=>{
		setTimeout(resolve, time);
	});
}

async function say1(){
	await sleep(10000);
	console.log('1');
}

async function say2(){
	await sleep(5000);
	console.log('2');
}

async function say3(){
	await sleep(1000);
	console.log('3');
}

const funcs = [say1, say2, say3];

funcs.forEach((say)=>{
	say();
});

// 3
// 2
// 1

array.forEach(funcs, (say)=>{
	return say();
});
// 1
// 2
// 3

```
