const utils = require('../utils/utils');
const inputFile = `${__dirname}/input`;

const test1 = [
	'{}',
	'{{{}}}',
	'{{},{}}',
	'{{{},{},{{}}}}',
	'{<a>,<a>,<a>,<a>}',
	'{{<ab>},{<ab>},{<ab>},{<ab>}}',
	'{{<!!>},{<!!>},{<!!>},{<!!>}}',
	'{{<a!>},{<a!>},{<a!>},{<ab>}}'
];

const test2 = [
	'<>',
	'<random characters>',
	'<<<<>',
	'<{!>}>',
	'<!!>',
	'<!!!>>',
	'<{o"i!a,<{i<a>'
];

function part1(input) {
	const stack = [];
	let count = 0;
	let garbageMode = false;

	for (let i = 0; i < input.length; i++) {
		const character = input[i];

		if (character === '!') {
			i++;
		} else if (garbageMode) {
			if (character === '>') {
				garbageMode = false;
			}
		} else {
			if (character === '<') {
				garbageMode = true;
			} else if (character === '{') {
				stack.push(1);
			} else if (character === '}') {
				const add = stack.length;
				stack.pop();
				count += add;
			}
		}
	}

	return count;
}

function part2(input) {
	const stack = [];
	let count = 0;
	let garbageMode = false;

	for (let i = 0; i < input.length; i++) {
		const character = input[i];

		if (character === '!') {
			i++;
		} else if (garbageMode) {
			if (character === '>') {
				garbageMode = false;
			} else {
				count++;
			}
		} else {
			if (character === '<') {
				garbageMode = true;
			}
		}
	}

	return count;
}

utils.readFile(inputFile, '')
	.then(input => {
		const ans1 = part1(input);
		console.log(`1: ${ans1} === 21037`);

		const ans2 = part2(input);
		console.log(`2: ${ans2} === 9495`);
	})
	.catch(console.log);

test1.map((x) => x.split('')).map(part1).forEach((x) => console.log(x));
test2.map((x) => x.split('')).map(part2).forEach((x) => console.log(x));