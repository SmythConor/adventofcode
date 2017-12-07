const utils = require('../utils/utils');
/**
 * The whole part 2 thing is asking for the amount of cycles since the repeated cycle had shown up
 */

const input = [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5]; //[0, 2, 7, 0];
const banksLength = input.length;

function part1(banks) {
	let theSame = false;
	let counter = 0;
	const allocations = [];

	while (!theSame) {
		let reallocateCount = Math.max(...banks);
		const reallocateIndex = banks.findIndex(value => value === reallocateCount);
		banks[reallocateIndex] = 0;

		for (let i = reallocateIndex + 1; reallocateCount > 0; reallocateCount--, i++) {
			const index = i % banksLength;

			banks[index]++;
		}

		theSame = allocations.some((element) => utils.arraysEqual(element, banks));

		if (!theSame) {
			allocations.push(Object.assign([], banks));
		}

		counter++;
	}

	console.log(`Ran ${counter} times which should equal 12841`);
}

function part2(banks) {
	let theSame = false;
	let counter = 0;
	const allocations = [];

	while (!theSame) {
		let reallocateCount = Math.max(...banks);
		const reallocateIndex = banks.findIndex(value => value === reallocateCount);
		banks[reallocateIndex] = 0;

		for (let i = reallocateIndex + 1; reallocateCount > 0; reallocateCount--, i++) {
			const index = i % banksLength;

			banks[index]++;
		}

		theSame = allocations.some((element) => utils.arraysEqual(element, banks));

		if (!theSame) {
			allocations.push(Object.assign([], banks));
		}

		counter++;
	}

	const firstOccurance = allocations.findIndex((element) => utils.arraysEqual(element, banks)) + 1;
	const cycleCounter = counter - firstOccurance;

	console.log(`Ran ${cycleCounter} times which should be lower than 8038`);
}

// part1(Object.assign([], input));
part2(Object.assign([], input));